import { envBoolean, envString } from 'nestin-common/help/env-unit';

export default {
  key: envString('WECHAT_PAY_KEY'),
  mchId: envString('WECHAT_PAY_MCH_ID'),
  debug: envBoolean('WECHAT_PAY_DEBUG', true),
  pfxPath: envString('WECHAT_PAY_PFX_PATH', 'apiclient_cert_test.p12'),
};
