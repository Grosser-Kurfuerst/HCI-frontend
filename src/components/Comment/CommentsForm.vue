<template>
    <article class="media">
        <div class="media-content">
            <form @submit.prevent="onSubmit">
                <b-field>
                    <b-input
                            v-model.lazy="commentText"
                            type="textarea"
                            maxlength="400"
                            placeholder="发表一条友善的评论吧"
                            :disabled="isLoading"
                    ></b-input>
                </b-field>
                <nav class="level">
                    <div class="level-left">
                        <b-button
                                type="is-primary"
                                native-type="submit"
                                class="level-item"
                                :disabled="isLoading"
                                style="background: #1e7efb;border-radius: 10px"
                        >
                            发送
                        </b-button>
                    </div>
                </nav>
            </form>
        </div>
    </article>
</template>

<script>
import {pushComment} from '@/api/comment'

export default {
    name: 'LvCommentsForm',
    data() {
        return {
          commentText: '',
          isLoading: false,
          localReplyInfo: null // 添加 localReplyInfo 属性
        }
    },
    props: {
        slug: {
            type: String,
            default: null
        },
        replyInfo: {
            type: Object,
            default: null
        }
    },
  watch: {
    replyInfo: {
      handler(newReplyInfo) {
        if (newReplyInfo) {
          this.commentText = `回复 @${newReplyInfo.username}: `
          this.localReplyInfo = newReplyInfo // 更新 localReplyInfo 值
        } else {
          this.commentText = ''
          this.localReplyInfo = null // 清空 localReplyInfo 值
        }
      },
      immediate: true
    }
  },
    methods: {
        async onSubmit() {
            this.isLoading = true
            try {
                if (this.commentText.trim() === '') {
                    this.$buefy.toast.open({
                        message: '评论不能为空',
                        type: 'is-danger'
                    })
                    return; // 阻止发送
                }

                let postData = {}
                console.log(this.replyInfo)
                console.log(this.commentText)
                postData['content'] = this.commentText
                postData['topic_id'] = this.slug
                this.commentText = ''; // 清空输入框内容
                this.localReplyInfo = null; // 清空 localReplyInfo 值
                await pushComment(postData)
                this.$emit('loadComments', this.slug)
                this.$buefy.toast.open({
                    message: '留言成功',
                    type: 'is-success'
                })
            } catch (e) {
                this.$buefy.toast.open({
                    message: `Cannot comment this story. ${e}`,
                    type: 'is-danger'
                })
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
