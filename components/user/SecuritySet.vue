<template>
  <section class="cm-security">

    <!-- 安全等级区域 -->
    <section class="cm-security-unit">
      <cm-secur-title :title="$t('user.security.Level')">
        <span style="float: right; padding-top:10px;">
          <span>UID</span><span class="cm-secur-uid">{{$store.state.uid}}</span>
        </span>
      </cm-secur-title>
      <el-row style="height: 40px; margin: 20px 0 0 0">
        <el-col :span="10" class="cm-sercur__level">
          <div class="cm-secur-level-unit"
               :class="{'cm-back__red': bindCount<=2, 'cm-back__yellow': bindCount>2 && bindCount<=4, 'cm-back__green': bindCount>4}">
          </div>
          <div class="cm-secur-level-unit"
               :class="{'cm-back__grey': bindCount<=2, 'cm-back__yellow': bindCount>2 && bindCount<=4, 'cm-back__green': bindCount>4}">
          </div>
          <div class="cm-secur-level-unit" :class="{'cm-back__grey': bindCount<=4, 'cm-back__green': bindCount>4}">
          </div>
          <span
            :class="{'cm-color__red': bindCount<=2, 'cm-color__yellow': bindCount>2 && bindCount<=4, 'cm-color__green': bindCount>4}">{{securLevel}}</span>
        </el-col>
      </el-row>
    </section>

    <!-- 五种安全工具绑定区 -->
    <section class="cm-security-unit" style="padding-bottom: 20px">
      <cm-secur-title :title="$t('user.security.SecuritySet')">
        <span style="float: right; color: #999">{{$t('user.security.Level5Security')}}</span>
      </cm-secur-title>
      <cm-secur-row v-for="(item, index) in bindArea"
                    :key="index"
                    :name="item.type"
                    :content="item.content"
                    :action="item.actionLable"
                    :icon="item.icon"
                    :isBound="item.bind"
                    @click-set="handleBindRequest(index)">
      </cm-secur-row>
    </section>

    <!-- 实名认证区域 -->
    <section class="cm-security-unit" style="padding-bottom: 20px;">
      <cm-secur-title :title="$t('user.security.Auth')">
        <span style="padding-left: 10px; color: #aaa">{{$t('user.security.AuthCotent')}}</span>
      </cm-secur-title>
      <el-steps :active="activeStep" simple finish-status="finish" class="SecurityAuthCotentTitle">
        <el-step v-for="(item, index) in steps"
                 :key="index"
                 :title="item.title"
                 :icon="item.icon"
                 :status="item.status"
                 @click.native="clickStep(index)">
        </el-step>
      </el-steps>

      <!-- 一级实名认证 -->
      <section class="cm-step-content" v-if="activeStep===0">
        <LevelOne v-if="$store.state.realStatus.level1===10" @auth-success="handleAuthSuccess"></LevelOne>
        <div v-show="$store.state.realStatus.level1===1" style="padding: 40px 60px;">
          <div class="cm-auth-content">
            <div class="cm-auth-content__left">{{$t('user.SecurityCenter.Nationality')}}</div>
            <div class="cm-auth-content__right">{{authContent.country}}</div>
          </div>
          <div class="cm-auth-content">
            <div class="cm-auth-content__left">{{$t('user.SecurityCenter.Name')}}</div>
            <div class="cm-auth-content__right">{{authContent.name}}</div>
          </div>
          <div class="cm-auth-content">
            <div class="cm-auth-content__left">
              {{authContent.isChinese ? $t('user.SecurityCenter.IDCard') : $t('user.SecurityCenter.PassportID')}}
            </div>
            <div class="cm-auth-content__right">{{identityNo}}</div>
          </div>
        </div>
      </section>

      <!-- 二级实名认证 -->
      <section class="cm-step-content" v-if="activeStep===1">
        <LevelTwo v-if="$store.state.realStatus.level2===10 || reApply" @auth-success="handleAuthSuccess"></LevelTwo>
        <section v-if="$store.state.realStatus.level2===1" style="text-align: center">
          <button type="button" class="cm-reapply" style="cursor: default; margin: 60px auto;">{{$t('user.SecurityCenter.AuditHasPassed')}}</button>
          {{$t('user.SecurityCenter.MsgProtection')}}
        </section>
        <div v-show="$store.state.realStatus.level2!==10 && $store.state.realStatus.level2!==1 && !reApply" style="width: 90%; padding: 40px 60px;">
          <section style="display: flex; justify-content: space-around;">
            <img v-for="(img, index) in level2Imgs" :key="index" :src="img" width="206" height="132">
          </section>
          <hr>
          <section v-if="$store.state.realStatus.level2===0" style="text-align: center">
            {{$t('user.SecurityCenter.ApplicationLoading')}}
          </section>
          <section v-if="$store.state.realStatus.level2===1" style="text-align: center">
            {{$t('user.SecurityCenter.MsgProtection')}}
          </section>
          <section v-if="$store.state.realStatus.level2===2 && !reApply" style="text-align: center">
            {{$t('user.SecurityCenter.NotThrough1')}}{{authLevel2.dismissReason}}{{$t('user.SecurityCenter.NotThrough2')}}
            <button type="button" class="cm-reapply" @click="reApply=true">{{$t('user.SecurityCenter.Reapply')}}
            </button>
          </section>
        </div>
      </section>

      <!-- 三级实名认证 -->
      <section class="cm-step-content" v-if="activeStep===2">
        <div class="cm-content-contianer">
          <div class="cm-content-up">
            <p>{{$t('user.SecurityCenter.CertificationAffirm1')}}</p>
            <p>1. {{$t('user.SecurityCenter.CertificationAffirm2')}}</p>
            <p>
              2. {{$t('user.SecurityCenter.CertificationAffirm3')}}<span>{{$t('user.SecurityCenter.CertificationAffirm4')}}</span>。
            </p>
            <p>3. {{$t('user.SecurityCenter.CertificationAffirm5')}}</p>
            <p>
              4. {{$t('user.SecurityCenter.CertificationAffirm6')}}<span>{{$t('user.SecurityCenter.CertificationAffirm7')}}</span>{{$t('user.SecurityCenter.CertificationAffirm8')}}
            </p>
            <p>5. {{$t('user.SecurityCenter.CertificationAffirm9')}}</p>
          </div>
          <div class="cm-content-middle">
            <p>{{$t('user.SecurityCenter.CertificationAffirm10')}}</p>
          </div>
          <div class="cm-content-paper">
            {{$t('user.SecurityCenter.CertificationAffirm11')}}<span>{{$store.state.uid}}</span>{{$t('user.SecurityCenter.CertificationAffirm12')}}<span>xxxxxxxxxxxx</span>{{$t('user.SecurityCenter.CertificationAffirm13')}}
          </div>
          <div class="cm-content-bottom">
            <div style="text-align: center">
              {{status}}
            </div>
            <el-upload v-if="$store.state.realStatus.level3!==1"
                       class="upload-demo"
                       :action="video.formAction"
                       :headers="video.header"
                       accept="video/*"
                       :multiple="false"
                       :on-success="handleVideoSuccess">
              <button size="small" type="primary" class="cm-reapply">
                {{$store.state.realStatus.level3 === 10 ? $t('user.SecurityCenter.ClickUpload') : $t('user.SecurityCenter.AgainUpload')}}
              </button>
              <div slot="tip" class="el-upload__tip">{{$t('user.SecurityCenter.NoMoreThan20MB')}}</div>
            </el-upload>
          </div>
        </div>
      </section>
    </section>

    <!-- 认证表单弹框区 -->
    <!-- 邮箱绑定 -->
    <cm-dialog :visible="dialogEmailVisable" :title="$t('user.security.MailBind')" @click-cancel="handleCancelDialog"
               @click-confirm="handleEmailBind">
      <div slot="body" class="cm-dialog-body">
        <div class="cm-dialog-body__title">{{$t('user.security.BindMail')}}</div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.Mail')}}
          </span>
          <input v-model="emailForm.email" class="cm-dialog-input" type="text" name="">
        </div>
        <div class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.Code')}}
          </span>
          <input v-model="emailForm.code" class="cm-dialog-input" type="text" name="" value="">
          <count-down :sendRequest="handleSendEmailCode" :hasSent="emailForm.hasSent"
                      @time-up="emailForm.hasSent=false"></count-down>
        </div>
      </div>
    </cm-dialog>

    <!-- 手机绑定 -->
    <cm-dialog :visible="dialogPhoneVisable" :title="$t('user.security.BindPhone')" @click-cancel="handleCancelDialog"
               @click-confirm="handlePhoneBind">
      <div slot="body" class="cm-dialog-body" style="position: relative">
        <div class="cm-dialog-body__label" style="margin-top: 20px;">
          <span>{{$t('user.SecurityCenter.AreaCode')}}</span>
          <i18n-tel :toFront="['cn', 'us']" countryCode="cn" showDialCode @excountry="handelCountrySelect"></i18n-tel>
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.Phone')}}
          </span>
          <input v-model="phoneForm.phone" class="cm-dialog-input" type="text" name="" value="">
        </div>
        <div class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.Code')}}
          </span>
          <input v-model="phoneForm.code" class="cm-dialog-input" type="text" name="" value="">
          <count-down :sendRequest="handleSendPhoneCode" :sendData="{type: 102}" :hasSent="phoneForm.hasSent"
                      @time-up="phoneForm.hasSent=false"></count-down>
        </div>
      </div>
    </cm-dialog>

    <!-- 谷歌验证码 -->
    <cm-dialog :visible="dialogGoogleVisable" :title="$t('user.security.GoogleCode')" @click-cancel="handleCancelDialog"
               @click-confirm="handleGoogleBind">
      <div slot="body" class="cm-dialog-body">
        <div class="cm-google-img">
          <div class="cm-gg-img-container" style="background-color: #d73737;">
            <span>{{$t('user.security.NeedGoogle')}}</span>
            <img :src="googleForm.downloadUrl">
          </div>
          <div class="cm-gg-content-container">
            <div style="line-height:16px" :title="$t('user.security.ScanForGoogle')">{{$t('user.security.ScanForGoogle')}}</div>
            <div style="line-height:16px" :title="$t('user.security.ScanOrHand')">{{$t('user.security.ScanOrHand')}}
            </div>
          </div>
          <div class="cm-gg-img-container" style="background-color: #002e73;">
            <span>{{$t('user.security.BindGoogle')}}</span>
            <canvas id="canvas" style="width: 90px; height: 90px; margin-top: 0"></canvas>
          </div>
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.Key')}}
          </span>
          <span class="cm-dialog__inputlike">{{googleForm.secretKey}}</span>
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.Device')}}
          </span>
          <span class="cm-dialog__inputlike">{{googleForm.device}}</span>
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.Code')}}
          </span>
          <input class="cm-dialog-input" type="text" v-model="googleForm.code">
        </div>
      </div>
    </cm-dialog>

    <!-- 解绑谷歌验证码 -->
    <cm-dialog :visible="dialogGoogleUnbindVisable" :title="$t('user.SecurityCenter.UntyingGoogle')"
               @click-cancel="handleCancelDialog" @click-confirm="handleGoogleUnbind">
      <div slot="body" class="cm-dialog-body">
        <div v-if="bindArea[1].bind" class="cm-dialog-body__label">
          <span>
            {{$t('user.SecurityCenter.PhoneCode')}}
          </span>
          <input class="cm-dialog-input" type="text" v-model="googleUnbindForm.phoneCode">
          <count-down :sendRequest="sendCodeToUser"
                      :sendData="{type: 0}"
                      :hasSent="googleUnbindForm.phoneCodeHasSent"
                      @time-up="googleUnbindForm.phoneCodeHasSent=false">
          </count-down>
        </div>
        <div v-if="bindArea[0].bind" class="cm-dialog-body__label">
          <span>
            {{$t('user.SecurityCenter.EmailCode')}}
          </span>
          <input class="cm-dialog-input" type="text" v-model="googleUnbindForm.emailCode">
          <count-down :sendRequest="sendCodeToUser"
                      :sendData="{type: 1}"
                      :hasSent="googleUnbindForm.emailCodeHasSent"
                      @time-up="googleUnbindForm.emailCodeHasSent=false">
          </count-down>
        </div>
      </div>
    </cm-dialog>

    <!-- 登录密码 -->
    <cm-dialog :visible="dialogPwdVisable" :title="$t('user.security.Password')" @click-cancel="handleCancelDialog"
               @click-confirm="handlePwdBind">
      <div slot="body" class="cm-dialog-body">
        <div class="cm-dialog-body__title">
          {{$t('user.security.KeyRequire')}}
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.OldKey')}}
          </span>
          <input v-model="loginForm.oldPwd" class="cm-dialog-input" type="password" name="" value="">
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.NewKey')}}
          </span>
          <input v-model="loginForm.newPwd" class="cm-dialog-input" type="password" name="" value="">
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.ReKey')}}
          </span>
          <input v-model="loginForm.reNewPwd" class="cm-dialog-input" type="password" name="" value="">
        </div>
        <div class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.SmsCode')}}
          </span>
          <input v-model="loginForm.code" class="cm-dialog-input" type="text" name="" value="">
          <count-down :sendRequest="handleSendPhoneCode"
                      :sendData="{type: 106}"
                      :hasSent="loginForm.hasSent"
                      @time-up="loginForm.hasSent=false">
          </count-down>
        </div>
        <div v-if="bindArea[2].bind" class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.GoogleBind')}}
          </span>
          <input v-model="loginForm.googleCode" class="cm-dialog-input" type="text" name="" value="">
        </div>
      </div>
    </cm-dialog>

    <!-- 提现密码 -->
    <cm-dialog :visible="dialogTwdVisable" :title="$t('user.security.WithdrawKey')" @click-cancel="handleCancelDialog"
               @click-confirm="handleTwdBind">
      <div slot="body" class="cm-dialog-body">
        <div class="cm-dialog-body__title">
          <p>{{$t('user.security.WithdrawRequire')}}</p>
          <p>{{$t('user.SecurityCenter.ResetPassword')}}</p>
        </div>
        <div v-if="bindArea[4].bind" class="cm-dialog-body__label">
          <span>
            {{$t('user.SecurityCenter.IDNumber')}}
          </span>
          <input v-model="twdForm.identity" class="cm-dialog-input">
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.NewWithdraw')}}
          </span>
          <input v-model="twdForm.newPwd" class="cm-dialog-input" type="password" name="" value="">
        </div>
        <div class="cm-dialog-body__label">
          <span>
            {{$t('user.security.ReWithdraw')}}
          </span>
          <input v-model="twdForm.reNewPwd" class="cm-dialog-input" type="password" name="" value="">
        </div>
        <div v-if="bindArea[4].bind" class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.SmsCode')}}
          </span>
          <input v-model="twdForm.code" class="cm-dialog-input" type="text">
          <count-down :sendRequest="handleSendPhoneCode"
                      :sendData="{type: 107}"
                      :hasSent="twdForm.hasSent"
                      @time-up="twdForm.hasSent=false">
          </count-down>
        </div>
        <div v-if="bindArea[4].bind" class="cm-dialog-body__label" style="position: relative">
          <span>
            {{$t('user.security.GoogleBind')}}
          </span>
          <input v-model="twdForm.googleCode" class="cm-dialog-input" type="text" name="" value="">
        </div>
      </div>
    </cm-dialog>
  </section>
