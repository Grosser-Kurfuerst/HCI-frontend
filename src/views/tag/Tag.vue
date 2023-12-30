<template>
    <div id="tag" class="columns">
        <div class="column is-three-quarters">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="">
                    🔍 搜索到 <span class="has-text-info">{{ topics.length }}</span> 篇有关
                    <span class="has-text-info">{{ this.$route.params.name }}</span>
                    的文章
                </div>

                <div class="text item">
                    <article v-for="(item, index) in topics" :key="index" class="media">
                        <div class="media-content">
                            <div class="">
                                <p class="ellipsis is-ellipsis-1">
                                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                        <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                            <span class="is-size-6" style="padding-left: 10px"><b>{{ item.title }}</b></span>
                                        </router-link>
                                    </el-tooltip>
                                </p>
                            </div>
                            <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                <div v-if="articleContent[index]"
                                     class="level has-text-grey is-mobile  is-size-6 mt-3"
                                     style="-webkit-line-clamp:2;overflow:hidden;text-overflow: ellipsis;
                                      width: 47rem;-webkit-box-orient: vertical; display: -webkit-box;
                                      margin-bottom: 1rem;padding-left: 10px"
                                >{{ articleContent[index] }}</div>
                            </router-link>

                            <nav class="level has-text-grey is-mobile  is-size-7 mt-1">
                                <div class="level-left">
                                    <span class="is-hidden-mobile"
                                          style="padding-left: 10px"
                                    >浏览量:{{ item.view }}</span>
                                    <span class="is-hidden-mobile"
                                          style="padding-left: 10px"
                                    >评论数:{{ item.comments}}</span>


                                </div>
                                <div class="level-right" style="margin-right: 0">
                                            <span class="mr-1">
                                                发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                                            </span>


                                </div>
                            </nav>
                        </div>
                        <div class="media-right"/>
                    </article>
                </div>
            </el-card>
        </div>

        <div class="column">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    🤙 关于标签
                </div>
                <div>
                    <ul>
                        <li class="content">标签由平台用户发布使用</li>
                        <li class="content">系统每周日23点定时清理无用标签</li>
                    </ul>
                </div>
            </el-card>
            <el-card shadow="hover">
                <div slot="header">
                    🏷 热门标签
                </div>
                <div>
                    <ul>
                        <li v-for="(tag,index) in tags" :key="index" style="padding: 6px 0">
                            <router-link :to="{name:'tag',params:{name:tag.name}}">
                <span v-if="index<9" class="tag">
                  0{{ parseInt(index) + 1 }}
                </span>
                                <span v-else class="tag">
                  {{ parseInt(index) + 1 }}
                </span>
                                {{ tag.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script>
import {getTopicsByTag} from '@/api/tag'
import {getOnlyTopic} from "@/api/post";

export default {
    name: 'Tag',
    data() {
        return {
            topics: [],
            tags: [],
            articleContent: [],
            paramMap: {
                name: this.$route.params.name,
                page: 1,
                size: 10
            }
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList: function () {
            getTopicsByTag(this.paramMap).then(response => {
                console.log(response)
                this.topics = response.data.topics.records
                this.tags = response.data.hotTags.records
                this.topics.forEach((article, index) => {
                    getOnlyTopic(article.id).then((contentResponse) => {
                        const { data } = contentResponse
                        var c = data.topic.content.split("#").join("")
                        if (c.length > 200){
                            c = c.substring(0,200)
                        }
                        // Store the content in the array
                        this.$set(this.articleContent, index,c)
                    })
                })
            })
        }
    }
}
</script>

<style scoped>
#tag {
    min-height: 500px;
}
</style>
