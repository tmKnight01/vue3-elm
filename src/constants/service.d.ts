/*
获取首页默认地址
*/
export interface City {
  abbr: string;
  area_code: string;
  id: string;
  is_map: boolean;
  latitude: number;
  longitude: number;
  name: string;
  pinyin: string;
  sort: number;
}

/*
  获取验证码
  */
export interface Capt {
  status: number;
  code: string;
  cap: number;
}

/*用户信息*/

/*登录接口入参*/
export interface loginParams {
  cap: string;
  password: string;
  username: string;
}

