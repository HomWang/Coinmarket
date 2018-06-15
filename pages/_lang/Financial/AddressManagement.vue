<template>
  <section class="container" id="AddressManagement">
    <Head/>
    <section class="NoticeList">
      <section class="NoticeList-Title">
        <span><nuxt-link :to="{path: '/Financial/assets'}">{{Assets}}</nuxt-link></span> > <span>{{AddressManagementTitle}}</span>
      </section>
      <section class="NoticeList-List AddressManagement-List">
        <section class="NoticeList-List-Title-Content">
          <section class="AddressManagement">
            <section class="AddressManagement-left">
                <el-select v-model="TitleSelectValue" slot="prepend" :placeholder="SelectCurrency">
                    <el-option :label="item.name" v-for="(item, index) in getCoinTypeListMsg" :key="index" :value="item.id"></el-option>
                </el-select>
                <el-input :placeholder="InputCurrencyHref" v-model="CurrencyAddress" @input="PlaceholderCurrencyAddress" clearable></el-input>
                <el-input :placeholder="Remark" v-model="CurrencyRemarks" clearable></el-input>
            </section>
            <button class="AddressButton" @click="VerificationShow">{{Add}}</button>
          </section>
        </section>
        <section class="AddressManagement">
            <section class="AddressList">{{HrefList}}</section>
            <section class="coin-market-AddressManagement-right-List-Details">
                <section class="coin-market-AddressManagement-right-List-Details">
                    <section class="coin-market-AddressManagement-right-List-Details-title">
                        <el-select v-model="ContentSelectValue" @change="CurrencySelect" slot="prepend" :placeholder="''">
                            <el-option :label="item.name" v-for="(item, index) in getCoinTypeListMsgContent" :key="index" :value="item.id"></el-option>
                        </el-select>
                        <section class="AddressManagementSelectCoin">
                            {{Currency}}
                        </section>
                    </section>
                    <section class="coin-market-AddressManagement-right-List-Details-title">
                        {{CurrencyHref}}
                    </section>
                    <section class="coin-market-AddressManagement-right-List-Details-title">
                        {{CurrencyRemark}}
                    </section>
                    <!-- <section class="coin-market-AddressManagement-right-List-Details-title" style="display: none;">
                        {{Operation}}
                    </section> -->
                </section>
                <section class="coin-market-AddressManagement-right-List-Details" v-for="(item, index) in AddressList" :key="index">
                    <section class="coin-market-AddressManagement-right-List-Details-list">
                        {{item.fcoinname}}
                    </section>
                    <section class="coin-market-AddressManagement-right-List-Details-list">
                        {{item.fadderess}}
                    </section>
                    <section class="coin-market-AddressManagement-right-List-Details-list">
                        {{item.fremark}}
                    </section>
                    <!-- <section class="coin-market-AddressManagement-right-List-Details-list TextYellowColor" style="display: none;">
                        {{Delete}}
                    </section> -->
                </section>
            </section>
        </section>
      </section>
    </section>
    <transition name="el-fade-in-linear">
        <section id="AddressCoverLayer" v-show="VerificationState">
            <section class="AddressCoverLayer-Content">
                <section class="AddressCoverLayer-Content-Title">
                    <img src="@/assets/img/CurrencyLogo/613997814333800743.png" alt="">
                    <span>{{SecurityVerification}}</span>
                    <img src="@/assets/img/CurrencyLogo/x.png" class="AddressCoverLayer-Content-Title-X" @click="VerificationClose"/>
                </section>
                <section class="AddressCoverLayer-Content-Content">
                    <section class="AddressCoverLayer-Content-Content-Code">
                        <p>{{PhoneCodeName}}</p>
                        <section class="AddressCoverLayer-Content-Content-Code-Input">
                            <input type="text" v-model="phoneCode" @input="PlaceholderPhoneCode">
                            <button class="AddressCoverLayer-Content-Content-GetCode" type="button" :disabled="PhoneDisabled" @click="GetPhoneCode">{{PhoneBtntxt}}</button>
                        </section>
                    </section>
                    <section class="AddressCoverLayer-Content-Content-Code VerificationEmail">
                        <p>{{Email}}</p>
                        <section class="AddressCoverLayer-Content-Content-Code-Input">
                            <input type="text" v-model="FemailName" disabled="disabled">
                        </section>
                    </section>
                    <section class="AddressCoverLayer-Content-Content-Code">
                        <p>{{EmailCodeName}}</p>
                        <section class="AddressCoverLayer-Content-Content-Code-Input">
                            <input type="text" v-model="emailCode" @input="PlaceholderEmailCode">
                            <button class="AddressCoverLayer-Content-Content-GetCode" type="button" :disabled="EmailDisabled" @click="GetEmailCode">{{EmailBtntxt}}</button>
                        </section>
                    </section>
                    <section class="AddressCoverLayer-Content-Content-Code">
                        <p>{{GoogleCodeName}}</p>
                        <section class="AddressCoverLayer-Content-Content-Code-Input">
                            <input type="text" v-model="totpCode">
                        </section>
                    </section>
                    <button class="AddressButton" @click="Add_Address">{{Submit}}</button>
                </section>
            </section>
        </section>
    </transition>
    <About/>
  </section>
