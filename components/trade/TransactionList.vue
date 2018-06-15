<template>
  <section class="cm-transaction">
    <section class="cm-container" style="border-bottom: none; height: 530px;">

      <!-- 最高最低价 -->
      <el-row class="cm-price" type="flex" justify="space-between" style="line-height: 1.2">
        <el-col :span="7">{{$t('trade.LatestTransaction')}}</el-col>
        <el-col :span="8" class="cm-price__extreme" style="text-align: right">{{$t('trade.HighestPrice')}}: <span
          :title="maxPrice">{{maxPrice}}</span></el-col>
        <el-col :span="8" class="cm-price__extreme" style="text-align: right">{{$t('trade.LowestPrice')}}: <span
          :title="minPrice">{{minPrice}}</span></el-col>
      </el-row>

      <!-- 最新成交列表 -->
      <cm-dtable :tableData="transTable" :columns="transColumns" thClass="cm-transc-head" tbClass="cm-transc-tbody"
                 rowClass="cm-prow">
      </cm-dtable>
    </section>
  </section>
</template>

<script>
  import Table from '~/components/public/Table.vue';
  import DTable from '~/components/public/DTable.vue';
  import marketRequest from '~/api/marketRequest';

  import Bus from '~/plugins/bus.js';

  export default {
    name: 'TranscationList',
    components: {
      'cm-table': Table,
      'cm-dtable': DTable,
    },

    props: {},

    mounted() {
      this.pendIntervel = setInterval(() => {
        this.getPendingAndDealList();
      }, 2000);

      Bus.$on('select-coin', row => {
        this.getPendingAndDealList(false);
      });

      Bus.$on('price-change', (price, volume, rate, max, min) => {
        this.maxPrice = max;
        this.minPrice = min;
      });

      Bus.$on('transaction-update', transtable => {
        this.transTable = transtable;
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
        maxPrice: 0,
        minPrice: 0,
        tradePrice: null,
        coinName: 'USDT',
        transTable: [],
        theadClasses: ['cm-trhead'],
        tbodyClasses: ['cm-trbody'],
      }
    },

    computed: {
      transColumns() {
        return [
          {prop: 'time', label: this.$t('trade.Time'), span: 6, class: 'cm-trasc-col1'},
          {
            prop: 'tw_type',
            label: this.$t('trade.Direction'),
            span: 4,
            colorMethod: this.setCellColor,
            class: 'cm-trasc-col2'
          },
          {
            prop: 'price',
            label: this.$t('trade.DealPrice') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 7,
            class: 'cm-trasc-col3'
          },
          {
            prop: 'amount',
            label: this.$t('trade.DealVol') + '(' + this.$store.state.selectedCoin.name + ')',
            span: 7,
            class: 'cm-trasc-last'
          },
        ];
      },
    },

    watch: {},

    methods: {
      // 获取买卖单和成交列表
      getPendingAndDealList(cancelable=true) {
        if (!this.$store.state.selectedCoin.tradeId) {
          return
        }

        if (this.$store.state.selectedCoin.apiSource === 1) {

          // native api : 请查看Bus.$on('transaction-update');
        } else if (this.$store.state.selectedCoin.apiSource === 3) {

          // huobi api
          const symbol = this.$store.state.selectedCoin.tradeId;
          const decimal = this.$store.state.selectedCoin.decimal;
          marketRequest.getHuobiTradeHistory(symbol, 50, decimal.price, decimal.amount, cancelable).then(res => {
            if(res && res.length) {
              this.transTable = res;
            }
          }).catch(err => console.log('err: ', err));
        }
      },

      // 设置买入方向cell颜色
      setCellColor(cell) {
        if(cell.includes(this.$t('trade.Buy'))) {
          return '#4e855a'
        } else {
          return '#a5444a'
        }
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
    margin: 19px 0;
    border-top: 1px solid $coinPageLineColor;
  }

  .cm-transaction {
    background-color: $darkColor;
    padding: 0 15px;
    margin-bottom: 15px;
    .cm-container {
      padding-bottom: 10px;
      border-bottom: 2px solid $coinPageLineColor;
    }
    .cm-price {
      padding: 24px 0;
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

  .cm-trhead {
    color: #999 !important;
    font-size: 12px;
    height: 46px !important;
  }

  .cm-trbody {
    width: 100%;
    font-size: 12px;
    overflow: hidden;
  }

  .cm-trasc-col1 {
    text-align: left;
  }

  .cm-trasc-col2 {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cm-trasc-col3 {
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cm-trasc-last {
    padding-right: 10px;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cm-transc-tbody {
    height: 415px;
    font-size: 12px;
  }

  .cm-transc-head {
    font-size: 12px;
    color: #999;
    padding: 20px 0 15px 0;
  }

</style>
