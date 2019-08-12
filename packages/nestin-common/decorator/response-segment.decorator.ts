import { SetMetadata } from '@nestjs/common';

/**
 *
 * @param 部分返回
 */
export const ResponseSegment = (...segments: string[]) => SetMetadata('responseSegment', segments);
