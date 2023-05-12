import fetch from "../fetch/index";
import { City, Capt } from "../constants/service";

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
