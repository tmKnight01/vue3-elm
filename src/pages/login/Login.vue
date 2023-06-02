<template>
  <header-top titleText="登录" :is-show-right="false" />
  <van-form @submit="onSubmit" class="login_form">
    <van-cell-group inset>
      <van-field
        class="login_form_item"
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        class="login_form_item"
        v-model="password"
        :type="!checked ? 'password' : 'text'"
        :mask="false"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #button>
          <van-switch size="12px" v-model="checked" />
        </template>
      </van-field>
      <van-field
        v-model="yanzheng"
        class="login_form_item"
        name="cap"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <div class="verification_code">
            <img alt="" v-show="imgUrl" :src="imgUrl" />
          </div>
        </template>
      </van-field>
    </van-cell-group>
    <p class="changeImg"><span :onClick="getchapt">看不清? 换一张</span></p>
    <div class="login_form_submit">
      <van-button
        round
        :loading="isLoading"
        block
        type="primary"
        size="mini"
        style="color: white"
        native-type="submit"
      >
        提交
      </van-button>
    </div>
  </van-form>
  <van-button @click="getPaymentParams"> 调接口1 </van-button>
</template>

<script setup lang="ts">
import HeaderTop from "@/components/Header.vue";
import { showToast } from "vant";
import { cityChapt, login } from "../../service";
import { onMounted } from "vue";
import { ref } from "vue";
import "vant/es/toast/style";
import { useUserInfo } from "@/store/userinfo";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserInfo();
const username = ref<string>("");
const password = ref<number>();
const yanzheng = ref<number | undefined>();
const isLoading = ref<boolean>(false);
const cap = ref<number | null>();
const checked = ref<boolean>(false);
const imgUrl = ref<string>("");

const onSubmit = async (values: any) => {
  try {
    isLoading.value = true;
    console.log("values", values);
    if (
      !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[^\s]{8,}$/.test(values.password)
    ) {
      showToast({ message: " 密码必须大于8位，并且包含数字，英文及特殊字符" });
      return;
    }
    console.log("cap", cap.value);
    if (Number(values.cap) !== cap.value) {
      showToast({ message: "验证码不正确" });
      return;
    }
    const res = await login({ ...values });
    if (res) {
      console.log("res", res);

      store.record_userinfo(res);
      showToast({ message: "登录成功" });
      router.go(-1);
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    isLoading.value = false;
  }
};

const getchapt = async () => {
  try {
    const imgInfo = await cityChapt();
    imgUrl.value = imgInfo.code;
    cap.value = imgInfo.cap;
    yanzheng.value = undefined;
  } catch (err) {
    console.log("err：", err);
  }
};

onMounted(async () => {
  getchapt();
  console.log("wx", wx);
         wx.config({
          // 配置微信支付所需的参数
          appId:"wx14c332c594393b3a",
          timestamp:"1685287976",
          nonceStr:"Njb492czvSaWdJdRawu99cygBRWwAW2Z",
          signature: "RSA",
          jsApiList: ['chooseWXPay']
        });

  console.log('weixin', WeiXinJsBridge);
  
});

const getPaymentParams =  async ()=>{
try {
  const res = await wx.chooseWXPay({
    prepay_id: "wx2823325639055079d41e484d047bfc0000",
    appId:  "wx14c332c594393b3a",
    timeStamp: "1685287976",
    nonceStr: "Njb492czvSaWdJdRawu99cygBRWwAW2Z",
    package: "prepay_id=wx2823325639055079d41e484d047bfc0000",
    signType: "MD5",
    paySign:
      "UKKGIFZSmRFy8sQyunQtOC9RvO402F8piItp4orr16uhWJ7TZ1y/PLblKH8LoHB57WoKSbqRsGwPHlqxNXiudjUDLY8kVsO970KXer0zxEAr85UeHv2aeJxP49fXd94Un5rOaKgVyCOUgM00QqSxYS/tTO9/NaAqazw2A6JlKXHSRKg9pj2CMbukz67K/1enm/4JCK694eZ/44s4Cge+tAqenX2ECvORy0PpkBfsKVTJuW3K/vFGqVyRsuh0o6nBcrwRQhJthtL9o5D0Hmlv7fJ6HNujtliUmSZ2MkceTimdJ2Lfi3t+ZzYfwfi0+nMs541JrGCo4FaCankuOVWjvQ==",
    success: function (res) {
      // 支付成功的回调函数
      console.log("支付成功", res);
    },
    fail: function (res) {
      // 支付失败的回调函数
      console.log("支付失败", res);
    },
  });
  console.log('res',res);
  
} catch(err){
      console.log('err',err);
      
}
}


</script>

<style lang="scss">
@import "../../styles/mixin.scss";

.van-toast {
  padding: 5px;
  width: 100%;
}

.van-toast__text {
  font-size: 10px;
  line-height: 12px;
}

.login_form {
  @include sc(0.6rem, #fff);
  font-size: 12px;
  margin-top: 50px;

  &_item {
    font-size: 10px;
    padding: 5px;
    padding-left: 12px;

    & > .van-field__label {
      width: 50px;
    }
  }

  &_submit {
    width: 80%;
    margin: 20px auto;
    //  color: #fff;
  }

  .van-button__content {
    color: white;
  }

  .van-field__error-message {
    font-size: 10px;
  }

  .verification_code {
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
  }

  .changeImg {
    width: 100%;
    font-size: 8px;
    color: red;
    text-align: right;
    padding: 5px 16px;
  }
}
</style>
