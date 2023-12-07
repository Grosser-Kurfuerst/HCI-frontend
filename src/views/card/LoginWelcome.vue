<template>
    <el-card class="box-card">
        <div slot="header">
            <span>💐 发帖</span>
        </div>
        <div v-if="token != null && token !== ''" class="has-text-centered mt-4">
            <el-button type="danger" tag="router-link" :to="{path:'/post/create'}" outlined>✍ 发表想法</el-button>
        </div>

        <div v-else class="has-text-centered mt-4">
            <el-button type="primary" tag="router-link" :to="{path:'/register'}" outlined>马上入驻</el-button>
            <el-button type="danger" tag="router-link" :to="{path:'/login'}" outlined class="ml-2"> 社区登入</el-button>
        </div>
    </el-card>
</template>

<script setup>
import { useStore } from "vuex";
import {computed} from "vue";

const store = useStore();
const token = computed(() => {
    return store.getters.token
})

</script>

<style scoped>

</style>