</template>

<script>
  const QRCode = require('qrcode');
  import md5 from 'js-md5';
  import userRequest from '~/api/userRequest';
  import {LoginAndRegister} from '~/api/LoginAndRegister';
  import Bus from '~/plugins/bus';
  import {baseUrl} from '~/plugins/request';

  import I18nTel from '~/components/public/I18nTel.vue';
  import SecurityTitle from '~/components/user/template/SecurityTitle.vue';
  import SecuritySetRow from '~/components/user/template/SecuritySetRow.vue';
  import LevelOne from '~/components/user/template/LevelOne.vue';
  import LevelTwo from '~/components/user/template/LevelTwo.vue';
  import LevelThree from '~/components/user/template/LevelThree.vue';
  import Dialog from '~/components/public/Dialog.vue';
  import CountDown from '~/components/public/CountDown.vue';

  export default {
    name: 'SecuritySet',

    components: {
      'cm-secur-title': SecurityTitle,
      'cm-secur-row': SecuritySetRow,
      'cm-dialog': Dialog,
      LevelOne,
      LevelTwo,
      LevelThree,
      'i18n-tel': I18nTel,
      CountDown,
    },

    props: {},

    mounted() {
      this.updateSecurStatus();
    },

    data() {
      return {
        reApply: false,  // 是否重新申请二级认证
        bindCount: undefined,  // 安全工具绑定个数
        securLevel: '',

        // 邮箱绑定提交表单
        emailForm: {
          email: '',
          code: '',
          hasSent: false,
        },

        // 手机绑定表单
        phoneForm: {
          areaCode: '86',
          phone: '',
          code: '',
          hasSent: false,
        },

        // 登录密码修改提交表单
        loginForm: {
          oldPwd: '',
          newPwd: '',
          reNewPwd: '',
          code: '',
          googleCode: '',
          hasSent: false,
        },

        // 提现密码修改提交表单
        twdForm: {
          identity: '',
          newPwd: '',
          reNewPwd: '',
          code: '',
          googleCode: '',
          hasSent: false,
        },

        // 谷歌验证码表单
        googleForm: {
          downloadUrl: 'https://static.bichuang.com/upload/identity_picture/201608072322059_GxglZ.png',
          bindUrl: '',
          secretKey: '',
          device: '',
          code: '',
        },

        // 解绑google验证器表单
        googleUnbindForm: {
          phoneCode: '',
          emailCode: '',
          phoneCodeHasSent: false,
          emailCodeHasSent: false
        },

        // 一级实名认证表单
        authContent: {
          isChinese: true,
          name: '',
          country: '',
          id: '',
        },
        activeStep: 0,
        dialogEmailVisable: false,
        dialogPhoneVisable: false,
        dialogGoogleVisable: false,
        dialogGoogleUnbindVisable: false,
        dialogPwdVisable: false,
        dialogTwdVisable: false,
        level2Imgs: [require('~/assets/img/user/certificate0.png'), require('~/assets/img/user/certificate0.png'), require('~/assets/img/user/certificate0.png')],  // 二级实名认证提交的图片

        // 二级实名认证驳回原因
        authLevel2: {
          dismissReason: this.$t('user.SecurityCenter.Unknown'),
        },

        // 三级实名认证表单
        video: {
          formAction: `${baseUrl}/web_security/relthirdlevel`,
          header: {
            lan: this.$store.state.locale,
            token: this.$store.state.token
          },
          fileList: [],
          rejectReson: this.$t('user.SecurityCenter.Unknown'),
        },
        NoThreeLevel: this.$t('user.SecurityCenter.NoThreeLevel'),
        InAudit: this.$t('user.SecurityCenter.InAudit'),
        AuditAdopt: this.$t('user.SecurityCenter.AuditAdopt'),
        AuditNotAdopt: this.$t('user.SecurityCenter.AuditNotAdopt'),
        Untie: this.$t('user.SecurityCenter.Untie'),
        PleaseBindPhone: this.$t('user.SecurityCenter.PleaseBindPhone'),
        PleaseBindGoogle: this.$t('user.SecurityCenter.PleaseBindGoogle'),
        PleaseCompleteTwo: this.$t('user.SecurityCenter.PleaseCompleteTwo'),
        SendCode: this.$t('user.SecurityCenter.SendCode'),
        CodeEmail: this.$t('user.SecurityCenter.CodeEmail'),
        PasswordNonConformity: this.$t('user.SecurityCenter.PasswordNonConformity')
      }
    },

    computed: {

      // 五种安全工具绑定状态
      bindArea() {
        const bindArea = [
          {
            type: this.$t('user.security.MailBind'),
            content: this.$t('user.security.MailNone'),
            actionLable: this.$t('user.security.Bind'),
            icon: 'icm-email',
            bind: false
          },
          {
            type: this.$t('user.security.PhoneBind'),
            content: this.$t('user.security.PhoneNone'),
            actionLable: null,
            icon: 'icm-mobile',
            bind: false
          },
          {
            type: this.$t('user.security.GoogleBind'),
            content: this.$t('user.security.GoogleContent'),
            actionLable: this.$t('user.security.Bind'),
            icon: 'icm-Google',
            bind: false
          },
          {
            type: this.$t('user.security.Password'),
            content: this.$t('user.security.PasswordContent'),
            actionLable: this.$t('user.security.Fix'),
            icon: 'icm-Lock',
            bind: false
          },
          {
            type: this.$t('user.security.Withdraw'),
            content: this.$t('user.security.WithdrawContent'),
            actionLable: this.$t('user.security.Set'),
            icon: 'icm-security',
            bind: false
          },
        ];
        return bindArea;
      },

      // 实名认证步骤对象
      steps() {
        const steps = [
          {title: this.$t('user.security.LevelOne'), icon: 'el-icon-edit-outline'},
          {title: this.$t('user.security.LevelTwo'), icon: 'el-icon-picture-outline'},
          {title: this.$t('user.security.LevelThree'), icon: 'el-icon-upload'}
        ];
        for (let i = 0; i < steps.length; i++) {
          steps[i]['status'] = this.$store.state.realStatus[`level${i + 1}`] === 1 ? 'finish' : 'wait';
        }
        steps[this.activeStep]['status'] = 'process';
        return steps;
      },

      // 实名认证状态文案
      status() {
        if (this.$store.state.realStatus.level3 === 10) {
          return this.NoThreeLevel
        } else if (this.$store.state.realStatus.level3 === 0) {
          return this.InAudit
        } else if (this.$store.state.realStatus.level3 === 1) {
          return this.AuditAdopt
        } else {
          return `${this.AuditNotAdopt}${this.video.rejectReson}`
        }
      },

      // 去敏感的身份证号
      identityNo() {
        if (this.authContent && this.authContent.id) {
          return this.authContent.id.substr(0, 2) + '******' + this.authContent.id.substr(this.authContent.id.length - 4);
        }
      },
    },

    methods: {

      // 更新用户的安全信息
      updateSecurStatus() {
        userRequest.getSecurityLevel().then((res) => {

          // 设置用户安全信息的绑定等状态
          this.setSecurityStatus(res);

          // 设置用户的实名认证信息和状态
          const identity = res.result.identity;
          this.setRealNameAuthStatus(identity);
        }).catch(err => console.log('err: ', err));
      },

      // 设置用户安全信息的绑定等状态
      setSecurityStatus(res) {
        const data = res.result.fuser;
        if (!data) {
          return;
        }
        this.securLevel = res.result.securityLevel;
        this.bindCount = res.result.bindcount;
        this.bindArea[0].bind = data.fismailbind;
        this.bindArea[0].content = data.fismailbind ? `${this.$t('user.security.MailConent')} ${res.result.emailString}` : this.$t('user.security.MailNone');
        this.bindArea[0].actionLable = data.fismailbind ? this.$t('user.security.Fix') : this.$t('user.security.Bind');
        this.bindArea[1].bind = data.fistelephonebind;
        this.bindArea[1].content = data.fistelephonebind ? `${this.$t('user.security.PhoneContent')} ${data.ftelephone}` : this.$t('user.security.PhoneNone');
        this.bindArea[1].actionLable = data.fistelephonebind ? null : this.$t('user.security.Bind');
        this.bindArea[2].bind = data.fgooglebind;
        this.bindArea[2].actionLable = data.fgooglebind ? this.Untie : this.$t('user.security.Bind');
        this.bindArea[3].bind = res.result.bindLogin;
        this.bindArea[3].actionLable = res.result.bindLogin ? this.$t('user.security.Fix') : this.$t('user.security.Set');
        this.bindArea[4].bind = res.result.bindTrade;
        this.bindArea[4].actionLable = res.result.bindTrade ? this.$t('user.security.Fix') : this.$t('user.security.Set');
      },

      // 设置用户的实名认证信息和状态
      setRealNameAuthStatus(identity) {
        this.$store.commit('SET_REALSTATUS', {
          level1: identity.levelOneStatus,
          level2: identity.levelTwoStatus,
          level3: identity.levelThirdStatus,
          countryType: identity.countryType
        });
        this.$store.commit('SET_AUTHLEVEL', identity.authLevel);
        this.authContent.isChinese = identity.countryType === 0 ? true : false;
        this.authContent.name = identity.fname;
        this.authContent.country = identity.country;
        this.authContent.id = identity.fcode;
        if (identity.img1 && identity.img2 && identity.img3 && identity.levelTwoStatus !== 10) {
          this.level2Imgs = [identity.img1, identity.img2, identity.img3];
        }
        if (identity.leveltworeason) {
          this.authLevel2.dismissReason = identity.leveltworeason;
        }
        if (identity.levelthirdreason) {
          this.video.rejectReson = identity.levelthirdreason;
        }
      },

      // 点击实名认证
      clickStep(index) {
        this.updateSecurStatus();
        if (index === 1) {
          if (this.$store.state.realStatus.level1 !== 1) {
            return;
          }
        }
        if (index === 2) {
          if (this.$store.state.realStatus.level1 !== 1 || this.$store.state.realStatus.level2 !== 1) {
            return;
          }
        }
        this.activeStep = index;
      },

      // 五种工具点击绑定等操作，出现表单弹窗或者提醒
      handleBindRequest(index) {

        // 邮箱
        if (index === 0) {
          this.dialogEmailVisable = true;
          this.emailForm.email = this.emailForm.code = '';
        }

        // 手机
        if (index === 1) {
          this.dialogPhoneVisable = true;
          this.phoneForm.phone = this.phoneForm.code = '';
        }

        // google
        if (index === 2) {
          if (this.bindArea[2].bind) {

            // 已经绑定google验证器
            this.googleUnbindForm.phoneCode = this.googleUnbindForm.emailCode = '';
            this.dialogGoogleUnbindVisable = true;
          } else {

            // 未绑定google验证器
            this.googleForm.bindUrl = this.googleForm.secretKey = this.googleForm.device = this.googleForm.code = '';
            this.dialogGoogleVisable = true;
            this.requestGoogleKeyAndQRcode();
          }
        }

        // 登录密码
        if (index === 3) {
          if (!this.bindArea[1].bind) {
            this.$message({
              message: this.PleaseBindPhone,
              type: "warning",
            });
            return
          }
          this.loginForm.oldPwd = this.loginForm.newPwd = this.loginForm.reNewPwd = this.loginForm.code = this.loginForm.googleCode = '';
          this.dialogPwdVisable = true;
        }

        // 提现密码
        if (index === 4) {
          if (this.bindArea[index].bind) {
            if (!this.bindArea[1].bind) {
              this.$message({
                message: this.PleaseBindPhone,
                type: "warning",
              });
              return
            }
            if (!this.bindArea[2].bind) {
              this.$message({
                message: this.PleaseBindGoogle,
                type: "warning",
              });
              return
            }
            if (this.$store.state.realStatus.level2 !== 1) {
              this.$message({
                message: this.PleaseCompleteTwo,
                type: "warning",
              });
              return
            }
          }
          this.twdForm.newPwd = this.twdForm.reNewPwd = this.twdForm.identity = this.twdForm.code = this.twdForm.googleCode = '';
          this.dialogTwdVisable = true;
        }
      },

      sendCodeToUser(data) {
        userRequest.sendCodeByUserInfo(data.type).then(res => {
          this.$message({
            message: this.SendCode,
            type: 'success'
          });
          if (data.type === 0) {
            this.googleUnbindForm.phoneCodeHasSent = true;
          } else {
            this.googleUnbindForm.emailCodeHasSent = true;
          }
        }).catch(err => console.log('err: ', err));
      },

      // 关闭弹窗对话框
      handleCancelDialog() {
        this.hideDialogs();
      },

      hideDialogs() {
        this.dialogEmailVisable = false;
        this.dialogPhoneVisable = false;
        this.dialogGoogleVisable = false;
        this.dialogGoogleUnbindVisable = false;
        this.dialogPwdVisable = false;
        this.dialogTwdVisable = false;
      },

      handleVideoSuccess() {
        this.updateSecurStatus();
      },

      // 给邮箱发送绑定链接
      handleSendEmailLink() {
        const address = this.emailForm.email;
        userRequest.sendEmailLink(address).then(res => {
          if (res) {
            this.$message({
              message: this.$t('user.security.AreadySendEmail'),
              type: 'success',
            });
            this.dialogEmailVisable = false;
            this.updateSecurStatus();
          }
        }).catch(err => console.log('err: ', err));
      },

      // 判定是否符合邮箱正则判断
      validateEmailForm(email) {
        const regex = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        const passed = regex.test(email);
        if (!passed) {
          this.$message({
            message: this.$t('user.security.PleaseMail'),
            type: 'warning'
          });
        }
        return passed;
      },

      // 邮箱发送验证码
      handleSendEmailCode() {
        userRequest.sendEmailCode(this.emailForm.email).then(() => {
          this.$message({
            message: this.CodeEmail,
            type: 'success'
          });
          this.emailForm.hasSent = true;
        }).catch(err => console.log('err: ', err));
      },

      // 邮箱绑定请求
      handleEmailBind() {
        const {email, code} = this.emailForm;
        if (this.validateEmailForm(email)) {
          userRequest.bindEmail(email, code).then(res => {
            this.$message({
              message: this.$t('user.security.BindSuccess'),
              type: 'success',
            });
            this.$store.commit('SET_FISMAILBIND', true);
            this.dialogEmailVisable = false;
            this.updateSecurStatus();
          }).catch(err => console.log('err: ', err));
        }
      },

      // 发送手机验证码
      handleSendPhoneCode(data) {
        const params = {
          type: data.type,
          msgtype: 1,
          areaCode: this.phoneForm.areaCode,
          phone: this.phoneForm.phone,
          vcode: '',
          uid: this.$store.state.uid,
        };
        LoginAndRegister.send_sms(params).then(res => {
          this.$message({
            message: this.$t('user.security.AreadySendCode'),
            type: 'success'
          });
          if (data.type === 102) {
            this.phoneForm.hasSent = true;
          }
          if (data.type === 107) {
            this.twdForm.hasSent = true;
          }
          if (data.type === 106) {
            this.loginForm.hasSent = true;
          }
        }).catch(err => console.log('err: ', err));
      },

      // 选择国家地区区号
      handelCountrySelect(obj) {
        this.phoneForm.areaCode = obj.dialCode;
      },

      // 绑定手机
      handlePhoneBind() {
        const areaCode = this.phoneForm.areaCode;
        const phone = this.phoneForm.phone;
        const code = this.phoneForm.code;

        userRequest.bindPhone(areaCode, phone, undefined, code, undefined).then(res => {
          this.$message({
            message: this.$t('user.security.BindSuccess'),
            type: 'success',
          });
          this.dialogPhoneVisable = false;
          this.updateSecurStatus();
        }).catch(err => console.log('err: ', err));
      },

      // 请求google密钥，生成二维码，用于绑定google验证器
      requestGoogleKeyAndQRcode() {
        userRequest.getGoogleOrignKey().then(res => {
          this.googleForm.device = res.result.deviceName;
          this.googleForm.secretKey = res.result.totpKey;

          const canvas = document.getElementById('canvas');
          const options = {
            margin: 1,
            width: 90,
          };
          const uri = res.result.qecode + '&issuer=Coinmarket';
          QRCode.toCanvas(canvas, uri, options, function (error) {
            if (error) console.error(error)
          });
        }).catch(err => console.log('err: ', err));
      },

      // 绑定谷歌验证码
      handleGoogleBind() {
        const code = this.googleForm.code;
        const totpKey = this.googleForm.secretKey;
        userRequest.bindGoogleKey(code, totpKey).then(res => {
          this.$message({
            message: this.$t('user.security.BindSuccess'),
            type: 'success',
          });
          this.dialogGoogleVisable = false;
          this.$store.commit('SET_FGOOGLEBIND', true);
          this.updateSecurStatus();
        }).catch(err => console.log('err: ', err));
      },

      // 解绑google验证器
      handleGoogleUnbind() {
        const {phoneCode, emailCode} = this.googleUnbindForm;
        userRequest.unbindGoogleValidator(phoneCode, emailCode).then(res => {
          this.dialogGoogleUnbindVisable = false;
          this.updateSecurStatus();
        }).catch(err => console.log('err: ', err));
      },

      // 绑定登录密码
      handlePwdBind() {
        const {oldPwd, newPwd, reNewPwd, code, googleCode} = this.loginForm;
        const md5OldPwd = md5(md5(md5(oldPwd)));
        const md5Pwd = md5(md5(md5(newPwd)));
        const md5RePwd = md5(md5(md5(reNewPwd)));
        if (oldPwd && this.testPassword(newPwd) && this.testPassword(reNewPwd)) {
          userRequest.modifyPwd(0, md5OldPwd, md5Pwd, md5RePwd, code, googleCode, undefined).then(res => {
            this.$message({
              message: this.$t('user.security.SetSuccess'),
              type: 'success',
            });
            this.dialogPwdVisable = false;
            this.updateSecurStatus();
          }).catch(err => console.log('err: ', err));
        } else {
          this.$message({
            message: this.PasswordNonConformity,
            type: 'error',
          });
        }
      },

      // 绑定提现密码
      handleTwdBind() {
        const {newPwd, reNewPwd} = this.twdForm;
        const md5Pwd = md5(md5(md5(newPwd)));
        const md5RePwd = md5(md5(md5(reNewPwd)));
        if (this.testPassword(newPwd) && this.testPassword(reNewPwd)) {
          userRequest.modifyPwd(1, undefined, md5Pwd, md5RePwd, this.twdForm.code, this.twdForm.googleCode, this.twdForm.identity).then(res => {
            this.$message({
              message: this.$t('user.security.SetSuccess'),
              type: 'success',
            });
            this.dialogTwdVisable = false;
            this.updateSecurStatus();
          }).catch(err => console.log('err: ', err));
        } else {
          this.$message({
            message: this.PasswordNonConformity,
            type: 'error',
          });
        }
      },

      // 实名认证成功
      handleAuthSuccess() {
        if (this.activeStep === 1) {
          this.reApply = false;
        }
        this.updateSecurStatus();
      },

      // 密码强度验证
      testPassword(str) {
        if (/.{8}/.test(str) && /\d/.test(str) && /[A-Z]/.test(str) && /[a-z]/.test(str) && !/\s/.test(str)) {
          return true;
        } else {
          return false;
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  $shadowFont: #e7e7e7;
  .cm-reapply {
    display: block;
    margin: 28px auto;
    padding: 8px;
    color: white;
    font-size: 16px;
    background-color: #525f85;
    border: none !important;
  }

  .cm-security {
    .cm-step-content {
      min-height: 200px;
    }
    .cm-security-unit {
      background-color: #222222;
      padding: 30px 30px 0 30px;
      margin-bottom: 15px;
    }
    .cm-secur-uid {
      color: $greenColor;
      padding-left: 10px;
    }
    .cm-sercur__level {
      display: flex;
      flex-direction: row;
    }
    .cm-secur-level-unit {
      width: 65px;
      height: 10px;
      margin: 0 10px;
      border-radius: 10px;
    }
    .cm-secur__right {
      cursor: pointer;
    }
    .cm-back__red {
      background-color: $redColor;
    }
    .cm-back__yellow {
      background-color: #FFC200;
    }
    .cm-back__green {
      background-color: $greenColor;
    }
    .cm-back__grey {
      background-color: #999;
    }
    .cm-color__red {
      color: $redColor;
    }
    .cm-color__yellow {
      color: #FFC200;
    }
    .cm-color__green {
      color: $greenColor;
    }
    .upload-demo {
      width: 200px;
      margin: 0 auto;
    }
  }

  .el-steps--simple {
    background-color: $goldenColor;
  }

  .cm-dialog-body__title {
    text-align: center;
  }

  .cm-dialog-body__label {
    position: relative;
    text-align: right;
    margin: 20px 0;
  }

  .cm-dialog-input {
    width: 240px;
    line-height: 18px;
    color: #111;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .cm__sendcode {
    position: absolute;
    right: 5px;
    top: 5px;
    color: $goldenColor;
    cursor: pointer;
  }

  .cm-google-img {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .cm-gg-img-container {
    height: 130px;
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: bold;
    img {
      height: 90px;
      width: 90px;
    }
  }

  .el-steps--simple {
    border-radius: 0 0 4px 4px;
    background-color: $goldenColor;
  }

  .cm-dialog-body__title {
    text-align: center;
  }

  .cm-dialog-body__label {
    position: relative;
    text-align: right;
    margin: 20px 0;

  }

  .cm-dialog-input {
    width: 240px;
    line-height: 18px;
    color: #111;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .cm__sendcode {
    position: absolute;
    right: 5px;
    top: 5px;
    color: $goldenColor;
    cursor: pointer;
  }

  .cm-google-img {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .cm-gg-img-container {
    height: 130px;
    width: 120px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: bold;
    img {
      height: 90px;
      width: 90px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: #3c3c3c;
      margin: 0 5px;
      div {
        font-size: 12px;
        padding: 5px 0;
      }
    }
  }

  .cm-gg-content-container {
    height: 130px;
    width: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #3c3c3c;
    margin: 0 5px;
    div {
      font-size: 12px;
      padding: 5px 0;
    }
    div:nth-child(1) {
      height: 57px;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    div:nth-child(2) {
      height: 76px;
      margin-top: 5px;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .cm-dialog__inputlike {
    display: inline-block;
    width: 240px;
    line-height: 18px;
    border-radius: 5px;
    text-align: left;
  }

  .cm-auth-content {
    margin: 20px 0;
    .cm-auth-content__left {
      display: inline-block;
      width: 135px;
      text-align: right;
      padding-right: 20px;
    }
    .cm-auth-content__right {
      display: inline-block;
    }
    input {
      color: #d8d8d8;
    }
  }

  .cm-img-container {
    height: 150px;
    img {
      width: 206px;
      height: 132px;
    }
  }

  .cm-content-contianer {
    font-size: 15px;
    margin: 16px 0;
    .cm-content-middle {
      text-align: left;
      margin: 16px 0;
    }
    .cm-content-paper {
      text-align: left;
      color: $darkBlue;
      margin: 0;
      line-height: 20px;
    }
    .cm-content-bottom {
      text-align: center;
      margin-top: 30px;
      button {
        padding: 5px 10px;
        background-color: $goldenColor;
        border: none;
        color: $primaryFontColor;
      }
    }
  }

</style>

<style>
  .el-step__head.is-process {
    color: white;
  }

  .el-step__title.is-process {
    color: white;
  }

  .el-step__head.is-finish {
    color: #4e855a;
    border: none;
  }
  .el-step__title.is-finish {
    color: #4e855a;
  }
  .cm-dialog-body .i18n-tel {
    position: relative;
    top: 6px;
    background-color: #eee;
    display: inline-block;
    margin-left: 8px;
  }
  .cm-dialog-body .i18n-tel .selected-flag {
    width: 216px;
    padding-right: 30px;
  }

  .cm-dialog-body .i18n-tel .country-list {
    color: #666;
    background-color: white;
  }

  .el-step__title {
    cursor: pointer;
  }
  .el-step__icon {
    cursor: pointer;
  }

  .cm-dialog-body .intl-tel-input {
    color: red;
  }

  .SecurityAuthCotentTitle > div > .el-step__main > .el-step__title {
    max-width: 100% !important;
  }
</style>
