export interface AbstractStorage {
  // 获取文件内容(location 默认指的是相对于./asset的路径)
  get(location: string, encoding?: string): Promise<string | Buffer>;
  // 生成文件，支持文本，图片等
  put(location: string, content: any, options?: object): Promise<boolean | object>;
  // 删除文件
  delete(location: string): Promise<boolean>;
  // 获取返回给客户端的url
  url(fileName: string): string;
  // 获取相对于项目根目录的url
  asset(fileName: string): string;
  // 返回一个随机文件名
  randomLocation(folderName: string, suffix?: string): string;
  // 切换存储方式和配置
  switch?(optionName?: string, option?: StorageOption): AbstractStorage;
}

export interface StorageOption {
  name: string;
  root: string;
  secure: boolean;
  host: string;
}
