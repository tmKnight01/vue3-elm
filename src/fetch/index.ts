import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { closeNotify, showToast } from "vant";
import 'vant/es/toast/style';
const URL =
  import.meta.env.VITE_NODE_ENV == "development"
    ? "http://192.168.0.83:3000"
    : "https://elm.cangdu.org";

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = -1, // 请求失败
  SUCCESS = 0 , // 请求成功 但返回值有问题
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
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
    
  // },
  
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
        console.log('status',Boolean(Number(data.status) === RequestEnums.SUCCESS));
        if ( Boolean(Number(data.status) === RequestEnums.SUCCESS) ) {
          console.log('test')
          showToast({ message:data.message , type: "fail" });
          throw Error(data.message);
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
