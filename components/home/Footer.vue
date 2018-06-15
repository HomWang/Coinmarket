<template>
  <div class="coin-market-Footer" :style="{'background-color': AboutTitleShow === true?'':'#333333'}">
        <div class="coin-market-Footer-Content">
            <ul>
                <li title="coinmarket@gmail.com">
                    <img src="../../assets/img/home/mail.png">
                    <span>services@coinmarketxyz.com</span>
                </li>
                <li title="www.coinmarket.xyz">
                    <img src="../../assets/img/home/Ball.png">
                    <span>www.coinmarket.xyz</span>
                </li>
                <li title="(852)  96219909">
                    <img src="../../assets/img/home/phone.png">
                    <span>(852)  96219909</span>
                </li>
            </ul>
        </div>
    <ScrollTop/>
  </div>
</template>
<script>
import ScrollTop from '~/components/public/ScrollTop.vue'

export default {
    components: {
        ScrollTop
    },
    data(){
        return{
            AboutTitleShow: false
        }
    },
    mounted(){
        if(this.$route.path === '/'){
            this.AboutTitleShow = true;
        }
    }
}

</script>
<style rel="stylesheet/scss" lang="scss">
    .coin-market-Footer{
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: #25272e;
    }
    .coin-market-Footer-Content{
        width: 840px;
        margin: 0 auto;
    }
    .coin-market-Footer-Content{
        ul{
            li{
                float: left;
                width: 33.33%;
                height: 40px;
                line-height: 40px;
                color: #d8d8d8;
                font-size: 16px;
                text-align: center;
                margin-top: 3px;
                img{
                    width: 17px;
                }
            }
        }
    }
    .coin-market-Footer-Content ul li:nth-child(2), .coin-market-Footer-Content ul li:nth-child(3){
        text-align: center;
    }
    .coin-market-Footer-Content ul li span{
        bottom: 3px;
        left: 10px;
        position: relative;
    }
</style>
