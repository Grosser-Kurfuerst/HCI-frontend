<template>
    <section id="author">
        <el-card class="" shadow="never">
            <div slot="header">
                <span class="has-text-weight-bold">👨‍💻 关于作者</span>
            </div>
            <div style="display:flex;flex-direction: column;align-items: center;justify-content: space-between">
                <figure class="image is-58x58 "  >
                    <img :src="user.avatar"
                         style="border-radius: 5px;width: 58px;height: 58px">
                </figure>

                <div class="has-text-centered">
                    <p class="is-size-5 mt-3 mb-3">
                        <router-link :to="{ path: `/member/${user.username}/home` }">
                            {{ user.alias }} <span class="is-size-7 has-text-grey">{{ '@' + user.username }}</span>
                        </router-link>
                    </p>
                    <div class="columns is-mobile">
                        <div class="column is-half">
                            <code><b>{{ user.topicCount }}</b></code>
                            <p>文章</p>
                        </div>
                        <div class="column is-half">
                            <code><b>{{ user.followerCount }}</b></code>
                            <p>粉丝</p>
                        </div>
                    </div>
                    <div>
                        <button
                            v-if="hasFollow"
                            class="button is-success button-center is-fullwidth"
                            style="background: #e1e3e5;color: #93989f"
                            @click="handleUnFollow(user.id)"

                        >
                            已关注
                        </button>

                        <button v-else class="button is-link button-center is-fullwidth"
                                style="border-radius: 5px;background-color: #1e7ffd"
                                @click="handleFollow(user.id)">
                            关注
                        </button>
                    </div>
                </div>


            </div>
        </el-card>
    </section>
</template>

<script>
import {follow, hasFollow, unFollow} from '@/api/follow'
import {mapGetters} from 'vuex'

export default {
    name: 'Author',
    props: {
        user: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            hasFollow: false
        }
    },
    mounted() {
        this.fetchInfo()
    },
    computed: {
        ...mapGetters([
            'token'
        ])
    },
    methods: {
        fetchInfo() {
            if (this.token != null && this.token !== '') {
                hasFollow(this.user.id).then(value => {
                    const {data} = value
                    this.hasFollow = data.hasFollow
                })
            }
        },
        handleFollow: function (id) {
            if (this.token != null && this.token !== '') {
                follow(id).then(response => {
                    const {message} = response
                    this.$buefy.toast.open({
                        message: message,
                        type: 'is-success'
                    })

                    this.hasFollow = !this.hasFollow
                    this.user.followerCount = parseInt(this.user.followerCount) + 1
                })
            } else {
                this.$buefy.toast.open({
                    message: '请先登录',
                    type: 'is-warning'
                })
            }
        },
        handleUnFollow: function (id) {
            unFollow(id).then(response => {
                const {message} = response
                this.$buefy.toast.open({
                    message: message,
                    type: 'is-success'
                })
                this.hasFollow = !this.hasFollow
                this.user.followerCount = parseInt(this.user.followerCount) - 1
            })
        }
    }
}
</script>

<style scoped>

</style>
