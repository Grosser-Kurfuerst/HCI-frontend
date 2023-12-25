<template>
  <section style="position: fixed;width: 230px">
    <!--是否登录-->
    <login-welcome />

    <!--今日赠言-->
    <tip-card />

  </section>
</template>

<script>
import TipCard from '@/views/card/Tip'
import LoginWelcome from '@/views/card/LoginWelcome'

export default {
  name: 'CardBar',
  components: {TipCard,LoginWelcome }
}
</script>

<style scoped>
</style>
