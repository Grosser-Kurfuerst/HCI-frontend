<template>
    <footer class="footer has-text-grey-light has-background-grey-darker">
        <div class="container">
            <div class="">
                <span>简洁、实用、美观</span>

                <span style="float: right">
          <router-link :to="{path:'/admin/login'}">
            管理员登录
          </router-link>
          |
          <a href="/?lang=zh_CN">中文</a> |
          <a href="/?lang=en_US">English</a>
        </span>
            </div>

            <div>
                <span>{{ state.title }} ALL RIGHTS RESERVED</span>
                <div style="float: right">
                    <el-row :gutter="12" justify="center" align="middle">
                        <el-col :span="12">
                            <el-tag type="info">Design</el-tag>
                        </el-col>
                        <el-col :span="12">
                            <el-tag >{{ state.author }}</el-tag>
                        </el-col>
                    </el-row>


                </div>
            </div>
        </div>
        <back-top></back-top>
    </footer>
</template>

<script setup>
import { reactive } from 'vue'
import BackTop from "@/components/BackTop";

const state = reactive({
    title: "© " + new Date().getFullYear() + ' HCI',
    author: 'HCI',
});

</script>

<style scoped>
footer {
    height: 80px;
}

footer a{
    color: #bfbfbf;
}
</style>