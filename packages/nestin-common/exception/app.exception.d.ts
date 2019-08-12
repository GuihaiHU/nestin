export declare class AppException extends Error {
    readonly message: any | object;
    protected data: any;
    protected status: string;
    protected config: any;
    constructor(message: any | object, config?: {
        status?: string;
        code?: number;
        httpCode?: number;
    });
    getResponse(): object;
    getStatus(): number;
}
