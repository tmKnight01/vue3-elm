<template>
    <header-top titleText="个人信息" />
    <section>
        <router-link to="/profile/info" class="person">
            <img class="avator" src="@/images/avator.png" alt="" />
            <div class="user_info">
                <span class="names">{{ reactiveUserState.username }}</span>
                <p>
                    <van-icon name="phone-circle-o" />
                    {{ reactiveUserState.mobile }}
                </p>
            </div>
            <van-icon color="#fff" name="arrow" />
        </router-link>
        <section class="info_data">
            <ul className="info-data">
                <li className="info-data_item">
                    <div class="number">
                        <span>{{ reactiveUserState.balance }}</span>
                        元
                    </div>
                    <div class="description">我的余额</div>
                </li>
                <li className="info-data_item">
                    <div class="number">
                        <span  :style="{color:'red'}">{{ reactiveUserState.count }}</span>
                        个
                    </div>
                    <div class="description ">我的优惠</div>
                </li>
                <li className="info-data_item">
                    <div class="number">
                        <span :style="{color:'green'}">{{ reactiveUserState.pointNumber }}</span>
                        分
                    </div>
                    <div class="description">我的积分</div>
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup lang="ts">
import HeaderTop from "@/components/Header.vue";
import { useUserInfo } from "@/store/userinfo";
import { UserInfo } from "@/constants/store";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";

const store = useUserInfo();
const { userInfo } = storeToRefs(store);

const userState = {
    username: "",
    mobile: "暂无绑定的手机号",
    balance: 0, //我的余额
    count: 0, //优惠券个数
    pointNumber: 0, //积分数
    avatar: "", //头像地址
};
const reactiveUserState = reactive(userState);

const initDate = (newUserInfo: UserInfo) => {
    if (newUserInfo && newUserInfo.user_id) {
        //初始化数据
        const { username, mobile, gift_amount, point, avatar, balance } =
            newUserInfo;
        reactiveUserState.username = username;
        reactiveUserState.balance = balance;
        reactiveUserState.mobile = mobile || "暂无绑定的电话号码";
        reactiveUserState.count = gift_amount;
        reactiveUserState.pointNumber = point;
        reactiveUserState.avatar = avatar;
    } else {
        reactiveUserState.username = "登录|注册";
        reactiveUserState.mobile = "暂无绑定的电话号码";
    }
};

watch(
    userInfo,
    (newValue: UserInfo) => {
        initDate(newValue);
    },
    {}
);
onMounted(() => {
    initDate(userInfo.value);
});
</script>

<style lang="scss">
@import "@/styles/mixin.scss";

.person {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(25, 137, 250);
    // background-color: pink;
    width: 100%;
    height: 90px;

    padding: 0 0.3rem;
    padding-top: 1.95rem;

    .avator {
        @include wh(2.5rem, 2.5rem);
        border-radius: 50%;
        vertical-align: middle;

        .privateImage-svg {
            background: $fc;
            border-radius: 50%;
            @include wh(2.5rem, 2.5rem);
        }
    }

    .user_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: -40px;

        &>.names {
            @include sc(0.7rem, $fc);
        }

        &>p {
            @include sc(0.6rem, $fc);
        }


    }
}

.info-data {
    display: flex;
    background: $fc;
    width: 100%;

    &_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 0 10px 0;

        &>.number {
            @include sc(0.55rem, #333);
            // padding: .853333rem 0 .453333rem;
            //   padding-bottom: 0.45333rem;

            &>span {
                display: inline-block;
                @include sc(1.2rem, #f90);
                font-weight: 700;
                line-height: 1rem;
                font-family: Helvetica Neue, Tahoma;
            }
        }

        &>.description {
            @include sc(0.57333rem, gray);
            font-weight: 400;
            //   padding-bottom: 0.453333rem;
        }
    }

    &_item:nth-child(2) {
        border-right: 1px solid #f1f1f1;
        border-left: 1px solid #f1f1f1;
    }
}

.red {
    color: red;
}

.green {
    color: green
}
</style>
