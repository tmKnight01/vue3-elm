<script lang="ts" setup>
import HeaderTop from '@/components/Header.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCityById, searchByAddress } from '../../service';
import { CityLT } from '@/constants/service';

const cityName = ref<string>('');
const searchTarget = ref<string>('');
const list = ref<Array<CityLT>>([]);
const loading = ref(true);
const finished = ref(true);
const route = useRoute();
const page = ref<number>(1);

/*  vue3中没有了created钩子，在setup中直接调用就相当于created时机*/
(async () => {
  const { params } = route;
  const city_info = await getCityById(Number(params.city_id));
  cityName.value = city_info.name;
})()

const onLoad = async () => {
  console.log('onLoad...');

  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  page.value = ++page.value;
  console.log('page', page);

  loading.value = false;
  const res = await searchByAddress({ keyword: value, city_id: Number(route.params.city_id), page: page.value, limit: 5 })
  if (res.cityList.length) {
    list.value = [list.value, ...res.cityList]
  } else {
    finished.value = true;
    

  }



};
const onSearch = async (value: string) => {
  console.log('value', value);
  const res = await searchByAddress({ keyword: value, city_id: Number(route.params.city_id), page: page.value,limit: 5})
  if (res.cityList) {
    list.value = [...res.cityList]
  }
}

</script>




<template>
  <header-top :title-text="cityName"></header-top>
  <div class="search_input">
    <van-search placeholder="输入学校,家庭等地址" v-model="searchTarget" @search="onSearch" />
  </div>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @onload="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="item.address" />
  </van-list>
</template>



<style lang="scss" src="./index.scss"></style>