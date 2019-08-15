import { LoggingInterceptor } from './logger.interceptor';
export declare const loggerProvider: {
    provide: any;
    useClass: typeof LoggingInterceptor;
};
