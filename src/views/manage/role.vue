<template>
  <div>
    <template v-if="$route.path === '/manage/role'">
      <div>角色管理</div>
      <router-link to="/manage/role/add" tag="Button">添加角色</router-link>
      <Button color="primary">添加角色</Button>
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
