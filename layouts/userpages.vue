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
  background-color: #f0f0f0;
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
  color: black;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.TextGreenColor{
  color: $TextGreenColor;
}

.TextRedColor{
  color: $TextRedColor;
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
  width: 949px;
  margin: 0 auto;
  padding-top: 102px;
  padding-bottom: 134px;
}
.coin-market-home-title>.coin-market-home-title-left, .coin-market-home-title>.coin-market-home-title-center{
  float: left;
}
.coin-market-home-title>.coin-market-home-title-center{
  text-align: center;
  margin-top: -23px;
  width: 263px;
  color: #ffc200;
}
.coin-market-home-title>.coin-market-home-title-right{
  float: right;
}
.coin-market-home-title>.coin-market-home-title-center>p:nth-child(1){
  font-size: 36px;
}
.coin-market-home-title>.coin-market-home-title-center>p:nth-child(2){
  font-size: 16px;
}
.coin-market-home-title>.coin-market-home-title-left, .coin-market-home-title>.coin-market-home-title-right{
  width: 343px;
  height: 27px;
}
.coin-market-home-title>.coin-market-home-title-left>img, .coin-market-home-title>.coin-market-home-title-right>img{
  width: 100%;
}
</style>
