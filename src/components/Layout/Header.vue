<template>
    <el-header class="header has-background-white has-text-black">
        <nav class="navbar-menu container is-white" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <img :src="state.IconImg" alt="logo">
                </div>

                <router-link class="navbar-item is-hidden-desktop" :to="{ path: '/' }">
                    主页
                </router-link>
            </div>

            <div class="navbar-start">
                <router-link class="navbar-item" :to="{ path: '/' }">
                    🌐 主页
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <el-row :gutter="12" justify="center" align="middle">
                        <el-col :span="18">
                            <el-input v-model="state.searchKey"
                                      class="w-50 m-2"
                                      placeholder="搜索帖子、标签和用户"
                                      :prefix-icon="Search"
                                      @keyup.enter.native="search()"
                                      clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="search()">检索</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div class="navbar-item">
                    <el-row :gutter="20" justify="center" align="middle">
                        <el-col :span="12">
                            <el-switch v-model="state.darkMode"></el-switch>
                        </el-col>
                        <el-col :span="6">
                            <label for="darkModeSwitch">{{ state.darkMode ? "夜" : "日" }}</label>
                        </el-col>
                    </el-row>
                </div>

                <div class="navbar-item" v-if="token == null || token === ''">
                    <div class="buttons">
                        <router-link class="button is-light" :to="{ path: '/register' }">注册</router-link>
                        <router-link class="button is-light" :to="{ path: '/login' }">登录</router-link>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable" v-else>
                    <a class="navbar-link">
                        {{ user.alias }}
                    </a>

                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" :to="{ path: `/member/${user.username}/home` }">🧘 个人中心
                        </router-link>
                        <hr class="navbar-divider">
                        <router-link class="navbar-item" :to="{ path: `/member/${user.username}/setting` }">⚙ 设置中心
                        </router-link>
                        <hr class="navbar-divider">
                        <a class="navbar-item" @click="logout()"> 👋 退出登录</a>
                    </div>
                </div>
            </div>
        </nav>
    </el-header>
</template>

<script setup>
import {ref, reactive, computed, watch, onMounted, getCurrentInstance} from 'vue'
import {useStore} from 'vuex'
import {disable as disableDarkMode, enable as enableDarkMode} from 'darkreader'
import {getDarkMode, setDarkMode} from '@/utils/auth'
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()
const {proxy} = getCurrentInstance()

const state = reactive({
    redirect: undefined,
    logoUrl: require('@/assets/logo.png'),
    IconImg: require('@/assets/logo.png'),
    searchKey: '',
    darkMode: false
})

const token = computed(() => store.getters.token)
const user = computed(() => store.getters.user)

watch(() => state.darkMode, (val) => {
    if (val) {
        enableDarkMode({})
    } else {
        disableDarkMode()
    }
    setDarkMode(state.darkMode)
})

const logout = async () => {
    await store.dispatch('user/logout')
    proxy.$message({
        message: "退出登录成功",
        type: "message",
        duration: 2000,
    });
    setTimeout(() => {
        router.push({path: state.redirect || '/'})
    }, 500)
}

const search = () => {
    console.log(token.value)
    if (state.searchKey.trim() === null || state.searchKey.trim() === '') {
        proxy.$message({
            showClose: true,
            message: '请输入关键字搜索！',
            type: 'warning',
            duration: 2000
        })
        return false
    }
    router.push({path: '/search?key=' + state.searchKey})
}

state.darkMode = getDarkMode()
if (state.darkMode) {
    enableDarkMode({})
} else {
    disableDarkMode()
}
</script>

<style scoped>
input {
    width: 80%;
    height: 86%;
}
</style>