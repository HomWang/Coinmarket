/* eslint-disable new-cap */
import Vue from 'vue';
import Axios from 'axios';
import {Message} from 'element-ui';
import Bus from '~/plugins/bus';

// const baseUrl = 'https://webapi.coinmarket.xyz'; //本地2
const baseUrl = 'http://webapidev.coinmarket.xyz'; //本地2

const axios = Axios.create(
  {
    baseURL: baseUrl, // api的base_url
    timeout: 9000, // 请求超时时间
    withCredentials: true,
  }
);

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = Axios.CancelToken;

// 取消上一次请求
let removePending = (config) => {
  for (let i in pending) {
    if (pending[i].url===config.url && pending[i].method===config.method) {
      pending[i].cancel();
      pending.splice(i, 1);
      break;
    }
  }
};

axios.interceptors.request.use((config) => {
  removePending(config); //在一个ajax发送前执行一下取消操作

  if(config.cancelToken!==null) {
    config.cancelToken = new cancelToken((c) => {
      pending.push({url: config.url, method: config.method, cancel: c});
    });
  }

  const VuexJson = JSON.parse(window.localStorage.getItem('vuex'));
  const token = VuexJson ? VuexJson.token : '';
  const lan = VuexJson ? VuexJson.locale : 'zh_TW';
  if (token) {
    config.headers['token'] = token;
  }
  if (lan) {
    config.headers['lan'] = lan;
  }
  return config;
}, (error) => {
  if (!(error instanceof Axios.Cancel)) {
    return Promise.reject(error);
  } else {
    return Promise.reject('cancel request');
  }
});

// respone拦截器
axios.interceptors.response.use((response) => {
    removePending(response.config);

    // 正常访问和响应
    if (response.status === 200) {
      const data = response.data;
      if (data.code === '200') {
        // 这是所有都正常的访问
        return data;
      } else if (data.code === '401') {
        // 登录超时
        if (window.localStorage.getItem('vuex')) {
          Bus.$emit('user-logout');
          if (data.msg) {
            Message({
              message: data.msg,
              type: 'warning'
            });
          }
        }
      } else {
        // 存在业务错误
        if (!data.msg) {
          return;
        }
        Message({
          message: data.msg,
          type: 'warning',
        });
        return Promise.reject('error');
      }
    } else {
      return Promise.reject('error');
    }
  }, (error) => {
    if (!(error instanceof Axios.Cancel)) {
      return Promise.reject(error);
    } else {
      return Promise.reject('cancel request');
    }
  }
);

Vue.prototype.$Message = Message;
export {axios, baseUrl, pending};
