<template>
  <div>
    <nuxt/>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
@import 'assets/styles/mixins.scss';

html {
  padding: 0;
  margin: 0;
  outline: 0;
  border: 0;
  background: linear-gradient(to right, #24201a, #201f1d, #24201a);
  font-family: "Microsoft YaHei";
  font-size: 16px;
  word-spacing: 0;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  min-width: 1240px;
  // min-height: 2200px;
  // color: $primaryFontColor;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

input[type=button], input[type=submit], input[type=file], button {
  cursor: pointer;
  -webkit-appearance: none;
}

.TextBlackColor{
  color: $TextBlackColor !important;
}

.TextYellowColor{
  color: $TextYellowColor !important;
}

.TextGreenColor{
  color: $TextGreenColor !important;
}

.TextRedColor{
  color: $TextRedColor !important;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

ul, li, dl, dt, dd {
    padding: 0;
    margin: 0;
    list-style: none;
}
a{
  text-decoration: none;
}
.coin-market-home-title{
  position: relative;
  overflow: hidden;
  width: 1240px;
  margin: 0 auto;
  padding: 35px 0;
}
.coin-market-home-title>.coin-market-home-title-center{
  text-align: center;
  margin: 0 auto;
  width: 14%;
  color: #d8d8d8;
}
.coin-market-home-title>.coin-market-home-title-right{
  float: right;
}
.coin-market-home-title>.coin-market-home-title-center>p:nth-child(1){
  font-size: 24px;
}
.coin-market-home-title>.coin-market-home-title-center>p:nth-child(2){
  font-size: 14px;
}
.coin-market-home-title>.coin-market-home-title-left, .coin-market-home-title>.coin-market-home-title-right{
  width: 43%;
  height: 1px;
  background: #16130f;
}
.coin-market-home-title>.coin-market-home-title-left>img, .coin-market-home-title>.coin-market-home-title-right>img{
  width: 100%;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #222222 !important;
}
.el-table--enable-row-transition .el-table__body td{
  font-size: 14px;
  text-align: center !important;
}
.el-table td, .el-table th.is-leaf{
  text-align: center;
  font-size: 14px;
  color: #d8d8d8;
  background-color: #222222;
  border-bottom: none;
}
.el-range-editor.el-input__inner{
  background-color: #222222;
  border: 0;
}
.el-range-input{
  background-color: transparent;
}
.el-range-separator{
  color: #d8d8d8;
}
.el-table__empty-block{
  background-color: #222222;
}
.el-input__inner{
  height: 30px;
  background-color: #282828 !important;
  color: #d8d8d8 !important;
}
.el-select-dropdown{
  background-color: #222222;
  border: none;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #525f85;
  color: #d8d8d8;
}
.el-table::before{
  height: 0;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  background-color: transparent !important;
  color: #d8d8d8 !important;
}
.NoticeList{
    position: relative;
    overflow: hidden;
    width: 1240px;
    margin: 30px auto;
    color: #000000;
    min-height: 600px;
  }
  .NoticeList-Title{
    background-color: #3366cc;
    color: #d8d8d8;
    padding: 13px 45px;
    font-size: 16px;
  }
  .NoticeList-List{
    position: relative;
    overflow: hidden;
    border-top: 1px solid #999999;
    margin-top: 2px;
    color: #d8d8d8;
    min-height: 809px;
  }
  .NoticeList-List-Title{
    font-size: 15px;
    padding: 10px 0;
  }
 .NoticeList-List-Title-List>a{
    position: relative;
    overflow: hidden;
    display: block;
    float: right;
    width: 100%;
    padding: 0 45px !important;
    padding-top: 30px !important;
    font-size: 14px;
    border-bottom: 1px solid #999999;
  }
  .NoticeList-List-Title-List>a:hover{
    background-color: #25272e;
  }
  .NoticeList-List-Title-Content{
    font-size: 18px;
    position: relative;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .NoticeList-List-Title-List-Left{
    width: 90%;
    float: left;
    text-align: left;
  }
  .NoticeList-List-Title-List-Left>a{
    color: #d8d8d8 !important;
  }
  .NoticeList-List-Title-List-Left-Title1{
    font-size: 20px;
    color: #d8d8d8;
    line-height: 1;
    margin-top: 5px !important;
  }
  .NoticeList-List-Title-List-Left-Title2{
    font-size: 14px;
    margin-top: 10px;
    color: #999999;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .NoticeList-List-Title-List-right{
    width: 10%;
    float: left;
    padding-bottom: 30px;
  }
  .NoticeList-List-Title-List-right>p:nth-child(1){
    width: 64px;
    text-align: left;
    font-size: 16px;
    color: #999999;
  }
  .NoticeList-List-Title-List-right>p:nth-child(1)>span{
    margin-left: 5px;
  }
  .NoticeList-List-Title-List-right>p:nth-child(2){
    width: 22px;
    margin-left: 42px;
    text-align: right;
    color: #d8d8d8;
    font-size: 20px;
    border-top: 1px solid #d8d8d8;
  }
  .NoticeList-Title>span:nth-child(1) {
    color: #d8d8d8;
    font-size: 16px;
  }
  .NoticeList-Title > span:nth-child(1)>a{
    color: #d8d8d8;
  }
  .NoticeList-Title>span:nth-child(2){
    color: #16130f;
    font-size: 15px;
  }
  .el-pagination{
    text-align: right;
  }
  button.disabled{
    background-color: #222222 !important;
  }
  .el-pager li, .el-pager{
    background-color: transparent;
  }
  .el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
    color: #d8d8d8 !important;
  }
  .el-pager li{
    color: #d8d8d8;
  }
  input:focus::-webkit-input-placeholder{
    color: transparent;
  }
  input:focus::-moz-placeholder{
    color: transparent;
  }
  input:focus::-ms-placeholder {
    color: transparent;
  }
  input[type="number"]{
    -moz-appearance:textfield;
  }
  .el-picker-panel__shortcut{
    padding-left: 5px;
  }
  .el-picker-panel__sidebar{
    width: 115px !important;
  }
  .cursor{
    cursor: pointer;
  }
</style>
