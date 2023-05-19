import { defineStore } from "pinia";
import { USERINFO } from "./types";
import { UserInfo } from "@/constants/store";
import { setStore } from "@/utils/index";
import { getUser } from "@/service";

export const useUserInfo = defineStore(USERINFO.type, {
  // 其他配置...
  state: () => {
    return {
      // 初始化空用戶對象
      userInfo: {} as UserInfo,
      login: false,
    };
  },
  getters: {},
  actions: {
    // 记录用户信息 存储到localStore中
    record_userinfo(userinfo: UserInfo) {
      this.userInfo = userinfo;
      this.login = true;
      setStore("user_id", userinfo.user_id);
    },
    async get_userinfo() {
      try {
        const res = await getUser();
        console.log('res',res);
        this.userInfo = res;
      } catch (err) {
        console.log("err", err);
      }
    },
  },
});
