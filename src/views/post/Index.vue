<template>
    <div>
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="最新文章" name="latest">
                        <article v-for="(item, index) in articleList" :key="index" class="media">
                            <div class="media-left">
                                <figure class="image is-58x58" style="margin-top: 1rem">
                                    <img :src="item.avatar"
                                         style="border-radius: 5px;width: 58px;height: 58px">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="">
                                    <p class="ellipsis is-ellipsis-1">
                                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                            <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                                <span class="is-size-6"><b>{{ item.title }}</b></span>
                                            </router-link>
                                        </el-tooltip>
                                    </p>
                                </div>
                                <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                    <div v-if="articleContent[index]"
                                         class="level has-text-grey is-mobile  is-size-6 mt-3"
                                         style="-webkit-line-clamp:2;overflow:hidden;text-overflow: ellipsis;
                                      width: 43rem;-webkit-box-orient: vertical; display: -webkit-box;
                                      margin-bottom: 1rem"
                                    >{{ articleContent[index] }}</div>
                                </router-link>

                                <nav class="level has-text-grey is-mobile  is-size-7 mt-1">
                                    <div class="level-left">
                                        <router-link class="level-item"
                                                     :to="{ path: `/member/${item.username}/home` }">
                                            {{ item.alias }}
                                        </router-link>
                                        <div class="level-left">
                                            <span v-for="(tag, index) in item.tags"
                                                  :key="index"
                                                  style="background: #d2e6ff"
                                                  class="tag is-hidden-mobile is-success is-light mr-1">
                                                <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                                                    {{ "#" + tag.name }}
                                                </router-link>
                                            </span>
                                        </div>
                                        <span class="is-hidden-mobile"
                                              style="padding-left: 10px"
                                        >浏览量:{{ item.view }}</span>

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
                    </el-tab-pane>
                    <el-tab-pane label="热门文章" name="hot">
                        <article v-for="(item, index) in articleList" :key="index" class="media">
                            <div class="media-left">
                                <figure class="image is-58x58" style="margin-top: 1rem">
                                    <img :src="item.avatar"
                                         style="border-radius: 5px;width: 58px;height: 58px">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="">
                                    <p class="ellipsis is-ellipsis-1">
                                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                            <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                                <span class="is-size-6"><b>{{ item.title }}</b></span>
                                            </router-link>
                                        </el-tooltip>
                                    </p>
                                </div>
                                <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                    <div v-if="articleContent[index]"
                                         class="level has-text-grey is-mobile  is-size-6 mt-3"
                                         style="-webkit-line-clamp:2;overflow:hidden;text-overflow: ellipsis;
                                      width: 43rem;-webkit-box-orient: vertical; display: -webkit-box;
                                      margin-bottom: 1rem"
                                    >{{ articleContent[index] }}</div>
                                </router-link>
                                <nav class="level has-text-grey is-mobile  is-size-7 mt-1">
                                    <div class="level-left">
                                        <router-link class="level-item"
                                                     :to="{ path: `/member/${item.username}/home` }">
                                            {{ item.alias }}
                                        </router-link>
                                        <div class="level-left">
                                            <span v-for="(tag, index) in item.tags"
                                                  :key="index"
                                                  style="background: #d2e6ff"
                                                  class="tag is-hidden-mobile is-success is-light mr-1">
                                                <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                                                    {{ "#" + tag.name }}
                                                </router-link>
                                            </span>
                                        </div>
                                        <span class="is-hidden-mobile"
                                              style="padding-left: 10px"
                                        >浏览量:{{ item.view }}</span>

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
                    </el-tab-pane>
                </el-tabs>
            </div>

            <!--分页-->
            <pagination
                    v-show="page.total > 0"
                    :total="page.total"
                    :page.sync="page.current"
                    :limit.sync="page.size"
                    @pagination="init"
            />
        </el-card>
    </div>
</template>

<script>
import {getList, getOnlyTopic} from '@/api/post'
import Pagination from '@/components/Pagination'

export default {
    name: 'TopicList',
    components: {Pagination},
    data() {
        return {
            activeName: 'latest',
            articleList: [],
            articleContent: [],
            page: {
                current: 1,
                size: 20,
                total: 0,
                tab: 'latest'
            }
        }
    },
    created() {
        this.init(this.tab)
    },
    methods: {
        renderMarkdown(md) {
            Vditor.preview(document.getElementById('preview'), md, {
                hljs: { style: 'github' }
            })
        },
        init(tab) {
            getList(this.page.current, this.page.size, tab).then((response) => {
                const {data} = response
                this.page.current = data.current
                this.page.total = data.total
                this.page.size = data.size
                this.articleList = data.records
                this.articleList.forEach((article, index) => {
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
        },
        handleClick(tab) {
            this.page.current = 1
            this.init(tab.name)
        }

    }
}
</script>

<style scoped>

</style>
