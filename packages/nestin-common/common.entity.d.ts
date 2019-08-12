export declare abstract class CommonEntity<T> {
    constructor(partial?: Partial<T>);
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
