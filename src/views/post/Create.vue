<template>
    <div class="columns">
        <div class="column is-full">
            <el-card
                    class="box-card"
                    shadow="never"
            >
                <div
                        slot="header"
                        class="clearfix"
                >
                    <span><i class="fa fa fa-book"> 发布文章</i></span>
                </div>
                <div>
                    <el-form
                            ref="ruleForm"
                            :model="ruleForm"
                            :rules="rules"
                            class="demo-ruleForm">
                        <el-form-item prop="title">
                            <el-input
                                    v-model="ruleForm.title"
                                    placeholder="请输入文章主题，长度在 1 到 25 个字符"
                                    style="width: 700px"/>
                        </el-form-item>

                        <!--Markdown-->
                        <div id="vditor" style="width: 850px"/>

                        <b-taginput
                                v-model="ruleForm.tags"
                                class="my-3"
                                maxlength="15"
                                maxtags="3"
                                ellipsis
                                placeholder="请输入文章标签，不超过 3 个，每个标签最多 15 个字符"
                                style="margin-top: 20px !important;margin-bottom: 20px !important;width: 700px;"/>

                        <el-form-item style="margin-bottom: 0 !important;">
                            <el-button
                                    round
                                    style="background: #1771f4;border:  #1771f4"
                                    type="primary"
                                    @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button
                                    round
                                    @click="resetForm('ruleForm')">重置文章
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {post} from '@/api/post'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
    name: 'TopicPost',

    data() {
        return {
            contentEditor: {},
            ruleForm: {
                title: '', // 标题
                tags: [], // 标签
                content: '' // 内容
            },
            rules: {
                title: [
                    {required: true, message: '请输入文章名称', trigger: 'blur'},
                    {
                        min: 1,
                        max: 25,
                        message: '长度在 1 到 25 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted() {
        this.contentEditor = new Vditor('vditor', {
            height: 430,
            placeholder: '请输入文章内容……',
            theme: 'classic',
            counter: {
                enable: true,
                type: 'markdown'
            },
            preview: {
                delay: 0,
                hljs: {
                    style: 'monokai',
                    lineNumber: true
                }
            },
            tab: '\t',
            typewriterMode: true,
            toolbarConfig: {
                pin: true
            },
            cache: {
                enable: false
            },
            mode: 'sv'
        })
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (
                        this.contentEditor.getValue().length === 1 ||
                        this.contentEditor.getValue() == null ||
                        this.contentEditor.getValue() === ''
                    ) {
                        this.$buefy.toast.open({
                            message: `文章内容不可为空`,
                            type: 'is-danger'
                        })
                        return false
                    }
                    if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
                        this.$buefy.toast.open({
                            message: `文章标签不可为空`,
                            type: 'is-danger'
                        })
                        return false
                    }
                    this.ruleForm.content = this.contentEditor.getValue()
                    post(this.ruleForm).then((response) => {
                        const {data} = response
                        setTimeout(() => {
                            this.$router.push({
                                name: 'post-detail',
                                params: {id: data.id}
                            })
                        }, 800)
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.contentEditor.setValue('')
            this.ruleForm.tags = ''
        }
    }
}
</script>

<style>
</style>
