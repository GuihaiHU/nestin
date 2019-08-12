export class PaginatorAdapter {
  data: any[];
  total: number;
  count: number;
  page: number;
  pageCount: number;
  constructor(data: any[], total: number, page: number, limit: number) {
    this.data = data;
    this.total = total;
    this.count = limit;
    this.page = page;
    this.pageCount = Math.ceil(total / limit);
  }
}
