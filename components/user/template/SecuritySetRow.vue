<!-- 五种安全工具行单元 -->
<template>
  <el-row type="flex" align="middle" class="cm-secur-row">
    <el-col :span="8" style="font-size: 14px;">

      <!-- 绑定状态icon -->
      <div class="cm-check">
        <i v-if="isBound" class="iconfont icm-check" style="color: #4e855a; font-size: 18px;"></i>
        <i v-else class="iconfont icm-warn" style="color: #a5444a; font-size:18px;"></i>
      </div>
      <i class="iconfont" :class="icon"></i>
      {{name}}
    </el-col>

    <!-- 文案 -->
    <el-col :span="12" style="font-size: 12px; color: #d8d8d8;">{{content}}</el-col>

    <!-- 修改/绑定 -->
    <el-col :span="4">
      <span class="cm-secur__right" @click="handleClickSet" style="color: #3366cc">{{action}}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SecuritySetRow',

  props: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    action: {
      type: String,
    },
    icon: {
      type: String,
      default: 'icm-plus'
    },
    isBound: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
    }
  },

  methods: {

    // 点按绑定按钮
    handleClickSet() {
      this.$emit('click-set');
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

i {
  margin: auto;
}

.cm-secur-row {
  height: 54px;
  color: #d8d8d8;
  border-bottom: 1px solid #A0A0A0;
  .cm-secur__right {
    float: right;
    padding-right:10px;
    cursor: pointer;
  }
}

.cm-check {
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-right: 15px;
}

</style>
