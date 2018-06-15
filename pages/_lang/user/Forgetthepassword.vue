<template>
  <section class="container">
    <Head/>
    <div class="coin-market-User">
        <div class="coin-market-UserReg-Content">
            <section class="coin-market-UserReg-Content-Forget">
                <section class="coin-market-UserReg-Content-Forget-Title">{{$t('user.LoginAndRegsiter.Forgetthepassword')}}</section>
                <form @submit.prevent="submit">
                    <div class="coin-market-User-Forget-Message">
                        <section class="coin-market-User-Forget-Message-icon">
                            <img src="~/assets/img/user/RegUser.png" alt="">
                        </section>
                        <input class="coin-market-User-Forget-MessageButton-User" type="text" v-model="user.name" :placeholder="$t('user.ForgetPassword.EmailOrPhone')">
                    </div>
                    <div class="coin-market-User-Forget-Message">
                        <section class="coin-market-User-Forget-Message-icon">
                            <img src="~/assets/img/user/RegCode.png" alt="">
                        </section>
                        <input class="coin-market-User-Forget-MessageButton-User" type="text" v-model="BackPassword.code" :placeholder="$t('user.LoginAndRegsiter.VerificationCode')">
                        <button type="button" :disabled="disabled" @click="sendcode" class="UserRegGetCode">{{PhoneBtntxt}}</button>
                    </div>
                    <div class="coin-market-User-Forget-Message">
                        <section class="coin-market-User-Forget-Message-icon">
                            <img src="~/assets/img/user/RegInput.png" alt="">
                        </section>
                        <input class="coin-market-User-Forget-MessageButton-User" type="password" @blur="TimelyInput" v-model="BackPassword.newPassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :placeholder="$t('user.ForgetPassword.InputNowPassword')">
                        <i v-show="ForgetSuccessState" class="el-icon-success ForgetSuccessIcon"></i>
                        <i v-show="ForgetErrorState" class="el-icon-error ForgetErrorIcon"></i>
                    </div>
                    <div class="coin-market-User-Forget-Message">
                        <section class="coin-market-User-Forget-Message-icon">
                            <img src="~/assets/img/user/UserPassword.png" alt="">
                        </section>
                        <input class="coin-market-User-Forget-MessageButton-User" type="password" @blur="DuplicatInput" v-model="BackPassword.newPassword2" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :placeholder="$t('user.ForgetPassword.RepeatPassword')">
                        <i v-show="DuplicateSuccessState" class="el-icon-success ForgetSuccessIcon"></i>
                        <i v-show="DuplicateErrorState" class="el-icon-error ForgetErrorIcon"></i>
                    </div>
                    <input class="coin-market-User-Forget-submit" type="submit" :value="$t('user.ForgetPassword.Sure')">
                    <section class="RegAndForget">
                        <nuxt-link :to="{path: `/user/Login`}" class="RegExistingAccount">{{$t('user.LoginAndRegsiter.BackLogin')}}?</nuxt-link>
                    </section>
                </form>
            </section>
        </div>
    </div>
    <About/>
  </section>
</template>

<script>
import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import {baseUrl} from '@/plugins/request';
import intlTelInput from '~/components/public/intlTelInput.vue'
import {LoginAndRegister} from '~/api/LoginAndRegister';
import md5 from 'js-md5';

