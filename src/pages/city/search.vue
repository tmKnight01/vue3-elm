<script lang="ts" setup>
import HeaderTop from '@/components/Header.vue';
import { defineProps, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCityById } from '../../service';


const cityName = ref<string>('');
const searchTarget = ref<string>('');
const list = ref<Array<number>>([]);
const loading = ref(false);
const finished = ref(false);
const route = useRoute();


/*  vue中没有了created钩子，在setup中直接调用就相当于created时机*/
(async () => {
    const { params } = route;
    const city_info = await getCityById(Number(params.city_id));
    cityName.value = city_info.name;
})()

const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };
</script>




<template>
    <header-top :title-text="cityName"></header-top>
    <div class="search_input">
        <van-search placeholder="输入学校,家庭等地址" v-model="searchTarget" />
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
</template>



<style lang="scss" src="./index.scss"></style>