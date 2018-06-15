<!-- 导航栏单元，用于头部菜单组件 -->
<template>
  <section class="navigator" @mouseover="hoverIn(index)" @mouseout="hoverOut">
    <div class="cm-title" style="z-index: 101">
      <nuxt-link :to="{path: href}">{{title}}<i class="iconfont icm-jiantou9 navigator-icm-jiantou9" :class="{'iconfontTransformStyle': iconfontTransform === 1 || iconfontTransform === 2}" v-if="index === 1 || index === 2"></i></nuxt-link>
    </div>
    <transition name="fade">
      <section v-if="isHover" class="submenu" style="z-index: 100">
        <nuxt-link :to="{path: item.href}" v-for="item in subMenu" :key="item.id">{{item.title}}</nuxt-link>
      </section>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Navigator',

  props: {
    index: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    href: {
      type: String,
    },
    subMenu: {
      type: Array,
    }
  },

  data() {
    return {
      isHover: false,
      iconfontTransform: '',
    }
  },

  methods: {
    hoverIn: function(index) {
      if(index === 1 || index === 2){
        this.iconfontTransform = index;
      }
      this.isHover = true;
    },

    hoverOut: function() {
      this.iconfontTransform = '';
      this.isHover = false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';
  .navigator {
    position: relative;
    color: #d8d8d8;
    width: fit-content;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: nowrap;
    .navigator-icm-jiantou9{
      margin: 0 !important;
      position: relative;
      top: 2px;
      left: 5px;
    }
  }
  .iconfontTransformStyle{
    transition: all 0.4s;
    display: block;
    top: -2px !important;
    width: 16px;
    float: right;
    -ms-transform: rotate(180deg); 	/* IE 9 */
    -moz-transform: rotate(180deg); 	/* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); 	/* Opera */
  }
  a {
    width: 100%;
    margin: 12px 0;
    text-align: center;
    color: $primaryFontColor;
    cursor: pointer;
    display: block;
  }
  a:hover {
    color: #3366cc;
  }
  .cm-title {
    font-size: $primaryFontSize;
    text-align: center;
    z-index: 1;
    margin: 0 15px;
  }
  .submenu {
    background-color: rgba(37, 39, 46, 0.5);
    width: 100%;
    position: absolute;
    font-size: $primaryFontSize - 2px;
    left: 0;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    a{
      padding: 16px 0;
      font-size: 14px;
      margin: 0;
      background-color: transparent;
    }
    a:hover {
      background-color: #30302f;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.2s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
