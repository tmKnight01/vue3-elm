

<template>
    <header class="header_top">
        <slot name="left"></slot>
        <section class="title_head ellipsis" >
            <span class="title_text">{{ titleText }}</span>
        </section>
        <slot name='right'></slot>
    </header>
   
</template>





<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    titleText: {
        type: String,
        default: ''
    },
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
    background-color: rgb(25,137,250);
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
}
</style>