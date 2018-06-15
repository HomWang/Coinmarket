<template>
  <section class="container" id="EntrustmentRecord">
        <div class="coin-market-Financial-right-title">
            <div class="coin-market-Financial-right-title-Content EntrustmentRecord-Title">
                <section class="coin-market-Financial-right-title-Content-Title" v-for="(item, index) in EntrustmentRecordlist" v-bind:key="index" :class="{ 'EntrustmentRecord-Title-section': index === status }" v-on:click="EntrustmentRecordListClick(index)">
                    {{ item.name }}
                </section>
            </div>
        </div>
        <div class="coin-market-Financial-right-List">
            <my-Wave v-show="LoadingState" :ParentHeight="679"></my-Wave>
            <el-table v-if="status === 0 && LoadingState === false" :data="tableData0.data">
                <el-table-column :label="Time">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.fcreatetime).format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ftradeid_s" :label="Transaction" ></el-table-column>
                <el-table-column :label="direction" width="55%">
                    <template slot-scope="scope">
                        <span :class="{'TextGreenColor': scope.row.ftype === 0, 'TextRedColor': scope.row.ftype === 1}">
                            {{ scope.row.ftype === 0? Buy: Sell }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="fprize_s" :label="Price" width="80%"></el-table-column>
                <!-- <el-table-column prop="fcount" :label="Number"></el-table-column> -->
                <el-table-column prop="flast_s" :label="DealPrice" width="100%"></el-table-column>
                <el-table-column :label="DealNumberAndNumberName" style="text-align: right !important;">
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.fcount - scope.row.fleftcount}}</span> -->
                        <span>{{scope.row.ffinishcount_s}} / {{scope.row.fcount_s}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fsuccessamount_s" :label="DealAmount" width="100%"></el-table-column>
                <el-table-column prop="ffees_s" :label="Fees" width="100%"></el-table-column>
                <el-table-column :label="Status" width="80%">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fstatus === 1" class="TextRedColor">
                            {{Submitted}}
                        </span>
                        <div v-else-if="scope.row.fstatus === 2" class="TextGreenColor">
                            {{PartialFilled}}
                        </div>
                        <div v-else-if="scope.row.fstatus === 3" class="TextGreenColor">
                            {{Filled}}
                        </div>
                        <div v-else-if="scope.row.fstatus === 5">
                            {{Cancel}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-if="status === 0" :label="Operation" v-show="status === 0" width="70%">
                    <template slot-scope="scope">
                        <button class="EntrustmentRecordRevoke" @click="coin_cancel(scope.row.fid)">{{CancelTheOrder}}</button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :current-page.sync="tableData0CurrentPage" v-show="status === 0 && tableData0Length !== 0 && LoadingState === false" :total="tableData0.totalRows" @current-change="handleCurrentChange"></el-pagination>

             <el-table v-if="status === 1 && LoadingState === false" :data="tableData1.data">
                <el-table-column :label="Time">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.fcreatetime).format("yyyy-MM-dd hh:mm:ss")}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ftradeid_s" :label="Transaction" ></el-table-column>
                <el-table-column :label="direction" width="55%">
                    <template slot-scope="scope">
                        <span :class="{'TextGreenColor': scope.row.ftype === 0, 'TextRedColor': scope.row.ftype === 1}">
                            {{ scope.row.ftype === 0? Buy: Sell }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="fprize_s" :label="Price" width="80%"></el-table-column>
                <!-- <el-table-column prop="fcount" :label="Number"></el-table-column> -->
                <el-table-column prop="flast_s" :label="DealPrice" width="100%"></el-table-column>
                <el-table-column :label="DealNumberAndNumberName" >
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.fcount - scope.row.fleftcount}}</span> -->
                        <span>{{scope.row.ffinishcount_s}} / {{scope.row.fcount_s}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fsuccessamount_s" :label="DealAmount" ></el-table-column>
                <el-table-column prop="ffees_s" :label="Fees" width="100%"></el-table-column>
                <el-table-column :label="Status" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.fstatus === 1" class="TextRedColor">
                            {{Submitted}}
                        </span>
                        <div v-else-if="scope.row.fstatus === 2" class="TextGreenColor">
                            {{PartialFilled}}
                        </div>
                        <div v-else-if="scope.row.fstatus === 3" class="TextGreenColor">
                            {{Filled}}
                        </div>
                        <div v-else-if="scope.row.fstatus === 5">
                            {{Cancel}}
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column v-if="status === 0" :label="Operation" v-show="status === 0">
                    <template slot-scope="scope">
                        <button class="EntrustmentRecordRevoke" @click="coin_cancel(scope.row.fid)">撤单</button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-pagination layout="prev, pager, next" :current-page.sync="tableData1CurrentPage" v-show="status === 1 && tableData1Length !== 0 && LoadingState === false" :total="tableData1.totalRows" @current-change="handleCurrentChange"></el-pagination>
        </div>
  </section>
</template>

<script>

import {PersonalCenter} from '~/api/PersonalCenter';
import Bus from '~/plugins/bus.js'

export default {
    name: "EntrustmentRecord",
    data() {
        return {
            LoadingState: true,
            EntrustmentRecordlist: [
                { name: this.$t('finance.entrustment.CurrentTitle') },
                { name: this.$t('finance.entrustment.HistoryTitle') },
            ],
            tableData0: [],
            tableData1: [],
            tableData0CurrentPage: 1,
            tableData1CurrentPage: 1,
            tableData0Length: '',
            tableData1Length: '',
            status: 0,
            currentPage: 1,
            CurrentTitle: this.$t('finance.entrustment.CurrentTitle'),
            HistoryTitle: this.$t('finance.entrustment.HistoryTitle'),
            Time: this.$t('finance.entrustment.Time'),
            Transaction: this.$t('finance.entrustment.Transaction'),
            direction: this.$t('finance.entrustment.direction'),
            Price: this.$t('finance.entrustment.Price'),
            NumberName: this.$t('finance.entrustment.NumberName'),
            DealPrice: this.$t('finance.entrustment.DealPrice'),
            DealNumberAndNumberName: this.$t('finance.entrustment.DealNumberAndNumberName'),
            DealAmount: this.$t('finance.entrustment.DealAmount'),
            Fees: this.$t('finance.entrustment.Fees'),
            Status: this.$t('finance.entrustment.Status'),
            Settled: this.$t('finance.entrustment.Settled'),
            Unsettled: this.$t('finance.entrustment.Unsettled'),
            Operation: this.$t('finance.entrustment.Operation'),
            CancelTheOrder: this.$t('finance.entrustment.CancelTheOrder'),
            More: this.$t('finance.entrustment.More'),
            CancelTheOrderSuccess: this.$t('finance.entrustment.CancelTheOrderSuccess'),
            CancelTheOrderCancel: this.$t('finance.entrustment.CancelTheOrderCancel'),
            HintTitle: this.$t('finance.entrustment.HintTitle'),
            HintDetermine: this.$t('finance.entrustment.HintDetermine'),
            HintCancel: this.$t('finance.entrustment.HintCancel'),
            HintContent: this.$t('finance.entrustment.HintContent'),
            Buy: this.$t('finance.entrustment.Buy'),
            Sell: this.$t('finance.entrustment.Sell'),
            Submitted: this.$t('finance.entrustment.Submitted'),
            PartialFilled: this.$t('finance.entrustment.PartialFilled'),
            Filled: this.$t('finance.entrustment.Filled'),
            Cancel: this.$t('finance.entrustment.Cancel'),
        }
    },
    mounted(){
        this.PostCny_entrust(this.status);
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
            this.PostCny_entrust(this.status);
        },
        LoadCurrentPage(){
            this.currentPage++;
            this.PostCny_entrust(this.status);
        },
        EntrustmentRecordListClick(index){
            if(index !== this.status){
                this.tableData0CurrentPage = 1;
                this.tableData1CurrentPage = 1;
                this.currentPage = 1;
                this.status = index;
                this.PostCny_entrust(index);
            }
        },
        PostCny_entrust(index){
            this.LoadingState = true;
            let Cny_entrust_obj = {
                status: this.status,
                currentPage: this.currentPage
            }
            // 调用委单记录及操作
            PersonalCenter.cny_entrust(Cny_entrust_obj).then((response) => {
                if(index === 0){
                    this.tableData0 = response.result;
                    this.tableData0Length = response.result.data.length;
                }else{
                    this.tableData1 = response.result;
                    this.tableData1Length = response.result.data.length;
                }
                this.LoadingState = false;
            }).catch((err) => {
              console.log('login err: ', err);
            });
        },
        coin_cancel(Fid){
            this.$confirm(this.HintContent, this.HintTitle, {
                confirmButtonText: this.HintDetermine,
                cancelButtonText: this.HintCancel,
                type: 'warning'
            }).then(() => {
                let Coin_cancelObj = {
                    id: Fid
                }
                // 调用撤单操作
                PersonalCenter.coin_cancel(Coin_cancelObj).then((response) => {
                    if(response.code === "200"){
                        this.$message({
                            type: 'success',
                            message: this.CancelTheOrderSuccess
                        });
                        this.PostCny_entrust(this.status);
                    }
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.CancelTheOrderCancel
                });
            });
        }
    }
}
</script>

