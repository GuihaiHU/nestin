import { ResponseInterceptor } from './response.interceptor';
import { ConfigService } from 'nestjs-config';
export declare const responseProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => ResponseInterceptor;
    inject: (typeof ConfigService)[];
};