</template>

<script>
import {Home} from '~/api/Home';
import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import {PersonalCenter} from '~/api/PersonalCenter';
import {LoginAndRegister} from '~/api/LoginAndRegister';
import userRequest from '~/api/userRequest';
import Bus from '~/plugins/bus.js'

export default {
  components: {
    Head,
    About,
  },
  data() {
    return {
        tableData: [],
        getCoinTypeListMsg: [],
        getCoinTypeListMsgContent: [],
        TitleSelectValue: '',
        ContentSelectValue: '',
        CurrencyAddress: '',
        CurrencyRemarks: '',
        input5: '',
        VerificationState: false,
        AddressList: [],
        totpCode: '',
        phoneCode: '',
        emailCode: '',
        FemailName: '',
        PhoneTime: 0,
        EmailTime: 0,
        PhoneDisabled:false,
        EmailDisabled:false,
        PhoneBtntxt: this.$t('finance.AddressManagement.GetCode'),
        EmailBtntxt: this.$t('finance.AddressManagement.GetCode'),
        AddressManagementTitle: this.$t('finance.AddressManagementTitle'),
        Assets: this.$t('finance.AddressManagement.Assets'),
        SelectCurrency: this.$t('finance.AddressManagement.SelectCurrency'),
        InputCurrencyHref: this.$t('finance.AddressManagement.InputCurrencyHref'),
        Remark: this.$t('finance.AddressManagement.Remark'),
        Add: this.$t('finance.AddressManagement.Add'),
        HrefList: this.$t('finance.AddressManagement.HrefList'),
        Currency: this.$t('finance.AddressManagement.Currency'),
        CurrencyHref: this.$t('finance.AddressManagement.CurrencyHref'),
        CurrencyRemark: this.$t('finance.AddressManagement.CurrencyRemark'),
        SecurityVerification: this.$t('finance.AddressManagement.SecurityVerification'),
        PhoneCodeName: this.$t('finance.AddressManagement.PhoneCodeName'),
        Email: this.$t('finance.AddressManagement.Email'),
        EmailCodeName: this.$t('finance.AddressManagement.EmailCodeName'),
        GoogleCodeName: this.$t('finance.AddressManagement.GoogleCodeName'),
        Submit: this.$t('finance.AddressManagement.Submit'),
        GetCode: this.$t('finance.AddressManagement.GetCode'),
        AfterGet: this.$t('finance.AddressManagement.AfterGet'),
        InputPhone: this.$t('finance.AddressManagement.InputPhone'),
        PhoneFormat: this.$t('finance.AddressManagement.PhoneFormat'),
        PhoneBind: this.$t('finance.AddressManagement.PhoneBind'),
        EmailBind: this.$t('finance.AddressManagement.EmailBind'),
        GoogleBind: this.$t('finance.AddressManagement.GoogleBind'),
        SorryUserNameNotComplete: this.$t('finance.AddressManagement.SorryUserNameNotComplete'),
        WhetherGoToBind: this.$t('finance.AddressManagement.WhetherGoToBind'),
        Prompt: this.$t('finance.AddressManagement.Prompt'),
        Sure: this.$t('finance.AddressManagement.Sure'),
        Cancel: this.$t('finance.AddressManagement.Cancel'),
        HrefNotNull: this.$t('finance.AddressManagement.HrefNotNull'),
        Operation: this.$t('finance.AddressManagement.Operation'),
        Edit: this.$t('finance.AddressManagement.Edit'),
        Delete: this.$t('finance.AddressManagement.Delete'),
        CancelOut: this.$t('finance.AddressManagement.CancelOut'),
    }
  },
  head () {
    return {
      title: "Coinmarket "+this.$t('finance.AddressManagementTitle'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('finance.AddressManagementTitle') }
      ]
    }
  },
  mounted(){
        this.FemailName = this.$store.state.femail;
        this.coin_withdraw_address();
        this.getCoinTypeList();
  },
  methods: {
      PlaceholderEmailCode(){
        let RegVlaue = this.emailCode.replace(/[^\u4E00-\u9FA5]/g,'');
        if(RegVlaue !== ''){
            this.emailCode = "";
        }
      },
      PlaceholderPhoneCode(){
        let RegVlaue = this.phoneCode.replace(/[^\u4E00-\u9FA5]/g,'');
        if(RegVlaue !== ''){
            this.phoneCode = "";
        }
      },
      PlaceholderCurrencyAddress(){
        let RegVlaue = this.CurrencyAddress.replace(/[^\u4E00-\u9FA5]/g,'');
        if(RegVlaue !== ''){
            this.CurrencyAddress = "";
        }
      },
      //获取币种列表
      getCoinTypeList(){
          PersonalCenter.getCoinTypeList().then((response) => {
            this.getCoinTypeListMsg = response.result;
            this.getCoinTypeListMsgContent = response.result;
        }).catch((err) => {
            console.log('login err: ', err);
        });
      },
      //短信发送验证码
      GetPhoneCode(){
        let ObjType = {
            type: 108//108 提现短信验证码
        }
        PersonalCenter.send_sms(ObjType).then((response) => {
            this.PhoneTime = 60;
            this.PhoneDisabled = true;
            this.PhoneTimer();
        }).catch((err) => {
            console.log('login err: ', err);
        });
      },
      //邮箱发送验证码
      GetEmailCode(){
        let ObjType = {
            type: 210//210 提现邮箱验证码
        }
        PersonalCenter.send_email(ObjType).then((response) => {
            this.EmailTime = 60;
            this.EmailDisabled = true;
            this.EmailTimer();
        }).catch((err) => {
            console.log('login err: ', err);
        });
      },
      PhoneTimer(){
        if (this.PhoneTime > 0) {
            this.PhoneTime--;
            this.PhoneBtntxt = this.PhoneTime+this.AfterGet;
            setTimeout(this.PhoneTimer, 1000);
        } else{
            this.PhoneTime = 0;
            this.PhoneBtntxt = this.GetCode;
            this.PhoneDisabled=false;
        }
      },
      EmailTimer(){
        if (this.EmailTime > 0) {
            this.EmailTime--;
            this.EmailBtntxt = this.EmailTime+this.AfterGet;
            setTimeout(this.EmailTimer, 1000);
        } else{
            this.EmailTime = 0;
            this.EmailBtntxt = this.GetCode;
            this.EmailDisabled=false;
        }
      },
      PhoneCode(){
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(this.user.regName==''){
                this.$Message({
                    message: this.InputPhone,
                    type: 'error',
                    center: true,
                });
            }else if(!reg.test(this.user.regName)){
                this.$Message({
                    message: this.PhoneFormat,
                    type: 'error',
                    center: true,
                });
            }else{
                let PhoneCaptcha = {
                    type: 124, //111 网页端注册帐号 109找回登录密码-手机找回 102绑定手机 107修改交易密码 106修改登录密码
                    msgtype: 1,
                    areaCode: this.user.areaCode,
                    phone: this.user.regName
                }
                // 调用电话验证码及其操作
                LoginAndRegister.send_sms(PhoneCaptcha).then((response) => {
                    this.$Message({
                        message: response.msg,
                        type: 'success',
                        center: true,
                    });
                    this.time = 60;
                    this.disabled = true;
                    this.timer();
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            }
      },
      VerificationClose(){
          this.VerificationState = false;
      },
      VerificationShow(){
        if(this.TitleSelectValue !== '' && this.CurrencyAddress !== '' && this.CurrencyRemarks !== ''){
            userRequest.getSecurityLevel().then(res => {
                let fistelephonebind = res.result.fuser.fistelephonebind === true?'':this.PhoneBind;
                let fismailbind = res.result.fuser.fismailbind === true?'':this.EmailBind;
                let fgooglebind = res.result.fuser.fgooglebind === true?'':this.GoogleBind;
                let ConfirmPrompt = `${fistelephonebind}${fismailbind}${fgooglebind}`;
                let ConfirmPromptSlice = ConfirmPrompt.charAt(ConfirmPrompt.length-1) === '、'?ConfirmPrompt.slice(0, ConfirmPrompt.length-1):ConfirmPrompt.charAt(ConfirmPrompt.length-1);
                if(res.result.fuser.fistelephonebind === true && res.result.fuser.fismailbind === true && res.result.fuser.fgooglebind === true){
                    this.VerificationState = true;
                }else{
                    // 跳转到安全认证
                    this.$confirm(`${this.SorryUserNameNotComplete}${ConfirmPromptSlice}${this.WhetherGoToBind}?`, this.Prompt, {
                        confirmButtonText: this.Sure,
                        cancelButtonText: this.Cancel,
                        type: 'warning'
                    }).then(() => {
                        this.$router.push({path:'/user/security'});
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.CancelOut
                        });
                    });
                }
            }).catch(err => {
              console.log('err: ', err);
            });
        }else{
            this.$Message({
            message: this.HrefNotNull,
            type: 'error',
            center: true,
        });
        }
      },
      coin_withdraw_address(SymbolID){
        //获取提现地址列表
        let SymbolObj = {
            symbol: Number(SymbolID) ? Number(SymbolID): ''
        }
        PersonalCenter.coin_withdraw_address(SymbolObj).then((response) => {
            this.AddressList = response.result;
        }).catch((err) => {
            console.log('login err: ', err);
        });
      },
      Add_Address(){
        //添加提现地址列表
        let save_withdraw_address = {
            totpCode: this.totpCode,//谷歌验证码
            phoneCode: this.phoneCode,//手机验证码
            emailCode: this.emailCode,//邮箱验证码
            symbol: this.TitleSelectValue,//币种
            withdrawAddr: this.CurrencyAddress,//提现地址编号
            remark: this.CurrencyRemarks,//备注
        }
        PersonalCenter.save_withdraw_address(save_withdraw_address).then((response) => {
            this.coin_withdraw_address();
            this.VerificationState = false;
            this.$Message({
                message: response.msg,
                type: 'success',
                center: true,
            });
        }).catch((err) => {
            console.log('login err: ', err);
        });
      },
      CurrencySelect(){
        this.Currency = "";
        this.coin_withdraw_address(this.ContentSelectValue);
      }
    }
}
</script>
<style>
    .AddressManagement-List{
        padding: 15px 45px;
        background-color: #222222;
    }
  .NoticeList-List-Title-left{
    padding-left: 20px;
    border-left: 2px solid #000000;
  }
  .AddressManagement{
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    overflow: hidden;
  }
  .AddressManagement:nth-child(1){
    border-bottom: 1px solid #a9a9a9;
  }
  .AddressManagement:nth-child(2){
    padding-bottom: 40px;
  }
  .AddressManagement:nth-child(2):hover, .AddressManagement:nth-child(1):hover{
      background-color: transparent;
  }
  .AddressManagement-Left{
    width: 90%;
    float: left;
    text-align: left;
  }
  .AddressManagement-Left>a{
    color: #000000;
  }
  .AddressManagement-right{
    width: 10%;
    float: right;
    text-align: right;
  }
  .AddressManagement-left>.el-select{
      width: 12%;
  }
  .el-select>.el-input{
      width: 100% !important;
  }
  #AddressManagement .el-input{
      width: 39%;
      margin-left: 5%;
  }
  #AddressManagement .AddressButton{
    margin-top: 20px;
    float: right;
    min-width: 140px;
    background-color: #6d7dab;
    border: 1px solid #6d7dab;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #d8d8d8;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 7px 20px;
    font-size: 14px;
    border-radius: 4px;
    border: 0;
  }
  #AddressManagement .AddressButton:hover{
      background-color: #55607e;
  }
  .AddressList{
        text-align: left;
        font-size: 16px;
        margin-bottom: 10px;
        color: #d8d8d8;
  }
    .coin-market-AddressManagement-right-List-Details, .Recharge-Service {
        position: relative;
        overflow: hidden;
    }
    .coin-market-AddressManagement-right-List-Details-title, .coin-market-AddressManagement-right-List-Details-list{
        height: 51px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #1c1f2a;
        padding: 16px 0;
        border-bottom: 1px solid #a9a9a9;
    }
    .coin-market-AddressManagement-right-List-Details-list:nth-child(1){
        padding-left: 15px;
    }
    .coin-market-AddressManagement-right-List-Details>.coin-market-AddressManagement-right-List-Details-title:nth-child(1), .coin-market-AddressManagement-right-List-Details-list:nth-child(1) {
        width: 20%;
        text-align: left;
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details>.coin-market-AddressManagement-right-List-Details-title:nth-child(2), .coin-market-AddressManagement-right-List-Details>.coin-market-AddressManagement-right-List-Details-title:nth-child(3), .coin-market-AddressManagement-right-List-Details-list:nth-child(2), .coin-market-AddressManagement-right-List-Details-list:nth-child(3) {
        width: 40%;
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details>.coin-market-AddressManagement-right-List-Details-title:nth-child(4), .coin-market-AddressManagement-right-List-Details-list:nth-child(4){
        width: 15%;
    }
    .TextYellowColor:hover {
        color: #91a7c2 !important;
        cursor: pointer;
    }
    .coin-market-AddressManagement-right-List-Details .el-select{
        width: 30%;
        max-width: 100px;
        min-width: 90px;
    }
    .el-popper[x-placement^=bottom] .popper__arrow::after{
        border-bottom-color: #222222;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner{
        border: 0;
        height: auto;
        font-size: 15px;
        background-color: transparent !important;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner .el-select .el-input .el-select__caret{
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner::-webkit-input-placeholder {
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner:-moz-placeholder {
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner::-moz-placeholder {
        color: #d8d8d8;
    }
    .coin-market-AddressManagement-right-List-Details .el-select .el-input--suffix .el-input__inner:-ms-input-placeholder {
        color: #d8d8d8;
    }
    #AddressCoverLayer{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
    }
    #AddressManagement .AddressCoverLayer-Content{
        position: fixed;
        top: 20%;
        left: 50%;
        width: 492px;
        height: 572px;
        background-color: #404051;
        margin-left: -246px;
        border-radius: 5px;
    }
    .AddressCoverLayer-Content-Title{
        padding: 16px 35px;
        font-size: 24px;
        height: 65px;
        width: 100%;
        color: #ffc200;
        background-color: #1c1f2a;
        border-radius: 5px 5px 0 0;
    }
    .AddressCoverLayer-Content-Title>img{
        float: left;
        margin-right: 10px;
    }
    .AddressCoverLayer-Content-Title>span{
        line-height: 30px;
    }
    .AddressCoverLayer-Content-Title-X{
        float: right !important;
        margin-top: 5px;
        cursor: pointer;
    }
    .AddressCoverLayer-Content-Content{
        padding: 23px 37px;
        font-size: 14px;
    }
    .AddressCoverLayer-Content-Content-Code{
        width: 100%;
        padding-bottom: 30px;
    }
    .AddressCoverLayer-Content-Content-Code>p{
        font-size: 16px;
        color: #d8d8d8;
    }
    .AddressCoverLayer-Content-Content-Code-Input{
        position: relative;
        width: 100%;
    }
    .AddressCoverLayer-Content-Content-Code-Input>input{
        width: 100%;
        border: 0;
        height: 39px;
        line-height: 39px;
        background-color: transparent;
        border: 1px solid #d8d8d8;
        border-radius: 5px;
        outline: none;
        padding-left: 14px;
        padding-right: 104px;
        color: #d8d8d8;
    }
    .AddressCoverLayer-Content-Content-GetCode{
        height: 27px;
        line-height: 27px;
        width: 110px;
        position: absolute;
        text-align: center;
        right: 0;
        top: 6px;
        color: #ffc200;
        border-left: 1px solid #d8d8d8 !important;
        background: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
    }
    .VerificationEmail .AddressCoverLayer-Content-Content-Code-Input>input{
        color: #000000;
        background-color: #dcdcdc;
    }
    .AddressCoverLayer-Content-Content .AddressButton{
        margin-top: 0;
        font-size: 18px;
        color: #ffc200;
        background-color: #1c1f2a;
        border: 0;
    }
    .AddressCoverLayer-Content-Content .AddressButton:hover{
        background-color: #202435;
    }
    .AddressManagementSelectCoin{
        position: absolute;
        top: 15px;
        left: 24px;
    }
</style>
