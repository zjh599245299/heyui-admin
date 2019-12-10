import utils from 'hey-utils';
import _import from 'js/router/_import';

const rclass = /[\t\r\n\f]/g;

export default utils.extend({}, utils, {
  getClass(elem) {
    return (elem.getAttribute && elem.getAttribute('class')) || '';
  },
  hasClass(elem, selector) {
    const className = ` ${selector} `;
    return elem.nodeType === 1 && ` ${this.getClass(elem)} `.replace(rclass, ' ').indexOf(className) > -1;
  },
  /**
   * 检查是否登录
   * @returns {boolean}
   */
  checkLogin() {
    const token = utils.getLocal2Json('login_user') && utils.getLocal2Json('login_user').token;
    return !!token;
  },
  /**
   * 生成路由数据
   */
  getAsyncRoutes(data = []) {
    data.forEach(item => {
      item.meta = { title: item.title };
      if (item.component) {
        item.component = _import(item.component);
      } else {
        item.component = { render: h => h('router-view') };
      }
      if (item.children) {
        item.children = this.getAsyncRoutes(item.children);
      }
    });
    return data;
  }
});
