import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from 'nestjs-config';
export declare class ResponseInterceptor implements NestInterceptor {
    readonly configService: ConfigService;
    private reflector;
    constructor(configService: ConfigService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
