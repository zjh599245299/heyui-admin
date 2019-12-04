<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus {
    display: inline-block;
    vertical-align: top;
    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover {
        color: @primary-color;
      }
      + div {
        margin-left: 5px;
      }
      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <div class="app-header">
    <div style="width:50px;float:left;">
      <Button
        :icon="siderCollapsed ? 'icon-align-right' : 'icon-align-left'"
        size="l"
        noBorder
        class="font20"
        @click="siderCollapsed = !siderCollapsed"
      />
    </div>
    <Breadcrumb :datas="pageTitles" style="display: inline-block;margin-left: 10px;" />
    <div class="float-right app-header-info">
      <AutoComplete :showDropdownWhenNoResult="false" v-width="180" v-model="searchText" placeholder="全局搜索..." />
      <appHeaderMessage />
      <DropdownMenu
        className="app-header-dropdown"
        trigger="hover"
        offset="0,5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar :src="avatar" :width="30">
          <span>{{ LoginUser.name }}</span>
        </Avatar>
      </DropdownMenu>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appHeaderMessage from './modules/app-header-message';
export default {
  components: {
    appHeaderMessage
  },
  data() {
    return {
      searchText: '',
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      pageTitles: []
    };
  },
  watch: {
    $route(to) {
      this.getBreadCrumbData();
    }
  },
  computed: {
    ...mapState(['LoginUser']),
    avatar: function() {
      return require('../../images/avatar.png');
    },
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('UPDATE_SIDERCOLLAPSE', value);
      }
    }
  },
  mounted() {
    this.getBreadCrumbData();
    this.listenResize();
  },
  methods: {
    getBreadCrumbData() {
      const routeStacks = this.$route.matched;
      if (routeStacks && routeStacks.length > 2) {
        const titles = [];
        for (let i = 1; i < routeStacks.length; i++) {
          const meta = routeStacks[i].meta;
          if (meta.title) {
            const breadcrumbItem = { title: meta.title };
            if (!meta.isMenu) {
              breadcrumbItem.route = { path: meta.key };
            }
            titles.push(breadcrumbItem);
          }
        }
        this.pageTitles = [{ icon: 'icon-monitor', title: '控制台', route: { path: '/' } }, ...titles];
      } else {
        this.pageTitles = [];
      }
    },
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth === window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    },
    goGithub() {
      window.open('https://github.com/heyui/heyui-admin');
    },
    goBook() {
      window.open('https://heyui.github.io/heyui-admin-docs');
    },
    trigger(data) {
      if (data === 'logout') {
        R.Login.logout(this.$store.state.LoginUser).then(rep => {
          if (rep.ok) {
            Utils.removeLocal('token');
            Utils.removeLocal('login_user');
            this.$router.replace({ path: '/login' });
          }
        });
      } else {
        this.$router.push({ path: '/profile/account' });
      }
    },
    showSettingModal() {
      this.$emit('openSetting');
    }
  }
};
</script>
