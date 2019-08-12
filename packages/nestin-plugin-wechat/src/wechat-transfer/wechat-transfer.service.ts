import * as fs from 'fs';
import { ConfigService } from 'nestjs-config';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { Bank, CommunicationError, RequestError } from '@sigodenjs/wechatpay';
import { AppException } from 'nestin-common/exception/app.exception';

@Injectable()
export class WechatTransferService {
  /**
   *  appId: 已开通微信支付，并与该商户进行绑定的小程序appid
   *  key: 商户平台设置的密钥key
   *  mchId: 商户平台id
   *  pfx： API证书
   */
  private pay: Bank = new Bank({
    appId: this.configService.get('wechat.mini.appId'),
    key: this.configService.get('wechat-pay.key'),
    mchId: this.configService.get('wechat-pay.mchId'),
    pfx: fs.readFileSync(path.resolve(process.cwd(), this.configService.get('wechat-pay.pfxPath'))),
  });

  constructor(private readonly configService: ConfigService) {}
  /**
   * 企业付款-零钱
   * @param tradeNo 订单号
   * @param openId
   * @param amount 付款金额，分为单位
   * @param desc 付款备注
   */
  async transfers(tradeNo: string, openId: string, amount: number, desc: string = '提现') {
    const result = await this.pay
      .transfers({
        partner_trade_no: tradeNo,
        openid: openId,
        check_name: 'NO_CHECK',
        amount,
        desc,
        spbill_create_ip: '119.137.52.53',
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        this.handlerReject(err);
      });
    return await this.handlerTransferResponse(result);
  }

  /**
   * 企业付款-零钱 订单信息查询
   * @param tradeNo 订单号
   */
  async getTransferInfo(tradeNo: string) {
    // 设置沙箱模式，只有部分接口支持，不包括企业付款
    this.pay.setDebug(this.configService.get('wechat-pay.debug'));
    const result: any = await this.pay
      .getTransferInfo({
        partner_trade_no: tradeNo,
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return this.handlerReject(err);
      });

    if (result.result_code === 'SUCCESS') {
      return result;
    }
    if (result.err_code === 'NOT_FOUND') {
      return 'pending';
    }
    throw new AppException({
      msg: '企业付款-零钱 订单信息查询失败',
      err_code: result.err_code,
      err_code_des: result.err_code_des,
    });
  }

  /**
   * 处理微信接口错误，原因可能是请求未发送成功或微信接口故障
   * @param err
   */
  handlerReject(err) {
    if (err instanceof RequestError) {
      throw new AppException('远程调用微信api失败');
    } else if (err instanceof CommunicationError) {
      throw new AppException('return_code = FAIL，微信api故障');
    }
    throw new AppException('未知错误');
  }

  handlerTransferResponse(res) {
    // 判定为即时交易成功
    if (res.result_code === 'SUCCESS') {
      // todo 付款成功
      return 'success';
    }

    // 判定为即时交易失败
    if (res.result_code === 'FAIL' && res.err_code !== 'SYSTEMERROR') {
      // todo 记录失败结果
      throw new AppException({
        msg: '付款失败',
        err_code: res.err_code,
        err_code_des: res.err_code_des,
      });
    }

    // 不可判定交易结果，需要定时去调用查询付款接口取确定，直到明确结果
    // todo 记录结果未确定，写定时任务去查询结果
    return 'pending';
  }
}
