
<!-- 二级认证中每一行单元 -->
<template>
  <el-row type="flex" align="middle" class="cm-certificate">
    <el-col :span="6">

      <!-- 图片上传组件 -->
      <el-upload
          class="el-upload--picture-card"
          :action="uploadUrl"
          ref="upload"
          v-loading="isLoading"
          :headers="header"
          :data="payload"
          :multiple="false"
          :show-file-list="false"
          accept="image/*"
          :before-upload="handleInProgress"
          :on-success="handleUploadSuccess">
          <img v-if="imgUrl"
               :src="imgUrl"
               alt=""
               class="el-upload--picture-card"/>
          <i v-else class="el-icon-plus"></i>
        </el-upload>
    </el-col>
    <el-col :span="2">{{$t('user.security.Example')}}</el-col>

    <!-- 示例图片 -->
    <el-col :span="6">
      <div style="width: 206px; height: 132px; text-align:center">
        <img :src="imgSrc">
      </div>
    </el-col>
    <el-col :span="10">
      <div class="cm-certificate-right">
        <slot name="content"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Certificate',

  props: {
    uploadUrl: {
      type: String,
    },
    imgSrc: {
      type: String,
    },
    payload: {
      type: Object,
    }
  },

  mounted() {
  },

  data() {
    return {
      isLoading: false,  // 控制loading菊花的出现
      picture: {visible: false, url: 'https://'},  // 图片预览
      header: {
        lan: this.$store.state.locale,
        token: this.$store.state.token
      },  // 上传是带上token和lan
      imgUrl: '',  // 示例图片
    }
  },

  methods: {
    // 上传后服务器返回的响应
    handleUploadSuccess(res, file, fileList) {
      this.isLoading = false;
      if (res.code === "200") {
        this.imgUrl = res.result.pic;
        if (res.result.flag === 1) {
          this.$store.commit('SET_PICTURES', {pic1: res.result.pic});
        }
        if (res.result.flag === 2) {
          this.$store.commit('SET_PICTURES', {pic2: res.result.pic});
        }
        if (res.result.flag === 3) {
          this.$store.commit('SET_PICTURES', {pic3: res.result.pic});
        }
      } else {

        // 上传失败
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },

    // 上传过程
    handleInProgress(e, file, fileList) {
      this.isLoading = true;
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

i {
  padding: 50px;
  margin: 0;
}

.cm-certificate {
  padding: 10px 0;
}

.cm-button__upload {
  position: absolute;
  bottom: 0px;
  background-color: $goldenColor;
  border: none;
  padding: 4px 20px;
  font-size: 12px;
}

.el-upload--picture-card {
  width: 206px;
  height: 132px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cm-certificate-right {
  position: relative;
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<style>
.el-loading-spinner {
  top: 0 !important;
  margin-top: 0 !important;
  height: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-upload {
  display: flex;
}
</style>
