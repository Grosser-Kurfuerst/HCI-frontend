<template>
    <section>
        <el-card shadow="never">
            <div slot="header">
                个人设置
            </div>
            <div class="columns">
                <div class="column is-full">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="基础信息" name="first">
                            <el-form :label-position="labelPosition" label-width="200px" :model="user">
                                <el-form-item label="账号">
                                    <el-input v-model="user.username" style="width: 500px;"disabled/>
                                </el-form-item>
                                <el-form-item label="昵称">
                                    <el-input v-model="user.alias" style="width: 500px;"/>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input v-model="user.bio" style="width: 500px;"/>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>

                        <el-tab-pane label="头像" name="second">

                            <figure class="image is-128*128"  style="marginborder-radius: 20px;border-color: #1d1d1d;border-width: 5px" >
                                <img :src="user.avatar || 'https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png'"
                               style="width:128px; height: 128px; border-radius: 10px; "
                                >
                            </figure>
                            <div class="level has-text-grey is-mobile  is-size-6 mt-3"
                                 style="margin-bottom: 1rem"
                            > 图片格式：支持 PNG、JPG、JPEG；图片大小：不超过4M，建议图片大于50 x 50像素，长宽比小于1.2</div>
                            <el-upload
                                    action=""
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleAvatarUploadSuccess">
                            <el-button type="primary">上传头像</el-button>
                        </el-upload>
                        </el-tab-pane>

                        <el-tab-pane label="电子邮箱" name="third">
                            <el-form ref="dynamicValidateForm" :model="user" label-width="200px" class="demo-dynamic">
                                <el-form-item
                                        prop="email"
                                        label="邮箱"
                                        :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                                >
                                    <el-input v-model="user.email" style="width: 500px;"/>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交
                                    </el-button>
                                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script>
import {getInfo, update} from '@/api/user'

export default {
    name: 'Setting',
    data() {
        return {
            activeName: 'first',
            labelPosition: 'right',
            user: {
                id: '',
                username: '',
                alias: '',
                bio: '',
                email: '',
                mobile: '',
                avatar: ''
            }
        }
    },
    created() {
        this.fetchInfo()
    },
    methods: {
        fetchInfo() {
            getInfo(this.$route.params.username).then(res => {
                console.log(res)
                const {data} = res
                this.user = data
            })
        },
        handleClick(tab, event) {
            console.log(tab, event)
        },
        submitForm(formName) {
            console.log(this.user)
            update(this.user).then(res => {
                this.$buefy.toast.open({
                    message: '信息修改成功',
                    type: 'is-success'
                })
                this.fetchInfo()
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        beforeAvatarUpload(file) {
            const isImage = file.type.startsWith('image/'); // 验证是否为图片类型
            if (!isImage) {
                this.$buefy.toast.open({
                    message: '只能上传图片文件',
                    type: 'is-danger'
                })
                return false;
            }

            const isLt2M = file.size / 1024 / 1024 < 4; // 验证图片大小，此处限制为小于 4MB
            if (!isLt2M) {
                this.$buefy.toast.open({
                    message: '图片大小不能超过 4MB!',
                    type: 'is-danger'
                })
                return false;
            }

            // 获取图片的 URL
            const imageUrl = URL.createObjectURL(file);

            // 创建一个 Image 对象用于获取图片的长宽
            const img = new Image();
            img.src = imageUrl;

            // 在图片加载完成后进行验证
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                if (aspectRatio > 1.2) {
                    // 提示用户上传正方形图片
                    this.$buefy.toast.open({
                        message: '上传的图片过宽',
                        type: 'is-danger'
                    })
                    // 返回 false 阻止上传
                    return false;
                }
                else if ( (img.height / img.width)>1.2){
                    this.$buefy.toast.open({
                        message: '上传的图片过长',
                        type: 'is-danger'
                    })
                    // 返回 false 阻止上传
                    return false;
                }
                // 返回 true 允许上传
                this.user.avatar = imageUrl;
                update(this.user);
                this.$buefy.toast.open({
                    message: '头像上传成功',
                    type: 'is-success'
                })
                return true;
            };

            console.log('Image URL:', imageUrl);

            return false;
        },
        handleAvatarUploadSuccess(response) {
            if (response.data && response.data.url) {
                // 上传成功后更新用户头像链接
                this.user.avatar = response.data.url;

                // 同时将新的头像链接保存到数据库中
                update(this.user);
                this.$buefy.toast.open({
                    message: '头像上传成功',
                    type: 'is-success'
                })
            } else {
                this.$buefy.toast.open({
                    message: '头像上传失败',
                    type: 'is-danger'
                })
            }
        },
    }
}
</script>

<style scoped>

</style>
