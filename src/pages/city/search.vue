<script lang="ts" setup>
import HeaderTop from '@/components/Header.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCityById, searchByAddress } from '../../service';
import { CityLT } from '@/constants/service';
import { onMounted } from 'vue';

const cityName = ref<string>('');
const searchTarget = ref<string>('');
const list = ref<Array<CityLT>>([]);
const loading = ref(false);
const finished = ref(false);
const route = useRoute();
const page = ref<number>(1);
// const 

/*  vue3中没有了created钩子，在setup中直接调用就相当于created时机*/
(async () => {
  const { params } = route;
  const city_info = await getCityById(Number(params.city_id));
  cityName.value = city_info.name;
})()

const onLoad = () => {

  console.log('loading', loading.value);

  (async () => {
    console.log('onloading');

    page.value = page.value + 1;
    const res = await searchByAddress({ keyword: searchTarget.value, city_id: Number(route.params.city_id), page: page.value, limit: 5 })
    if (res.cityList?.length) {
      list.value = [...list.value, ...res.cityList]
      loading.value = false;
    }

    if (list.value.length >= res.total) {
      finished.value = true
    }
  })()
}

const onSearch = async (value: string) => {
  console.log('value', value);
  const res = await searchByAddress({ keyword: value, city_id: Number(route.params.city_id), page: page.value, limit: 5 })
  if (res.cityList) {
    list.value = [...res.cityList]
  }
}

onMounted(()=>{
  // onLoad();
})

</script>




<template>
  <header-top :title-text="cityName"></header-top>
  <div class="search_input">
    <van-search placeholder="输入学校,家庭等地址" v-model="searchTarget" @search="onSearch" />
  </div>
  <van-list v-if="list.length" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="item.address" />
  </van-list>
</template>



<style lang="scss" src="./index.scss"></style>