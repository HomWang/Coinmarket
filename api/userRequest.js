import {axios} from '@/plugins/request';
import qs from 'qs';

export default {

  // 获取用户的安全信息情况
  getSecurityLevel: function() {
    return axios({
      method: 'post',
      url: '/web_security/security',
    });
  },

  // 根据用户绑定的手机或邮箱发送验证码
  sendCodeByUserInfo(type) {
    const params = qs.stringify({'type': type});
    return axios.post('/web_security/sendUnbindGoogleCode', params);
  },

  // 发送邮箱验证码
  sendEmailCode: function(address) {
    const params = qs.stringify({'address': address});
    return axios.post('/web_security/send_bind_email', params);
  },

  // 绑定邮箱
  bindEmail: function(email, code) {
    const params = qs.stringify({'email': email, 'code': code});
    return axios.post('/web_security/bind_mail', params);
  },

  // 绑定手机
  bindPhone: function(areaCode, phone, oldcode, newcode, topCode) {
    const params = qs.stringify({
      'areaCode': areaCode,
      'phone': phone,
      'oldcode': oldcode,
      'newcode': newcode,
      'topCode': topCode,
    });
    return axios.post('/web_security/bind_phone', params);
  },

  // 修改登录密码
  modifyPwd: function(pwdType, originPwd, newPwd, reNewPwd, phoneCode, totpCode, identityCode) {
    const params = qs.stringify({
      'pwdType': pwdType,
      'originPwd': originPwd,
      'newPwd': newPwd,
      'reNewPwd': reNewPwd,
      'phoneCode': phoneCode,
      'totpCode': totpCode,
      'identityCode': identityCode,
    });
    return axios.post('/web_security/modify_passwd', params);
  },

  // 获取用户地址(脱敏)
  getAddress: function() {
    return axios.post('/web_usercenter/getAddress');
  },

  // 获取用户地址
  getAddressNoHide: function() {
    return axios.post('/web_usercenter/getAddressNoHide');
  },

  // 设置用户地址
  setAddress: function(name, phone, zipcode, address, prov, city, dist) {
    const params = qs.stringify({
      'name': name,
      'phone': phone,
      'zipcode': zipcode,
      'address': address,
      'prov': prov,
      'city': city,
      'dist': dist,
    });
    return axios.post('/web_usercenter/add_address', params);
  },

  // 获取用户登录记录
  getLoginRecord: function(currentPage) {
    const params = qs.stringify({
      'currentPage': currentPage,
    });
    return axios.post('/web_logrecord/user_loginlog', params);
  },

  // 获取用户安全设置记录
  getSettingRecord: function(currentPage) {
    const params = qs.stringify({
      'currentPage': currentPage,
    });
    return axios.post('/web_logrecord/user_settinglog', params);
  },

  //获取用户中心积分等级
  score: function(params){
    const postData = qs.stringify(params);
    return axios.post('/web_usercenter/score', postData);
  },

  // 用此接口获得的信息生成google二维码和显示密钥等
  getGoogleOrignKey: function() {
    return axios.post('/web_security/bind_google_device');
  },

  // 绑定谷歌验证码
  bindGoogleKey: function(code, totpKey) {
    const params = qs.stringify({
      'code': code,
      'totpKey': totpKey,
    });
    return axios.post('/web_security/google_auth', params);
  },

  // 解绑谷歌验证码
  unbindGoogleValidator: function(phoneCode='', emailCode='') {
    const params = qs.stringify({
      phoneCode,
      emailCode,
    });
    return axios.post('/web_security/unbind_google', params);
  },

  // 生成谷歌验证码
  getGoogleKey: function(totpCode) {
    const params = qs.stringify({
      'totpCode': totpCode,
    });
    return axios.post('/web_security/get_google_key', params);
  },

  // 级别一实名认证
  realNameAuthLevelOne: function(countyType, realname, identitytype, identityno, address, sex) {
    const params = qs.stringify({
      'countyType': countyType,
      'realname': realname,
      'identitytype': identitytype,
      'identityno': identityno,
      'address': address,
      'sex': sex,
    });
    return axios.post('/web_security/real_name_auth', params);
  },

  // 确认申请二级认证，提交证件图片
  confirmSecondLevelAuth: function(pic1, pic2, pic3) {
    const params = qs.stringify({
      'pic1': pic1,
      'pic2': pic2,
      'pic3': pic3,
    });
    return axios.post('/web_security/saveSecondLevel', params);
  },

  //申请成为推广人
  apply_be_promoter: function(){
    return axios.post('/web_extension/apply_be_promoter');
  },

  //获取IsPromoter值
  getIsPromoter: function(){
    return axios.post('/web_extension/getIsPromoter');
  },

  //获取推广地址
  get_extension_address: function(){
    return axios.post('/web_extension/get_extension_address');
  },

  //获取推广地址
  get_extension_count: function(){
    return axios.post('/web_extension/get_extension_count');
  },

  //获取已邀请相关数据
  get_extension_content: function(params){
    const postData = qs.stringify(params);
    return axios.post('/web_extension/get_extension_content', postData);
  },
};
