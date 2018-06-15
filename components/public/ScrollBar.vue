<template>
    <div id="CM-ScrollBar">
        <div id="CM-ScrollBar-content">
            <ul>
                <section class="ScrollBar-ComingSoon" v-if="IndexMarketData === ''">
                    {{PleaseExpect}}
                </section>
                <li class="CM-ScrollBar-content-Loading" v-if="LoadingState">
                    <div class="coin-market-Trend-Content-right-list-content">
                        <my-Wave :ParentHeight="123"></my-Wave>
                    </div>
                </li>
                <li class="CM-ScrollBar-content-Loading" v-if="LoadingState">
                    <div class="coin-market-Trend-Content-right-list-content">
                        <my-Wave :ParentHeight="123"></my-Wave>
                    </div>
                </li>
                <li class="CM-ScrollBar-content-Loading" v-if="LoadingState">
                    <div class="coin-market-Trend-Content-right-list-content">
                        <my-Wave :ParentHeight="123"></my-Wave>
                    </div>
                </li>
                <li v-if="(TitleIndex+1) === item.jiaoyitype && item.coinid === 2 || item.coinid === 4 || item.coinid === 26" v-for="(item, index) in IndexMarketData" :key="index" @click="TradeHref(TitleIndex+1, item.coinid)">
                    <div class="coin-market-Trend-Content-right-list-content">
                        <section class="coin-market-Trend-Content-right-list-content-left">
                            <img src="~/assets/img/CurrencyLogo/HomeBTC.png" alt="" v-if="item.coinid === 2">
                            <img src="~/assets/img/CurrencyLogo/HomeETH.png" alt="" v-if="item.coinid === 4">
                            <img src="~/assets/img/CurrencyLogo/HomeMC.png" alt="" v-if="item.coinid === 26">
                        </section>
                        <section class="coin-market-Trend-Content-right-list-content-center">
                            <div class="coin-market-Trend-Content-right-list-content-title">
                                <span>{{item.sellname}}</span>
                            </div>
                            <div class="coin-market-Trend-Content-right-list-content-volume">
                                <span>VOL</span>
                                <span>{{item.total}}</span>
                            </div>
                            <div class="coin-market-Trend-Content-right-list-content-details">
                                $
                                <span>{{item.price}} ≈ ￥{{item.jiaoyitype===2? (item.price*item.usdt_coin_price+ "").substr(0, (item.price*item.usdt_coin_price+ "").indexOf(".")+3) : (item.price*item.usdt_coin_price+ "").substr(0, (item.price*item.usdt_coin_price+ "").indexOf(".")+3)}}</span>
                            </div>
                            <div class="coin-market-Trend-Content-right-list-content-Rose">
                                <span>{{item.rose}}%</span>
                                <span v-if="item.rose === '0.00'">一</span>
                                <img v-if="item.rose > 0" src="../../assets/img/home/upper.png"/>
                                <img v-if="item.rose < 0" src="../../assets/img/home/lower.png"/>
                            </div>
                        </section>
                        <!-- <div class="coin-market-Trend-Content-right-list-content-title">
                            <img :src="item.image" alt="">
                            <span>{{item.sellname}}</span>
                        </div>
                        <div class="coin-market-Trend-Content-right-list-content-details">
                            <img  v-if="TitleIndex === 1" src="../../assets/img/home/$.svg" style="width: 15px;"/>
                            <img  v-if="TitleIndex === 0 || TitleIndex === 2" src="../../assets/img/CurrencyLogo/MC.png"/>
                            <span>{{item.price}} ≈ ￥{{item.jiaoyitype===2? (item.price*item.usdt_coin_price+ "").substr(0, (item.price*item.usdt_coin_price+ "").indexOf(".")+3) : (item.price*item.usdt_coin_price+ "").substr(0, (item.price*item.usdt_coin_price+ "").indexOf(".")+3)}}</span>
                        </div>
                        <div class="coin-market-Trend-Content-right-list-content-volume">
                            <span>VOL</span>
                            <span>{{item.total}}</span>
                        </div>
                        <div class="coin-market-Trend-Content-right-list-content-Rose">
                            <span :class="{'RoseUpper': item.rose > 0, 'RoseLower': item.rose < 0}">{{item.rose}}%</span>
                            <span v-if="item.rose === '0.00'">一</span>
                            <img v-if="item.rose > 0" src="../../assets/img/home/upper.png"/>
                            <img v-if="item.rose < 0" src="../../assets/img/home/lower.png"/>
                        </div> -->
                        <TrendChart :CanvasIndex="'CanvasIndex'+ index"
                          :CanvasStyle="CanvasStyle"
                          :priceArray="item.priceArr"
                          :CanvasStyleState="item.rose">
                        </TrendChart>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {Home} from '~/api/Home';
    import TrendChart from '~/components/public/TrendChart.vue'
    import Bus from '~/plugins/bus.js'

    export default {
        name: 'CM-ScrollBar',

        components: {
            TrendChart
        },

        props: {
            TitleIndex: {
                type: Number,
            },
        },

        data(){
            return {
                LoadingState: true,
                intervalId: null,
                interval: 60000, // 1 min
                IndexMarketData: [],
                CanvasStyle: {
                    width: '90px',
                    height: '123px',
                    strokeStyle: '#6d7dab'
                },
                PleaseExpect: this.$t('home.Trend.PleaseExpect'),
            }
        },

        mounted () {
            this.indexmarket();
            this.intervalId = setInterval(() => {
              this.indexmarket();
            }, this.interval);
        },

        beforeDestroy() {
          if(this.intervalId) {
            clearInterval(this.intervalId);
          }
        },

        methods: {
            indexmarket(){
                // 获取首页各个币种行情
                const params = { type: 1 };
                Home.indexmarket(params).then((response) => {
                    this.IndexMarketData = response.result;
                    this.LoadingState = false;
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            },

            // 点击某个币跳转到币币交易区相应k线交易
            TradeHref(areaid, coinid) {
              let payload = {
                  id: coinid
              }
              this.$store.commit('SET_AREA_ID', areaid);
              this.$store.commit('SET_COIN', payload);
              this.$router.push({
                  path: '/trade'
              });
              this.$destroy();
            }
        }
    }
</script>
<style>
    #CM-ScrollBar {
        width: 1240px;
        height: 123px;
        position: relative;
        margin: 0px auto;
    }

    #CM-ScrollBar-content {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .scrollDiv {
        width: 18px;
        position: absolute;
        top: 0;
        background: #666;
        border-radius: 10px;
    }
    #CM-ScrollBar-content li:hover{
        /* box-shadow: 5px 7px 4px rgba(18, 18, 18, 0.2); */
        background-color: #1f294c;
    }
    #CM-ScrollBar-content li{
        width: 400px;
        height: 123px;
        background: -webkit-linear-gradient(left, #4e5e82 , #2c3e64);
        background: -o-linear-gradient(right, #4e5e82, #2c3e64);
        background: -moz-linear-gradient(right, #4e5e82, #2c3e64); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #4e5e82 , #2c3e64); 
        color: #d8d8d8;
        float: left;
        display: -webkit-inline-box;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
    }
    #CM-ScrollBar-content li:nth-child(2){
        margin: 0 20px;
    }
    .CM-ScrollBar-content-Loading{
        background: transparent !important;
    }
    .coin-market-Trend-Content-right-list-content{
        /* margin: 8px 8px 0px 8px; */
        /* width: 192px; */
        width: 100%;
        position: relative;
    }
    .coin-market-Trend-Content-right-list-content-title{
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 17px;
    }
    .coin-market-Trend-Content-right-list-content-title img{
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
    .coin-market-Trend-Content-right-list-content-title span{
        position: relative;
    }
    .coin-market-Trend-Content-right-list-content-volume{
        font-size: 14px;
        padding-bottom: 17px;
        color: #d0d0d0;
    }
    .coin-market-Trend-Content-right-list-content-volume>span{
        padding-right: 14px;
    }
    .coin-market-Trend-Content-right-list-content-details{
        color: #d8d8d8;
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        padding-bottom: 17px;
        color: #d0d0d0;
    }
    .coin-market-Trend-Content-right-list-content-details div{
        width: 19px;
        text-align: center;
        border-radius: 19px;
        border: 1px solid #ffffff;
        float: left;
        margin-right: 13px;
    }
    .coin-market-Trend-Content-right-list-content-details img{
        width: 20px;
        margin-right: 10px;
        position: relative;
        top: 2px;
    }
    .coin-market-Trend-Content-right-list-content-details span{
        line-height: 19px;
    }
    .coin-market-Trend-Content-right-list-content-Rose>span{
        margin-right: 5px;
        font-size: 14px;
    }
    .coin-market-Trend-Content-right-list-content-Rose{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .coin-market-Trend-Content-right-list-content-Rose>img{
        position:relative;
        top: 1px;
    }
    .RoseUpper{
        color: #20852c;
    }
    .RoseLower{
        color: #e54343;
    }
    .ScrollBar-ComingSoon{
        height: 532px;
        line-height: 532px;
        text-align: center;
        font-size: 24px;
        color: #d8d8d8;
    }
    .coin-market-Trend-Content-right-list-content-left{
        width: 44px;
        height: 44px;
        margin: 42px 33px 37px 14px;
        text-align: center;
        float: left;
    }
    .coin-market-Trend-Content-right-list-content-center{
        width: 195px;
        margin: 12px 0;
        float: left;
    }
</style>
