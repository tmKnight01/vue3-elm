<template>
    <tabbar :model-value="footerRef" class="footer-tab">
        <tabbar-item name="msite" icon="shopping-cart">外卖</tabbar-item>
        <tabbar-item name="search" icon="search">搜索</tabbar-item>
        <tabbar-item name="order" icon="balance-list-o">订单</tabbar-item>
        <tabbar-item name="profile" icon="friends-o">个人</tabbar-item>
    </tabbar>
</template>


<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant';
import "vant/es/tabbar/style";
import "vant/es/tabbar-item/style";
import { defineProps,ref,onMounted } from 'vue';



const prop = defineProps<{
    active: 'msite' | 'search' | 'order' | 'profile'
}>()

const footerRef = ref('');


onMounted(()=>{
    footerRef.value = prop.active
})




</script>



<style lang="scss">

.footer-tab {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>