<template>
  <div class="frame-page h-panel">
    <template v-if="$route.meta && $route.meta.title && !$route.meta.hideTitle">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{ $route.meta.title }}</span>
      </div>
      <div class="h-panel-body">
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </template>
    <template v-else>
      <div class="frame-page">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>
<script>
export default {};
</script>
