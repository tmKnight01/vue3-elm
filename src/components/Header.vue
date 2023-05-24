

<template>
    <header class="header_top">
        <van-icon v-if="leftBtn" @click="goBack" name="arrow-left" color="white" />

        <slot  v-else name="left"></slot>
        <section class="title_head ellipsis">
            <span class="title_text">{{ titleText }}</span>
        </section>
        <router-link :to="userInfo.username ? '/profile' : '/login'" v-if="isShowRight">
            <span v-if="userInfo.username" class="user_info">
             
                {{ userInfo.username }}
                <van-icon v-if="userInfo" name="manager-o" />
            </span>
            <span class="login_span" v-else>
                登录| 注册
            </span>
        </router-link>
        <slot name='right'></slot>
    </header>
</template>





<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { useUserInfo } from '@/store/userinfo'
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
const store = useUserInfo();

const router = useRouter();
const { userInfo } = storeToRefs(store);

console.log('uerInfo',userInfo.value)
const goBack = ()=> router.go(-1);

defineProps({
    titleText: {
        type: String,
        default: ''
    },
    isShowRight: {
        type: Boolean,
        default: true
    },
    leftBtn:{
      type:Boolean,
      default: true
    }
})

onMounted(async () => {
    await store.get_userinfo();
})



</script>



<style lang="scss">
@import '../styles/mixin.scss';

.header_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
    background-color: rgb(25, 137, 250);

    .title_head {
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;

        .title_text {
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }

    .user_avatar {
        fill: #fff;
        @include wh(.8rem, .8rem);
    }

    .user_info {
        width: 50px;
        @include sc(0.6rem, #fff);
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        height:100%;
        // display: flex;
        // align-items: center;
    }
    .login_span {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.6rem, #fff);
  // @include wh(_, 0.7rem);
  // @include ct; 
}
}
</style>