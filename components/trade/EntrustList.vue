<!-- 币币交易委托记录列表 -->
<template>
  <section class="cm-pending">
    <section class="cm-container">

      <!-- 当前委托/历史委托 -->
      <el-row class="cm-title" type="flex" justify="space-between">
        <el-col :span="10">
          <span v-for="(item, index) in EntrustmentRecordlist"
                v-bind:key="index"
                :class="{ 'EntrustList-TitleSelect': index === EntrustAddClickStyleState }"
                @click="EntrustmentRecordListClick(index)"
                style="padding-right: 60px">
            {{ item.name }}
            <!-- <i class="iconfont icm-right"></i> -->
          </span>
        </el-col>
        <el-col :span="4" style="text-align: right"><span><nuxt-link
          to='/Financial/entrusts'>{{$t('trade.AllRecord')}}</nuxt-link></span></el-col>
      </el-row>

      <!-- 委托列表区 -->
      <cm-dtable :tableData="entrustTable" :columns="entrustColumns" thClass="cm-entrust-head"
                 tbClass="cm-entrust-tbody"
                 rowClass="cm-prow" @cell-click="handleOrderCancelRequest">
      </cm-dtable>
    </section>
  </section>
</template>

<script>
  import Table from '~/components/public/Table.vue';
  import DTable from '~/components/public/DTable.vue';
  import {PersonalCenter} from '~/api/PersonalCenter';
  import Bus from '~/plugins/bus.js';

  export default {
    name: 'EntrustList',

    components: {
      'cm-table': Table,
      'cm-dtable': DTable
    },

    props: {},

    mounted(){
      this.EntrustmentRecordlist = [
        {name: this.$t('trade.CurrentEntrustment')},
        {name: this.$t('trade.HistoryEntrustment')},
      ];

      // 获取委托记录
      this.entrustInterval = setInterval(() => {
        this.PostCny_entrust();
      }, 5000);

      // 用户下单刷新
      Bus.$on('user-trade', (price) => {
        this.Cny_entrust_obj.symbol = this.$store.state.selectedCoin.tradeId;
        this.PostCny_entrust();
      });

      // 用户选择币种刷新数据
      Bus.$on('select-coin', () => {
        this.Cny_entrust_obj.symbol = this.$store.state.selectedCoin.tradeId;
        this.PostCny_entrust();
      });
    },

    beforeDestroy() {
      if (this.entrustInterval) {
        clearInterval(this.entrustInterval);
      }
    },

    data() {
      return {
        entrustInterval: null,
        entrustTable: [],
        theadClasses: ['cm-phead'],
        tbodyClasses: ['cm-pbody'],
        Cny_entrust_obj: {
          symbol: null,
          status: 0,
          currentPage: 1
        },
        EntrustmentRecordlist: [
          {name: this.$t('trade.CurrentEntrustment')},
          {name: this.$t('trade.HistoryEntrustment')},
        ],
        EntrustAddClickStyleState: 0,
        tableData: [],
        CancelTheOrder: this.$t('finance.entrustment.CancelTheOrder'),
        CancelTheOrderSuccess: this.$t('finance.entrustment.CancelTheOrderSuccess'),
        CancelTheOrderCancel: this.$t('finance.entrustment.CancelTheOrderCancel'),
        HintTitle: this.$t('finance.entrustment.HintTitle'),
        HintDetermine: this.$t('finance.entrustment.HintDetermine'),
        HintCancel: this.$t('finance.entrustment.HintCancel'),
        HintContent: this.$t('finance.entrustment.HintContent'),
      }
    },

    computed: {
      entrustColumns() {
        const columns = [
          {prop: 'fcreatetime', label: this.$t('trade.Time'), span: 4, class: 'cm-entrust-col1'},
          {prop: 'ftradeid_s', label: this.$t('trade.Pairs'), span: 2, class: 'cm-entrust-col2'},
          {
            prop: 'ftype_s',
            label: this.$t('trade.Direction'),
            span: 2,
            colorMethod: this.setDirectionColor,
            class: 'cm-entrust-col3'
          },
          {
            prop: 'fprize_s',
            label: this.$t('trade.Price') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 2,
          },
          {
            prop: 'flast_s',
            label: this.$t('trade.AveragePrice') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 3,
          },
          {prop: 'amounts', label: this.$t('trade.Amounts'), span: 3,},
          {
            prop: 'fsuccessamount_s',
            label: this.$t('finance.entrustment.DealAmount') + (this.$store.state.areaId === 2 ? '(USDT)' : '(MC)'),
            span: 3,
          },
          {
            prop: 'fstatus_s',
            label: this.$t('trade.Status'),
            span: 3,
            colorMethod: this.setStatusColor,
            class: 'cm-entrust-col8'
          },
          {prop: 'ffees', label: this.$t('trade.TradingFees'), span: 2, class: 'cm-entrust-colast'},
        ];

        // 当前委托有操作一栏
        if (!this.EntrustAddClickStyleState) {
          columns[columns.length - 1].class = 'cm-entrust-col9';
          columns.push({
            prop: 'action',
            label: this.$t('trade.Operation'),
            span: 2,
            class: 'cm-entrust-colast',
            isResponsive: true
          });
        }
        return columns;
      },
    },

    methods: {
      // 点击当前委托/历史委托
      EntrustmentRecordListClick(index){
        this.entrustTable = [];
        this.EntrustAddClickStyleState = index;
        this.$nextTick(function () {
          this.PostCny_entrust();
        });
      },

      // 获取委托记录数据
      PostCny_entrust(){
        this.Cny_entrust_obj.status = this.EntrustAddClickStyleState;
        if (!this.$store.state.token) {
          return
        }

        PersonalCenter.cny_entrust(this.Cny_entrust_obj).then((response) => {
          const list = response.result.data;
          for (let i = 0; i < list.length; i++) {
            list[i].fcreatetime = new Date(list[i].fcreatetime).format("yyyy-MM-dd hh:mm:ss");
            list[i]['amounts'] = `${list[i].ffinishcount_s} / ${list[i].fcount_s}`;
            if (!this.EntrustAddClickStyleState) {
              list[i]['action'] = '撤單';
            }
          }
          this.entrustTable = list;
        }).catch(err => console.log('err: ', err));
      },

      // 撤单操作
      handleOrderCancelRequest(row, cell) {
        if (cell == this.CancelTheOrder) {
          this.$confirm(this.HintContent, this.HintTitle, {
            confirmButtonText: this.HintDetermine,
            cancelButtonText: this.HintCancel,
            type: 'warning'
          }).then(() => {
            const params = {
              id: row.fid,
            };
            PersonalCenter.coin_cancel(params).then(() => {
              this.$message({
                message: this.CancelTheOrderSuccess,
                type: 'success',
              });
              this.PostCny_entrust();
              Bus.$emit('order-cancel');
            }).catch(err => console.log('err: ', err));
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.CancelTheOrderCancel
            });
          });
        }
      },

      // 买入卖出红绿色
      setDirectionColor(cell){
        if (cell.includes(this.$t('trade.Buy'))) {
          return '#4e855a';
        } else {
          return '#a5444a';
        }
      },

      // 成交状态红绿色
      setStatusColor(cell){
        if (cell === this.$t('trade.Unsettled')) {
          return '#a5444a';
        } else if (cell === this.$t('trade.Settled')) {
          return '#4e855a';
        } else if (cell === this.$t('trade.partSettled')) {
          return '#6d7dab';
        } else {
          return '#d8d8d8';
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
    color: $selectedColor;
    margin: 25px 0;
  }

  .cm-pending {
    background-color: $darkColor;
    height: 350px;
    padding: 0 15px;
    .cm-container {
      padding-bottom: 25px;
    }
  }

  .cm-title {
    font-size: 16px;
    padding: 21px 0 18px 0;
    border-bottom: 2px solid $selectedColor;
  }

  a {
    color: $primaryFontColor;
  }

  a:hover {
    color: $goldenColor;
  }
</style>

<style>
  .cm-phead {
    font-size: 12px;
  }

  .cm-entrust-head {
    font-size: 12px;
    color: #999;
    text-align: right;
    padding: 15px 0 15px 0;
  }

  .cm-entrust-tbody {
    height: 250px;
    font-size: 12px;
    text-align: right;
  }

  .cm-entrust-col1 {
    text-align: left;
  }

  .cm-entrust-col2 {
    text-align: center;
  }

  .cm-entrust-col3 {
    text-align: center;
  }

  .cm-entrust-col8 {
    text-align: center;
  }

  .cm-entrust-col9 {
    text-align: right;
    padding-right: 12px;
  }

  .cm-entrust-colast {
    color: #91a7c2;
    padding-right: 10px;
    cursor: pointer;
  }

  .cm-entrust-colast:hover {
    color: #ffc200;
  }

  .EntrustList-TitleSelect {
    color: #ffc200;
  }

  .el-row--flex.is-justify-space-between span:hover {
    color: #ffc200;
    cursor: pointer;
  }

  .cm-cursor__pointer {
    cursor: pointer;
  }

  .cm-cursor__pointer:hover {
    color: #ffc200;
  }

  .cm-th-td.cm-entrust-colast {
    color: #999;
    cursor: default;
  }
</style>
