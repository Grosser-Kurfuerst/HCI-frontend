<template>
    <el-card class="box-card">
        <div slot="header">
            <span>tips</span>
        </div>
        <div class="block">
            <div class="has-text-left">
                {{ tip.content }}
            </div>
            <div class="has-text-right">
                ——{{ tip.author }}
            </div>
        </div>
    </el-card>
</template>

<script>
import {getRandomTip} from "@/api/tip";

export default {
    name: "Tip",
    data() {
        return {
            tip:{}
        }
    },
    created() {
        this.fetchRandomTip()
    },
    methods: {
        fetchRandomTip() {
            getRandomTip().then((value) => {
                const {data} = value
                this.tip = data
            })
        }
    }
}
</script>

<style scoped>

</style>