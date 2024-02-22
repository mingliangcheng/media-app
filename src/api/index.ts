import Request, { type HttpResponse } from "luch-request";

// 引入配置
import { useUserStore } from "@/store/modules/user";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/utils/serviceLoading";

const http = new Request();
http.setConfig((defaultConfig: any) => {
  /* defaultConfig 为默认全局配置 */
  defaultConfig.baseURL = "";
  defaultConfig.timeout = 100000;
  /* 根域名 */
  defaultConfig.custom = {
    isToken: true, // 接口是否需要鉴权
    noLoading: false, // 是否展示加载动画
    signature: false, //是否数字签名
    encrypt: true //是否需要加密
  };
  defaultConfig.header = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  return defaultConfig;
});
/*
 * 请求拦截
 * @param {Object} http
 */
http.interceptors.request.use(
  (config: any) => {
    const userStore = useUserStore();
    config.data = config.data || {};
    const custom = config.custom;
    custom.noLoading || showFullScreenLoading();

    return config;
  },
  (config: any) => Promise.reject(config)
);
/**
 * 响应拦截
 * @param {Object} http
 */
http.interceptors.response.use(
  (response: HttpResponse) => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/

    tryHideFullScreenLoading();
    return response.data;
  },
  (error: any) => {
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);

export default http;
