<!-- 一级实名认证组件 -->
<template>
  <section class="cm-secur-one">
    <el-row :gutter='10' class="cm-sercur-one-row" type="flex" align="center">

      <!-- 地区选择组件 -->
      <el-col :span="12" style="display: flex; justify-content: space-around;">
        <el-radio-group v-model="country" style="font-size:12px; line-height:40px; color: #16130f;">
          <el-radio label="0"><i class="iconfont icm-ditu"></i>{{$t('user.security.China')}}</el-radio>
          <el-radio label="1"><i class="iconfont icm-map"></i>{{$t('user.security.World')}}</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :offset="1" :span="12" style="color: #aaa">
        {{$t('user.security.WarnNeedReal')}}
      </el-col>
    </el-row>

    <!-- 姓名 -->
    <el-row :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.FamilyName')}}</el-col>
      <el-col :span="6"><input v-model="familyName" style="width:100%"></el-col>
    </el-row>
    <el-row :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.GivenName')}}</el-col>
      <el-col :span="6"><input v-model="givenName" style="width:100%"></el-col>
    </el-row>

    <!-- 大陆用户输入身份证号 -->
    <el-row v-show="country==='0'" :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.Identity')}}</el-col>
      <el-col :span="6"><input v-model="certificId" style="width:100%"
                               @input="$event.target.value.replace(/[^\d.]/, '')"></el-col>
    </el-row>

    <!-- 国外用户输入性别 -->
    <el-row v-show="country==='1'" :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.Gendre')}}</el-col>
      <el-col :span="6">
        <el-radio-group v-model="gendre">
          <el-radio label="1">{{$t('user.security.Male')}}</el-radio>
          <el-radio label="0">{{$t('user.security.Female')}}</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 国外用户选择国家地区 -->
    <el-row v-show="country==='1'" :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.Country')}}</el-col>
      <el-col :span="6" style="position: relative;">
        <i18n-tel :toFront="['cn', 'us']" countryCode="cn" showCountryName @excountry="handleChooseCountry"></i18n-tel>
      </el-col>
    </el-row>

    <!-- 国外用户输入护照 -->
    <el-row v-show="country==='1'" :gutter='10' class="cm-sercur-one-row">
      <el-col :span="3" style="text-align: right;">{{$t('user.security.Passport')}}</el-col>
      <el-col :span="6"><input v-model="passport" style="width:100%"></el-col>
    </el-row>

    <!-- 确认认证按钮 -->
    <el-row :gutter='10' class="cm-sercur-one-row">
      <el-col :span="10" :offset="3">
        <button type="button" name="button" class="cm-button" @click="handleAuthRequest">
          {{$t('user.security.Confirm')}}
        </button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import userRequest from '@/api/userRequest';
  import I18nTel from '~/components/public/I18nTel';
  import Bus from '~/plugins/bus.js'

  export default {
    name: 'LevelOne',

    components: {
      'i18n-tel': I18nTel,
    },

    props: {
      title: {
        type: String,
        requried: true,
      }
    },

    mounted() {
    },

    data() {
      return {
        country: '0', // 国家类型 0：中国 1：其他国家
        gendre: '0', // 性别 0 女 1男
        familyName: '',
        givenName: '',
        certificId: '',  // 身份证号
        passport: '',  // 护照号
        area: 'China (中國)',  //国家地区
        value: '',
        ID: this.$t('user.SecurityCenter.ID'),
      }
    },

    methods: {

      // 选择国家
      handleChooseCountry(obj) {
        this.area = obj.name;
      },

      // 确认进行认证
      handleAuthRequest() {
        const countyType = Number(this.country);
        const realname = countyType ? this.familyName + ' ' + this.givenName : this.familyName + ',' + this.givenName;
        const identitytype = countyType ? 1 : 3;
        const identityno = countyType ? this.passport : this.certificId;
        const address = countyType ? this.area : undefined;
        const sex = countyType ? Number(this.gendre) : undefined;
        if (!countyType && !this.testIdNo(identityno)) {
          this.$message({
            message: this.ID,
            type: 'warning'
          });
          return;
        }
        userRequest.realNameAuthLevelOne(countyType, realname, identitytype, identityno, address).then(res => {
          this.$message({
            message: this.$t('user.security.AuthSuccess'),
            type: 'success',
          });
          this.$emit('auth-success');

          // 一级实名认证通过状态
          this.$store.commit('SET_REALSTATUS', {level1: 1, level2: undefined, level3: undefined});
        }).catch(err => console.log('err: ', err));
      },

      formate(str) {
        if (str) {
          return str.replace(/\D+/, '');
        } else {
          return str;
        }
      },

      // 身份证号18位验证
      testIdNo(str) {
        return /\d{17}./.test(str);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  .cm-secur-one {
    width: 900px;
  }

  .cm-sercur-one-row {
    height: 40px;
    line-height: 40px;
    margin-top: 5px;

    input {
      background-color: transparent;
      color: #d8d8d8;
      height: 25px;
      padding-left: 5px;
      border: 1px solid $primaryFontColor;
    }

    .cm-button {
      background-color: $goldenColor;
      color: $primaryFontColor;
      padding: 5px 20px;
      border: none;
    }
  }

  .el-row {
    margin-bottom: 0;
  }

</style>

<style>

  .cm-secur-one .i18n-tel {
    position: absolute;
    background-color: #333;
    top: 4px;
    left: 5px;
    color: #d8d8d8;
  }

  .cm-secur-one .i18n-tel .selected-flag {
    width: 196px;
  }

  .cm-secur-one .i18n-tel .country-list {
    background-color: #222;
    border: 1px solid #333 !important;
  }

  .cm-sercur-one .i18n-tel .CountryName {
    color: #d8d8d8;
  }

  .el-radio.is-checked {
    color: #525f85;
  }
</style>
