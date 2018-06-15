<template>
  <section class="cm-pending">
    <!--<section class="cm-container">-->

    <!-- 最新价格 -->
    <div class="cm-price">
      <span>{{$t('trade.Latestprice')}}</span><span
      style="font-size: 12px;">{{realPrice}} {{$store.state.areaId === 2 ? 'USDT' : 'MC'}} ≈ {{cnyPrice}} CNY</span>
    </div>

    <!-- 卖单挂单 -->
    <cm-dtable :tableData="saleTable"
               :columns="saleColumns"
               thClass="cm-pend-head"
               tbClass="cm-pend-body"
               rowClass="cm-prow"
               :hasVolBar="true"
               barColor="rgba(210, 62, 62, 0.25)"
               :toBottom="true"
               @row-selected="handleSalePriceSelected">
    </cm-dtable>
    <hr>

    <!-- 买单挂单 -->
    <cm-dtable :tableData="buyTable"
               :columns="buyColumns"
               tbClass="cm-pend-body"
               :hasVolBar="true"
               barColor="rgba(32, 123, 42, 0.25)"
               rowClass="cm-prow"
               :hasHead="false"
               @row-selected="handleBuyPriceSelected">
    </cm-dtable>
    <!--</section>-->
  </section>
</template>

<script>
  import {axios} from '~/plugins/request';
  import DTable from '~/components/public/DTable.vue';
  import marketRequest from '~/api/marketRequest';

  import Bus from '~/plugins/bus';

  export default {
    name: 'PendingList',
    components: {
      'cm-dtable': DTable,
    },

    mounted() {

      this.pendIntervel = setInterval(() => {
        this.getPendingAndDealList().catch(err => console.log('err: ', err));
        this.getLastPrice().catch(err => console.log('err: ', err));
      }, 2000);

      Bus.$on('select-coin', (row) => {
        this.getPendingAndDealList(false).then(() => {
          let p1 = undefined;
          let p2 = undefined;
          if (this.saleTable[this.saleTable.length - 1]) {
            p1 = this.saleTable[this.saleTable.length - 1].price;
          }
          if (this.buyTable[0]) {
            p2 = this.buyTable[0].price;
          }

          // 用户选择币种后首次得到数据
          Bus.$emit('pending-init', p1, p2);
        }).catch(err => console.log('err: ', err));

        this.getLastPrice(false).catch(err => console.log('err: ', err));
      });

      Bus.$on('user-trade', (tradePrice) => {
        this.tradePrice = tradePrice;
        this.getPendingAndDealList().catch(err => console.log('err: ', err));
        this.getLastPrice().catch(err => console.log('err: ', err));
      });
    },

    beforeDestroy() {
      if (this.pendIntervel) {
        clearInterval(this.pendIntervel);
      }
    },

    data() {
      return {
        pendIntervel: null,
        realPrice: 0,
        volume: 0, // 交易量
        rate: 0, // 涨幅
        maxPrice: 0,
        minPrice: 0,
        tradePrice: null,
        rowOfBuyPrice: null,
        rowOfSellPrice: null,
        coinName: 'USDT',
        saleTable: [],
        saleColumns: [
          {prop: 'id', label: this.$t('trade.Position'), span: 4, class: 'cm-scol1', processMethod: this.formateSaleId},
          {
            prop: 'price',
            label: this.$t('trade.Price') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 10,
            class: 'cm-scol2'
          },
          {
            prop: 'amount',
            label: this.$t('trade.Volume') + '(' + this.$store.state.selectedCoin.name + ')',
            span: 10,
            class: 'cm-scol3 '
          },
          // {prop: 'total', label: '总计(USDT)', span: 7, class: 'cm-scol4'}
        ],
        buyTable: [],
        buyColumns: [
          {prop: 'id', label: this.$t('trade.Position'), span: 4, class: 'cm-bcol1', processMethod: this.formateBuyId},
          {
            prop: 'price',
            label: this.$t('trade.Price') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 10,
            class: 'cm-bcol2'
          },
          {
            prop: 'amount',
            label: this.$t('trade.Volume') + '(' + this.$store.state.selectedCoin.name + ')',
            span: 10,
            class: 'cm-scol3'
          },
          // {prop: 'total', label: '总计(USDT)', span: 7, class: 'cm-scol4'}
        ],
      }
    },

    computed: {
      // 币种价格的人民币对价
      cnyPrice() {
        let number = 0;
        if (this.$store.state.areaId === 2) {
          number = this.realPrice * this.$store.state.usdt_cny;
        } else {
          number = this.realPrice * this.$store.state.mc_cny;
        }
        return number.toFixed(2);
      }
    },

    watch: {
      // 价格变动时通知kline banner
      realPrice: function (newValue, oldValue) {
        Bus.$emit('price-change', newValue, this.volume, this.rate, this.maxPrice, this.minPrice);
      },
    },

    methods: {
      setColumns() {
        if (this.$i18n) {
          this.saleColumns = [
            {
              prop: 'id',
              label: this.$t('trade.Position'),
              span: 4,
              class: 'cm-scol1',
              processMethod: this.formateSaleId
            },
            {
              prop: 'price',
              label: this.$t('trade.Price') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
              span: 10,
              class: 'cm-scol2'
            },
            {
              prop: 'amount',
              label: this.$t('trade.Volume') + '(' + this.$store.state.selectedCoin.name + ')',
              span: 10,
              class: 'cm-scol3 '
            },
            // {prop: 'total', label: '总计(USDT)', span: 7, class: 'cm-scol4'}
          ];
          this.buyColumns = [
            {
              prop: 'id',
              label: this.$t('trade.Position'),
              span: 4,
              class: 'cm-bcol1',
              processMethod: this.formateBuyId
            },
            {
              prop: 'price',
              label: this.$t('trade.Price') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
              span: 10,
              class: 'cm-bcol2'
            },
            {
              prop: 'amount',
              label: this.$t('trade.Volume') + '(' + this.$store.state.selectedCoin.name + ')',
              span: 10,
              class: 'cm-scol3'
            },
            // {prop: 'total', label: '总计(USDT)', span: 7, class: 'cm-scol4'}
          ];
        }
      },

      // 获取买卖单和成交列表
      getPendingAndDealList(cancelable=true) {
        if (!this.$store.state.selectedCoin.tradeId) {
          return
        }

        if (this.$store.state.selectedCoin.apiSource === 1) {

          // native api
          const symbol = this.$store.state.selectedCoin.tradeId;
          return marketRequest.getRealMarket(symbol, undefined, undefined, cancelable).then(res => {
            this.saleTable = res.result.sells;
            this.buyTable = res.result.buys;
            Bus.$emit('transaction-update', res.result.trades);
          }).then(() => {
            this.saleTable.sort(function (a, b) {
              return b.id - a.id;
            });

            // 使卖单挂单有置底效果
            while (this.saleTable.length < 5) {
              this.saleTable.unshift({});
            }
            if (this.tradePrice) {
              this.setRowOfTradePrice(this.tradePrice);
            }
          });
        } else if (this.$store.state.selectedCoin.apiSource === 3) {

          // huobi api
          const symbol = this.$store.state.selectedCoin.tradeId;
          const decimal = this.$store.state.selectedCoin.decimal;
          return marketRequest.getHuobiDepth(symbol, decimal.price, decimal.amount, cancelable).then(res => {
            this.saleTable = res.asks;
            this.buyTable = res.bids;
            if (this.tradePrice) {
              this.setRowOfTradePrice(this.tradePrice);
            }
          });
        }
      },

      pendingDataInit() {
        if (!this.$store.state.selectedCoin.tradeId) {
          return
        }

        if (this.$store.state.selectedCoin.apiSource === 1) {

          // native api
          const symbol = this.$store.state.selectedCoin.tradeId;
          return marketRequest.getRealMarket(symbol, undefined, undefined, cancelable).then(res => {
            this.saleTable = res.result.sells;
            this.buyTable = res.result.buys;
            Bus.$emit('transaction-update', res.result.trades);
          }).then(() => {
            this.saleTable.sort(function (a, b) {
              return b.id - a.id;
            });

            // 使卖单挂单有置底效果
            while (this.saleTable.length < 5) {
              this.saleTable.unshift({});
            }
          });
        } else if (this.$store.state.selectedCoin.apiSource === 3) {

          // huobi api
          const symbol = this.$store.state.selectedCoin.tradeId;
          const decimal = this.$store.state.selectedCoin.decimal;
          return marketRequest.getHuobiDepth(symbol, decimal.price, decimal.amount, cancelable).then(res => {
            this.saleTable = res.asks;
            this.buyTable = res.bids;
          });
        }
      },

      // 获取最新价格和币种小数点配置
      getLastPrice(cancelable=true) {
        return marketRequest.getLastPrice(this.$store.state.selectedCoin.tradeId, cancelable).then(res => {
          this.realPrice = res.result.price.toFixed(res.result.priceScale);
          this.volume = res.result.total;
          this.rate = res.result.rose;
          this.maxPrice = res.result.maxPrice ? res.result.maxPrice.toFixed(res.result.priceScale) : res.result.price.toFixed(res.result.priceScale);
          this.minPrice = res.result.minPrice ? res.result.minPrice.toFixed(res.result.priceScale) : res.result.price.toFixed(res.result.priceScale);
          this.$store.commit('SET_COIN', {
            decimal: {
              price: res.result.priceScale,
              amount: res.result.quantityScale,
              value: res.result.amoutScale,
            }
          });
          Bus.$emit('get-dot', res.result.priceScale, res.result.quantityScale, res.result.amoutScale, res.result.isShare);
        });
      },

      // 下单在挂单区高亮显示价格所在的行
      setRowOfTradePrice(price) {
        this.buyTable = this.getTableOfValue(this.buyTable, 'price', price, 'cm-self');
        this.saleTable = this.getTableOfValue(this.saleTable, 'price', price, 'cm-self');
      },

      // 查找与价格相等的行，添加css样式
      getTableOfValue(table, prop, value, className) {
        for (let i = 0; i < table.length; i++) {
          if (Number(table[i][prop]) == Number(value)) {
            table[i]['specialClass'] = className;
          }
        }
        return table.slice();
      },

      // 点击挂单区价格，将在下单区自动填写
      handleSalePriceSelected(row, index) {
        if (row.price) {
          Bus.$emit('price-selected', 'sale', row.price);
        }
      },

      handleBuyPriceSelected(row, index) {
        Bus.$emit('price-selected', 'buy', row.price);
      },

      // 格式化行的档位，将1->卖1
      formateSaleId(data) {
        return data ? `${this.$t('trade.Sell')} ${data}` : '';
      },

      formateBuyId(data) {
        return data ? `${this.$t('trade.Buy')} ${data}` : '';
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  i {
    margin: 0;
  }

  hr {
    color: $coinPageLineColor;
    margin: 8px 0;
    border-top: 1px solid $coinPageLineColor;
  }

  .cm-pending {
    background-color: $darkColor;
    height: 395px;
    padding: 0 15px;
    .cm-container {
      padding-bottom: 25px;
      border-bottom: 2px solid $coinPageLineColor;
    }
    .cm-price {
      padding: 22px 0;
      border-bottom: 2px solid $selectedColor;
      .cm-price__extreme {
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          font-size: 12px;
          cursor: text;
        }
        span:hover {
          color: inherit;
        }
      }
      span:first-child {
        margin-right: 9px;
      }
    }
    tbody tr td:first-child {
      color: red;
    }
  }
</style>

<style>
  .cm-self {
    color: #ffc200 !important;
  }

  .cm-pend-head {
    height: 30px !important;
    font-size: 12px;
    color: #999;
  }

  .cm-prow {
    height: 28px !important;
  }

  .cm-scol1 {
    color: #a5444a;
    text-align: left;
  }

  .cm-scol2 {
    color: #a5444a;
    text-align: right;
  }

  .cm-scol3 {
    text-align: right;
    padding-right: 10px;
  }

  .cm-scol4 {
    text-align: right;
  }

  .cm-bcol1 {
    color: #4e855a;
    text-align: left;
  }

  .cm-bcol2 {
    color: #4e855a;
    text-align: right;
  }

  .cm-pend-body {
    height: 140px;
    font-size: 12px;
  }

</style>
