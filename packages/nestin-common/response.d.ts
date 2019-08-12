export declare class Response {
    readonly data: object;
    meta: {};
    status: string;
    constructor(data: object, meta?: {});
    addMeta(obj: object): void;
}
