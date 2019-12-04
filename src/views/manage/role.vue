<template>
  <div>
    <template v-if="$route.path === '/manage/role'">
      <p>角色管理</p>
      <router-link to="/manage/role/add">添加角色</router-link>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
