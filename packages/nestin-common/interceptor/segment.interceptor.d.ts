import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SegmentInterceptor implements NestInterceptor {
    private reflector;
    constructor();
    private getInfoAsSegment;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
