<template>
  <div>
    <Layout :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed" class="app-frame">
      <Sider :theme="layoutConfig.siderTheme" class="left-menu">
        <AppMenu :theme="layoutConfig.siderTheme" :menus-data="menus"></AppMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <AppHeader :layoutConfig="layoutConfig" @openSetting="openSetting = true"></AppHeader>
        </HHeader>
        <h-content class="main-content">
          <AppFrameContent />
        </h-content>
      </Layout>
    </Layout>
    <SettingModal :layout-config="layoutConfig" :open-setting="openSetting" />
  </div>
</template>
<script>
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import { mapState } from 'vuex';
import SettingModal from 'components/App/modules/AppSettingModal';
import AppFrameContent from 'components/App/modules/AppFrameContent';

export default {
  data() {
    return {
      loading: true,
      openSetting: false,
      layoutConfig: {
        siderTheme: 'dark',
        headerFixed: true,
        siderFixed: true
      },
      menus: []
    };
  },
  mounted() {
    // 如果无后台数据，将此处屏蔽
    this.init();
  },
  methods: {
    init() {
      this.initDict();
      this.initMenus();
    },
    initDict() {
      R.Dict.get().then(resp => {
        const { ok, body } = resp;
        if (ok) {
          for (const dict of body) {
            HeyUI.addDict(dict.name, dict.data);
          }
        }
        this.loading = false;
      });
    },
    async initMenus() {
      const sysMenusLocal = Utils.getLocal2Json('sys_menus');
      if (!sysMenusLocal) {
        const { ok, data } = await R.Account.getMenu();
        if (ok) {
          this.menus = data;
          Utils.saveLocal('sys_menus', data);
          // 构造路由数据
          const result = Utils.getAsyncRoutes(data);
          this.$router.options.routes[1].children = [...this.$router.options.routes[1].children, ...result];
          // 调用addRoutes 重置下路由设置
          this.$router.addRoutes(this.$router.options.routes);
        }
      } else {
        this.menus = sysMenusLocal;
      }
    },

    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value;
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    AppFrameContent,
    SettingModal,
    AppHeader,
    AppMenu
  }
};
</script>
<style lang="less">
.main-content {
  overflow: hidden !important;
}
</style>
