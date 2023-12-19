<template>
    <el-row>
        <el-col :span="24">
            <login-welcome/>
        </el-col>

    </el-row>
    <el-row class="mt-3">
        <el-col :span="24">
            <tip/>
        </el-col>
    </el-row>
</template>

<script>
    import Tip from '@/views/card/Tip'
    import LoginWelcome from "@/views/card/LoginWelcome.vue";
    export default {
        name: 'CardBar',
        components: {LoginWelcome, Tip },
    }
</script>

<style scoped>

</style>