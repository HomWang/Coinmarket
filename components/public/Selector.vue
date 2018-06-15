
<!-- 选择器，用于国际化语言选择 -->
<template>
  <section class="cm-selector">
    <section class="cm-selector-title" @click="showLocales">
      <!-- <span>{{langs[locale]}}</span><i class="iconfont icm-jiantou9"></i> -->
      <span><img :src="LinkerImg" alt=""><span class="cm-selector-title-Text">{{langs[locale]}}</span></span><i class="iconfont icm-jiantou9"></i>
    </section>
    <section v-show="show" class="cm-select-options">
      <span v-for="item in Object.keys(langs)" :key="item.id" @click="selectLocale(item)" :class="{selected: item==locale}">
        <img :src="require(`../../assets/img/CurrencyLogo/${item}.png`)" alt="">{{langs[item]}}
      </span>
    </section>
  </section>
</template>

<script>
import Bus from '~/plugins/bus.js'

export default {
  name: 'Selector',

  props: {
    locale: {
      type: String,
      required: true,
    },
    langs: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      optionClass: {
        'selected': true,
      },
      show: false,
      LinkerImg: "",
      LangLocale: this.$store.state.locale,
    }
  },

  mounted(){
    this.$nextTick(function () {
      this.LinkerImg = require(`~/assets/img/CurrencyLogo/${this.LangLocale}.png`)
      // if(this.$store.state.locale === "zh_CN" || this.$store.state.locale === "zh_TW"){
      //   this.LinkerImg = require("../../assets/img/CurrencyLogo/zh.png")
      // }else if(this.$store.state.locale === "en"){
      //   this.LinkerImg = require("../../assets/img/CurrencyLogo/en.png")
      // }
    });
  },

  methods: {
    selectLocale(lang) {
      this.LangLocale = lang;
      this.$emit('select', lang);
      this.show = false;
    },

    showLocales() {
      this.show = !this.show;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-selector:hover{
  color: #fcc200;
}
.cm-selector {
  position: relative;
  min-width: 102px;
  height: 22px;
  line-height: 22px;
  color: $primaryFontColor;
  font-size: $primaryFontSize - 4px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  .cm-selector-title{
    span{
      position: absolute;
      left: 5px;
      img{
        margin-top: 2px;
        width: 22px;
        height: 16px;
      }
      .cm-selector-title-Text{
        display: block;
        width: 50px;
        left: 25px;
        top: -1px;
      }
    }
  }
  i {
    position: relative;
    font-size: 9px;
    margin: 0 2px;
    top: -1px;
    left: 40px;
  }
  .cm-select-options {
    background-color: rgba(37, 39, 46, .5);
    display: flex;
    flex-direction: column;
    margin-top: 9px;
    span {
      padding: 16px 10px;
      font-size: 14px;
      // padding: 4px 0;
      // margin: 8px 0;
    }
    span:hover {
      background-color: #30302f;
      color: $goldenColor;
    }
    .selected {
      // background-color: $bgColor;
      color: $goldenColor;
    }
    img{
      margin-top: 3px;
      margin-right: 5px;
      float: left;
    }
  }
}
</style>
