<template>
    <section style="position: fixed; width: 230px;">
        <!-- 是否登录 -->
        <login-welcome />

        <!-- 今日赠言 -->
        <tip-card />
        <div class="block">
            <el-carousel height="200px" >
                <el-carousel-item v-for="(carousel, i)  in carousels" :key="i">
                    <a href="https://competition.huaweicloud.com/codecraft2023">
                        <img :src="carousel.image"
                             style="width: 100%; height: 200px;border-radius: 10px;">
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>

    </section>
</template>

<script>
import TipCard from '@/views/card/Tip'
import LoginWelcome from '@/views/card/LoginWelcome'

export default {
    name: 'CardBar',
    components: { TipCard, LoginWelcome },
    data() {
        return {
            carousels: [
                { image: 'https://picdl.sunbangyan.cn/2023/12/30/142a7cecb069e43effc5ba18e7150c17.jpeg' },
                { image: 'https://pica.zhimg.com/80/v2-3017e12e18853f3778cc44da98454832_1440w.webp' },
                { image: 'https://picdl.sunbangyan.cn/2023/12/30/8c8783f252cf3f8e5a8b0301df950135.jpeg' },

            ]
        };
    }
};
</script>

<style scoped>
</style>
