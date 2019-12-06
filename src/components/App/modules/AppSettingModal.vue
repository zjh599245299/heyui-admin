<template>
  <Modal type="drawer-right" v-model="openSetting">
    <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
  </Modal>
</template>
<script>
import AppLayoutSetting from './AppLayoutSetting';

export default {
  name: 'SettingModal',
  components: { AppLayoutSetting },
  props: {
    layoutConfig: {},
    openSetting: {}
  }
};
</script>
<style lang="less"></style>
