<template>
    <div class="columns py-6">
        <div class="column is-10 is-offset-1">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    新用户入驻
                </div>
                <div class="columns">
                    <div class="column is-6"
                         style="display: flex;justify-content: center;align-items: center;">
                        <img
                                width="275px"
                                height="275px"
                                src="@/assets/image/bg5.png">
                    </div>
                    <div style="display: flex;justify-content: left;margin-left:0px;margin-top: 50px;">
                        <el-form
                                ref="ruleForm"
                                v-loading="loading"
                                :model="ruleForm"
                                status-icon
                                :rules="rules"
                                label-width="100px"
                                class="demo-ruleForm"
                        >
                            <el-form-item label="账号" prop="name">
                                <el-input v-model="ruleForm.name" style="width: 250px;"/>
                            </el-form-item>

                            <el-form-item label="密码" prop="pass">
                                <el-input
                                        v-model="ruleForm.pass"
                                        type="password"
                                        autocomplete="off"
                                        style="width: 250px;"
                                />
                            </el-form-item>

                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input
                                        v-model="ruleForm.checkPass"
                                        type="password"
                                        autocomplete="off"
                                        style="width: 250px;"
                                />
                            </el-form-item>

                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email" autocomplete="off" style="width: 250px;"/>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                        type="primary"
                                        @click="submitForm('ruleForm')"
                                >立即注册
                                </el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </el-card>
        </div>
    </div>
</template>

<script>
import {userRegister} from '@/api/auth/auth'

export default {
    name: 'Register',
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            loading: false,
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
                email: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {
                        min: 2,
                        max: 10,
                        message: '长度在 2 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                pass: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {
                        min: 6,
                        max: 20,
                        message: '长度在 6 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                checkPass: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    userRegister(this.ruleForm)
                        .then((value) => {
                            const {code, message} = value
                            if (code === 200) {
                                this.$buefy.toast.open({
                                    message: '账号注册成功',
                                    type: 'is-success'
                                })

                                setTimeout(() => {
                                    this.loading = false
                                    this.$router.push({path: this.redirect || '/login'})
                                }, 0.1 * 1000)
                            } else {
                                this.$buefy.toast.open({
                                    message: '注册失败，' + message,
                                    type: 'is-danger'
                                })
                            }
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped>
</style>
