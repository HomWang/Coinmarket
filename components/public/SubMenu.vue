<!-- 侧边栏菜单二级菜单 -->
<template>
  <section class="cm-sub-menu">
    <div class="cm-sub-title cm-menu__align" :class="{'is-active': isActive}">
      <el-row type="flex" justify="center" align="middle" style="position: relative; height: 100%;" @click.native="clickMenu">
        <span><i class="iconfont" :class="[submenu.icon]"></i>{{submenu.title}}</span>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    submenu: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
    }
  },
  data() {
    return {
    }
  },

  methods: {
    clickMenu(e) {
      this.$emit('select-menu', this.submenu);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';
.cm-sub-menu{
  cursor: pointer;
  font-size: 14px;
  color: #d8d8d8;
}
.cm-sub-menu:hover{
  background-color: #30302f;
  color: white;
  // border-right: 5px solid #30302f;
}
.cm-sub-title {
  height: 45px;
  margin: 7px 0;
}
.is-active {
  background-color: #30302f;
  border-right: 5px solid $goldenColor;
}

</style>
