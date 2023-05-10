import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { showToast } from "vant";

const URL =
  import.meta.env.VITE_NODE_ENV == "development"
    ? "http://192.168.0.83:3000"
    : "https://elm.cangdu.org";

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

// 定义请求响应参数， 不含data
interface Result {
  status: number;
}

interface ResultData<T extends Result> {
  data: T;
}
const config: AxiosRequestConfig = {
  baseURL: URL,
  timeout: RequestEnums.TIMEOUT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    
  },
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
        const { data, status } = res;
        if (status !== RequestEnums.SUCCESS) {
          showToast({ message: "Fetch Fail", type: "fail" });
          throw Error();
        }

        return data;
      },
      (err) => {
        if (err) {
          showToast({ message: "Fetch Fail", type: "fail" });
          throw Error(`err: ${err}`);
        }
      }
    );
  }
  /*
   请求拦截器
 */
}

export default new Fetch(config).service;

// export {};
