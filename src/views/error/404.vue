<template>
  <div class="columns mt-6">
    <div class="column mt-6">
      <div class="mt-6">
          <img
              width="275px"
              height="275px"
              src="@/assets/image/404-dark.png">
        <p class="content subtitle mt-6">
          您所寻找的页面似乎不存在， {{ times }} 秒后，将返回首页
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "404",
  data() {
    return {
      times: 10
    }
  },
  created() {
    this.goHome();
  },
  methods: {
    goHome: function () {
      this.timer = setInterval(() => {
        this.times--
        if (this.times === 0) {
          clearInterval(this.timer)
          this.$router.push({path: '/'});
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
