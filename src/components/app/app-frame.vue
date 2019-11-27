<style lang="less">
.left-menu {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
}
</style>
<template>
  <div>
    <Layout :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed" class="app-frame" v-if="!loading">
      <Sider :theme="layoutConfig.siderTheme" class="left-menu">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead :layoutConfig="layoutConfig" @openSetting="openSetting = true"></appHead>
        </HHeader>
        <SysTabs homePage="Home" v-if="layoutConfig.showSystab"></SysTabs>
        <Content>
          <div class="app-frame-content">
            <!-- <keep-alive> -->
            <div class="frame-page h-panel">
              <div class="h-panel-bar" v-if="$route.meta && $route.meta.title">
                <span class="h-panel-title">{{ $route.meta.title }}</span>
              </div>
              <div class="h-panel-body">
                <router-view></router-view>
              </div>
            </div>
            <!-- </keep-alive> -->
          </div>
          <HFooter>
            <appFooter></appFooter>
          </HFooter>
        </Content>
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
import appFooter from './app-footer';
import SysTabs from '../common/sys-tabs';
import store from 'js/vuex/store';
import { mapState } from 'vuex';
import { fullMenuKeys, isAuthPage } from 'js/config/menu-config';

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

    // 如果无后台数据，将此处打开
    // this.loading = false;

    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      this.initMenu();
    });
    this.$once('hook:beforeDestroy', function() {
      G.removelistener(listener);
    });
  },
  methods: {
    init() {
      this.$Loading('加载中');
      R.User.info().then(resp => {
        if (resp.ok) {
          resp.body.avatar = require('../../images/avatar.png');
          G.set('account', resp.body);
          store.dispatch('updateAccount', resp.body);
          this.initDict();
          this.initMenu();
        }
      });
    },
    initDict() {
      R.Dict.get().then(resp => {
        if (resp.ok) {
          let dicts = resp.body;
          for (let dict of dicts) {
            HeyUI.addDict(dict.name, dict.data);
          }
        }
        this.loading = false;
        this.$Loading.close();
      });
    },
    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value;
    },
    initMenu() {
      // 如果使用权限配置，配合后端获取请求的数据
      // R.Account.menus().then(resp => {
      //   if (resp.ok) {
      //     this.menus = getMenus(resp.body);
      //     this.menuSelect();
      //   }
      // });
      let menus = Utils.getLocal2Json('SYS_CONFIG_MENU') || fullMenuKeys;
      G.set('SYS_MENUS', menus);
      G.trigger('SYS_MENU_UPDATE');
      if (!isAuthPage(this.$route.name)) {
        this.$router.replace({ name: 'PermissionError' });
      }
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    SysTabs,
    appFooter,
    appLayoutSetting
  }
};
</script>
