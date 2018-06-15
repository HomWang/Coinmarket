
<template>
  <section class="cm-address">
    <div class="cm-address-title">
      {{$t('user.SecurityCenter.ReceivingAddress')}}
    </div>
    <section class="cm-address-form">
      <div class="cm-address__padding cm-address__color">
        {{$t('user.SecurityCenter.AddressPrompt')}}
      </div>
      <div class="cm-address-unit cm-address__padding cm-address__color">
        <span class="cm-address-form__title">{{$t('user.SecurityCenter.ReceivingName')}}</span>
        <div>
          <input
            :disabled="hasAddress"
            v-model="form.name"
            class="cm-address-round"
            type="text"
            :style="hasAddress? borderStyle : null">
        </div>
      </div>
      <div class="cm-address-unit cm-address__padding cm-address__color">
        <span class="cm-address-form__title">{{$t('user.SecurityCenter.ContactMode')}}</span>
        <div>
          <input
            :disabled="hasAddress"
            v-model="form.phone"
            class="cm-address-round"
            type="tel"
            size="20"
            minlength="9"
            maxlength="14"
            :style="hasAddress? borderStyle : null">
        </div>
      </div>
      <div class="cm-address-unit cm-address__padding cm-address__color">
        <span class="cm-address-form__title">{{$t('user.SecurityCenter.DetailedAddress')}}</span>
        <div>
          <input
            :disabled="hasAddress"
            v-model="form.address"
            class="cm-address-input"
            type="text"
            :placeholder="$t('user.SecurityCenter.InputDetailedAddress')"
            :style="hasAddress? borderStyle : null">
        </div>
      </div>
      <div class="cm-address-unit cm-address__padding cm-address__color">
        <span class="cm-address-form__title">{{$t('user.SecurityCenter.PostalCode')}}</span>
        <div>
          <input
            :disabled="hasAddress"
            v-model="form.zipcode"
            class="cm-address-input"
            type="text"
            :style="hasAddress? borderStyle : null">
        </div>
      </div>
      <el-button v-if="!hasAddress" @click.native="handleSubmit">{{$t('user.SecurityCenter.Submit')}}</el-button>
      <el-button v-if="hasAddress" @click.native="UpdateSubmit">{{$t('user.SecurityCenter.Update')}}</el-button>
    </section>
  </section>
</template>

<script>
import Input from '~/components/public/Input.vue';
import userRequest from '~/api/userRequest';

export default {
  name: 'Address',

  components: {
    'cm-input': Input,
  },

  props: {
  },

  mounted() {
    this.getAddress();
  },

  data() {
    return {
      form: {
        name: '',
        phone: '',
        zipcode: '',
        address: '',
      },
      hasAddress: false,
      borderStyle: {
        border: '1px solid #333',
      },
    }
  },

  computed: {
  },

  methods: {

    // 获取用户收货地址(脱敏处理)
    getAddress() {
      userRequest.getAddress().then(res => {
        if (!res.result.address) {
          return;
        }
        this.hasAddress = true;
        const data = res.result.address;
        this.form.address = data.faddress;
        this.form.name = data.fname;
        this.form.phone = data.fphone;
        this.form.zipcode = data.fzipcode;
      }).catch(err => console.log('err: ', err));
    },

    // 手机号码验证
    validateForm() {
      if(!/^[0-9]+$/.test(this.form.phone)) {
        this.$message({
          message: this.$t('finance.AddressManagement.PhoneFormat'),
          type: 'warning',
        });
        return false;
      }
      return true;
    },

    // 获取用户收货地址(真实信息)
    UpdateSubmit(){
      userRequest.getAddressNoHide().then(res => {
        if (!res.result.address) {
          return;
        }
        this.hasAddress = false;
        const data = res.result.address;
        this.form.address = data.faddress;
        this.form.name = data.fname;
        this.form.phone = data.fphone;
        this.form.zipcode = data.fzipcode;
      }).catch(err => console.log('err: ', err));
    },

    // 提交收货地址
    handleSubmit() {
      this.$confirm(this.$t('user.Address.ConfirmSubmiting'), {
        showCancelButton: true,
        confirmButtonText: this.$('user.Address.Continue'),
      }).then(() => {
        const {name, phone, zipcode, address} = this.form;
        if (this.validateForm()) {
          userRequest.setAddress(name, phone, zipcode, address).then(res=> {
            this.$message({
              message: this.$('user.Address.SubmitSuccess'),
              type: 'success',
            });
            this.getAddress();
          }).catch(err => console.log('err: ', err));
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('user.Address.Cancelled')
        });
      });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-address{
  min-height: 733px;
  background-color: #222222;
  padding: 10px 20px;
  input {
    background-color: #222222;
    color: #d8d8d8;
    font-size: 14px;
    outline: none;
  }
  .el-button {
    background-color: $goldenColor;
    color: $primaryFontColor;
    border: none;
    padding: 10px 40px;
    margin-top: 10px;
  }
  .el-button:hover {
    color: white;
  }
  .cm-address-title {
    font-size: 18px;
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .cm-address-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 55px 0;
  }
}
.cm-address__padding{
  padding: 14px 0;
}
.cm-address__color {
  color: $primaryFontColor;
}
.cm-address__left {
}
.cm-address-input {
  height: 35px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid $goldenColor;
}
.cm-address-round {
  height: 35px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid $goldenColor;
}
.cm-address-unit {
  width: 300px;
  div{
    margin-top: 10px;
  }
}
.cm-address-form__title {
  padding-left: 10px;
}
.el-cascader {
  width: 100%;
  border: 1px solid $goldenColor;
  border-radius: 5px;
}
</style>
