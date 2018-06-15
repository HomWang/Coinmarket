
<template>
  <section class="cm-secur-title">
    <span class="cm-sercur__title">{{title}}</span>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SecurityTitle',

  props: {
    title: {
      type: String,
      requried: true,
    }
  },

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-secur-title {
  padding: 0 20px 20px 1px;
  border-bottom: 1px solid #D2D2D2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .cm-sercur__title {
    font-size: 18px;
    color: #d8d8d8;
  }
}
</style>
