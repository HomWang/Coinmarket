<!-- 侧边菜单栏 -->
<template>
  <section class="cm-side-menu">
    <div class="cm-menu-unit cm-menu__border">
      <div class="cm-menu-title cm-menu__bgcolor cm-menu__align" :class="{'is-active': isActive}">
        <el-row type="flex" justify="center" align="middle" style="height: 100%">
          <span><i class="iconfont" :class="[menu.icon]"></i>{{menu.title}}</span>
        </el-row>
      </div>
      <div v-if="menu.submenus" class="cm-menu__border cm-menu__bgcolor" style="margin-top:5px">
        <slot name="subtitle"></slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SideMenu',

    props: {
      menu: {
        type: Object,
        required: true,
      },
      isActive: {
        type: Boolean,
      }
    },

    data() {
      return {}
    },

    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';
  $shadowColor: #e7e7e7;

  .cm-side-menu {
    min-height: 733px;
    background-color: #222;
    font-size: 16px;
    color: $primaryFontColor;
    .cm-menu-unit {
      font-size: 16px;
      margin-bottom: 12px;
      .cm-menu-title {
        height: 75px;
        line-height: 75px;
      }
    }
    .cm-menu__border {
      .cm-sub-menu {
        font-size: 14px;
      }
    }
  }

  .is-active {
    background-color: #3366cc;
    border-right: 5px solid #3366cc;
  }
</style>

<style>
  .cm-menu__align {
    text-align: center;
    border-right: 5px solid #222222;
  }

  .cm-menu__border {
    border: 1px solid #222222;
    border-left: none;
  }

  .cm-menu__bgcolor {
    background-color: #222222;
  }

</style>
