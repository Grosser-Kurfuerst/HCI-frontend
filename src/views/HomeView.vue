<template>
    <div>
        <div class="box">🔔 {{ state.billboard.content }}</div>

        <div class="columns">
            <div class="column is-three-quarters">
                <TopicList></TopicList>
            </div>
            <div class="column">
                <CardBar></CardBar>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive, watch} from 'vue'
import { getBillboard } from '@/api/billboard'
import TopicList from "@/views/post/Index.vue"
import CardBar from "@/views/card/CardBar.vue"
import {useRoute} from "vue-router";

const state = reactive({
    billboard: {
        content: ''
    },
})

const fetchBillboard = async () => {
    const { data } = await getBillboard()
    state.billboard = data
}

fetchBillboard();
</script>