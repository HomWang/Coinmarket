<template>
  <section class="container">
    <Head/>
    <div class="coin-market-User">
        <div class="coin-market-User-Content">
            <section class="coin-market-User-Content-Login">
                <section class="coin-market-User-Content-Login-Title">{{$t('user.LoginAndRegsiter.Login')}}</section>
                <form @submit.prevent="submit">
                    <div class="coin-market-User-Login-Message">
                        <section class="coin-market-User-Login-Message-icon">
                            <img src="~/assets/img/user/UserLogin.png" alt="">
                        </section>
                        <input class="coin-market-User-Login-MessageButton-User" type="text" v-model="user.loginName" :placeholder="$t('user.LoginAndRegsiter.UserName')" @input="PlaceholderRegName">
                    </div>
                    <div class="coin-market-User-Login-Message">
                        <section class="coin-market-User-Login-Message-icon">
                            <img src="~/assets/img/user/UserPassword.png" alt="">
                        </section>
                        <input class="coin-market-User-Login-MessageButton" type="password" v-model="user.password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :placeholder="$t('user.LoginAndRegsiter.LoginPassword')">
                    </div>
                    <div class="coin-market-User-Login-Message-Code">
                        <div class="coin-market-User-Login-Message-Code-Img">
                            <img :src="CodeImg" alt="" v-on:click="ChangeImg" id="ChangeImgClick">
                        </div>
                        <input class="coin-market-User-Login-MessageButton" type="text" v-model="user.vcode" :placeholder="$t('user.LoginAndRegsiter.Pictureverificationcode')" @input="PlaceholderVcode">
                    </div>
                    <input class="coin-market-User-Login-submit" type="submit" :value="$t('user.LoginAndRegsiter.LoginTitle1')+'  '+$t('user.LoginAndRegsiter.LoginTitle2')">
                    <section class="RegAndForget">
                        <nuxt-link :to="{path: `/user/Forgetthepassword`}" class="Forgetthepassword">{{$t('user.LoginAndRegsiter.Forgetthepassword')}}?</nuxt-link>
                        <nuxt-link :to="{path: `/user/Register`}" class="CreateAccount">{{$t('user.LoginAndRegsiter.CreateAccount')}}</nuxt-link>
                    </section>
                </form>
            </section>
        </div>
    </div>
    <section class="GoogleCodePopup" v-show="GoogleCodePopupCloseState">
        <section class="GoogleCodePopup-Content">
            <section class="GoogleCodePopup-Title">
                {{this.$t('user.LoginAndRegsiter.InputGoogleCode')}}
                <i class="el-icon-close" @click="GoogleCodePopupClose"></i>
            </section>
            <section class="GoogleCodePopup-Input">
                <section class="GoogleCodePopup-Input-Title">
                    {{this.$t('user.LoginAndRegsiter.SecurityVerification')}}
                </section>
                <input type="text" v-model="user.googleCode">
            </section>
            <section class="GoogleCodePopup-Input-Submit">
                <button @click="LoginSubmit">{{this.$t('user.LoginAndRegsiter.Verification')}}</button>
            </section>
            <section class="GoogleCodePopup-Input-Prompt">
                {{this.$t('user.LoginAndRegsiter.ContactCustomerService')}}
            </section>
        </section>
    </section>
    <About/>
  </section>
</template>

<script>
import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import {baseUrl} from '@/plugins/request';
import md5 from 'js-md5';
import {LoginAndRegister} from '~/api/LoginAndRegister';

