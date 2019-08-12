import { SetMetadata } from '@nestjs/common';

/**
 *
 * @param respStyle plain: 不做任何装饰, paginate: 分页, default: 默认分页
 */
export const ResponseStyle = (respStyle: string) => SetMetadata('responseStyle', respStyle);
