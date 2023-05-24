<template>
  <div>
    <header-top :leftBtn='false' titleText="13246">
      <template v-slot:left>
        <span class="head_logo">
          清河App
        </span>
      </template>

      <!-- <template v-slot:right>
        <span class="head_info" @click="toLogin">登录|注册</span>
      </template> -->

    </header-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + info.guessCityid" class="guess_city">
        <span>{{ info.guessCity }}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <li v-for="item in info.hotcity" :to="'/city/' + item.id" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
          <h4 class="city_title">
            {{ key }}
            <span v-if="index == 0">（按字母排序）</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
              {{ item.name }}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { cityGuess, cityHotGuess } from "../../service/index";
// import { useRouter } from "vue-router";
import HeaderTop from '@/components/Header.vue';
interface reactiveData {
  guessCity: string; //当前城市
  guessCityid: string; //当前城市id
  hotcity: Array<any>; //热门城市列表
  groupcity: Record<string, unknown>; //所有城市列表
}

// const router = useRouter();

const info = reactive({
  guessCity: "", //当前城市
  guessCityid: "", //当前城市id
  hotcity: [], //热门城市列表
  groupcity: {}, //所有城市列表
}) as reactiveData;

const sortgroupcity = computed(() => {
  let sortobj: Record<string, unknown> = {};
  for (let i = 65; i <= 90; i++) {
    if (info.groupcity[String.fromCharCode(i)]) {
      sortobj[String.fromCharCode(i)] = info.groupcity[String.fromCharCode(i)];
    }
  }
  return sortobj;
});
onMounted(async () => {
  try {
    const [guessCity, hotCity] = await Promise.all([cityGuess(), cityHotGuess()]);

    info.guessCity = guessCity.name;
    info.guessCityid = guessCity.id;
    info.hotcity = hotCity

  } catch (err) {
    console.log('err:', err);
  }


});


// const toLogin = () => {
//   router.push({
//     name: 'login',

//   })
// }
</script>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.6rem, #fff);
  // @include wh(_, 0.7rem);
  // @include ct; 
}

.head_info {
  font-weight: 400;
  font-size: 10px;
  @include sc(0.6rem, #fff);
}

.city_nav {
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;

  .city_tip {
    @include fj;
    line-height: 1.45rem;
    padding: 0 0.45rem;

    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }

    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }

  .guess_city {
    @include fj;
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);

    span:nth-of-type(1) {
      color: $blue;
    }

    .arrow_right {
      @include wh(0.6rem, 0.6rem);
      fill: #999;
    }
  }
}

#hot_city_container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}

.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }

  li:nth-of-type(4n) {
    border-right: none;
  }
}

.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.55rem, 1.45rem, "Helvetica Neue");

  span {
    @include sc(0.475rem, #999);
  }
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  background-color: #fff;
  border-bottom: 1px solid $bc;

  .groupcity_name_container {
    li {
      color: #666;
    }
  }
}
</style>
