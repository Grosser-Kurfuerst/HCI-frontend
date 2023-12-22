<template>
    <div>
        <div class="mb-5">
            <Header></Header>
        </div>

        <div class="container context" style="margin-top: 80px">
            <router-view :key="route.fullPath"></router-view>
        </div>

        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import {useRoute} from "vue-router";


const route = useRoute()
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}



.footer {
    position: absolute;
    left: 0;
    right: 0;
}
</style>
