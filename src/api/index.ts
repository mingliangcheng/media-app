import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type CustomParamsSerializer
} from "axios";

import type { ResultData } from "@/api/interface";

import router from "@/router";
import { stringify } from "qs";
// import { typedLocalStorage } from "@/utils/typed-storage/local-storage";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
  signature?: boolean;
  encrypt?: boolean;
}
const customParamsSerializer: CustomParamsSerializer = params => {
  return stringify(params, { indices: false });
};
const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 100000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: customParamsSerializer
  },
  // 跨域时候允许携带凭证
  withCredentials: true,

  noLoading: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        return data;
      },
      async (error: AxiosError<ResultData>) => {
        // 请求超时 && 网络错误单独判断，没有 response

        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
      }
    );
  }
  // setApiBaseUrl(baseUrl: string) {
  //   this.service.defaults.baseURL = baseUrl;
  // }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string | string[], _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHttp(defaultConfig);
