<template>
    <header-top titleText="登录">
        <template v-slot:left>
            <van-icon name="arrow-left" color="white" />
        </template>

    </header-top>

    <van-form @submit="onSubmit" class="login_form">
        <van-cell-group inset>
            <van-field class="login_form_item" v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field class="login_form_item" v-model="password" :type="!checked ? 'password' : 'text'" :mask="false"
                name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]">
                <template #button>
                    <van-switch size="12px" v-model="checked" />
                </template>
            </van-field>
            <van-field v-model="yanzheng" class="login_form_item" name="cap" label="验证码" placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]">
                <template #button>
                    <div class="verification_code">
                        <img alt="" v-show="imgUrl" :src="imgUrl" />
                    </div>
                </template>

            </van-field>

        </van-cell-group>
        <p class="changeImg"> <span :onClick="getchapt">看不清? 换一张</span></p>
        <div class="login_form_submit">
            <van-button round block type="primary" size="mini" style="color:white" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>



<script setup lang="ts">
import HeaderTop from '@/components/Header.vue';
import { showToast } from "vant";
import { cityChapt, login } from '../../service';
import { onMounted } from 'vue';
import { ref } from 'vue';
import 'vant/es/toast/style';

const username = ref<string>('');
const password = ref<number>();
const yanzheng = ref<number | undefined>();

const cap = ref<number | null>();
const checked = ref<boolean>(false);
const imgUrl = ref<string>('');


const onSubmit = async (values: any) => {
    try {
        console.log('values', values);
        if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[^\s]{8,}$/.test(values.password)) {
            showToast({ message: ' 密码必须大于8位，并且包含数字，英文及特殊字符' });
            return;
        }
        console.log('cap', cap.value)
        if (Number(values.cap) !== cap.value) {
            showToast({ message: '验证码不正确' });
            return;
        }
        const res = await login({ ...values });
       if(res){
        console.log('res',res);
        showToast({ message: '登录成功' });
       }
    } catch (err) {
        console.log('err', err);
    }

};

const getchapt = async () => {

    try {
        const imgInfo = await cityChapt();
        imgUrl.value = imgInfo.code;
        cap.value = imgInfo.cap;
        yanzheng.value = undefined;
    } catch (err) {
        console.log('err：', err);
    }

}


onMounted(async () => {
    getchapt();

})



</script>


<style lang="scss">
@import '../../styles/mixin.scss';

.van-toast {
    padding: 5px;
    width: 100%;

}

.van-toast__text {
    font-size: 10px;
    line-height: 12px
}

.login_form {
    @include sc(0.6rem, #fff);
    font-size: 12px;
    margin-top: 50px;

    &_item {
        font-size: 10px;
        padding: 5px;
        padding-left: 12px;

        &>.van-field__label {
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