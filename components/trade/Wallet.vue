<!-- 币种列表组件 -->
<template>
  <section class="cm-wallet">
    <section v-if="!showWallet" class="cm-wallet__closed" @click="handleAssetsRequest">
      <i class="iconfont icm-bitcoin cm-icon"></i>
      <div class="cm-decoration">
        <div class="cm-dot">
        </div>
      </div>
    </section>
    <section v-else class="cm-wallet__opened">
      <div class="cm-wallet-assets" style="border-top: none">
        <div class="cm-wallet-bitcoin">
          <i class="iconfont icm-bitcoin cm-icon"></i>
        </div>
        <div class="cm-wallet-closeicon">
          <i class="iconfont icm-arrow-r cm-icon" @click="showWallet=false" style="font-size: 40px; padding-right: 10px;"></i>
        </div>
      </div>
      <div class="cm-wallet-assets">
        <div>
          {{$t('trade.Assets')}}
        </div>
        <div>
          {{usdt}} ≈ {{cny}} CNY
        </div>
      </div>
      <cm-table :columns="columns"
        :tableData="tableData"
        :lineHeight="30"
        cellClass="cm-wallet-cell">
      </cm-table>
    </section>
  </section>
</template>

<script>
import Dtable from '@/components/public/DTable.vue'
import {PersonalCenter} from '~/api/PersonalCenter';
import Bus from '~/plugins/bus.js'

export default {
  name: 'Wallet',
  components: {
    'cm-table': Dtable,
  },

  props: {
  },

  mounted() {
  },

  beforeDestroy() {
  },

  data() {
    return {
      showWallet: false,
      usdt: 0,
      cny: 0,
      columns: [
        {prop: 'coinName', label: this.$t('trade.currency'), span: 6, sortable: true, class: 'cm-wallet-col1'},
        {prop: 'total_s', label: this.$t('trade.available'), span: 9, sortable: true, class: 'cm-wallet-col2'},
        {prop: 'frozen_s', label: this.$t('trade.Freezing'), span: 9, sortable: true, class: 'cm-wallet-col3'},
      ],
      tableData: [
      ],
    }
  },

  methods: {
    handleAssetsRequest() {
      const walletRequest = {
          hideZero: 'YES',
          currentPage: 1,
      };
      PersonalCenter.wallets(walletRequest).then((response) => {
        this.tableData = response.result.userWalletList;
        this.usdt = response.result.totalUsdtAsset;
        this.cny = response.result.totalCnyAsset;
      }).then(() => {
        this.showWallet = true;
      }).catch(err => console.log('err: ', err));
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-wallet {
  z-index: 100;
  position: fixed;
  bottom: 200px;
  right: -2px;
  border: 2px solid #ffcc66;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.cm-icon {
  font-size: 46px;
  margin: 0;
}
.cm-wallet__closed {
  position: relative;
  width: 60px;
  height: 46px;
  cursor: pointer;
  .cm-decoration {
    width: 30px;
    height: 16px;
    border: 2px solid $primaryFontColor;
    position: absolute;
    right: -16px;
    bottom: 15px;
    border-radius: 10px;
    .cm-dot {
      width: 4px;
      height: 4px;
      background-color: #d8d8d8;
      position: relative;
      right: -6px;
      bottom: -4px;
      border-radius: 2px;
    }
  }
}

.cm-wallet__opened {
  background-color: $primaryColor;
  width: 300px;
  transition: width 0.78s ease-in-out;
  .cm-wallet-assets {
    width: 300px;
    border-top: 1px solid $primaryFontColor;
    border-bottom: 1px solid $primaryFontColor;
    position: relative;
    overflow: hidden;
    .cm-wallet-bitcoin {
      line-height: 60px;
    }
    .cm-wallet-closeicon {
      justify-content: flex-end;
      line-height: 60px;
    }
  }
  .cm-wallet-assets>div {
    display: inline-flex;
    justify-content: center;
    line-height: 40px;
  }
  .cm-wallet-assets>div:first-child {
    width: 75px;
    float: left;
    border-right: 1px solid $primaryFontColor;
  }
  .cm-wallet-assets>div:last-child {
    width: 225px;
    float: right;
    border-left: 1px solid $primaryFontColor;
  }
}

</style>

<style>
.cm-wallet__opened .my-scrollbar {
  height: auto;
}
.cm-wallet__opened .cm-dtable .el-row {
  height: 30px;
  width: 300px;
}
.cm-wallet-cell {
  height: 100%;
  border: 1px solid #d8d8d8;
  border-collapse: collapse;
  display: flex;
  align-items: center;
}
.cm-wallet-col1 {
  justify-content: center;
  border-left: none;
}
.cm-wallet-col2 {
  justify-content: flex-end;
}
.cm-wallet-col3 {
  justify-content: flex-end;
  border-right: none;
}

</style>
