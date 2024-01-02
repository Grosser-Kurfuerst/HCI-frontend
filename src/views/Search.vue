<template>
    <div  class="columns">
        <div class="column is-three-quarters">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    🔍 搜索到 <b class="has-text-info">{{ list.length }}</b>
                    条关于 <b class="has-text-info">{{ query.keyword }}</b> 的记录
                </div>
                <div>
                    <article v-for="(item, index) in list" :key="index" class="media">
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
                                     style="-webkit-line-clamp:1;overflow:hidden;text-overflow: ellipsis;
                                          width: 43rem;-webkit-box-orient: vertical; display: -webkit-box;
                                          margin-bottom: 1rem"
                                >{{ articleContent[index] }}</div>
                            </router-link>
                            <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
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

                <!--分页-->
                <pagination
                        v-show="query.total > 0"
                        :total="query.total"
                        :page.sync="query.pageNum"
                        :limit.sync="query.pageSize"
                        @pagination="fetchList"
                />
            </el-card>
        </div>
        <div class="column" >
            <CardBar></CardBar>
        </div>
    </div>
</template>

<script>
import {searchByKeyword} from '@/api/search'
import Pagination from '@/components/Pagination'
import {getOnlyTopic} from "@/api/post";
import Author from "@/views/post/Author.vue";
import Recommend from "@/views/post/Recommend.vue";
import CardBar from "@/views/card/CardBar.vue";

export default {
    name: 'Search',
    components: {CardBar, Recommend, Author, Pagination},
    data() {
        return {
            list: [],
            articleContent: [],
            query: {
                keyword: this.$route.query.key,
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            searchByKeyword(this.query).then(value => {
                const {data} = value
                this.list = data.records
                this.query.total = data.total
                this.query.pageSize = data.size
                this.query.pageNum = data.current
                this.list.forEach((article, index) => {
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

</style>
