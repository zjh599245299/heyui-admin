import axios from 'axios';
import qs from 'qs';
import Utils from './utils';
import router from 'js/router';

const DefaultParam = { repeatable: false };

const ajax = {
  PREFIX: '/api',
  requestingApi: new Set(),
  extractUrl: function(url) {
    return url ? url.split('?')[0] : '';
  },
  isRequesting: function(url) {
    const api = this.extractUrl(url);
    return this.requestingApi.has(api);
  },
  addRequest: function(url) {
    const api = this.extractUrl(url);
    this.requestingApi.add(api);
  },
  deleteRequest: function(url) {
    const api = this.extractUrl(url);
    this.requestingApi.delete(api);
  },
  get: function(url, param, extendParam) {
    const params = {
      url,
      method: 'GET'
    };
    if (param) {
      params.params = param;
    }
    return this.ajax(params, extendParam);
  },
  post: function(url, param, extendParam) {
    const params = {
      url,
      method: 'POST'
    };
    if (param) params.data = qs.stringify(param);
    return this.ajax(params, extendParam);
  },
  postJson: function(url, paramJson, extendParam) {
    return this.ajax(
      {
        url,
        method: 'POST',
        data: paramJson
      },
      extendParam
    );
  },
  patchJson: function(url, paramJson, dataType, extendParam) {
    return this.ajax(
      {
        url,
        method: 'PATCH',
        data: paramJson
      },
      extendParam
    );
  },
  delete: function(url, extendParam) {
    return this.ajax(
      {
        url: url,
        method: 'DELETE'
      },
      extendParam
    );
  },
  ajax: function(param, extendParam) {
    let params = Utils.extend({}, DefaultParam, param, extendParam || {});
    params.crossDomain = params.url.indexOf('http') === 0;
    let url = params.url;
    if (!params.crossDomain) {
      url = params.url = this.PREFIX + params.url;
    }
    if (params.method !== 'GET') {
      if (this.isRequesting(url)) {
        return new Promise((resolve, reject) => {
          resolve({ ok: false, msg: '重复请求' });
        });
      }
      if (params.repeatable === false) {
        this.addRequest(url);
      }
    }
    const header = {
      Authorization: ''
    };

    if (Utils.getLocal2Json('login_user') && Utils.getLocal2Json('login_user').token) {
      header.Authorization = Utils.getLocal2Json('login_user').token;
    }

    const defaultParam = {
      headers: header,
      responseType: 'json',
      validateStatus: function(status) {
        return true;
      },
      paramsSerializer: params => {
        return qs.stringify(params, { allowDots: true });
      }
    };
    if (params.crossDomain) {
      defaultParam.headers = {};
    }
    const that = this;
    params = Utils.extend({}, defaultParam, params);
    return new Promise(resolve => {
      return axios
        .request(params)
        .then(response => {
          that.deleteRequest(params.url);
          const data = response.data;
          let status = response.status;
          // 如果后端统一封装返回，即所有的请求都是200, 错误码由返回结果提供，则使用以下代码获取状态
          if (status === 200) {
            status = data.code || data.status;
          }
          if (status !== 200) {
            if (status === 401) {
              router.replace({ path: '/login' }).then(() => HeyUI.$Message.error('登录超时,请重新登录'));
              return;
            }
            if (status === 500) {
              HeyUI.$Message.error(data.msg || '服务器异常');
            } else if (status === 404) {
              HeyUI.$Message.error('请求不存在');
            } else if (status !== 200) {
              HeyUI.$Message.error(data.msg || '请求异常');
            }
          }
          data.ok = status === 200;
          resolve(data);
        })
        .catch(() => {
          that.deleteRequest(params.url);
          resolve({
            ok: false
          });
        });
    });
  }
};
export default ajax;
