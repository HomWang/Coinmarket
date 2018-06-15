<!-- 币币交易下单区 -->
<template>
  <section class="cm-trading">
    <el-row class="cm-title" type="flex" justify="space-between">

      <!-- 限价交易/市价交易 -->
      <el-col :span="10">
        <span class="cm-trade-title" :class="{'cm-title__selected': false}"
              @click="handleRealPriceSelected">{{$t('trade.CurrentPrice')}}</span>
        <!-- <span class="cm-trade-title" :class="{'cm-title__selected': priceType}" @click="handleMarketPriceSelected">市价交易</span> -->
      </el-col>

      <!-- 费率 -->
      <el-col :span="5" style="text-align: right"><span @click="handleFeeRequest">{{$t('trade.Fee')}}</span></el-col>
    </el-row>

    <!-- 下单区 -->
    <el-row class="cm-trade-form" type="flex" justify="space-between">

      <!-- 买单区 -->
      <el-col :span="12" class="cm-trade-col" style="margin-right: 10px">

        <!-- 可用 -->
        <div style="margin: 20px 0;">
          <span class="cm-ellipsis" style="padding-right: 26px; color: #999">
            {{$t('trade.Available')}} {{Number(assets.mainCoin.vol).toFixed(8)}} {{assets.mainCoin.name}}
          </span>
          <span @click="handleChargeOrLogin(assets.mainCoin.id)" style="cursor: pointer">
            {{$store.state.token ? $t('trade.Recharge') : $t('trade.Sign')}}
          </span>
        </div>

        <!-- 买入价格 -->
        <div class="cm-trade-input">
          <input v-model="buyPrice" maxlength="10" @input="handleBuyPriceInput" style="color: white">
          <div class="cm-trade-input-before">{{$t('trade.BidPrice')}}</div>
          <div class="cm-trade-input-after">{{assets.mainCoin.name}}</div>
        </div>

        <!-- 估算区 -->
        <div class="cm-evaluate">
          <span>≈ {{buyEval}}</span><span>CNY</span>
        </div>

        <!-- 买入量 -->
        <div class="cm-trade-input">
          <input v-model="buyVol" maxlength="10" @input="handleBuyVolInput" style="color: white">
          <div class="cm-trade-input-before">{{$t('trade.buyVol')}}</div>
          <div class="cm-trade-input-after">{{assets.selectedCoin.name}}</div>
        </div>

        <!-- 拖拽横条区 -->
        <div>
          <div class="cm-slider-contianer">
            <el-slider v-model="buyPortion" :show-tooltip="false" @change.self="handleBuySliderChange"></el-slider>

            <!-- 比例点点 -->
            <div class="cm-dots">
              <div class="cm-dot-outer" v-for="i of [0, 1, 2, 3, 4]" :key="i" @click="handleBuyPortionClick(i)">
                <div class="cm-dot">
                </div>
              </div>
            </div>
          </div>
          <div class="cm-trade-slider__range">
            <span @click="buyVol=0, buyPortion=0">0 {{assets.mainCoin.name}}</span>
            <span @click="handleAllVolClick(true)">{{assets.mainCoin.vol}} {{assets.mainCoin.name}}</span>
          </div>
        </div>

        <!-- 交易额 -->
        <div class="cm-trade__total">
          <span class="cm-ellipsis" style="padding-right: 26px;">
            {{$t('trade.Total')}} {{buyValue}} {{assets.mainCoin.name}}
          </span>
        </div>

        <!-- 买入按钮 -->
        <button class="cm-form-button"
                type="button"
                :class="{'cm-form-button__disabled': !tradable, 'cm-form-button__green': tradable}"
                @click="handleBuyRequest">
          {{$t('trade.Buy')}} {{assets.selectedCoin.name}}
        </button>
      </el-col>

      <!-- 卖单区 -->
      <el-col :span="12" class="cm-trade-col">

        <!-- 可用 -->
        <div style="margin: 20px 0;">
          <span class="cm-ellipsis" style="padding-right: 26px; color: #999;">
            {{$t('trade.Available')}} {{Number(assets.selectedCoin.vol).toFixed(8)}} {{assets.selectedCoin.name}}
          </span>
          <span @click="handleChargeOrLogin(assets.selectedCoin.id)" style="cursor: pointer">
            {{$store.state.token ? $t('trade.Recharge') : $t('trade.Sign')}}
          </span>
        </div>

        <!-- 卖出价格 -->
        <div class="cm-trade-input">
          <input v-model="salePrice" maxlength="10" @input="handleSalePriceInput" style="color: white">
          <div class="cm-trade-input-before">{{$t('trade.AskPrice')}}</div>
          <div class="cm-trade-input-after">{{assets.mainCoin.name}}</div>
        </div>

        <!-- 估算区 -->
        <div class="cm-evaluate">
          <span>≈ {{saleEval}}</span><span>CNY</span>
        </div>

        <!-- 卖出量 -->
        <div class="cm-trade-input">
          <input v-model="saleVol" maxlength="10" @input="handleSaleVolInput" style="color: white">
          <div class="cm-trade-input-before">{{$t('trade.saleVol')}}</div>
          <div class="cm-trade-input-after">{{assets.selectedCoin.name}}</div>
        </div>

        <!-- 拖拽横条区 -->
        <div>
          <div class="cm-slider-contianer">
            <el-slider v-model="salePortion" :show-tooltip="false" @change.self="handleSaleSliderChange"></el-slider>

            <!-- 比例点点 -->
            <div class="cm-dots">
              <div class="cm-dot-outer" v-for="i of [0, 1, 2, 3, 4]" :key="i" @click="handleSalePortionClick(i)">
                <div class="cm-dot">
                </div>
              </div>
            </div>
          </div>
          <div class="cm-trade-slider__range">
            <span @click="saleVol=0, salePortion=0">0 {{assets.selectedCoin.name}}</span>
            <span @click="handleAllVolClick(false)">{{assets.selectedCoin.vol}} {{assets.selectedCoin.name}}</span>
          </div>
        </div>

        <!-- 交易额 -->
        <div class="cm-trade__total">
          <span class="cm-ellipsis" style="padding-right: 26px;">
            {{$t('trade.Total')}} {{saleValue}} {{assets.mainCoin.name}}
          </span>
        </div>

        <!-- 卖出按钮 -->
        <button class="cm-form-button cm-form-button__red"
                type="button"
                :class="{'cm-form-button__disabled': !tradable, 'cm-form-button__red': tradable}"
                @click="handleSellRequest">
          {{$t('trade.Sell')}} {{assets.selectedCoin.name}}
        </button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import Table from '~/components/public/Input.vue';
  import marketRequest from '~/api/marketRequest';
  import tradeRequest from '~/api/tradeRequest';

  import Bus from '~/plugins/bus.js'

  export default {
    name: 'TradeForm',

    components: {
      'cm-input': Table,
    },

    props: {},

    mounted() {
      // 获取人民币对价汇率
      marketRequest.getInitInfo().then(res => {
        this.$store.commit('SET_MC_CNY', res.result.mc_coin_price);
        this.$store.commit('SET_USDT_CNY', res.result.usdt_coin_price);
      }).catch(err => console.log('err: ', err));

      // 获取用户资产
      this.tradeInterval = setInterval(() => {
        if (this.$store.state.token) {
          this.getUserAssets().catch(err => console.log('err: ', err));
        } else {
          clearInterval(this.tradeInterval);
        }
      }, 5000);

      // 根据挂单区价格设置买卖价格，根据用户资产初始化买入卖出量
      Bus.$on('pending-init', (salePrice, buyPrice) => {
        this.assets.mainCoin.vol = 0;
        this.assets.selectedCoin.vol = 0;
        this.buyVol = '';
        this.buyPortion = 0;
        if (salePrice) {
          this.buyPrice = salePrice;
        } else {
          this.buyPrice = '';
        }
        if (buyPrice) {
          this.salePrice = buyPrice;
        } else {
          this.salePrice = '';
        }

        if (this.$store.state.token) {
          this.getUserAssets().then((res) => {
            this.assets.selectedCoin.name = res.result.sellCoin.coinName;
            if (this.buyPrice > 0) {
              this.buyVol = (this.assets.mainCoin.vol / this.buyPrice).toFixed(this.amountDecimal);
            } else {
              this.buyVol = '';
            }
            this.saleVol = this.assets.selectedCoin.vol.toFixed(this.amountDecimal);

            if (this.buyVol > 0) {
              this.buyPortion = 100;
            } else {
              this.buyPortion = 0;
            }

            if (this.saleVol > 0) {
              this.salePortion = 100;
            } else {
              this.salePortion = 0;
              this.saleVol = '';
            }
          }).catch(err => console.log('err: ', err));
        }
      });

      // 点击挂单区价格行后
      Bus.$on('price-selected', (type, price) => {
        if (type === 'sale') {
          this.buyPrice = price;
        } else {
          this.salePrice = price;
        }
      });

      // 用户撤单
      Bus.$on('order-cancel', () => {
        this.getUserAssets(false).catch(err => console.log('err: ', err));
      });

      Bus.$on('user-logout', () => {
        this.$store.commit('SET_TOKEN', '');
        this.$store.commit('SET_UID', '');
      });

      Bus.$on('get-dot', (priceDecimal, amountDecimal, valueDecimal, tradable) => {
        [this.priceDecimal, this.amountDecimal, this.valueDecimal, this.tradable] = [priceDecimal, amountDecimal, valueDecimal, tradable];
      });
    },

    beforeDestroy() {
      if (this.tradeInterval) {
        clearInterval(this.tradeInterval);
      }
    },

    data() {
      return {
        tradeInterval: null,
        tradable: true,
        assets: {
          mainCoin: {id: 0, name: "USDT", vol: '0', value: '0.00'},
          selectedCoin: {id: 0, name: "BTC", vol: '0', value: '0.00'},
        },
        priceType: 0, // 0：现价交易， 1： 市价交易
        buyPrice: '',  // 买入价
        buyVol: '',  // 买入量
        salePrice: '',  // 卖出价
        saleVol: '',  // 卖出量
        buyPortion: 0,  // slider量
        salePortion: 0,  // slider量
        inputFontSize: '14px',
        priceDecimal: 4,
        amountDecimal: 4,
        valueDecimal: 4,
        AboutTitle9: this.$t('home.About.AboutTitle9'),
        EntrustSuccess: this.$t('trade.EntrustSuccess'),
        PleaseGoInFirst: this.$t('trade.PleaseGoInFirst'),
        BalanceInsufficient: this.$t('trade.BalanceInsufficient'),
      }
    },

    computed: {
      // 约等于多少人民币
      buyEval() {
        return (this.buyPrice * this.$store.state.usdt_cny).toFixed(2);
      },
      saleEval() {
        return (this.salePrice * this.$store.state.usdt_cny).toFixed(2);
      },

      // 交易额
      buyValue() {
        return (this.buyPrice * this.buyVol).toFixed(8);
      },
      saleValue() {
        return (this.salePrice * this.saleVol).toFixed(8);
      },
    },

    methods: {
      // 格式化数字，替换掉非数字和多余的小数点
      formateNumber(value, decimal) {
        let formateValue = value.replace('。', '.').replace('..', '.');
        formateValue = formateValue.replace(/[^\d.]+/, '');
        const pattern = `(\\.\\d{${decimal}})(.+)`;
        const regex = new RegExp(pattern);
        formateValue = formateValue.replace(/(.+\..*)(\.)/, (match, p1, p2, offset, string) => {
          return p1;
        });
        formateValue = formateValue.replace(regex, (match, p1, p2, offset, string) => {
          return p1;
        });
        return formateValue;
      },

      // 输入买入价
      handleBuyPriceInput(e) {
        if (e.inputType === 'deleteContentBackward') {
          return;
        }
        this.buyPrice = this.formateNumber(this.buyPrice, this.priceDecimal);
      },

      // 输入买入量
      handleBuyVolInput(e) {
        if (this.buyPrice > 0) {
          this.buyPortion = Number.parseInt(this.buyVol * this.buyPrice / this.assets.mainCoin.vol * 100);
        }
        if (e.inputType === 'deleteContentBackward') {
          return;
        }
        this.buyVol = this.formateNumber(this.buyVol, this.amountDecimal);
      },

      // 点击拖拽条比例点
      handleBuyPortionClick(i) {
        this.buyPortion = 25 * i;
        if (this.buyPrice > 0) {
          this.buyVol = (this.assets.mainCoin.vol * this.buyPortion / 100 / this.buyPrice).toFixed(this.amountDecimal);
        }
      },

      // 输入卖出价
      handleSalePriceInput(e) {
        if (e.inputType === 'deleteContentBackward') {
          return;
        }
        this.salePrice = this.formateNumber(this.salePrice, this.priceDecimal);
      },

      // 输入卖出量
      handleSaleVolInput(e) {
        this.salePortion = Number.parseInt(this.saleVol / this.assets.selectedCoin.vol * 100);
        if (e.inputType === 'deleteContentBackward') {
          return;
        }
        this.saleVol = this.formateNumber(this.saleVol, this.amountDecimal);
      },

      // 点击拖拽条比例点
      handleSalePortionClick(i) {
        this.salePortion = 25 * i;
        this.saleVol = (this.assets.selectedCoin.vol * this.salePortion / 100).toFixed(this.amountDecimal);
      },

      // 获取用户资产
      getUserAssets(cancelable=true) {
        // 如果存在用户
        if (this.$store.state.token && this.$store.state.selectedCoin.tradeId) {
          const tradeId = this.$store.state.selectedCoin.tradeId;
          return tradeRequest.getUserAssets(tradeId, cancelable).then(res => {
            this.assets.mainCoin.vol = res.result.buyCoin.total;
            this.assets.mainCoin.name = res.result.buyCoin.coinName;
            this.assets.selectedCoin.vol = res.result.sellCoin.total;
            this.assets.selectedCoin.name = res.result.sellCoin.coinName;
            return res;
          });
        }
      },

      // 选择限价交易
      handleRealPriceSelected() {
        this.priceType = 0;
      },

      // 选择市价交易
      handleMarketPriceSelected() {
        this.priceType = 1;
      },

      // 登录/注册
      handleChargeOrLogin(coinId) {
        if (!this.$store.state.token) {
          this.$router.push('/user/login');
          this.$destroy();
        } else {
          this.$router.push({path: '/Financial/assets'});
          this.$destroy();
        }
      },

      // 跳转费率声明
      handleFeeRequest() {
        const id = 8;
        const name = this.AboutTitle9;
        this.$router.push({
          path: '/home/About/' + id,
          query: {
            id: id,
            name: name
          }
        });
      },

      // 点击买单横条右侧数字
      handleAllVolClick(flag) {
        if (flag) {
          this.buyPortion = 100;
          if (this.buyPrice > 0) {
            this.buyVol = (this.assets.mainCoin.vol / this.buyPrice).toFixed(this.amountDecimal);
          }
        } else {
          this.salePortion = 100;
          this.saleVol = this.assets.selectedCoin.vol.toFixed(this.amountDecimal);
        }
      },

      // 下单
      handleBuyRequest() {
        if (!this.tradable) {
          return
        }
        if (this.$store.state.token) {

          // 买单判断交易额是否小于可用
          if (!this.checkAmountEnrough(this.buyValue, this.assets.mainCoin.vol)) {
            return
          }

          const limited = this.priceType;
          const symbol = this.$store.state.selectedCoin.tradeId;
          const tradePrice = !limited ? this.buyPrice : undefined;
          const tradeAmount = this.buyVol;
          if (parseFloat(tradePrice) > 0 && parseFloat(tradeAmount) > 0) {
            tradeRequest.buy(limited, symbol, tradeAmount, tradePrice).then(res => {
              this.$message({
                message: this.EntrustSuccess,
                type: 'success'
              });
              this.buyVol = '';
              this.getUserAssets().catch(err => console.log('err: ', err));
              Bus.$emit('user-trade', tradePrice);
            }).catch(err => console.log('err: ', err));
          }
        } else {
          this.$message({
            message: this.PleaseGoInFirst,
            type: 'warning'
          });
        }
      },

      // 下单
      handleSellRequest() {
        if (!this.tradable) {
          return
        }
        const limited = this.priceType;
        const symbol = this.$store.state.selectedCoin.tradeId;
        const tradePrice = !limited ? this.salePrice : undefined;
        const tradeAmount = this.saleVol;

        if (this.$store.state.token) {

          // 卖单判断卖出量是否小于可用
          if (!this.checkAmountEnrough(tradeAmount, this.assets.selectedCoin.vol)) {
            return
          }
          if (parseFloat(tradePrice) > 0 && parseFloat(tradeAmount) > 0) {
            tradeRequest.sell(limited, symbol, tradeAmount, tradePrice).then(res => {
              this.$message({
                message: this.EntrustSuccess,
                type: 'success'
              });
              this.saleVol = '';
              this.getUserAssets().catch(err => console.log('err: ', err));
              Bus.$emit('user-trade', tradePrice);
            }).catch(err => console.log('err: ', err));
          }
        } else {
          this.$message({
            message: this.PleaseGoInFirst,
            type: 'warning'
          });
        }
      },

      // 用户资产是否够支撑买入量/卖出量
      checkAmountEnrough(amount, total) {
        if (amount > total) {
          this.$message({
            message: this.BalanceInsufficient,
            type: 'warning'
          });
          return false;
        } else {
          return true;
        }
      },

      // 横条拖拽
      handleBuySliderChange(value) {
        if (this.buyPrice > 0) {
          const number = (this.assets.mainCoin.vol * value / 100 / this.buyPrice).toFixed(this.amountDecimal);
          this.buyVol = number;
        }
      },

      // 横条拖拽
      handleSaleSliderChange(value) {
        const number = (this.assets.selectedCoin.vol * value / 100).toFixed(this.amountDecimal);
        this.saleVol = number;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  i {
    margin: 0;
  }

  .cm-trading {
    .cm-title {
      background-color: $darkColor;
      font-size: 16px;
      padding: 21px 17px;
      margin: 0 0 3px 0;
      .cm-trade-title {
        padding: 18px 0;
        margin-right: 60px;
      }
      .cm-title__selected {
        color: $selectedColor;
        border-bottom: 2px solid $selectedColor;
      }
    }
    .cm-trade-form {
      background-color: $darkColor;
      padding: 0 9px 25px 9px;
      .cm-trade-input {
        position: relative;
        margin-top: 20px;
        input {
          background-color: $coinPageLineColor !important;
          line-height: 36px;
          width: 100%;
          background-color: transparent;
          font-size: 14px;
          padding: 0 65px;
          color: $primaryFontColor;
          border: 1px solid $primaryFontColor;
          border-radius: 5px;
        }
        input:focus {
          border: 1px solid #7b9cfd;
          box-shadow: 0 0 1px 1px #7b9cfd;
          outline: 0;
        }
        .cm-trade-input-before {
          position: absolute;
          top: 11px;
          left: 6px;
          color: #999;
        }
        .cm-trade-input-after {
          position: absolute;
          top: 11px;
          right: 6px;
          color: #999;
        }
      }
      .cm-trade-slider__range {
        position: relative;
        top: -8px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      .cm-trade__total {
        margin-bottom: 20px;
        margin-top: 6px;
      }
      .cm-trade-col {
        padding: 0 8px;
        .cm-evaluate {
          background-color: $unselectColor;
          height: 23px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #999;
          padding: 0 10px;
          border-radius: 5px;
        }
      }
      .cm-form-button {
        width: 100%;
        line-height: 40px;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        color: $primaryFontColor;
      }
      .cm-form-button:focus {
        outline: 0;
      }

      .cm-form-button__green {
        background-color: $greenColor;
      }
      .cm-form-button__red {
        background-color: $redColor;
      }

      .cm-form-button__green:hover {
        background-color: #429053;
      }

      .cm-form-button__red:hover {
        background-color: #b92f38;
      }

      .cm-form-button__disabled {
        background-color: #999 !important;
      }
      .cm-form-button__disabled:focus {
        outline: 0;
        border: none;
        box-shadow: none;
      }
    }
    .el-slider {
      margin-top: 9px;
    }
    .cm-slider-contianer {
      position: relative;
    }
    .cm-dots {
      position: absolute;
      width: 103%;
      left: -1.5%;
      line-height: 6px;
      top: 12px;
      display: flex;
      justify-content: space-between;
      // background-color: yellow;
      margin: auto;
      .cm-dot-outer {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        // background-color: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        .cm-dot {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          background-color: #999;
        }
      }
      .cm-dot-outer:hover {
        background-color: #999;
      }
    }
  }

</style>

<style>
  .cm-phead {
    font-size: 12px;
  }

  .cm-pbody {
    font-size: 12px;
  }

  .el-slider__button {
    width: 12px;
    height: 12px;
    background-color: #d8d8d8;
    border: 2px solid #525f85;
  }

  .el-slider__runway {
    height: 4px;
    background-color: #d8d8d8;
  }

  .el-slider__bar {
    height: 4px;
    background-color: #525f85;
  }

  .el-slider__button-wrapper {
    top: -16px;
  }
</style>
