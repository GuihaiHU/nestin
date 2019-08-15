import { ResponseInterceptor } from './response.interceptor';
export declare const responseProvider: {
    provide: any;
    useFactory: (configService: any) => ResponseInterceptor;
    inject: any[];
};
