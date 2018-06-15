<template>
  <section class="container">
    <Head/>
    <div class="coin-market-User">
        <div class="coin-market-UserReg-Content">
            <section class="coin-market-UserReg-Content-Register">
                <section class="coin-market-UserReg-Content-Register-Title">{{$t('user.LoginAndRegsiter.Register')}}</section>
                <form @submit.prevent="submit">
                    <div class="coin-market-User-Register-Message coin-market-User-Register-setCountryCode">
                        <section class="coin-market-User-Register-Message-icon">
                            <img src="~/assets/img/user/RegPhone.png" class="ImgDialPhoneType" v-show="dialCodeState">
                            <img src="~/assets/img/user/RegEmail.png" class="ImgDialCode" v-show="!dialCodeState">
                        </section>
                        <div class="coin-market-User-Register-MessageButton-UserType cursor" @click="UserRegTypeStateClick">{{user.regNameType}}</div>
                        <div class="coin-market-User-Register-UserRegType-iti-arrow"></div>
                        <div class="coin-market-User-Register-UserRegType" v-show="UserRegTypeState">
                            <section class="cursor" @click="UserRegTypeStateHide">{{this.$t('user.LoginAndRegsiter.PhoneName')}}</section>
                            <section class="cursor" @click="UserRegTypeStateHide">{{this.$t('user.LoginAndRegsiter.EmailName')}}</section>
                        </div>
                    </div>
                    <div class="coin-market-User-Register-Message" v-show="dialCodeState">
                        <section class="coin-market-User-Register-Message-icon">
                            <img src="~/assets/img/user/guoji.png" alt="">
                        </section>
                        <intlTelInput @excountry="setCountryCode"></intlTelInput>
                        <input class="coin-market-User-Register-MessageButton-User" type="text">
                        <div class="coin-market-User-Register-Prompt">{{$t('user.LoginAndRegsiter.Nationalityhints')}}</div>
                    </div>
                    <div class="coin-market-User-Register-Message">
                        <section class="coin-market-User-Register-Message-icon">
                            <span v-show="dialCodeState">{{Excountry.dialCode}}</span>
                            <img src="~/assets/img/user/emali.png" class="ImgDialCode" v-show="!dialCodeState">
                        </section>
                        <input class="coin-market-User-Register-MessageButton-User" type="text" v-model="user.regName" :placeholder="dialCodeState?$t('user.LoginAndRegsiter.InputPhone'):$t('user.LoginAndRegsiter.InputEmail')"  @input="PlaceholderRegName">
                        <div class="coin-market-User-Register-Prompt" v-show="user.regType === 1">{{$t('user.LoginAndRegsiter.Verifyingmailbox')}}</div>
                    </div>
                    <div class="coin-market-User-Register-Message">
                        <section class="coin-market-User-Register-Message-icon">
                            <img src="~/assets/img/user/RegCode.png" alt="">
                        </section>
                        <input class="coin-market-User-Register-MessageButton-User" type="text" v-model="user.code" :placeholder="$t('user.LoginAndRegsiter.VerificationCode')">
                        <button type="button" :disabled="disabled" @click="sendcode" class="UserRegGetCode">{{PhoneBtntxt}}</button>
                    </div>
                    <div class="coin-market-User-Register-Message">
                        <section class="coin-market-User-Register-Message-icon">
                            <img src="~/assets/img/user/RegInput.png" alt="">
                        </section>
                        <input class="coin-market-User-Register-MessageButton-User" type="password" @blur="TimelyInput" v-model="user.password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :placeholder="$t('user.LoginAndRegsiter.RegLoginPassword')">
                        <div class="coin-market-User-Register-Prompt">{{$t('user.LoginAndRegsiter.Savethepassword')}}</div>
                        <i v-show="RegSuccessState" class="el-icon-success RegSuccessIcon"></i>
                        <i v-show="RegErrorState" class="el-icon-error RegErrorIcon"></i>
                    </div>
                    <div class="coin-market-User-Register-Message">
                        <section class="coin-market-User-Register-Message-icon">
                            <img src="~/assets/img/user/UserPassword.png" alt="">
                        </section>
                        <input class="coin-market-User-Register-MessageButton-User" type="password" @blur="DuplicatInput" v-model="DuplicatePassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :placeholder="$t('user.LoginAndRegsiter.RepeatRegLoginPassword')">
                        <div class="coin-market-User-Register-Prompt Register-Password-Prompt">
                            {{$t('user.LoginAndRegsiter.RegisterPasswordPrompt1')}}<br/>
                            {{$t('user.LoginAndRegsiter.RegisterPasswordPrompt2')}}
                            <ul>
                                <li>{{$t('user.LoginAndRegsiter.RegisterPasswordPrompt3')}}</li>
                                <li>{{$t('user.LoginAndRegsiter.RegisterPasswordPrompt4')}}</li>
                                <li>{{$t('user.LoginAndRegsiter.RegisterPasswordPrompt5')}}</li>
                                <li>{{$t('user.LoginAndRegsiter.RegisterPasswordPrompt6')}}</li>
                            </ul>
                        </div>
                        <i v-show="DuplicateSuccessState" class="el-icon-success RegSuccessIcon"></i>
                        <i v-show="DuplicateErrorState" class="el-icon-error RegErrorIcon"></i>
                    </div>
                    <input class="coin-market-User-Register-submit" type="submit" :value="$t('user.LoginAndRegsiter.regTitle1')+'  '+$t('user.LoginAndRegsiter.regTitle2')">
                    <section class="RegAndForget">
                        <nuxt-link :to="{path: `/user/Login`}" class="ExistingAccount">{{$t('user.LoginAndRegsiter.ExistingAccount')}}?</nuxt-link>
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
            dialCodeState: true,
            UserRegTypeState: false,
            RegSuccessState: false,
            RegErrorState: false,
            DuplicateErrorState: false,
            DuplicateSuccessState: false,
            time: 0,
            disabled: false,
            Excountry: {},
            msgtype: 1,
            PhoneType: 111,//111 网页端注册帐号 109找回登录密码-手机找回 102绑定手机 107修改交易密码 106修改登录密码
            EmailType: 203,//类型 203：注册验证码 202：找回密码邮件验证码
            user: {
                nationality: '',//国籍
                regName: '',//用户名 手机或邮箱
                password: '',//密码
                regNameType: this.$t('user.LoginAndRegsiter.PhoneName'),//手机或邮箱类型名称
                regType: 0,//0-手机注册 1-邮箱注册 注册类型
                code: '',//手机或邮箱收到的验证码
                areaCode: '',//区号 中国：86
                introUser: '',//介绍人显示ID
            },
            InputPhoneOrEmail: this.$t('user.LoginAndRegsiter.InputPhoneOrEmail'),
            PhoneOrEmailIncorrect: this.$t('user.LoginAndRegsiter.PhoneOrEmailIncorrect'),
            PhoneBtntxt: this.$t('user.LoginAndRegsiter.getPhoneCode'),
            EmailBtntxt: this.$t('user.LoginAndRegsiter.getEmailCode'),
            Recapture: this.$t('user.LoginAndRegsiter.Recapture'),
            PasswordStrength1: this.$t('user.LoginAndRegsiter.PasswordStrength1'),
            PasswordStrength2: this.$t('user.LoginAndRegsiter.PasswordStrength2'),
            PasswordStrength3: this.$t('user.LoginAndRegsiter.PasswordStrength3'),
            PasswordStrength4: this.$t('user.LoginAndRegsiter.PasswordStrength4'),
            DuplicatePassword: '',//重复密码
            PasswordStrength: '',//密码强度
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
        this.user.introUser = Number(this.$route.query.ref)?Number(this.$route.query.ref):'';
    },
    methods: {
        UserRegTypeStateHide(e){
            this.UserRegTypeState = false;
            this.user.regNameType = e.target.innerText;
            if(e.target.innerText === this.$t('user.LoginAndRegsiter.EmailName')){
                this.dialCodeState = false;
                this.user.regType = 1;
            }else{
                this.dialCodeState = true;
                this.user.regNameType = e.target.innerText;
                this.user.regType = 0;
            }
        },
        UserRegTypeStateClick(){
            this.UserRegTypeState = !this.UserRegTypeState;
        },
        setCountryCode: function (item) {
            this.Excountry = item;
        },
        PlaceholderRegName(){
            let RegVlaue = this.user.regName.replace(/[^\u4E00-\u9FA5]/g,'');
            if(RegVlaue !== ''){
                this.user.regName = "";
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
            if(this.user.password.length > 7 && /^\S+$/gi.test(this.user.password) === true){
              let Num = 0;
              if(/[a-z]/.test(this.user.password)){
                Num++;
              }
              if(/\d/.test(this.user.password)){
                Num++;
              }
              if(/[A-Z]/.test(this.user.password)){
                Num++;
              }
              if(/\W/.test(this.user.password)){
                Num++;
              }
              this.PasswordStrength = Num;
              if(this.PasswordStrength < 2){
                this.RegSuccessState = false;
                this.RegErrorState = true;
                this.$Message({
                  message: this.PasswordStrength1,
                  type: 'error',
                  center: true,
                });
              }else if(this.PasswordStrength === 2){
                this.RegErrorState = false;
                this.RegSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength2,
                  type: 'success',
                  center: true,
                });
              }else if(this.PasswordStrength === 3){
                this.RegErrorState = false;
                this.RegSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength3,
                  type: 'success',
                  center: true,
                });
              }else if(this.PasswordStrength === 4){
                this.RegErrorState = false;
                this.RegSuccessState = true;
                this.$Message({
                  message: this.PasswordStrength4,
                  type: 'success',
                  center: true,
                });
              }
            }else{
                this.RegSuccessState = false;
                this.RegErrorState = true;
            }
            this.DuplicatInput();
        },
        //验证手机号码部分
        sendcode(){
            var reg = this.Excountry.dialCode === 86? /^[1][3,4,5,7,8][0-9]{9}$/: /^[0-9]*$/;
            let EmailFont = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(this.user.regName === ''){
                this.$Message({
                    message: this.InputPhoneOrEmail,
                    type: 'error',
                    center: true,
                });
            }else if(!reg.test(this.user.regName) && !EmailFont.test(this.user.regName)){
                this.$Message({
                    message: this.PhoneOrEmailIncorrect,
                    type: 'error',
                    center: true,
                });
            }else if(reg.test(this.user.regName) === true){
                if(this.user.regType === 0){
                    let PhoneCaptcha = {
                        type: this.PhoneType, //111 网页端注册帐号 109找回登录密码-手机找回 102绑定手机 107修改交易密码 106修改登录密码
                        msgtype: this.msgtype,
                        areaCode: this.Excountry.dialCode,
                        phone: this.user.regName
                    }
                    //传入头部语言信息
                    this.$store.commit('SET_LANG', this.user.nationality);
                    // 调用电话验证码及其操作
                    LoginAndRegister.send_sms(PhoneCaptcha).then((response) => {
                        if(response.code === "200"){
                            this.$Message({
                                message: response.msg,
                                type: 'success',
                                center: true,
                            });
                            this.user.regType = 0;
                            this.time = 60;
                            this.disabled = true;
                            this.timer();
                        }
                    }).catch((err) => {
                        console.log('login err: ', err);
                    });
                }else{
                    this.$Message({
                        message: this.$t('user.LoginAndRegsiter.InputEmail'),
                        type: 'error',
                        center: true,
                    });
                }
            }else if(EmailFont.test(this.user.regName)){
                if(this.user.regType === 1){
                    let PhoneCaptcha = {
                        type: this.EmailType, //类型 203：注册验证码 202：找回密码邮件验证码
                        address: this.user.regName
                    }
                    //传入头部语言信息
                    this.$store.commit('SET_LANG', this.user.nationality);
                    // 调用邮箱验证码及其操作
                    LoginAndRegister.send_reg_email(PhoneCaptcha).then((response) => {
                        if(response.code === "200"){
                            this.$Message({
                                message: response.msg,
                                type: 'success',
                                center: true,
                            });
                            this.user.regType = 1;
                            this.time = 60;
                            this.disabled = true;
                            this.timer();
                        }
                    }).catch((err) => {
                        console.log('login err: ', err);
                    });
                }else{
                    this.$Message({
                        message: this.$t('user.LoginAndRegsiter.InputPhone'),
                        type: 'error',
                        center: true,
                    });
                }
            }
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
        DuplicatInput(){
            if(this.DuplicatePassword === this.user.password && this.user.password.length > 7 && /^\S+$/gi.test(this.user.password) === true){
                this.DuplicateSuccessState = true;
                this.DuplicateErrorState = false;
            }else{
                this.DuplicateSuccessState = false;
                this.DuplicateErrorState = true;
            }
        },
        //用户注册部分
        submit(e) {
            if(this.PasswordStrength < 2){
                this.$Message({
                    message: this.PasswordStrength1,
                    type: 'warning',
                    center: true,
                });
                this.user.password = '';
                this.DuplicatePassword = '';
            }else{
                if(this.DuplicatePassword === this.user.password){
                    let Md5Password = md5(md5(md5(this.user.password)));
                    let UserMsg = {
                        nationality: this.Excountry.name,//国籍
                        regName: this.user.regName,//用户名 手机或邮箱
                        password: Md5Password,//密码
                        regType: this.user.regType,//0-手机注册 1-邮箱注册 注册类型
                        code: this.user.code,//手机或邮箱收到的验证码
                        areaCode: this.Excountry.dialCode,//区号 中国：86
                        introUser: this.user.introUser,//介绍人显示ID
                    }
                    // 调用注册及其操作
                    LoginAndRegister.register(UserMsg).then((response) => {
                        if(response.code === "200"){
                        this.$Message({
                            message: response.msg,
                            type: 'success',
                            center: true,
                        });
                        this.$store.commit('SET_TOKEN', response.result.token);

                        this.$router.push({path: '/user/Login'})
                        }
                    }).catch((err) => {
                        console.log('login err: ', err);
                    });
                }else{
                    this.$Message({
                        message: this.Inconsistent,
                        type: 'error',
                        center: true,
                    });
                    this.DuplicatePassword = "";
                    this.user.password = "";
                }
            }
        },
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
        padding: 230px 0px 527px 0px;
    }
    .coin-market-UserReg-Content-Register{
        margin-left: -195px;
        position: relative;
        padding-bottom: 50px;
        width: 100%;
        border-radius: 10px;
        background: linear-gradient(left, #191c2a, #2f2e46);
    }
    .coin-market-UserReg-Content-Register-Title{
        text-align: center;
        font-size: 18px;
        padding: 35px 0;
    }
    .coin-market-UserReg-Content-Register>form{
        width: 292px;
        margin: 0 auto;
    }
    .coin-market-UserReg-Content-Register>form input{
        width: 100%;
        outline: none;
        border: none;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
    }
    .coin-market-User-Register-Message{
        position: relative;
        margin-bottom: 10px;
    }
    .coin-market-User-Register-MessageButton-UserType{
        width: 252px !important;
        background-color: #1d1e2f;
        color: #d8d8d8 !important;
        margin-left: 40px;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
        
    }
    .coin-market-User-Register-Message>input{
        width: 252px !important;
        margin-left: 2px;
        background-color: #1d1e2f;
        color: #d8d8d8 !important;
        /* color: #515481; */
    }
    .coin-market-User-Register-Message-icon{
        width: 38px;
        height: 38px;
        line-height: 38px;
        float: left;
        text-align: center;
        background-color: #131422;
    }
    .coin-market-User-Register-Message-icon>img{
        display: block;
        padding: 10px 0;
        margin: 0 auto;
    }
    .coin-market-User-Register-MessageButton-User{
        color: #d8d8d8 !important;
    }
    .coin-market-User-Register-submit{
        border-radius: 3px;
        color: #d8d8d8;
        background: #3366cc;
        font-size: 18px;
        margin-top: 75px;
    }
    .coin-market-User-Register-submit:hover{
        background-color: #2e56a6;
    }
    .coin-market-UserReg-Content-Register input::-webkit-input-placeholder{
        color: #4d4f79;
    }
    .coin-market-UserReg-Content-Register input::-moz-placeholder{
        color: #4d4f79;
    }
    .coin-market-UserReg-Content-Register input::-ms-placeholder {
        color: #4d4f79;
    }
    .RegAndForget{
        margin-top: 33px;
    }
    .ExistingAccount{
        display: block;
        margin: 0 auto;
        color: #d8d8d8;
        text-align: center;
    }
    .coin-market-User-Register-Message>.intl-tel-input>.flag-container>.selected-flag{
        width: 251px !important;
        height: 37px !important;
        margin-left: 40px !important;
        border-radius: 0px !important;
        padding: 0 !important;
        background-color: #1d1e2f;
    }
    .coin-market-User-Register-Message>.intl-tel-input>.flag-container>.selected-flag>.iti-flag{
        bottom: 12px !important;
    }
    .coin-market-User-Register-Message>.intl-tel-input>.flag-container>.selected-flag>.CountryName{
        padding-left: 45px !important;
        padding-right: 30px !important;
    }
    .coin-market-User-Register-Message>.intl-tel-input>.flag-container>.selected-flag>.iti-arrow{
        right: 10px !important;
    }
    .coin-market-User-Register-Message>.intl-tel-input>.flag-container>.country-list{
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
    .coin-market-User-Register-Prompt{
        font-size: 12px;
        line-height: 1.3;
        position: absolute;
        left: 420px;
        top: 0;
        width: 325px;
    }
    .Register-Password-Prompt{
        top: 40px;
        line-height: 1.5;
    }
    .Register-Password-Prompt>ul{
        margin-left: 15px;
    }
    .Register-Password-Prompt>ul>li{
        list-style: initial;
    }
    .RegSuccessIcon, .RegErrorIcon{
        position: absolute;
        top: 12px;
        right: -35px;
        border-radius: 100%;
    }
    .RegSuccessIcon{
        color: #51c332;
    }
    .RegErrorIcon{
        color: #f53100;
    }
    .coin-market-User-Register-UserRegType{
        background-color: #222222;
        width: 252px;
        position: absolute;
        right: 0;
        top: 38px;
        line-height: 38px;
        z-index: 9;
        font-size: 14px;
    }
    .coin-market-User-Register-UserRegType>section{
        padding: 0 10px;
    }
    .coin-market-User-Register-UserRegType>section:hover{
        background-color: #333333;
    }
    .coin-market-User-Register-UserRegType-iti-arrow{
        position: absolute;
        top: 19px;
        margin-top: -4px;
        right: 10px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #d8d8d8;
    }
    .coin-market-User-Register-setCountryCode{
        z-index: 99;
    }
    .ImgDialCode{
        width: 18px;
        margin: 2px auto !important;
    }
    .ImgDialPhoneType{
        padding: 8px 0 !important;
    }
</style>
