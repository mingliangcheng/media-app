// 请求响应参数（不包含data）
export interface Result {
  code: string | number;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface ResPage1<T> {
  rows: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}
