<template>
    <div class="columns py-6">
        <div class="column is-half is-offset-one-quarter">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    用户登录
                </div>
                <div>
                    <el-form
                        v-loading="loading"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="LoginForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="账号" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="pass">
                            <el-input
                                type="password"
                                v-model="ruleForm.pass"
                                autocomplete="off"
                                show-password
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="记住" prop="delivery">
                            <el-checkbox v-model="ruleForm.rememberMe"></el-checkbox>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()"
                            >提交</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";


const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();

const redirect = ref(undefined);
const loading = ref(false);
const ruleForm = ref({
    name: '',
    pass: '',
    rememberMe: true,
});

const rules = {
    name: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
    ],
    pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    ],
};

const LoginForm = ref(null);

const submitForm = () => {
    LoginForm.value.validate((valid) => {
        if (valid) {
            loading.value = true;
            store.dispatch('user/login', ruleForm.value)
                .then((value) => {
                    if (value === 200) {
                        proxy.$message({
                            message: "恭喜你，登录成功",
                            type: "success",
                            duration: 2000,
                        });

                        setTimeout(() => {
                            loading.value = false;
                            // 通过 router 跳转页面
                            router.push({ name: "home"});
                        }, 500);
                    } else {
                        loading.value = false;
                        resetForm();
                    }
                    console.log(value);

                    // store.dispatch("user/getInfo")


                })
                .catch(() => {
                    loading.value = false;
                })
        } else {
            return false;
        }
    });
};

const resetForm = () => {
    LoginForm.value.resetFields()
};

</script>

<style scoped>

</style>