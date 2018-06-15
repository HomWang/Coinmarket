<!-- 用于发送验证码倒计时再次发送功能 -->
<template>
  <div class="cm-count-down">
    <span v-if="!second" @click="handleSendCodeRequest" class="cm-count-down-send">{{$t('user.SecurityCenter.SendAuthenticationCode')}}</span>
    <span v-else>{{second}}s{{this.$t('user.SecurityCenter.AfterSend')}}</span>
  </div>
</template>

<script>

export default {
  name: 'CountDown',

  components: {
  },

  props: {
    seconds: {
      type: Number,
      default: 60,
    },
    sendRequest: {
      type: Function,
    },
    sendData: {
      type: Object,
    },
    hasSent: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  mounted() {
  },

  data() {
    return {
      second: 0,
      countInterval: null,
    }
  },

  watch: {
    hasSent: function(newValue) {
      if(newValue) {
        this.second = this.seconds;
        this.countInterval = setInterval(() => {
          if (this.second > 0) {
            this.second --;
          } else {
            this.$emit('time-up');
            clearInterval(this.countInterval);
          }
        }, 1000);
      }
    }
  },

  methods: {
    handleSendCodeRequest() {
      if(this.sendRequest) {
        this.sendRequest(this.sendData);
      }
    },
  },

  beforeDestroy() {
    if (this.countInterval) {
      clearInterval(this.countInterval);
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-count-down {
  position: absolute;
  height: 100%;
  right: 5px;
  display: inline-flex;
  align-items: center;
  .cm-count-down-send {
    color: $goldenColor;
    cursor: pointer;
  }
}
</style>
