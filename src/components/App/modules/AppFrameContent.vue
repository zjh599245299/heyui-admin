<template>
  <div class="app-frame-content">
    <div class="frame-page" style="position:absolute;top:15px;left: 15px;right: 15px;bottom: 15px;margin: 0">
      <div class="h-panel" style="height: 100%;overflow: auto">
        <div class="h-panel-bar" v-if="$route.meta.title">
          <div class="h-panel-title">{{ $route.meta.title }}</div>
        </div>
        <div class="h-panel-body">
          <!-- <keep-alive> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-frame-content'
};
</script>
<style lang="less"></style>