export default {
    components: {
        Head,
        About,
    },
    head () {
        return {title: 'Coinmarket '+this.$t('common.header.Login')}
    },
    data() {
        return {
            CodeImg: '',
            user: {
                lan: this.$store.state.locale,
                type: '',
                loginName: '',
                password: '',
                vcode: '',
                googleCode: '',
            },
            GoogleCodePopupCloseState: false,
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
        this.CodeImg = baseUrl+"/web_user/generate_validate_code";
        if(this.$route.query.ref !== undefined && this.$route.query.ref !== ''){
            document.getElementById('RegisterClick').click();
        }
    },
    methods: {
        GoogleCodePopupClose(){
            document.getElementById('ChangeImgClick').click();
            this.GoogleCodePopupCloseState = false;
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
        submit() {
            //手机邮箱类型判断
            var regPhone = (/^[0-9]*$/).test(this.user.loginName);
            var regEmail = (new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")).test(this.user.loginName);
            if(this.user.loginName === ""){
                this.$Message({
                message: this.$t('user.LoginAndRegsiter.InputPhoneOrEmail'),
                type: 'error',
                center: true,
                });
                return;
            }else if(regPhone === true){
                this.user.type = 0;
            }else if(regEmail === true){
                this.user.type = 1;
            }else{
                this.$Message({
                    message: this.$t('user.LoginAndRegsiter.IsNotPhoneOrEmail'),
                    type: 'error',
                    center: true,
                });
                return;
            }

            let Md5Password = md5(md5(md5(this.user.password)));
            let isBindGoogleMsg = {
                type: this.user.type,
                loginName: this.user.loginName,
                password: Md5Password,
                vcode: this.user.vcode,
            }
            LoginAndRegister.isGoogleBind(isBindGoogleMsg).then((response) => {
                if(response.result === true){
                    this.user.googleCode = "";
                    this.GoogleCodePopupCloseState = true;
                }else{
                    this.LoginSubmit();
                }
            }).catch((err) => {
                document.getElementById('ChangeImgClick').click();
                console.log('login err: ', err);
            });


        },
        LoginSubmit(){
            let Md5Password = md5(md5(md5(this.user.password)));

            let UserMsg = {
                type: this.user.type,
                loginName: this.user.loginName,
                password: Md5Password,
                googleCode: this.user.googleCode,
            }

            // 调用登录及其操作
            LoginAndRegister.login(UserMsg).then((response) => {
                this.GoogleCodePopupCloseState = false;
                this.$Message({
                    message: response.msg,
                    type: 'success',
                    center: true,
                });
                this.$store.commit('SET_UID', response.result.user.fshowid);
                this.$store.commit('SET_TOKEN', response.result.token);
                this.$store.commit('SET_FEMAIL', response.result.user.femail);
                this.JumpPath();
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },
        JumpPath(){
            this.$router.push('/')
            this.$destroy();
            //跳转前一个页面
            // if (this.$route.query.goindex === 'true' || this.$route.path === `/${this.user.lan}/user/Login`) {
            //     this.$router.push('/')
            //     this.$destroy();
            // }else{
            //     this.$router.back(-1)
            //     this.$destroy();
            // }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .GoogleCodePopup{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1999;
        background-color: rgba(51, 51, 51, 0.7);
        .GoogleCodePopup-Content{
            position: relative;
            width: 498px;
            padding-bottom: 20px;
            margin: 280px auto;
            background: #2e2e46;
            border-radius: 5px;
            .GoogleCodePopup-Title{
                font-size: 24px;
                text-align: center;
                padding: 19px 0;
                border-bottom: 1px solid #999999;
                i{
                    position: absolute;
                    right: 10px;
                    cursor: pointer;
                }
            }
            .GoogleCodePopup-Input{
                padding: 19px 0;
                text-align: center;
                .GoogleCodePopup-Input-Title{
                    padding: 14px 0;
                    font-size: 14px;
                }
                input{
                    width: 314px;
                    height: 48px;
                    line-height: 48px;
                    font-size: 18px;
                    outline: none;
                    border: 1px solid #3366cc;
                    text-align: center;
                    color: #d8d8d8;
                    background-color: #111122;
                }
            }
            .GoogleCodePopup-Input-Submit{
                width: 160px;
                height: 44px;
                margin: 14px auto;
                button{
                    background: transparent;
                    outline: none;
                    border: none;
                    height: 44px;
                    width: 100%;
                    line-height: 44px;
                    color: #d8d8d8;
                    background: #3366cc;
                    border-radius: 3px;
                    font-size: 18px;
                }
                button:hover{
                    background-color: #2e56a6;
                }
            }
            .GoogleCodePopup-Input-Prompt{
                color: #d8d8d8;
                font-size: 14px;
                width: 314px;
                margin: 0 auto;
                padding: 10px 0;
                text-align: center;
            }
        }
    }
</style>
<style>
    .coin-market-User{
        width: 100%;
        background: url(~/assets/img/user/UserBackground.png) no-repeat center top;
    }
    .coin-market-User-Content{
        position: relative;
        overflow: hidden;
        width: 421px;
        margin: 0 auto;
        padding: 230px 0px 693px 0px;
    }
    .coin-market-User-Content-Login{
        position: relative;
        overflow: hidden;
        padding-bottom: 50px;
        width: 100%;
        border-radius: 10px;
        background: linear-gradient(left, #191c2a, #2f2e46);
    }
    .coin-market-User-Content-Login-Title{
        letter-spacing: 5px;
        text-align: center;
        font-size: 18px;
        padding: 35px 0;
        padding-left: 5px;
    }
    .coin-market-User-Content-Login>form{
        width: 292px;
        margin: 0 auto;
    }
    .coin-market-User-Content-Login>form input{
        width: 100%;
        outline: none;
        border: none;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
    }
    .coin-market-User-Login-Message{
        margin-bottom: 10px;
    }
    .coin-market-User-Login-Message>input{
        width: 252px !important;
        margin-left: 2px;
        background-color: #1d1e2f;
        color: #d8d8d8 !important;
        /* color: #515481; */
    }
    .coin-market-User-Login-Message-icon{
        width: 38px;
        height: 38px;
        line-height: 38px;
        float: left;
        background-color: #131422;
    }
    .coin-market-User-Login-Message-icon>img{
        display: block;
        padding: 10px 0;
        margin: 0 auto;
    }
    .coin-market-User-Login-MessageButton-User{
        color: #d8d8d8 !important;
    }
    .coin-market-User-Login-Message-Code{
        margin-top: 29px;
        margin-bottom: 44px;
    }
    .coin-market-User-Login-Message-Code-Img{
        width: 77px;
        height: 38px;
        float: left;
        background-color: #131422;
    }
    .coin-market-User-Login-Message-Code-Img>img{
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .coin-market-User-Login-Message-Code>.coin-market-User-Login-MessageButton{
        width: 214px;
        color: #d8d8d8 !important;
        background-color: #1d1e2f;
        margin-left: 1px;
    }
    .coin-market-User-Login-submit{
        border-radius: 3px;
        color: #d8d8d8;
        background: #3366cc;
        font-size: 18px;
    }
    .coin-market-User-Login-submit:hover{
        background-color: #2e56a6;
    }
    .coin-market-User-Content-Login input::-webkit-input-placeholder{
        color: #515481;
    }
    .coin-market-User-Content-Login input::-moz-placeholder{
        color: #515481;
    }
    .coin-market-User-Content-Login input::-ms-placeholder {
        color: #515481;
    }
    .RegAndForget{
        margin-top: 33px;
    }
    .Forgetthepassword{
        display: block;
        float: left;
        color: #d8d8d8;
    }
    .CreateAccount{
        display: block;
        float: right;
        color: #d8d8d8;
    }
</style>
