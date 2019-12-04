<style lang="less">
.page-404-vue {
  .background-image {
    background-image: url(../../images/error-pages/404.png);
  }
}
</style>
<template>
  <div class="page-404-vue error-page">
    <div class="background-image"></div>
    <p style="margin-bottom: 10px">
      您访问的页面不存在~~
    </p>
    <a href="javascript:void(0)" @click="$router.go(-1)">返回前一页</a>
    &nbsp;&nbsp;&nbsp;
    <a href="javascript:void(0)" @click="$router.push('/')">返回首页</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  },
  computed: {}
};
</script>