<style>
    .EntrustmentRecord-Title-section{
        color: #ffc200;
    }
    .EntrustmentRecord-Title>section:hover{
        cursor: pointer;
        color: #ffc200;
    }
    .EntrustmentRecord-Title>.coin-market-Financial-right-title-Content-ScreenCoin{
        margin-left: 20px;
    }
    .EntrustmentRecordRevoke{
        border: none;
        color: #91a7c2 !important;
        background-color: transparent;
        cursor: pointer;
        outline: none;
    }
    .EntrustmentRecordRevoke:hover{
        color: #ffc200 !important;
    }
    #EntrustmentRecord>.coin-market-Financial-right-List>.el-table{
        width: 100%;
        background-color: #222222;
        height: 631px;
    }
    #EntrustmentRecord .el-table--enable-row-transition .el-table__body td:nth-child(4),
    #EntrustmentRecord .el-table--enable-row-transition .el-table__body td:nth-child(5),
    #EntrustmentRecord .el-table--enable-row-transition .el-table__body td:nth-child(6),
    #EntrustmentRecord .el-table--enable-row-transition .el-table__body td:nth-child(7),
    #EntrustmentRecord .el-table--enable-row-transition .el-table__body td:nth-child(8),
    #EntrustmentRecord .el-table th:nth-child(4)>.cell,
    #EntrustmentRecord .el-table th:nth-child(5)>.cell,
    #EntrustmentRecord .el-table th:nth-child(6)>.cell,
    #EntrustmentRecord .el-table th:nth-child(7)>.cell,
    #EntrustmentRecord .el-table th:nth-child(8)>.cell
    {
        text-align: right !important;
    }
</style>
