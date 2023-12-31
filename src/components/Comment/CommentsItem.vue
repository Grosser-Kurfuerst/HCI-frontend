<template>
    <article class="media">
        <figure class="media-left image is-48x48" style="margin-top: 5px">
            <img :src="user_avatar" style="border-radius: 5px">
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ user_n }}</strong>
                    <small class="ml-2">{{ comment.createTime | date }}</small>
                    <br/>
                </p>
                <div class="level">
                    <div class="level-left" style="width: 40rem">
                        <div style="white-space:normal; word-break:break-all">
                            {{ comment.content }}
                        </div>
                    </div>
                    <div class="level-right">
                        <div v-if="token && user.id === comment.userId" class="level-right">
                            <a class="level-item">
                                <b-button label="删除" type="is-danger" size="is-small"
                                          style="border-radius: 20px;background-color: #ff5476;border-color:#ff2f57"
                                          @click="confirmCustomDelete(comment.id)"/>
                            </a>
                        </div>
                      <div class="level-right">
                        <a class="level-item" @click="replyComment(comment)">
                          <b-button label="回复" type="is-primary" size="is-small" style="border-radius: 20px;margin-right: 10px"/>
                        </a>
                      </div>
                    </div>
                </div>

            </div>

        </div>
    </article>
</template>

<script>

import {mapGetters} from "vuex";
import {deleteTopic} from "@/api/post";
import {getInfoByName} from "@/api/user";
import {deleteComment} from "@/api/comment";

export default {
    name: 'LvCommentsItem',
    computed: {
        ...mapGetters([
            'token', 'user'
        ])
    },
    data() {
        return {
            user_avatar:'',
            user_n:''
        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
    },
    created() {
        this.fetchInfo()
    },
    methods: {
        fetchInfo() {
            getInfoByName(this.comment.username,0,0).then(res => {
                const {data} = res
                this.user_avatar = data.user.avatar
                this.user_n = data.user.alias
            })
        },
        handleDelete(id) {
            console.log("hhhhhfjkasdhfkahh"+id )
            deleteComment(id).then(value => {
                const {code, message} = value
                this.$buefy.toast.open({
                    message: '成功删除评论',
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
                title: '删除评论',
                message: '你确定要<b>删除</b> 评论吗?',
                confirmText: '删除',
                cancelText: '取消',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.handleDelete(id),
            })
        },
      replyComment(comment) {
        this.$emit('replyComment', this.comment);
      }
    }
}
</script>


