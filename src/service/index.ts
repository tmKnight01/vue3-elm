import fetch from "../fetch/index";

/*
获取首页默认地址
*/
interface City {
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

export const cityGuess = async (): Promise<City> =>
  await fetch("v1/cities", {
    params: {
      type: "guess",
    },
  });
