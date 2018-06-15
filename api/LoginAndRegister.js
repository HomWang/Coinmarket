import {axios} from '@/plugins/request';
import qs from 'qs';

const LoginAndRegister = {
  
  //调用检测用户账号是否存在
  check_user_exist: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/check_user_exist', postData);
  },

  //找回密码
  find_password: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/find_password', postData);
  },

  //手机发送短信验证码
  send_sms: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/send_sms', postData);
  },

  //邮箱发送短信验证码
  send_reg_email: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/send_reg_email', postData);
  },

  //登录时检测是否绑定谷歌POST 
  isGoogleBind: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/isGoogleBind', postData);
  },

  //用户注册
  register: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/register', postData);
  },

  //用户登录验证码
  generate_validate_code: function(){
    return axios.get('/web_user/generate_validate_code');
  },

  //用户登录
  login: function(params) {
    const postData = qs.stringify(params);
    return axios.post('/web_user/login', postData);
  }
}

export {LoginAndRegister};
