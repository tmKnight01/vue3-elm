import fetch from "../fetch/index";
import { City, Capt, loginParams } from "../constants/service";
import { UserInfo } from "@/constants/store";
import { getStore } from "@/utils/index";
/*
获取首页默认地址
*/
export const cityGuess = async (): Promise<City> =>
  await fetch("v1/cities", {
    params: {
      type: "guess",
    },
  });

/*
  获取首页热门城市地址
  */
export const cityHotGuess = async (): Promise<Array<City>> =>
  await fetch("v1/cities", {
    params: {
      type: "hot",
    },
  });

/*
  获取验证码图片
*/
export const cityChapt = async (): Promise<Capt> =>
  await fetch("v1/captchs", {});

/*
登录接口
*/
export const login = async (data: loginParams): Promise<any> =>
  await fetch("v2/login", {
    method: "post",
    data,
  });

/*
  获取用户信息
  */
export const getUser = async (): Promise<UserInfo> =>
  await fetch("/v2/getUser", {
    method: "get",
    params: {
      user_id: getStore("user_id"),
    },
  });
