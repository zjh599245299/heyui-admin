import Vue from 'vue';
import Vuex from 'vuex';
import { UPDATE_LOGIN_USER, UPDATE_ACCOUNT, UPDATE_SIDERCOLLAPSE, UPDATE_MSG_COUNT } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    LoginUser: Utils.getLocal('login_user', 'json') || {},
    User: {},
    msgCount: {
      messages: 2
    },
    siderCollapsed: false
  },
  mutations: {
    [UPDATE_LOGIN_USER](state, data) {
      state.LoginUser = data;
      if (data) {
        Utils.saveLocal('login_user', data);
      } else {
        Utils.removeLocal('login_user');
      }
    },
    [UPDATE_ACCOUNT](state, data) {
      state.User = data;
    },
    [UPDATE_SIDERCOLLAPSE](state, isShow) {
      setTimeout(() => {
        G.trigger('page_resize');
      }, 600);
      state.siderCollapsed = isShow;
    },
    [UPDATE_MSG_COUNT](state, data) {
      state.msgCount = data;
    }
  },
  actions: {
    updateAccount(context, data) {
      context.commit(UPDATE_ACCOUNT, data);
    },
    updateSiderCollapse(context, data) {
      context.commit(UPDATE_SIDERCOLLAPSE, data);
    },
    updateMsgCount(context, data) {
      context.commit(UPDATE_MSG_COUNT, data);
    }
  },
  getters: {
    account: state => {
      return state.User;
    },
    siderCollapsed: state => {
      return state.siderCollapsed;
    },
    msgCount: state => {
      return state.msgCount;
    }
  }
});
