<template>
  <section>
    <Head></Head>
    <section class="cm-container">
      <section class="cm-trade">
        <el-row :gutter="15">

          <!-- 币种列表 -->
          <el-col :span="5">
            <el-row style="height: 750px;" class="cm-box">
              <CoinList></CoinList>
            </el-row>
            <el-row class="cm-list-transcation">
              <transaction-list></transaction-list>
            </el-row>
          </el-col>
          <el-col :span="19">

            <!-- k线区域 -->
            <el-row style="height: 520px;" class="cm-box">
              <section class="cm-kline-head" style="height: 48px;">
                <div class="cm-kline-content">
                  <el-row type="flex" align="bottom">
                    <span
                      style="font-size: 18px; font-weight: bold">{{$store.state.selectedCoin.name}} / {{$store.state.areaId === 2 ? 'USDT' : 'MC'}}</span>
                    <span class="cm-kline-head__data">{{realPrice}} ≈ {{evaluatePrice}} CNY</span>
                    <span class="cm-kline-head__data">{{$t('trade.Change')}} {{rate}}%</span>
                    <span class="cm-kline-head__data">{{$t('trade.VOL')}} {{volume}}</span>
                  </el-row>
                </div>
              </section>
              <iframe ref="iframe" class="cm-frame" src="/fullstart.html" style="height: 460px;"></iframe>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="16">

                <!-- 交易下单区 -->
                <el-row style="height: 395px" class="cm-box">
                  <TradeForm></TradeForm>
                </el-row>
              </el-col>

              <!-- 挂单区和最新成交区 -->
              <el-col :span="8" class="cm-box" style="height: 395px">
                <PendingList></PendingList>
              </el-col>
            </el-row>

            <!-- 委托记录区域 -->
            <el-row style="margin: 15px 0 0 0; height: 350px;" class="cm-box">
              <EntrustList></EntrustList>
            </el-row>
          </el-col>
        </el-row>
        <cm-wallet v-if="token"></cm-wallet>
      </section>
    </section>
    <About></About>
    <Footer></Footer>
  </section>
</template>

<script>
  import Head from '~/components/public/Head.vue';
  import About from '~/components/home/About.vue';
  import Footer from '~/components/home/Footer.vue';
  import CoinList from '~/components/trade/CoinList.vue';
  import Wallet from '~/components/trade/Wallet.vue';
  import PendingList from '~/components/trade/PendingList.vue';
  import TransactionList from '~/components/trade/TransactionList.vue';
  import EntrustList from '~/components/trade/EntrustList.vue';
  import TradeForm from '~/components/trade/TradeForm.vue';

  import Bus from '~/plugins/bus';

  export default {
    components: {
      Head,
      About,
      Footer,
      CoinList,
      PendingList,
      TransactionList,
      EntrustList,
      TradeForm,
      'cm-wallet': Wallet,
    },

    async asyncData () {
    },

    async fetch ({store}) {
    },

    head () {
      return {title: 'Coinmarket ' + this.$t('common.header.trade')}
    },

    mounted () {
      // 根据选择的币种显示不同的k线
      Bus.$on('select-coin', () => {
        console.log('select coin trade');
        const interval = setInterval(() => {
          if (this.$refs.iframe && this.$refs.iframe.contentWindow) {
            const IframeWindow = this.$refs.iframe.contentWindow;
            if (IframeWindow._set_current_coinshortName) {

              // k线国际化
              if(!this.klineTranslated) {
                IframeWindow._set_current_language(this.$store.state.locale.toLowerCase().replace('_', '-'));
                this.klineTranslated = true;
              }

              // 设置币种信息和api source
              IframeWindow._set_api_source(this.$store.state.selectedCoin.apiSource);
              IframeWindow._set_current_coinshortName(this.$store.state.selectedCoin.tradeId);
              IframeWindow._set_current_coin(this.$store.state.selectedCoin.tradeId);
              IframeWindow._set_current_contract_unit(this.$store.state.selectedCoin.tradeId);
              clearInterval(interval);
            }
          }
        }, 50);
      });

      // 根据市场价格变动刷新banner价格等信息
      Bus.$on('price-change', (price, volume, rate) => {
        this.realPrice = price;
        this.volume = volume;
        this.rate = rate;
      });

      // 是否显示钱包
      this.$nextTick(function () {
        if (this.$store.state.token) {
          this.token = this.$store.state.token;
        }
      });

      // 用户退出登录时，钱包图标消失
      Bus.$on('user-logout', () => {
        this.token = '';
      });
    },

    data() {
      return {
        isLeaving: false,
        realPrice: 0,  // 最新价格
        rate: 0,  // 涨跌幅
        volume: 0,  // 交易量
        token: false,
        klineTranslated: false,
      }
    },

    computed: {
      // 人民币对价
      evaluatePrice() {
        if (this.$store.state.areaId === 2) {
          if (this.$store.state.usdt_cny) {
            return (this.realPrice * this.$store.state.usdt_cny).toFixed(2);
          }
        } else {
          if (this.$store.state.mc_cny) {
            return (this.realPrice * this.$store.state.mc_cny).toFixed(2);
          }
        }
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  .cm-box {
    overflow: hidden;
    margin-bottom: 0;
  }

  .cm-ads {
    background-color: $darkColor;
    width: 100%;
    height: 485px;
    margin-top: 15px;
  }

  .cm-container {
    display: flex;
    justify-content: center;
  }

  .cm-trade {
    background-color: $bgColorLighter;
    width: 100%;
    margin: 30px 22px;
    color: $primaryFontColor;
    .cm-frame {
      background-color: $darkColor;
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .cm-kline-head {
    background-color: $darkColor;
    margin-bottom: 1px;
  }

  .cm-kline-content {
    padding: 25px 20px 20px 20px;
  }

  .red {
    color: red;
  }

  .cm-kline-head__data {
    padding-left: 60px;
  }
</style>

<style>

</style>
