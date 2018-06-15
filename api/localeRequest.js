import {axios} from '@/plugins/request';

export default {
  switchLocale: function() {
    const config = {};
    config.cancelToken = null;
    return axios.post('/web_common/switchlan', undefined, config);
  },

  //调用退出登录
  logout: function() {
    return axios.post('/web_user/logout');
  },
};
