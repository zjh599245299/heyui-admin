import utils from 'hey-utils';

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
   */ checkLogin() {
    const token = utils.getLocal2Json('login_user') && utils.getLocal2Json('login_user').token;
    return !!token;
  }
});
