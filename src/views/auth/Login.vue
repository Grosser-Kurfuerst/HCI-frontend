<template>
    <div class="columns py-6">
        <div class="column is-10 is-offset-1" >
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    用户登录
                </div>
                <div class="columns" >
                    <div class="column is-6"
                         style="display: flex;justify-content: center;align-items: center;">
                        <img
                                width="275px"
                                height="275px"
                                src="@/assets/image/bg5.png">
                    </div>

                    <div style="display: flex;justify-content: left;margin-left:0px;margin-top: 50px;">
                        <el-form
                                v-loading="loading"
                                :model="ruleForm"
                                status-icon
                                :rules="rules"
                                ref="ruleForm"
                                label-width="100px"
                                class="demo-ruleForm"
                        >
                            <el-form-item label="账号" prop="name">
                                <el-input v-model="ruleForm.name" style="width: 250px;"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="pass">
                                <el-input
                                        type="password"
                                        v-model="ruleForm.pass"
                                        autocomplete="off"
                                        style="width: 250px;"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="记住" prop="delivery">
                                <el-switch v-model="ruleForm.rememberMe"></el-switch>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')"
                                >提交
                                </el-button
                                >
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

import * as https from "https";

export default {
    name: "Login",
    computed: {
        https() {
            return https
        }
    },
    data() {
        return {
            redirect: undefined,
            loading: false,
            ruleForm: {
                name: "",
                pass: "",
                rememberMe: true,
            },
            rules: {
                name: [
                    {required: true, message: "请输入账号", trigger: "blur"},
                    {
                        min: 2,
                        max: 15,
                        message: "长度在 2 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                pass: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("user/login", this.ruleForm)
                        .then(() => {
                            this.$buefy.toast.open({
                                message: '恭喜你，登录成功',
                                type: 'is-success',
                                duration: 2000,
                            })


                            setTimeout(() => {
                                this.loading = false;
                                this.$router.push({path: this.redirect || "/"});
                            }, 0.1 * 1000);
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};

</script>

<style scoped>


/*.columns {*/
/*    display: flex;*/
/*    align-items: center;*/
/*    justify-content: center;*/
/*    min-height: 100vh;*/
/*}*/

/*.column {*/
/*    width: 100%;*/
/*}*/

/*!* 如果你想使登录卡片有固定宽度，可以根据需要调整这里的宽度 *!*/
/*.is-half {*/
/*    max-width: 400px;*/
/*}*/
</style>
