<template>
    <div class="columns py-6">
        <div class="column is-half is-offset-one-quarter">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    新用户入驻
                </div>
                <div>
                    <el-form
                        ref="registerForm"
                        v-loading="loading"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="账号" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>

                        <el-form-item label="密码" prop="pass">
                            <el-input
                                v-model="ruleForm.pass"
                                type="password"
                                autocomplete="off"
                                show-password
                            />
                        </el-form-item>

                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input
                                v-model="ruleForm.checkPass"
                                type="password"
                                autocomplete="off"
                                show-password
                            />
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" autocomplete="off" />
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submitForm()"
                            >立即注册</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {reactive, toRefs, ref, getCurrentInstance} from 'vue'
import { userRegister } from '@/api/auth/auth'
import {useRouter} from "vue-router";

export default {
    name: 'Register',
    setup() {
        const { proxy } = getCurrentInstance();
        const router = useRouter();

        let state = reactive({
            loading: false,
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
                email: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    {
                        min: 2,
                        max: 10,
                        message: '长度在 2 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 20,
                        message: '长度在 6 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ]
            }
        })

        function validatePass(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== state.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }

        const registerForm = ref(null)

        const submitForm = () => {
            registerForm.value.validate((valid) => {
                if (valid) {
                    state.loading = true
                    console.log(state.ruleForm)
                    userRegister(state.ruleForm)
                        .then((value) => {
                            const { code, message } = value
                            if (code === 200) {
                                proxy.$message({
                                    message: '账号注册成功',
                                    type: 'success'
                                })
                                setTimeout(() => {
                                    state.loading = false
                                    // router.push({ path: proxy.$redirect || '/login' })
                                    router.push({ path: '/login' })
                                }, 1000)
                            } else {
                                // proxy.$message.error("注册失败，" + message)
                                state.loading = false
                            }
                        })
                        .catch(() => {
                            state.loading = false
                        })
                } else {
                    return false
                }
            })
        }

        const resetForm = () => {
            registerForm.value.resetFields()
        }

        return {
            ...toRefs(state),
            registerForm,
            submitForm,
            resetForm
        }
    }
}

</script>

<style scoped>

</style>