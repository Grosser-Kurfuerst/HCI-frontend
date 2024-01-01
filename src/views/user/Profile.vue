<template>
    <div class="member">
        <div class="columns">
            <div class="column is-one-quarter">
                <el-card shadow="never">
                    <div slot="header" class="has-text-centered">
                        <el-avatar :size="64"
                                   :src="topicUser.avatar"/>
                        <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
                    </div>
                    <div>
                        <p class="content">关注：<code>{{ followCount }}</code></p>
                        <p class="content">粉丝：<code>{{ followerCount }}</code></p>
                        <p class="content">积分：<code>{{ topicUser.score }}</code></p>
                        <p class="content">入驻：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
                        <p class="content">简介：{{ topicUser.bio }}</p>
                    </div>
                </el-card>
            </div>

            <div class="column">
                <!--用户发布的文章-->
                <el-card class="box-card content" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="我的文章" name="latest">
                                <div v-if="topics.length===0">
                                    暂无文章
                                </div>
                                <div v-else class="topicUser-info">
                                    <article v-for="(item, index) in topics" :key="index" class="media">
                                        <div class="media-content">
                                            <div class="content ellipsis is-ellipsis-1">
                                                <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                                                        {{ item.title }}
                                                    </router-link>
                                                </el-tooltip>
                                            </div>
                                            <nav class="level has-text-grey is-size-7">
                                                <div class="level-left">
                                                    <span class="mr-1">
                                                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                                                    </span>
                                                </div>
                                            </nav>
                                        </div>
                                        <div v-if="token" class="media-right">
                                            <div v-if="topicUser.username === user.username" class="level">
                                                <div class="level-item mr-1">
                                                    <router-link :to="{name:'topic-edit',params: {id:item.id}}">
                                                        <b-button label="编辑" type="is-info" size="is-small"
                                                                  style="border-radius:20px;background-color: #2282ff;border-color:#0a75ff"/>
                                                    </router-link>
                                                </div>
                                                <div class="level-item">
                                                    <b-button label="删除" type="is-danger" size="is-small"
                                                              style="border-radius: 20px;background-color: #ff5476;border-color:#ff2f57"
                                                              @click="confirmCustomDelete(item.id)"/>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <pagination
                                        v-show="page.total > 0"
                                        class="mt-5"
                                        :total="page.total"
                                        :page.sync="page.current"
                                        :limit.sync="page.size"
                                        @pagination="fetchUserById"
                                    />
                                </div>

                            </el-tab-pane>
                            <el-tab-pane v-if="topicUser.username === user.username" label="我的收藏" name="collect">
                                <div v-if="collect_topics.length===0">
                                    暂无文章
                                </div>
                                <div v-else class="topicUser-info">
                                    <article v-for="(item, index) in collect_topics" :key="index" class="media">
                                        <div class="media-content">
                                            <div class="content ellipsis is-ellipsis-1">
                                                <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                                                        {{ item.title }}
                                                    </router-link>
                                                </el-tooltip>
                                            </div>
                                            <nav class="level has-text-grey is-size-7">
                                                <div class="level-left">
                                                    <span class="mr-1">
                                                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                                                    </span>
                                                </div>
                                            </nav>
                                        </div>
                                        <div v-if="token" class="media-right">
                                            <div v-if="topicUser.username === user.username" class="level">
                                                <div class="level-item">
                                                    <b-button
                                                        class="button is-success button-center is-fullwidth"
                                                        size="is-small"
                                                        style="background: #ffcd68;color: #000000;border-color:#ffa100;border-radius: 20px;"
                                                        @click="handleUnCollect(item.id)"
                                                    >
                                                        ⭐ 已收藏
                                                    </b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <!--分页-->
                                <pagination
                                    v-show="collect_page.total > 0"
                                    class="mt-5"
                                    :total="collect_page.total"
                                    :page.sync="collect_page.current"
                                    :limit.sync="collect_page.size"
                                    @pagination="fetchUserById"
                                />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import {deleteCollectTopic, getCollectTopics, getCollectTopicsId, getInfoByName} from '@/api/user'
import pagination from '@/components/Pagination/index'
import {mapGetters} from 'vuex'
import {deleteTopic} from '@/api/post'
import {use} from "element-ui";
import user from "@/store/modules/user";
import {da} from "date-fns/locale";

export default {
    name: 'Profile',
    components: {pagination},
    data() {
        return {
            activeName: 'latest',
            topicUser: {},
            topics: {},
            page: {
                current: 1,
                size: 5,
                total: 0,
                tab: 'latest'
            },
            collect_topics: {},
            collect_page: {
                current: 1,
                size: 5,
                total: 0,
                tab: 'collect'
            },
            followCount: 0,
            followerCount: 0,

        }
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    created() {
        this.fetchUserById()
    },
    methods: {
        fetchUserById() {
            getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
                const {data} = res
                this.topicUser = data.user
                this.page.current = data.topics.current
                this.page.size = data.topics.size
                this.page.total = data.topics.total
                this.topics = data.topics.records
                this.followerCount = data.followerCount; // 获取粉丝数
                this.followCount = data.followCount; // 获取关注数
                if (this.topicUser.username === this.user.username){
                    getCollectTopics(this.$route.params.username, this.collect_page.current, this.collect_page.size).then((res) => {
                        const {data} = res
                        this.collect_page.current = data.topics.current
                        this.collect_page.size = data.topics.size
                        this.collect_page.total = data.topics.total
                        this.collect_topics = data.topics.records
                    })
                }
            })
        },
        handleDelete(id) {
            deleteTopic(id).then(value => {
                const {code, message} = value
                this.$buefy.toast.open({
                    message: '成功删除文章',
                    type: 'is-success'
                })

                if (code === 200) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500)
                }
            })
        },
        confirmCustomDelete(id) {
            this.$buefy.dialog.confirm({
                title: '删除文章',
                message: '你确定要<b>删除</b> 文章吗?',
                confirmText: '删除',
                cancelText: '取消',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.handleDelete(id),
            })
        },
        handleClick() {
            this.page.current = 1
            this.collect_page.current = 1
        },
        handleUnCollect(topic_id) {
            deleteCollectTopic(this.user.id,topic_id).then(response => {

                this.$buefy.toast.open({
                    message: "取消收藏成功",
                    type: 'is-success'
                })

                this.hasCollect = false
                window.location.reload();
            })
        }
    }
}
</script>

<style scoped>

</style>
