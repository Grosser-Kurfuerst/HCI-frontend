<template>
  <el-backtop :bottom="60" :right="60">
    <div title="回到顶部"
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        border-radius: 200px;
        text-align: center;
        line-height: 40px;
        color: #4e87e8;
      }"
    >
      <i class="fa fa-arrow-up"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>

</style>
