
<template>
  <section class="cm-secur-three">
    <section class="cm-content">
      content
    </section>
    <section class="cm-flex__center" style="display: flex; justify-content: center; align-items: center; margin: 8px;">
      <div class="cm-dot" v-for="i in steps" :key="i"></div>
    </section>
    <section class="cm-message">
      message
    </section>
    <section class="cm-flex__center" style="flex-direction: column">
      <span>{{warning}}</span>
      <button>{{upload}}</button>
    </section>
    <section class="cm-flex__center" style="flex-direction: column">
      <button>{{NextStep}}</button>
      <span>{{warning}}</span>
    </section>
  </section>
</template>

<script>
import Bus from '~/plugins/bus.js'

export default {
  name: 'LevelThree',

  props: {
    title: {
      type: String,
      requried: true,
    }
  },

  data() {
    return {
      steps: [0, 1, 2, 3],
      warning: this.$t('user.SecurityCenter.warning'),
      upload: this.$t('user.SecurityCenter.upload'),
      NextStep: this.$t('user.SecurityCenter.NextStep'),
    }
  },

  mounted(){
    this.warning = this.$t('user.SecurityCenter.warning');
    this.upload = this.$t('user.SecurityCenter.upload');
    this.NextStep = this.$t('user.SecurityCenter.NextStep');
  },

  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-flex__center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cm-secur-three {
  .cm-content {
    background-color: yellow;
    height: 160px;
    padding: 20px 40px;
    font-size: 12px;
    color: #323232;
  }
  input {
    background-color: transparent;
    color: #d8d8d8;
    padding-left: 5px;
    border: 1px solid $primaryFontColor;
  }
  .cm-dot {
    width: 8px;
    height: 8px;
    background-color: red;
    margin: 8px;
    border-radius: 8px;
  }
  .cm-message {
    line-height: 40px;
    text-align: center;
    background-color: green;
    margin: 40px;
  }
}

.cm-secur-title {
  padding: 4px 0 20px 10px;
  border-bottom: 1px solid #e7e7e7;
  .cm-sercur__title {
    font-size: 20px;
    padding-left: 20px;
    border-left: 2px solid #e7e7e7;
  }
}
</style>
