<template>
  <div class="app-profile">
    <div>
      <Tabs :datas="param" class-name="h-tabs-custom" v-model="selected" />
    </div>
    <component :is="selected" style="margin-left:100px;flex: 0.5;" />
  </div>
</template>
<script>
import ResetPasswordComp from 'views/profile/components/reset-password-comp';
import SystemInfoComp from 'views/profile/components/system-info-comp';
import BindInfoComp from 'views/profile/components/bind-info-comp';
export default {
  components: { ResetPasswordComp, SystemInfoComp, BindInfoComp },
  data: function() {
    return {
      param: {
        SystemInfoComp: '1、系统信息',
        BindInfoComp: '2、绑定信息',
        ResetPasswordComp: '3、修改密码'
      },
      selected: 'SystemInfoComp'
    };
  },

  methods: {}
};
</script>
<style lang="less">
.app-profile {
  display: flex;
}
.h-tabs-custom {
  .h-tabs-item {
    font-size: 14px;
    display: block;
    padding: 12px 0;
    line-height: 1;
    width: 180px;
    text-align: center;
    border-left: 3px solid #fff;
    &:not(:first-of-type) {
      margin-top: 5px;
    }
  }
  .h-tabs-item-selected {
    background-color: #eee;
    border-left: 3px solid @primary-color;
  }
}
</style>
