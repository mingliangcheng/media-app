/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success',
  MAX = 100405,
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const cataLog = {
  2: '和解协议',
  3: '还款承诺书',
  4: '报告财产信息',
  20: '缴费凭证',
  99: '其他',
}
