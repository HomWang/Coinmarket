import {axios} from '@/plugins/request';
import qs from 'qs';

const PersonalCenter = {
    
    //获取账户明细
    wallets: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/financial/wallets', postData);
    },

    //获取虚拟币充值地址
    coin_address: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/deposit/coin_address', postData);
    },

    //获取虚拟币提现地址列表
    coin_withdraw_address: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/withdraw/coin_withdraw_address', postData);
    },

    //添加提现地址
    save_withdraw_address: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/withdraw/save_withdraw_address', postData);
    },

    //虚拟币提现
    coin_manual: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/withdraw/coin_manual', postData);
    },

    //获取账户明细
    getCoinTypeList: function(){
        return axios.get('/web_common/getCoinTypeList');
    },

    //获取委单记录
    cny_entrust: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_market/trade/cny_entrust', postData);
    },

    //调用撤单操作
    coin_cancel: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_market/trade/coin_cancel', postData);
    },

    //获取账户明细
    record: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_account/financial/record', postData);
    },

    //获取邮箱验证码
    send_email_vcode: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_security/send_email_vcode', postData);
    },

    //提币地址添加获取邮箱发送验证码
    send_email: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_security/send_email_vcode_by_user', postData);
    },

    //提币地址添加获取发送短信验证码
    send_sms: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_security/send_sms_by_user', postData);
    },

    //用户中心积分等级购买VIP
    pay_vip: function(params){
        const postData = qs.stringify(params);
        return axios.post('/web_usercenter/pay_vip', postData);
    },

}

export {PersonalCenter};
