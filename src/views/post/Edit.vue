<template>
    <section>
        <div class="columns">
            <div class="column is-full">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span><i class="fa fa fa-book"> 更新文章</i></span>
                    </div>
                    <div>
                        <el-form :model="topic" ref="topic" class="demo-topic">
                            <el-form-item prop="title">
                                <el-input
                                        v-model="topic.title"
                                        placeholder="输入新的文章主题"
                                        style="width: 700px"
                                ></el-input>
                            </el-form-item>

                            <!--Markdown-->
                            <div id="vditor"style="width: 850px"></div>

                            <b-taginput
                                    v-model="tags"
                                    class="my-3"
                                    maxlength="15"
                                    maxtags="3"
                                    ellipsis
                                    style="margin-top: 20px !important;margin-bottom: 20px !important;width: 700px;"
                                    placeholder="请输入文章标签，不超过 3 个，每个标签最多 15 个字符"
                            />
                            <el-form-item style="margin-bottom: 0 !important;">
                                <el-button
                                    round
                                    style="background: #1771f4;border:  #1771f4"
                                    type="primary"
                                    @click="handleUpdate()"
                                >更新文章
                                </el-button>
                                <el-button
                                    round
                                    @click="resetForm('topic')"
                                >重置文章</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </section>
</template>

<script>
import {getTopic, update} from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
    name: "TopicEdit",
    components: {},
    data() {
        return {
            topic: {},
            tags: [],
        };
    },
    created() {
        this.fetchTopic();
    },
    methods: {
        renderMarkdown(md) {
            this.contentEditor = new Vditor("vditor", {
                height: 430,
                placeholder: "输入要更新的内容",
                preview: {
                    hljs: {style: "monokai"},
                },
                mode: "sv",
                after: () => {
                    this.contentEditor.setValue(md);
                },
            });
        },
        fetchTopic() {
            getTopic(this.$route.params.id).then((value) => {
                this.topic = value.data.topic;
                this.tags = value.data.tags.map(tag => tag.name);
                this.renderMarkdown(this.topic.content);
            });
        },
        handleUpdate: function () {
            this.topic.content = this.contentEditor.getValue();
            update(this.topic).then((response) => {
                const {data} = response;
                console.log(data);
                setTimeout(() => {
                    this.$router.push({
                        name: "post-detail",
                        params: {id: data.id},
                    });
                }, 800);
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.contentEditor.setValue("");
            this.tags = "";
        },
    },
};
</script>

<style>
.vditor-reset pre > code {
    font-size: 100%;
}
</style>
