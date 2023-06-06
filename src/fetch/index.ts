import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { showToast } from "vant";
import "vant/es/toast/style";
const URL =
  import.meta.env.VITE_NODE_ENV == "development"
    ? "http://192.168.0.83:3000"
    : "https://elm.cangdu.org";

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = -1, // 请求失败
  SUCCESS = 0, // 请求成功 但返回值有问题
}


const config: AxiosRequestConfig = {
  baseURL: URL,
  timeout: RequestEnums.TIMEOUT,
};

class Fetch {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /*
过滤拦截器
*/

    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res;
        console.log("res1", data.stauts);
        if (Number(data.status) === 0 || Number(data.status) === -1) {
          console.log("test");
          showToast({ message: data.message, type: "fail" });
          throw Error(data.message);
        }

        return data;
      },
      (err) => {
        if (err) {
          showToast({ message: "接口请求异常，请稍后重试" });
          throw Error(`err: ${err}`);
        }
      }
    );
    this.service.interceptors.request.use((config) => {
      const { method } = config;
      if (
        method === "post" &&
        Object.prototype.toString.call(config.data) === "[object FormData]"
      ) {
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    });
  }

  /*
   请求拦截器
 */
}

export default new Fetch(config).service;

// export {};
