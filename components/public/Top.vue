<!-- 已废弃 -->
<template>
  <div class="coin-market-top" style="display: none;">
      <ul class="coin-market-top-list">
          <li v-for="(item, index) in IndexMarketData" v-if="index < 4" :key="index">{{item.sellname}}/USDT : {{item.price}}</li>
      </ul>
  </div>
</template>
<script>
    import {Home} from '~/api/Home';

    export default {
        name: 'CM-Top',

        data(){
            return {
                IndexMarketData: [],
            }
        },

        mounted () {
            // 获取首页行情
            Home.indexmarket().then((response) => {
                if(response.code === "200"){
                    for (let i = 0; i < response.result.length; i++) {
                        if(response.result[i].jiaoyitype === 2){
                            this.IndexMarketData.push(response.result[i]);
                        }
                    }
                }
            }).catch((err) => {
              console.log('login err: ', err);
            });
        },

        methods: {
        }
    }
</script>
<style>
    .coin-market-top{
        background: #252525;
        width: 100%;
        position: relative;
        overflow: hidden;
        color: #ffffff;
    }
    .coin-market-top-list{
        width: 1200px;
        height: 36px;
        line-height: 36px;
        margin: 0 auto;
        text-align: center;
    }
    .coin-market-top-list li{
        width: 25%;
        font-size: 14px;
        float: left;
    }
    .coin-market-top-list li:nth-of-type(odd){
        color: #e54343;
    }
    .coin-market-top-list li:nth-of-type(even){
        color: #20852c;
    }
</style>
