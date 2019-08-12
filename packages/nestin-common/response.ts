export class Response {
  public status: string;
  constructor(public readonly data: object, public meta = {}) {
    this.status = 'success';
  }
  public addMeta(obj: object) {
    this.meta = Object.assign(this.meta, obj);
  }
}
