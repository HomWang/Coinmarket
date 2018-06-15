<!-- 二级实名认证组件 -->
<template>
  <section class="cm-secur-two">

    <!-- 图片上传区域 -->
    <cm-certificate :uploadUrl="uploadUrl" :payload="{flag: 1}" :imgSrc="img1">
      <div slot="content" class="cm-content">
        <p>{{$t('user.security.WarnNeedReal')}}</p>
        <p>{{$t('user.security.Jpg')}}</p>
        <p>1 {{$t('user.security.PassportName')}} 、 2 {{$t('user.security.License')}} 、 3 {{$t('user.security.IdentityCard')}} 、</p>
      </div>
    </cm-certificate>
    <hr>
    <cm-certificate :uploadUrl="uploadUrl" :payload="{flag: 2}" :imgSrc="img2">
      <div slot="content" class="cm-content">
        <p>{{$t('user.security.Positive')}}</p>
        <p>{{$t('user.security.Jpg')}}</p>
      </div>
    </cm-certificate>
    <hr>
    <cm-certificate :uploadUrl="uploadUrl" :payload="{flag: 3}" :imgSrc="img3">
      <div slot="content" class="cm-content">
        <p>{{$t('user.security.Positive')}}</p>
        <p>{{$t('user.security.MC')}}</p>
      </div>
    </cm-certificate>
    <hr>

    <!-- 确认认证按钮 -->
    <div style="display: flex; justify-content:center; align-items: center">
      <button class="cm-confirm" @click="handleAuthRequest">{{$t('user.security.ConfirmAuth')}}</button>
    </div>
  </section>
</template>

<script>
import Certificate from '~/components/user/template/Certificate.vue';
import {baseUrl} from '~/plugins/request.js';
import userRequest from '~/api/userRequest.js';
import Bus from '~/plugins/bus.js'

export default {
  name: 'LevelTwo',

  components: {
    'cm-certificate': Certificate,
  },

  props: {
  },

  mounted(){
  },

  data() {
    return {
      uploadUrl: `${baseUrl}/web_security/relsecondlevel`,
      img1: this.$store.state.authLevel.countryType? require('~/assets/img/user/passport.png') : require('~/assets/img/user/certificate0.png'),
      img2: this.$store.state.authLevel.countryType? require('~/assets/img/user/passport.png') : require('~/assets/img/user/certificate1.png'),
      img3: this.$store.state.authLevel.countryType? require('~/assets/img/user/passport.png') : require('~/assets/img/user/certificate2.png'),
      UploadThePicture: this.$t('user.SecurityCenter.UploadThePicture'),
    }
  },

  methods: {

    // 请求二级认证
    handleAuthRequest() {
      const {pic1, pic2, pic3} = this.$store.state.pictures;
      if(pic1 && pic2 && pic3) {
        userRequest.confirmSecondLevelAuth(pic1, pic2, pic3).then(res => {
          this.$message({
            message: this.$t('user.security.PictureSubmited'),
            type: "success"
          });
          this.$store.commit('SET_REALSTATUS', {level1: undefined, level2: 0, level3: undefined});
          this.$emit('auth-success');
        }).catch(err => console.log('err: ', err));
      } else {
        this.$message({
          message: this.UploadThePicture,
          type: 'error'
        });
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-secur-two {
  margin: 20px 30px;
  input {
    background-color: transparent;
    color: $primaryFontColor;
    padding-left: 5px;
    border: 1px solid $primaryFontColor;
  }
  p {
    font-size: 13px;
    line-height: 1.5;
  }
  button {
    color: $primaryFontColor;
  }
  .cm-confirm {
    padding: 10px 20px;
    background-color: $goldenColor;
    font-size: 16px;
    border: none;
    font-weight: bold;
  }
}
.cm-content {
  font-size: 15px;
  color: #d8d8d8;
}
</style>
