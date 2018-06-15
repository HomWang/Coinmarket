<template>
  <section class="container" id="AccountDetails">
        <div class="coin-market-Financial-right-title">
            <div class="coin-market-Financial-right-title-Content AccountDetails-Title">
                <section class="coin-market-Financial-right-title-Content-Title">{{From}}</section>
                <section class="coin-market-Financial-right-title-Content-ScreenCoin">
                    <div class="block">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="DateValue" type="daterange" align="right" :range-separator="to" :start-placeholder="StartDate" :end-placeholder="EndDate" :picker-options="pickerOptions2"></el-date-picker>
                    </div>
                </section>
                <section class="AccountDetails-Recharge">
                    <el-select v-model="RechargeValue" :placeholder="Recharge" @change="SymbolClick(1, RechargeValue)">
                        <el-option v-for="item in getCoinTypeListMsg" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>

                </section>
                <section class="AccountDetails-Recharge">
                    <el-select v-model="WithdrawValue" :placeholder="Withdraw" @change="SymbolClick(2, WithdrawValue)">
                        <el-option v-for="item in getCoinTypeListMsg" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </section>
                <button class="BenefitQuery" @click="DateValueAfterEvent">{{Queries}}</button>
            </div>
        </div>
        <div class="coin-market-Financial-right-List">
            <my-Wave v-show="LoadingState" :ParentHeight="679"></my-Wave>
            <el-table v-show="LoadingState === false" :data="tableData.data" style="width: 100%">
                <el-table-column :label="time">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.fcreatetime).format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fcoinname" :label="currency"></el-table-column>
                <el-table-column :label="Type">
                    <template slot-scope="scope">
                        <span :class="{'TextGreenColor': scope.row.ftype === 1, 'TextRedColor': scope.row.ftype === 2}">{{scope.row.ftype_s}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="famount" :label="Amount"></el-table-column>
                <el-table-column prop="ffees" :label="Fees"></el-table-column>
                <el-table-column :label="Status">
                    <template slot-scope="scope">
                        <span :class="{'TextGreenColor': scope.row.fstatus_s === Settled, 'TextRedColor': scope.row.fstatus_s === Unsettled}">{{scope.row.fstatus_s}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" v-show="tableDataLength.length !== 0 && LoadingState === false" :total="tableData.totalRows" @current-change="handleCurrentChange"></el-pagination>
        </div>
  </section>
</template>

<script>
import {PersonalCenter} from '~/api/PersonalCenter';
import Bus from '~/plugins/bus.js'

export default {
    name: "AccountDetails",
    data() {
        return {
            LoadingState: true,
            pickerOptions2: {
                shortcuts: [{
                    text: this.$t('finance.account.last7'),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t('finance.account.last15'),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t('finance.account.last30'),
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            DateValue: '',
            tableData: [],
            tableDataLength: '',
            Time: '',
            record_obj: {
                symbol: '',
                currentPage: 1,
                type: '',//1充值 2提现
                begindate: '',
                enddate: '',
                datetype: '',
            },
            getCoinTypeListMsg: [],
            WithdrawValue: '',
            RechargeValue: '',
            Queries: this.$t('finance.account.Queries'),
            currency: this.$t('finance.account.currency'),
            From: this.$t('finance.account.From'),
            to: this.$t('finance.account.to'),
            days: this.$t('finance.account.days'),
            Operation: this.$t('finance.account.Operation'),
            Recharge: this.$t('finance.account.Recharge'),
            Withdraw: this.$t('finance.account.Withdraw'),
            TransactionTime: this.$t('finance.account.TransactionTime'),
            Type: this.$t('finance.account.Type'),
            Amount: this.$t('finance.account.Amount'),
            Fees: this.$t('finance.account.Fees'),
            Status: this.$t('finance.account.Status'),
            Settled: this.$t('finance.account.Settled'),
            Unsettled: this.$t('finance.account.Unsettled'),
            time: this.$t('finance.account.time'),
            StartDate: this.$t('finance.account.StartDate'),
            EndDate: this.$t('finance.account.EndDate'),
        }
    },
    mounted(){
       this.getCoinTypeList();
        this.PostRecord();
    },
    methods: {
        handleCurrentChange(val) {
            this.record_obj.currentPage = val;
            this.PostRecord();
        },
        SymbolClick(type, id){
            if(type === 1){
                this.WithdrawValue = '';
            }else{
                this.RechargeValue = '';
            }
            this.record_obj.symbol = id;
            this.record_obj.type = type;
        },
        getCoinTypeList(){
            PersonalCenter.getCoinTypeList().then((response) => {
                this.getCoinTypeListMsg = response.result;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },
        LodingCurrentPage(){
            this.currentPage++;
            this.PostRecord();
        },
        DateValueAfterEvent(){
            this.DateValue = this.DateValue?this.DateValue:['',''];
            this.record_obj.datetype = 0;
            this.record_obj.begindate = this.DateValue[0];
            this.record_obj.enddate = this.DateValue[1];
            this.PostRecord();
        },
        PostRecord(){
            this.LoadingState = true;
            // 调用账户明细
            PersonalCenter.record(this.record_obj).then((response) => {
                this.tableData = response.result;
                this.tableDataLength = response.result.data;
                this.LoadingState = false;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        }
    }
}
</script>

<style>
    #AccountDetails>div:nth-child(1)>section{
        height: 29px;
        line-height: 29px;
        margin-bottom: 22px;
    }
    .AccountDetails-Title>.coin-market-Financial-right-title-Content-ScreenCoin{
        margin-left: 0px;
        margin-top: -1px;
    }
    .el-date-editor .el-range__close-icon{
        margin-top: -28px;
    }
    .AccountDetails-Recharge{
        position: relative;
        display: inline-block;
        font-size: 15px;
        float: left;
        width: 110px;
        margin-left: 30px;
        color: #d8d8d8;
        cursor: pointer;
        text-align: center;
    }
    .AccountDetails-Recharge>.el-select>.el-input>input{
        border: 0;
    }
    .AccountDetails-Recharge>section{
        display: none;
        background-color: #000000;
        position: absolute;
        width: 70px;
        overflow: hidden;
        z-index: 9;
    }
    .AccountDetails-Recharge>section>a{
        color: #ffffff;
        display: block;
    }
    .AccountDetails-Recharge>section>a:hover{
        color: #ffc200;
    }
    .AccountDetails-Recharge>span>i{
        transform: rotate(-90deg);
        float: right;
    }
    .AccountDetails-Recharge:hover .DownArrow{
        transform: rotate(0deg);
    }

    .AccountDetails-Recharge:hover .dropdown-content {
        display: block;
    }
    .el-range__icon, .el-range-input, .el-range-separator{
        line-height: 24px !important;
        color: #d8d8d8 !important;
    }
    #AccountDetails>.coin-market-Financial-right-List>.el-table{
        overflow-y: inherit !important;
        width: 100%;
        background-color: #222222;
        height: 631px;
    }
    .BenefitQuery{
        position: relative;
        border: 0;
        outline: none;
        background-color: royalblue;
        color: #ffffff;
        height: 29px;
        width: 90px;
        margin-left: 30px;
        cursor: pointer;
        font-size: 14px;
        background-color: #4c6997;
        border-radius: 5px;
    }
    .BenefitQuery:hover{
        background-color: #6c6ec4;
    }
</style>
