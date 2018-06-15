<!-- 币种列表组件 -->
<template>
  <section class="cm-container">
    <span class="cm-title">{{$t('trade.CoinList')}}</span>

    <!-- 查询区域 -->
    <el-row class="cm-query" type="flex" justify="space-between" align="middle">
      <span @click="handleCoinQuery(query)">{{$t('trade.Search')}}</span>
      <el-col :span="10" class="cm-col-input">
        <input type="text" v-model="query" @input="handleCoinQuery(query)">
        <i class="iconfont icm-weibiao45126 cm-search" @click="handleCoinQuery(query)"></i>
      </el-col>

      <!-- 点击换算人民币 -->
      <span class="cm-exchange" @click="handleCurrencySelected" :style="{color: evaluating? '#3366cc' : ''}"><i class="iconfont icm-jiaohuan" style="padding: 0 8px;"></i>CNY</span>
    </el-row>

    <!-- 三大交易区 -->
    <section class="cm-sections">
      <div v-for="(item, index) in areas"
        :key="index"
        class="cm-area-title"
        :class="{'cm-selected': areaId===(index+1),}"
        style="position: relative"
        @click="handleAreaSwitch(index)">
          {{item}}
          <span v-if="index===1" style="font-size: 12px;">
            {{'USDT'}}
          </span>
          <span v-if="index!==1" style="font-size: 12px;">
            {{'MC'}}
          </span>
      </div>
    </section>

    <!-- 列表区 -->
    <cm-coin-table :tableData="coinTable"
      :columns="columns"
      thClass="cm-coin-thead"
      tbClass="cm-coin-tbody"
      rowClass="cm-coin-row"
      @sort-trigger="handleSort"
      @row-selected="handleRowSelected">
    </cm-coin-table>

  </section>
</template>

<script>
import Table from '~/components/public/Table.vue';
import CoinTable from '~/components/trade/CoinTable.vue';
import marketRequest from '~/api/marketRequest';

import Bus from '~/plugins/bus';

