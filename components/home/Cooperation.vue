<template>
    <div class="coin-market-Cooperation">
        <div class="coin-market-home-title">
            <div class="coin-market-home-title-center">
                <p>{{this.$t('home.Cooperation.CooperationTitle')}}</p>
                <p>{{this.$store.state.locale === "en"?"":"COOPERATION AGENCY"}}</p>
            </div>
        </div>
        <div class="coin-market-Cooperation-Content">
            <div class="coin-market-Cooperation-Content-title-Content coin-market-Cooperation-Content-title">
                <ul>
                    <li>
                        <div class="">
                            <img src="../../assets/img/home/chuangshi.png" alt="">
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <img src="../../assets/img/home/hot.png" alt="">
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <img src="../../assets/img/home/btc.png" alt="">
                        </div>
                    </li>
                    <li>
                        <div class="">
                            <img src="../../assets/img/home/jianshi.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="coin-market-Cooperation-Content-title-Content">
                <ul>
                    <li>
                        <div class="coin-market-Cooperation-Content-title-Content-img">
                            {{this.$t('home.Cooperation.Comingsoon')}}
                        </div>
                    </li>
                    <li>
                        <div class="coin-market-Cooperation-Content-title-Content-img">
                            {{this.$t('home.Cooperation.Comingsoon')}}
                        </div>
                    </li>
                    <li>
                        <div class="coin-market-Cooperation-Content-title-Content-img">
                            {{this.$t('home.Cooperation.Comingsoon')}}
                        </div>
                    </li>
                    <li>
                        <div class="coin-market-Cooperation-Content-title-Content-img">
                            {{this.$t('home.Cooperation.Comingsoon')}}
                        </div>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>
<script>
    import Bus from '~/plugins/bus.js'

    export default {
        data(){
            return {
                CooperationTitle: this.$t('home.Cooperation.CooperationTitle'),
                Comingsoon: this.$t('home.Cooperation.Comingsoon'),
            }
        },
        mounted () {
            this.CooperationTitle = this.$t('home.Cooperation.CooperationTitle');
            this.Comingsoon = this.$t('home.Cooperation.Comingsoon');
        }
    }
</script>
<style>
    .coin-market-Cooperation{
        max-width: 1920px;
        min-width: 1240px;
        margin: 0 auto;
        background-color: #25272e;
    }
    .coin-market-Cooperation-Content{
        width: 1240px;
        margin: 0 auto;
    }
    .coin-market-Cooperation-Content-title>ul>li{
        border: 0 !important;
        text-align: center;
    }
    .coin-market-Cooperation-Content-title>ul>li>div{
        height: 115px;
        line-height: 120px;
    }
    .coin-market-Cooperation-Content-title-Content{
        width: 1120px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
    .coin-market-Cooperation-Content-title-Content ul li:nth-child(1){
        margin-left: 50px;
    }
    .coin-market-Cooperation-Content-title-Content ul li{
        float: left;
        width: 190px;
        margin-left: 86px;
        border: 1px solid #ffffff;
    }
    .coin-market-Cooperation-Content-title-Content-img{
        border: 1px solid #ffffff;
        margin: 10px;
        height: 208px;
        color: #ffffff;
        line-height: 208px;
        text-align: center;
        font-size: 16px;
    }
</style>