export default {
    components: {
        Head,
        About,
        intlTelInput,
    },
    head () {
        return {title: 'Coinmarket '+this.$t('common.header.Login')}
    },
    data() {
        return {
            ForgetSuccessState: false,
            ForgetErrorState: false,
            DuplicateSuccessState: false,
            DuplicateErrorState: false,
            time: 0,
            disabled: false,
            TypeName: '',
            PhoneType: 109,
            EmailType: 202,
            msgtype: 1,
            PasswordStrength: '',//密码强度
            BackPassword:{
                newPassword: '',
                newPassword2: '',
                code: '',
            },
            user: {
                lan: this.$store.state.locale,
                type: '',
                name: '',
            },
            PasswordStrength1: this.$t('user.ForgetPassword.PasswordStrength1'),
            PasswordStrength2: this.$t('user.ForgetPassword.PasswordStrength2'),
            PasswordStrength3: this.$t('user.ForgetPassword.PasswordStrength3'),
            PasswordStrength4: this.$t('user.ForgetPassword.PasswordStrength4'),
            InputPhoneOrEmail: this.$t('user.ForgetPassword.InputPhoneOrEmail'),
            IsNotPhoneOrEmail: this.$t('user.ForgetPassword.IsNotPhoneOrEmail'),
            Sorry: this.$t('user.ForgetPassword.Sorry'),
            NotYet: this.$t('user.ForgetPassword.NotYet'),
            PhoneBtntxt: this.$t('user.LoginAndRegsiter.getPhoneCode'),
            EmailBtntxt: this.$t('user.LoginAndRegsiter.getEmailCode'),
            Recapture: this.$t('user.LoginAndRegsiter.Recapture'),
        }
    },
    head () {
        return {
        title: "Coinmarket "+this.$t('common.header.LoginAndReg'),
        meta: [
            { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.LoginAndReg') }
        ]
        }
    },
    mounted(){

    },
    methods: {
        setCountryCode: function (item) {
            this.Excountry = item;
            console.log(item);
        },
        PlaceholderRegName(){
            let RegVlaue = this.user.loginName.replace(/[^\u4E00-\u9FA5]/g,'');
            if(RegVlaue !== ''){
                this.user.loginName = "";
            }
        },
        PlaceholderVcode(){
            let RegVlaue = this.user.vcode.replace(/[^\u4E00-\u9FA5]/g,'');
            if(RegVlaue !== ''){
              this.user.vcode = "";
            }
        },
        ChangeImg(e){
            e.target.src = baseUrl+"/web_user/generate_validate_code?time="+new Date();
        },
        TimelyInput(){
            if(this.BackPassword.newPassword.length > 7 && /^\S+$/gi.test(this.BackPassword.newPassword) === true){
              let Num = 0;
              if(/[a-z]/.test(this.BackPassword.newPassword)){
                Num++;
              }
              if(/\d/.test(this.BackPassword.newPassword)){
                Num++;
              }
              if(/[A-Z]/.test(this.BackPassword.newPassword)){
                Num++;
              }
              if(/\W/.test(this.BackPassword.newPassword)){
                Num++;
              }
              this.PasswordStrength = Num;
              if(this.PasswordStrength < 2){
                this.ForgetSuccessState = false;
                this.ForgetErrorState = true;
                this.$Message({
                  message: this.PasswordStrength1,
                  type: 'error',
                  center: true,
                });
              }else if(this.PasswordStrength === 2){
                this.ForgetErrorState = false;
                this.ForgetSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength2,
                  type: 'success',
                  center: true,
                });
              }else if(this.PasswordStrength === 3){
                this.ForgetErrorState = false;
                this.ForgetSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength3,
                  type: 'success',
                  center: true,
                });
              }else if(this.PasswordStrength === 4){
                this.ForgetErrorState = false;
                this.ForgetSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength4,
                  type: 'success',
                  center: true,
                });
              }
            }else{
                this.ForgetSuccessState = false;
                this.ForgetErrorState = true;
            }
            this.DuplicatInput();
        },

        DuplicatInput(){
            if(this.BackPassword.newPassword === this.BackPassword.newPassword2 && this.BackPassword.newPassword.length > 7 && /^\S+$/gi.test(this.BackPassword.newPassword) === true){
                this.DuplicateSuccessState = true;
                this.DuplicateErrorState = false;
            }else{
                this.DuplicateSuccessState = false;
                this.DuplicateErrorState = true;
            }
        },

        sendcode(){
            // var regPhone = (11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/).test(this.user.name);
            var regPhone = (/^[0-9]*$/).test(this.user.name);
            var regEmail = (new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")).test(this.user.name);
            if(this.user.name === ""){
                this.$Message({
                    message: this.InputPhoneOrEmail,
                    type: 'warning',
                    center: true,
                });
                return;
            }else if(regPhone === true){
                this.user.type = 0;
                this.TypeName = this.Phone;
            }else if(regEmail === true){
                this.user.type = 1;
                this.TypeName = this.Email;
            }else{
                this.$Message({
                    message: this.IsNotPhoneOrEmail,
                    type: 'warning',
                    center: true,
                });
                return;
            }

            //调用检测用户账号是否存在
            LoginAndRegister.check_user_exist(this.user).then((response) => {
                if(response.result.exsit === true){
                    if(response.code === "200"){
                        if(this.user.type === 0){
                            let PhoneCaptcha = {
                                type: this.PhoneType, //111 网页端注册帐号 109找回登录密码-手机找回 102绑定手机 107修改交易密码 106修改登录密码
                                msgtype: this.msgtype,
                                phone: this.user.name
                            }
                            // 调用电话验证码及其操作
                            LoginAndRegister.send_sms(PhoneCaptcha).then((response) => {
                                if(response.code === "200"){
                                    this.$Message({
                                        message: response.msg,
                                        type: 'success',
                                        center: true,
                                    });
                                    this.time = 60;
                                    this.timer();
                                }
                            }).catch((err) => {
                                console.log('login err: ', err);
                            });
                        }else if(this.user.type === 1){
                            let PhoneCaptcha = {
                                type: this.EmailType, //类型 203：注册验证码 202：找回密码邮件验证码
                                address: this.user.name
                            }
                            //调用邮箱验证码及其操作
                            LoginAndRegister.send_reg_email(PhoneCaptcha).then((response) => {
                                if(response.code === "200"){
                                    this.$Message({
                                        message: response.msg,
                                        type: 'success',
                                        center: true,
                                    });
                                    this.time = 60;
                                    this.timer();
                                }
                            }).catch((err) => {
                                console.log('login err: ', err);
                            });
                        }
                    }
                }else{
                    this.$Message({
                        message: this.Sorry+this.TypeName+this.NotYet,
                        type: 'error',
                        center: true,
                    });
                    this.$parent._data.RegisterShow = true;
                }
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },

        timer() {
            if (this.time > 0) {
                this.time--;
                this.PhoneBtntxt = this.time + this.Recapture;
                setTimeout(this.timer, 1000);
            } else{
                this.time = 0;
                this.PhoneBtntxt = this.EmailBtntxt;
                this.disabled=false;
            }
        },

        submit(e){
            if(this.BackPassword.code !== ""){
                if(this.BackPassword.newPassword === this.BackPassword.newPassword2){
                    let MD5newPassword = md5(md5(md5(this.BackPassword.newPassword)));
                    let MD5newPassword2 = md5(md5(md5(this.BackPassword.newPassword2)));
                    let BackPasswordMessage = {
                        lan: this.user.lan,
                        userName: this.user.name,
                        newPassword: MD5newPassword,
                        newPassword2: MD5newPassword2,
                        code: this.BackPassword.code,
                    }
                    //调用找回密码及其操作
                    LoginAndRegister.find_password(BackPasswordMessage).then((response) => {
                        if(response.code === "200"){
                            this.$Message({
                                message: response.msg,
                                type: 'success',
                                center: true,
                            });
                            //触发回退到登录页面
                            this.$router.push({path: '/user/Login'})
                        }
                    }).catch((err) => {
                        console.log('login err: ', err);
                    });
                }else{
                    this.$Message({
                        message: this.PasswordAtypism,
                        type: 'error',
                        center: true,
                    });
                    this.BackPassword.newPassword = "";
                    this.BackPassword.newPassword2 = "";
                }
            }else{
                this.$Message({
                    message: this.InputRight+this.TypeName+this.Code,
                    type: 'error',
                    center: true,
                });
            }
        }
    }
}
</script>

<style>
    .coin-market-User{
        width: 100%;
        background: url(~/assets/img/user/UserBackground.png) no-repeat center top;
    }
    .coin-market-UserReg-Content{
        position: relative;
        width: 421px;
        margin: 0 auto;
        padding: 230px 0px 575px 0px;
    }
    .coin-market-UserReg-Content-Forget{
        position: relative;
        padding-bottom: 50px;
        width: 100%;
        border-radius: 10px;
        background: linear-gradient(left, #191c2a, #2f2e46);
    }
    .coin-market-UserReg-Content-Forget-Title{
        text-align: center;
        font-size: 18px;
        padding: 35px 0;
        padding-left: 5px;
    }
    .coin-market-UserReg-Content-Forget>form{
        width: 292px;
        margin: 0 auto;
    }
    .coin-market-UserReg-Content-Forget>form input{
        width: 100%;
        outline: none;
        border: none;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
    }
    .coin-market-User-Forget-Message{
        position: relative;
        margin-bottom: 10px;
    }
    .coin-market-User-Forget-Message>input{
        width: 252px !important;
        margin-left: 2px;
        background-color: #1d1e2f;
        color: #d8d8d8 !important;
        /* color: #515481; */
    }
    .coin-market-User-Forget-Message-icon{
        width: 38px;
        height: 38px;
        line-height: 38px;
        float: left;
        background-color: #131422;
    }
    .coin-market-User-Forget-Message-icon>img{
        display: block;
        padding: 10px 0;
        margin: 0 auto;
    }
    .coin-market-User-Forget-MessageButton-User{
        color: #d8d8d8 !important;
    }
    .coin-market-User-Forget-submit{
        border-radius: 3px;
        color: #d8d8d8;
        background: #3366cc;
        font-size: 18px;
        margin-top: 75px;
        letter-spacing: 10px;
        padding-left: 20px;
    }
    .coin-market-User-Forget-submit:hover{
        background-color: #2e56a6;
    }
    .coin-market-UserReg-Content-Forget input::-webkit-input-placeholder{
        color: #515481;
    }
    .coin-market-UserReg-Content-Forget input::-moz-placeholder{
        color: #515481;
    }
    .coin-market-UserReg-Content-Forget input::-ms-placeholder {
        color: #515481;
    }
    .RegAndForget{
        margin-top: 33px;
    }
    .RegExistingAccount{
        display: block;
        margin: 0 auto;
        color: #d8d8d8;
        text-align: center;
        text-decoration: underline;
    }
    .coin-market-User-Forget-Message>.intl-tel-input>.flag-container>.selected-flag{
        width: 251px !important;
        height: 37px !important;
        margin-left: 40px !important;
        border-radius: 0px !important;
        padding: 0 !important;
        background-color: #1d1e2f;
    }
    .coin-market-User-Forget-Message>.intl-tel-input>.flag-container>.selected-flag>.iti-flag{
        bottom: 12px !important;
    }
    .coin-market-User-Forget-Message>.intl-tel-input>.flag-container>.selected-flag>.CountryName{
        padding-left: 45px !important;
        padding-right: 30px !important;
    }
    .coin-market-User-Forget-Message>.intl-tel-input>.flag-container>.selected-flag>.iti-arrow{
        right: 10px !important;
    }
    .coin-market-User-Forget-Message>.intl-tel-input>.flag-container>.country-list{
        width: 252px;
        margin-left: 40px;
    }
    .UserRegGetCode{
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
        height: 38px;
        line-height: 38px;
        width: 100px;
        border: 0;
        outline: none;
        background-color: #1d1e2f;
        color: #7e82c4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .coin-market-User-Forget-Prompt{
        font-size: 12px;
        line-height: 1.3;
        position: absolute;
        left: 420px;
        top: 0;
        width: 325px;
    }
    .Forget-Password-Prompt{
        top: 40px;
        line-height: 1.5;
    }
    .Forget-Password-Prompt>ul{
        margin-left: 15px;
    }
    .Forget-Password-Prompt>ul>li{
        list-style: initial;
    }
    .ForgetSuccessIcon, .ForgetErrorIcon{
        position: absolute;
        top: 12px;
        right: -35px;
        border-radius: 100%;
    }
    .ForgetSuccessIcon{
        color: #51c332;
    }
    .ForgetErrorIcon{
        color: #f53100;
    }
</style>