export default {
  name: 'CoinList',
  components: {
    'cm-table': Table,
    'cm-coin-table': CoinTable,
  },

  props: {
  },

  mounted() {
    if(this.$store.state.areaId) {
      this.areaId = this.$store.state.areaId;
    } else {
      this.$store.state.areaId = 2;
    }

    // 初始化选中币种，以便k线和买卖单等各区域的初始化
    this.setCoinList(false).then(() => {
      if(this.$store.state.selectedCoin.id) {
        const table = this.coinTable;
        for(let i=0; i<table.length; i++) {
          if(table[i].coinid === this.$store.state.selectedCoin.id) {
            this.handleRowSelected(table[i], i);
          }
        }
      } else {
        if(this.coinTable[0]) {
          this.handleRowSelected(this.coinTable[0], 0);
        }
      }
    }).catch(err => console.log('err: ', err));

    this.interval = setInterval(() => {
      this.setCoinList().catch(err => console.log('err: ', err));
    }, 2000);
  },

  beforeDestroy() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  },

  data() {
    return {
      sort: 4, // 0: 第一列排序， 1: 第二列排序， 2: 第三列排序， 4: 无排序
      descentRate: false,  // 涨幅排序
      descentPrice: true,  // 价格排序
      query: '',  // 币种查询字段
      evaluating: false,  // 是否是人民币价格显示
      interval: null,
      areas: [this.$t('trade.StudyArea'), this.$t('trade.MainArea'), this.$t('trade.QuitArea')],  // 三大交易区
      currency: 'USDT',
      coinTable: [],
      selectedIndex: null,  // 选择币的index
      areaId: 2,
      investTable: [],  // 创新区
      mainTable: [],  // 主区
      quitTable: [],  // 清退区
      columns: [
        {prop: 'sellname', label: this.$t('trade.Coin'), span: 6, sortable: true, class: 'cm-coin-col1'},
        {prop: 'price', label: this.$t('trade.Price'), span: 9, sortable: true, class: 'cm-coin-col2', iconright:true},
        {prop: 'rose', label: this.$t('trade.Change'), span: 9, sortable: true, class: 'cm-coin-col3', iconleft: true}
      ],
      tbodyClasses: ['cm-coin-tbody'],
    }
  },

  methods: {

    // 查询币种
    handleCoinQuery(str) {
      this.query = str;
      this.filtRows(str);
    },

    // 根据query筛选币种的相应row
    filtRows(str) {
      const regex = new RegExp(`^${str}`, 'i');
      let table = [];
      if (this.areaId === 1) {
         table = this.investTable;
      }
      if (this.areaId === 2) {
         table = this.mainTable;
      }
      if (this.areaId === 3) {
         table = this.quitTable;
      }
      const newTable = [];
      for(let i=0; i<table.length; i++) {
        if(regex.test(table[i].sellname)) {
          newTable.push(table[i]);
        }
      }
      this.coinTable = newTable;
    },

    // 点按显示人民币对价的列表信息
    handleCurrencySelected() {
      this.evaluating = !this.evaluating;
      this.calculateWithCurrency();
    },

    // 切换人民币时需按人民币对价对price重新计算
    calculateWithCurrency() {
      let x = this.$store.state.usdt_cny;
      if(this.areaId !== 2) {
        x = this.$store.state.mc_cny;
      }
      if (this.evaluating) {
        this.investTable = this.formateCurrency(this.investTable, x);
        this.mainTable = this.formateCurrency(this.mainTable, x);
        this.quitTable = this.formateCurrency(this.quitTable, x);
        this.setCoinTable();
      } else {
        this.setCoinList().catch(err => console.log('err: ', err));
      }
    },

    // 换算人民币
    formateCurrency(list, x) {
      const table = Object.assign([], list);
      for (let i=0; i<list.length; i++) {
        table[i].price = (table[i].price * x).toFixed(2);
      }
      return table;
    },

    // 将接口返回的列表赋值给相应的table
    setCoinList(cancelable=true) {
      return marketRequest.getMarket(cancelable).then((res) => {
        const investTable = [];
        const mainTable = [];
        const quitTable = [];
        const data = res.result;
        for (let i=0; i<data.length; i++) {
          if (data[i].jiaoyitype === 1) {
            investTable.push(data[i]);
          } else if(data[i].jiaoyitype === 2 ) {
            mainTable.push(data[i]);
          } else if (data[i].jiaoyitype ===3) {
            quitTable.push(data[i]);
          }
        }
        [this.investTable, this.mainTable, this.quitTable] = [investTable, mainTable, quitTable];
        if(this.evaluating) {
          this.calculateWithCurrency();
        } else {
          this.setCoinTable();
        }
        this.doSort(this.sort);
      });
    },

    // 将相应的table复制给coinTable进行显示
    setCoinTable() {
      if (this.areaId == 1) {
        this.coinTable = this.investTable;
      } else if (this.areaId == 3) {
        this.coinTable = this.quitTable;
      } else {
        this.coinTable = this.mainTable;
      }

      // 持久化的币种筛选
      if(this.query) {
        this.filtRows(this.query);
      }
      this.setSelectedTableRow();
    },

    // 选择币种的css效果实现
    setSelectedTableRow() {
      const table = this.coinTable;
      for(let i=0; i<table.length; i++) {
        if(table.specialClass) {
          delete table.specialClass;
        }
      }
      if(this.selectedIndex!==null && table[this.selectedIndex]) {
        table[this.selectedIndex].specialClass = 'cm__isselected';
      }
      this.coinTable = table.slice();
    },

    // 选择交易区，默认选中第一个币种
    handleAreaSwitch(index) {
      this.areaId = index + 1;
      this.setCoinTable();
      this.$store.commit('SET_AREA_ID', this.areaId);
      if(this.coinTable[0]) {
        this.handleRowSelected(this.coinTable[0], 0);
      }
    },

    // 价格和涨跌幅需要升降序两种排序
    handleSort(index) {
      this.sort = index;

      // 价格
      if(index === 1) {
        this.descentPrice = !this.descentPrice;
      }

      // 涨跌幅
      if(index === 2) {
        this.descentRate = !this.descentRate;
      }
      this.doSort(index);
    },

    doSort(index) {
      if(index === 0) {
        // that.coinTable.sort();
        this.coinTable.sort((a, b) => {
          const n1 = a[this.columns[0].prop].charCodeAt(0);
          const n2 = b[this.columns[0].prop].charCodeAt(0);
          return n1 - n2;
        });
      } else if(index === 1) {
        this.coinTable.sort((a, b) => {
          const n1 = a[this.columns[1].prop];
          const n2 = b[this.columns[1].prop];
          return this.descentPrice? (n2-n1) : (n1-n2);
        });
      } else if (index === 2) {
        this.coinTable.sort((a, b) => {
          const n1 = a[this.columns[2].prop];
          const n2 = b[this.columns[2].prop];
          return this.descentRate? (n2-n1) : (n1-n2);
        });
      }
    },

    // 点击币种列表某行
    handleRowSelected(row, index) {
      if(!row) {
        return
      }
      this.selectedIndex = index;
      this.setCoinList().catch(err => console.log('err: ', err));
      this.$store.commit('SET_COIN', {id: row.coinid, name: row.sellname, tradeId: row.tradeid, apiSource: row.source_id});
      Bus.$emit('select-coin', row);
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

i {
  margin: 0;
}

.cm-container {
  // background-color: $darkColor;
  display: flex;
  flex-direction: column;
  .cm-title {
    background-color: $darkColor;
    height: 48px;
    line-height: 48px;
    font-size: $primaryFontSize + 6px;
    text-align: center;
    margin-bottom: 1px;
  }
  .cm-query {
    background-color: $darkColor;
    font-size: $primaryFontSize + 2px;
    padding: 20px;
    color: $primaryFontColor !important;
    .cm-col-input {
      position: relative;
      .cm-search {
        position: absolute;
        top: 5px;
        right: 0;
        font-size: 14px;
        margin: 0;
      }
    }
    input {
      background-color: unset;
      width: 100%;
      line-height: 22px;
      color: $primaryFontColor;
      border-radius: 5px;
      margin: 0 10px;
      padding-right: 20px;
      border: 1px solid $unselectColor;
    }
    .cm-exchange {
      font-size: $primaryFontSize - 1px;
      color: $primaryFontColor;
    }
  }
  .cm-sections {
    background-color: $darkColor;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: $primaryFontSize;
    padding: 14px 20px 17px 20px;
    text-align: center;
    cursor: pointer;
    .cm-area-title {
      font-size: 17px;
      padding: 14px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    span {
      padding: 5px 0;
    }
    section span {
      margin-right: 8px;
    }
    .cm-selected {
      color: #fcc200;
      border-bottom: 2px solid #fcc200;
    }
  }
  .cm-coin-table {
    background-color: $darkColor;
    padding: 0 17px 10px 17px;
  }
}

</style>

<style>
.cm-coin-thead {
  height: 40px !important;
  font-size: 15px;
}
.cm-coin-tbody {
  font-size: 13px;
  height: 485px;
  overflow: hidden;
}
.cm-coin-row {
  height: 35px !important;
  border-bottom: 1px solid #2e323e;
}
.cm-coin-col1 {
  text-align: left;
}
.cm-coin-col2 {
  text-align: right;
}
.cm-coin-col3 {
  text-align: right;
}
</style>
