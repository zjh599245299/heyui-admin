<style lang="less">
.app-menu {
  .h-menu {
    font-size: 14px;
    .h-menu-li-selected {
      .h-menu-show:after {
        width: 4px;
      }
    }
    > li > .h-menu-show {
      padding: 12px 25px;
      font-size: 15px;
      .h-menu-show-icon {
        font-size: 20px;
      }
      .h-menu-show-desc {
        transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
  .h-menu.h-menu-size-collapse > .h-menu-li > .h-menu-show {
    padding-left: 24px;
    .h-menu-show-icon {
      font-size: 20px;
    }
  }
  .h-menu.h-menu-white {
    color: rgb(49, 58, 70);
  }
}
</style>
<template>
  <div class="app-menu">
    <appLogo></appLogo>
    <Menu :datas="menus" :inlineCollapsed="siderCollapsed" @click="trigger" ref="menu" :className="`h-menu-${theme}`"></Menu>
    <div class="app-menu-mask" @click="hideMenu"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appLogo from './app-logo';

export default {
  props: {
    theme: String
  },
  data() {
    return {
      menus: []
    };
  },
  watch: {
    $route() {
      this.menuSelect();
    }
  },
  mounted() {
    this.init();
    const listener = G.addlistener('SYS_MENU_UPDATE', () => {
      this.init();
    });
    this.$once('hook:beforeDestroy', function() {
      G.removelistener(listener);
    });
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  methods: {
    init() {
      this.menus = this.getMenuData(this.$router.options.routes);
      this.$nextTick(() => {
        this.menuSelect();
      });
    },
    menuSelect() {
      if (this.$route.path) {
        let selectedPath;
        // 约定：路由匹配到超过3个则认为当前路由不是一个菜单数据，第三个匹配的路由数据则是需要选中的菜单数据
        if (this.$route.matched.length > 3) {
          selectedPath = this.$route.matched[2].path;
        } else {
          selectedPath = this.$route.path;
        }
        this.$refs.menu.select(selectedPath);
      }
    },
    trigger(data) {
      if (data.children.length > 0) return;
      this.$router.push({ path: data.key });
    },
    hideMenu() {
      this.$store.commit('UPDATE_SIDERCOLLAPSE', true);
    },
    getMenuData(routes = []) {
      const menuData = [];
      for (const item of routes) {
        if (!item.hideInMenu) {
          const newItem = { ...item.meta };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children);
          } else {
            this.getMenuData(item.children);
          }
          menuData.push(newItem);
        } else if (!item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuData(item.children));
        }
      }
      return menuData;
    }
  },
  components: {
    appLogo
  }
};
</script>
