<!-- 表单弹窗 -->
<template>
  <el-dialog
    class="cm-dialog"
    :title="title"
    :visible="visible"
    width="422px"
    top="24vh"
    center
    :show-close="false">
    <div>
      <slot name="body">
      </slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hanleConfirm">{{$t('user.SecurityCenter.ConfirmationCommit')}}</el-button>
      <!-- <el-button @click="handleCancel">取 消</el-button> -->
      <i class="iconfont icm-close cm-dialog__cancel" @click="handleCancel"></i>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    visible: {
      type: Boolean,
    },
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  methods: {
    handleCancel() {
      this.$emit('click-cancel');
    },

    hanleConfirm() {
      this.$emit('click-confirm');
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-dialog {

}

</style>

<style>

.el-dialog__header {
  background: url('~/assets/img/user/dialog-header.png');
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.el-dialog__footer {
  position: relative;
  padding-top: 0;
}
.el-dialog__title {
  color: white;
  font-size: 25px;
  font-weight: bold;
}
.el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  font-size: 14px;
  color: #000;
  padding: 14px 14px 0 14px !important;
}

.el-button {
  padding: 7px 30px;
  color: #d8d8d8;
  background-color: #525f85;
}
.el-button:hover {
  background-color: #525f85;
  color: white;
}
.cm-dialog__cancel {
  position: absolute;
  left: 200px;
  top: 60px;
  color: white;
  font-size: 25px;
  cursor: pointer;
}

</style>
