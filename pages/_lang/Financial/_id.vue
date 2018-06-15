<template>
  <section class="container" id="Financial">
    <Head/>
    <div class="coin-market-Financial">
        <div class="coin-market-Financial-Content">
            <div class="coin-market-Financial-left" v-show="FinancialTitle">
                <div class="coin-market-Financial-left-title">
                    {{$t('finance.financeTitle')}}
                </div>
                <div class="coin-market-Financial-left-list">
                    <section v-for="(item, index) in Menulist" v-bind:key="index" :class="{ 'MenuListAddClickStyle': index === MenuListAddClickStyleState }" v-on:click="MenuListClick(index)">
                        {{ item.name }}
                    </section>
                </div>
            </div>
            <div class="coin-market-Financial-right" v-show="FinancialContent">
                <PersonalAssets v-if="MenuListAddClickStyleState === 0"></PersonalAssets>
                <AccountDetails v-if="MenuListAddClickStyleState === 1"></AccountDetails>
                <EntrustmentRecord v-if="MenuListAddClickStyleState === 2"></EntrustmentRecord>
            </div>
        </div>
    </div>
    <About/>
  </section>
</template>

<script>
import Bus from '~/plugins/bus';

import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import PersonalAssets from '~/components/Financial/PersonalAssets.vue'
import AccountDetails from '~/components/Financial/AccountDetails.vue'
import EntrustmentRecord from '~/components/Financial/EntrustmentRecord.vue'

export default {
    name: "Financial",
    components: {
        Head,
        About,
        PersonalAssets,
        AccountDetails,
        EntrustmentRecord
    },
    head () {
      return {title: 'Coinmarket '+this.$t('common.header.financeCenter')}
    },
  data() {
    return {
        FinancialTitle: false,
        FinancialContent: false,
        MenuListAddClickStyleState: 0,
        Menulist: [
            { name: this.$t('finance.assetTitle') },
            { name: this.$t('finance.accountTitle') },
            { name: this.$t('finance.entrustmentTitle') }
        ],
        langs: ['Chinese', 'English'],
        locale: 'Chinese',
    }
  },
  head () {
    return {
      title: "Coinmarket "+this.$t('common.header.financeCenter'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.financeCenter') }
      ]
    }
  },
  mounted(){
    this.Menulist = [
        { name: this.$t('finance.assetTitle') },
        { name: this.$t('finance.accountTitle') },
        { name: this.$t('finance.entrustmentTitle') }
    ];

    if (this.$route.params.id === 'assets') {
      this.MenuListAddClickStyleState = 0;
    } else if (this.$route.params.id === 'account') {
      this.MenuListAddClickStyleState = 1;
    } else {
      this.MenuListAddClickStyleState = 2;
    }
    this.FinancialContent = this.FinancialTitle = true;
  },
  methods: {
    chooseLocale: function(e) {
      this.locale = e;
    },
    MenuListClick(index){
        switch(index){
            case 0:
                this.$router.push({path: '/Financial/assets'})
                break;
            case 1:
                this.$router.push({path: '/Financial/account'})
                break;
            case 2:
                this.$router.push({path: '/Financial/entrusts'})
                break;
            default:
                return;
        }
        // this.MenuListAddClickStyleState = index;
    },
  }
}
</script>

<style>
    .coin-market-Financial-Content{
        position: relative;
        overflow: hidden;
        padding: 30px 0;
        width: 1240px;
        margin: 0 auto;
    }
    .coin-market-Financial-left{
        width: 16%;
        float: left;
        margin-right: 0.5%;
    }
    .coin-market-Financial-right{
        position: relative;
        width: 83.5%;
        min-height: 755px;
        float: right;
        color: #d8d8d8;
        background-color: #222222;
    }
    .coin-market-Financial-left-title{
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        font-size: 16px;
        color: #d8d8d8;
        background-color: #3366cc;
    }
    .coin-market-Financial-left-list{
        text-align: center;
        height: 680px;
        padding-top: 5px;
        background-color: #222222;
        color: #000000;
    }
    .coin-market-Financial-left-list>section{
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        margin: 10px 0;
        border-right: 5px solid transparent;
        color: #d8d8d8;
        cursor: pointer;
    }
    .coin-market-Financial-left-list>section:hover{
        background-color: #30302f !important;
        border-right: 5px solid #525f85 !important;
    }
    .MenuListAddClickStyle{
        background-color: #30302f !important;
        border-right: 5px solid #525f85 !important;
    }
    .coin-market-Financial-right-title{
        width: 94%;
        margin: 0px 45px;
        border-bottom: 1px solid #a9a9a9;
    }
    .coin-market-Financial-right-title-Content{
        height: 29px;
        line-height: 29px;
        margin-top: 23px;
        margin-bottom: 23px;
        color: #d8d8d8;
    }
    .coin-market-Financial-right-title-Content-Title{
        width: auto;
        float: left;
        font-size: 16px;
        margin-right: 30px;
    }
    .coin-market-Financial-right-title-Content-ScreenCoin{
        float: left;
        width: auto;
        font-size: 15px;
    }
    .coin-market-Financial-right-title-Content-ScreenCoin>section{
        width: 15px;
        height: 15px;
        border: 1px solid #d8d8d8;
        border-radius: 100%;
        float: left;
        margin-top: 7px;
        margin-right: 10px;
        cursor: pointer;
    }
    .coin-market-Financial-right-title-Content-TotalAssets{
        min-width: 420px;
        float: left;
        text-align: left;
        font-size: 15px;
        color: #d8d8d8;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .coin-market-Financial-right-List{
        width: 97%;
        min-width: 961px;
        margin: 0 auto;
        padding-left: 30px;
    }
    #Financial .el-table td, #Financial .el-table th{
        padding: 17px 0;
    }
    .el-table td, .el-table th:nth-child(1), .el-table--enable-row-transition .el-table__body td:nth-child(1){
        text-align: left !important;
    }
    .el-button--text{
        color: #ffc200;
    }
    .el-button--text:hover{
        color: #9ea7c2;
    }
    .el-table .cell, .el-table th div{
        font-weight: 300;
        font-size: 14px;
        padding: 0;
    }
    .coin-market-Financial-right-List>a{
        text-align: center;
        display: block;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        color: #6D7DA8;
    }
    .coin-market-Financial-right-List>a:hover{
        color: #ffc200 !important;
    }
    .el-table__body, .el-table__footer, .el-table__header{
        width: 100% !important;
    }
    .el-table::before{
        height: 0;
    }
</style>
