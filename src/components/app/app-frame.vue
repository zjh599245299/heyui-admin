<style lang="less">
.left-menu,
.main-content,
.h-panel {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
}
.main-content {
  overflow: hidden !important;
}
</style>
<template>
  <div>
    <Layout :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed" class="app-frame">
      <Sider :theme="layoutConfig.siderTheme" class="left-menu">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead :layoutConfig="layoutConfig" @openSetting="openSetting = true"></appHead>
        </HHeader>
        <SysTabs homePage="Home" v-if="layoutConfig.showSystab"></SysTabs>
        <h-content class="main-content">
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
        </h-content>
      </Layout>
    </Layout>
    <Modal type="drawer-right" v-model="openSetting">
      <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
    </Modal>
  </div>
</template>
<script>
import appLayoutSetting from './modules/app-layout-setting';
import appHead from './app-header';
import appMenu from './app-menu';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      openSetting: false,
      layoutConfig: {
        siderTheme: 'dark',
        showSystab: false,
        headerFixed: true,
        siderFixed: true
      }
    };
  },
  mounted() {
    // 如果无后台数据，将此处屏蔽
    this.init();
  },
  methods: {
    init() {
      this.initDict();
      this.initMenu();
    },
    initDict() {
      R.Dict.get().then(resp => {
        if (resp.ok) {
          const dicts = resp.body;
          for (const dict of dicts) {
            HeyUI.addDict(dict.name, dict.data);
          }
        }
        this.loading = false;
      });
    },
    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value;
    },
    initMenu() {
      const menus = Utils.getLocal2Json('SYS_CONFIG_MENU');
      G.set('SYS_MENUS', menus);
      G.trigger('SYS_MENU_UPDATE');
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    appLayoutSetting
  }
};
</script>
