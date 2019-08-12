import { LoggingInterceptor } from './logger.interceptor';
export declare const loggerProvider: {
    provide: string;
    useClass: typeof LoggingInterceptor;
};
