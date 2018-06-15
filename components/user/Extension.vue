<template>
  <section class="container" id="Extension">
        <section class="Extension-Content">
            <section class="Extension-Content-Title">
                <span>{{JointPromotion}}</span>
                <img class="logo" src="@/assets/img/home/logo.svg" alt="Coin-Market">
            </section>
            <section class="Extension-Content-Invitation">
                <section class="Extension-Content-Invitation-Title">{{WelcomePromotion}}</section>
                <section v-show="isPromoterNumber === 3" class="Extension-Content-Invitation-Link">{{ExtensionUrl}}</section>
                <section v-show="isPromoterNumber !== 3" class="Extension-Content-Invitation-Link">{{PromotionHref}}</section>
                <section v-show="isPromoterNumber === 3" class="Extension-Content-Invitation-CopyLink" v-clipboard:copy="ExtensionUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">{{CopyHref}}</section>
                <section @click="apply_be_promoter" v-show="isPromoterNumber === 0 && authType === true || isPromoterNumber === 2 && authType === true" class="Extension-Content-Invitation-CopyLink">{{ImmediateApplication}}</section>
                <section v-show="isPromoterNumber === 1" class="Extension-Content-Invitation-CopyLink">{{InAudit}}</section>
                <p class="Invitation-ToFinish" v-show="authType === false">{{IdAndPhoneBind}} <nuxt-link :to="{path: '/user/security'}">{{ToComplete}}</nuxt-link></p>
                <section v-show="isPromoterNumber === 3" class="Extension-Content-Invitation-CopyLink Extension-Content-Invitation-createQrc" @mouseover="createQrc" @mouseout="HideQrc">{{QRcode}}</section>
                <div v-show="QRCodeState" class="banner-box QRCodeStatebanner-box">
                    <canvas id="qrccode-canvas"></canvas>
                </div>
            </section>
            <section class="Extension-Content-Invitation-Count">
                <p>{{OfferNumber}}</p>
                <p v-show="isPromoterNumber === 3"><span>{{CountNumber}}</span> {{$t('finance.asset.People')}}</p>
                <p v-show="authType === true">
                    <a href="javascript:void(0);" v-show="isPromoterNumber === 0 || isPromoterNumber === 2" @click="apply_be_promoter">{{ApplicationAgent}}</a>
                    <a href="javascript:void(0);" v-show="isPromoterNumber === 1">{{InAudit}}</a>
                </p>
                <p v-show="authType === false"><nuxt-link :to="{path: '/user/security'}">{{ToCompleteCertification}}</nuxt-link></p>
            </section>
            <section class="Extension-Content-Title">
                <span>{{GetRewardStatistics}}</span>
            </section>
            <section class="Extension-Content-Statistics-list">
                <el-table :data="RewardList" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" :class="{'ExtensionFontColor': AdoptState === true}">
                    <el-table-column :label="Currency" sortable>
                        <template slot-scope="scope">
                            <img  :src="scope.row.logo" alt="">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="AddGetReward" sortable>
                        <template slot-scope="scope">
                            <span>{{scope.row.ffees}} / {{scope.row.shortname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="LatelyGetTime" sortable>
                        <template slot-scope="scope">
                            <span>{{scope.row.latesttime.slice(0, 10)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <section class="Extension-Content-Statistics-list-Prompt">
                    - - - - - - - - -  {{PleaseExpect}}  - - - - - - - - -
                </section>
            </section>
            <section class="Extension-Content-AlreadyInvited">
                <el-table :data="FloorList.data" style="width: 100%" :class="{'ExtensionFontColor': AdoptState === true}">
                    <el-table-column prop="accout" :label="OfferAccountNumber"></el-table-column>
                    <el-table-column prop="fregistertime" :label="OfferTime"></el-table-column>
                    <el-table-column prop="tradetime" :label="TransactionTime"></el-table-column>
                    <el-table-column :label="GetReward">
                        <template slot-scope="scope">
                            <span>{{scope.row.ffees}} / {{scope.row.shortname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="TransactionMode">
                        <template slot-scope="scope">
                            <img :src="scope.row.ftype === '1'?require('../../assets/img/user/maichu.png'):require('../../assets/img/user/mairu.png')" alt="">
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-show="FloorList.totalRows > FloorList.pageSize" :page-size="FloorList.pageSize" @current-change="handleCurrentChange" layout="prev, pager, next" :total="FloorList.totalRows"></el-pagination>
            </section>
        </section>
  </section>
</template>

<script>
import userRequest from '~/api/userRequest';
import QRCode from 'qrcode'
import Bus from '~/plugins/bus.js'

export default {
    name: "Extension",

    data() {
        return{
            QRCodeState: false,
            isPromoterNumber: 0,
            tableData: [],
            authType: true,
            ApplyType: false,
            AdoptState: false,
            RewardList: [],
            Rate: '',
            CountNumber: 0,
            FloorList: [],
            AlreadyCurrentPage: 1,
            ExtensionUrl: '',
            IFjsStringObj: {
                Linkcannotbeempty: this.$t('finance.asset.Linkcannotbeempty'),
                PleaseContact: this.$t('finance.asset.PleaseContact'),
            },
            QRcode: this.$t('finance.asset.QRcode'),
            JointPromotion: this.$t('user.Extension.JointPromotion'),
            WelcomePromotion: this.$t('user.Extension.WelcomePromotion'),
            PromotionHref: this.$t('user.Extension.PromotionHref'),
            CopyHref: this.$t('user.Extension.CopyHref'),
            ImmediateApplication: this.$t('user.Extension.ImmediateApplication'),
            InAudit: this.$t('user.Extension.InAudit'),
            IdAndPhoneBind: this.$t('user.Extension.IdAndPhoneBind'),
            ToComplete: this.$t('user.Extension.ToComplete'),
            OfferNumber: this.$t('user.Extension.OfferNumber'),
            ApplicationAgent: this.$t('user.Extension.ApplicationAgent'),
            ToCompleteCertification: this.$t('user.Extension.ToCompleteCertification'),
            GetRewardStatistics: this.$t('user.Extension.GetRewardStatistics'),
            Currency: this.$t('user.Extension.Currency'),
            AddGetReward: this.$t('user.Extension.AddGetReward'),
            LatelyGetTime: this.$t('user.Extension.LatelyGetTime'),
            PleaseExpect: this.$t('user.Extension.PleaseExpect'),
            OfferAccountNumber: this.$t('user.Extension.OfferAccountNumber'),
            OfferTime: this.$t('user.Extension.OfferTime'),
            TransactionTime: this.$t('user.Extension.TransactionTime'),
            GetReward: this.$t('user.Extension.GetReward'),
            TransactionMode: this.$t('user.Extension.TransactionMode'),
            CopySuccess: this.$t('user.Extension.CopySuccess'),
            NotCopyText: this.$t('user.Extension.NotCopyText'),
        }
    },

    mounted(){

        this.QRcode = this.$t('finance.asset.QRcode');
        this.JointPromotion = this.$t('user.Extension.JointPromotion');
        this.WelcomePromotion = this.$t('user.Extension.WelcomePromotion');
        this.PromotionHref = this.$t('user.Extension.PromotionHref');
        this.CopyHref = this.$t('user.Extension.CopyHref');
        this.ImmediateApplication = this.$t('user.Extension.ImmediateApplication');
        this.InAudit = this.$t('user.Extension.InAudit');
        this.IdAndPhoneBind = this.$t('user.Extension.IdAndPhoneBind');
        this.ToComplete = this.$t('user.Extension.ToComplete');
        this.OfferNumber = this.$t('user.Extension.OfferNumber');
        this.ApplicationAgent = this.$t('user.Extension.ApplicationAgent');
        this.ToCompleteCertification = this.$t('user.Extension.ToCompleteCertification');
        this.GetRewardStatistics = this.$t('user.Extension.GetRewardStatistics');
        this.Currency = this.$t('user.Extension.Currency');
        this.AddGetReward = this.$t('user.Extension.AddGetReward');
        this.LatelyGetTime = this.$t('user.Extension.LatelyGetTime');
        this.PleaseExpect = this.$t('user.Extension.PleaseExpect');
        this.OfferAccountNumber = this.$t('user.Extension.OfferAccountNumber');
        this.OfferTime = this.$t('user.Extension.OfferTime');
        this.TransactionTime = this.$t('user.Extension.TransactionTime');
        this.GetReward = this.$t('user.Extension.GetReward');
        this.TransactionMode = this.$t('user.Extension.TransactionMode');
        this.CopySuccess = this.$t('user.Extension.CopySuccess');
        this.NotCopyText = this.$t('user.Extension.NotCopyText');
        this.IFjsStringObj = {
            Linkcannotbeempty: this.$t('finance.asset.Linkcannotbeempty'),
            PleaseContact: this.$t('finance.asset.PleaseContact'),
        };

        this.getSecurityLevel();
        this.getIsPromoter();
        this.get_extension_address();
        this.get_extension_count();
        this.get_extension_content();
    },

    methods: {
        onCopy(e){
            this.$Message({
                message: this.CopySuccess,
                type: 'success',
                center: true,
            });
        },

        onError(e) {
            this.$Message({
                message: this.NotCopyText,
                type: 'error',
                center: true,
            });
        },

        formatter(row, column) {
            return row.address;
        },

        HideQrc(){
            this.QRCodeState = false;
        },

        createQrc(){
            let code = this.ExtensionUrl;
            if (!code) {
                this.$Message({
                    message: this.IFjsStringObj.Linkcannotbeempty,
                    type: 'error',
                    center: true,
                });
                return false
            }else if(code !== this.IFjsStringObj.PleaseContact+'！'){
                let canvas = document.getElementById('qrccode-canvas');
                QRCode.toCanvas(canvas, code, (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        this.QRCodeState = true;
                    }
                })
            }
        },

        //初始化获取状态
        getSecurityLevel(){
            userRequest.getSecurityLevel().then(res => {
                if(res.result.identity.authLevel >= 2 && res.result.fuser.fistelephonebind === true){
                    this.authType = true;
                }else{
                    this.authType = false;
                }
            }).catch(err => console.log('err: ', err));
        },

        //获取推广地址
        get_extension_address(){
            userRequest.get_extension_address().then((response) => {
                if(response.code === "200"){
                    this.ExtensionUrl = response.result.url;
                }
            }).catch((err) => {
                console.log('Extension err: ', err);
            });
        },

        //获取推广人数
        get_extension_count(){
            userRequest.get_extension_count().then((response) => {
                if(response.code === "200"){
                    this.RewardList = response.result.list;
                    this.Rate = response.result.rate;
                    this.CountNumber = response.result.count;
                }
            }).catch((err) => {
                console.log('Extension err: ', err);
            });
        },

        //获取已邀请相关数据
        get_extension_content(){
            let CurrentPageObj = {
                currentPage: this.AlreadyCurrentPage
            }
            userRequest.get_extension_content(CurrentPageObj).then((response) => {
                if(response.code === "200"){
                    this.FloorList = response.result.page;
                }
            }).catch((err) => {
                console.log('Extension err: ', err);
            });
        },

        handleCurrentChange(val) {
            this.AlreadyCurrentPage = val;
            this.get_extension_content();
        },

        //获取IsPromoter值
        getIsPromoter(){
            userRequest.getIsPromoter().then((response) => {
                if(response.code === "200"){
                    this.isPromoterNumber = response.result.isPromoter;
                    //联合推广人状态 0、待申请 1、已申请 2、审核不通过 3、审核通过
                    if(response.result.isPromoter === 0 || response.result.isPromoter === 2){
                        this.authType = false;
                    }else if(response.result.isPromoter === 3){
                        this.AdoptState = true;
                        this.authType = true;
                    }else{
                        this.authType = true;
                    }
                }
            }).catch((err) => {
                console.log('Extension err: ', err);
            });
        },

        //申请成为推广人
        apply_be_promoter(){
            userRequest.apply_be_promoter().then((response) => {
                if(response.code === "200"){
                    this.ApplyType = true;
                    this.getIsPromoter();
                    this.$Message({
                        message: response.msg,
                        type: 'success',
                        center: true,
                    });
                }
            }).catch((err) => {
                console.log('Extension err: ', err);
            });
        },
    }
}
</script>

<style>
    #Extension{
        width: 100%;
        padding: 30px;
        background-size: 10px 10px;
        background-color: #181818;
        background-image: linear-gradient(-45deg, #141414 25%, transparent 25%, transparent 50%, #141414 50%, #141414 75%, transparent 75%, transparent);
    }
    #Extension>a {
        text-align: center;
        display: block;
        height: 28px;
        line-height: 28px;
        font-size: 16px;
        color: #d8d8d8;
        margin-top: 15px;
        background-color: #5e5e5e;
    }
    .Extension-Content{
        color: #d8d8d8;
    }
    .Extension-Content-Title{
        height: 35px;
        font-size: 20px;
        color: #f6b37f;
        border-bottom: 1px solid #f6b37f;
    }
    .Extension-Content-Title>span{
        float: left;
        margin-right: 20px;
    }
    .Extension-Content-Title>img{
        height: 26px;
    }
    .Extension-Content-Invitation{
        position: relative;
        background: url(../../assets/img/user/ExtensionTitleBackground.png) no-repeat center top;
        background-size: 100% 100%;
        height: 220px;
        margin: 15px 0;
        text-align: center;
    }
    .Extension-Content-Invitation-Title{
        padding: 30px 0;
        font-size: 20px;
        color: #f6b37f;
    }
    .Extension-Content-Invitation-Link{
        padding: 15px 25px;
        width: 55%;
        margin: 0 auto;
        min-width: 500px;
        border-radius: 15px;
        box-shadow: 1px 3px 3px #000;
        background: -webkit-gradient(linear, left top, right top, from(#b99053), to(#7e5d30));
    }
    .Extension-Content-Invitation-CopyLink{
        width: 15%;
        min-width: 95px;
        background: #7e5d30;
        font-size: 16px;
        padding: 3px 10px;
        border-radius: 27px;
        margin: 0 auto;
        cursor: pointer;
        margin-top: 25px;
    }
    .Extension-Content-Invitation-createQrc{
        margin-top: 5px;
    }
    .Extension-Content-Invitation-Count{
        width: 26%;
        min-width: 240px;
        height: 80px;
        margin: 0 auto;
        border-radius: 15px;
        margin-top: 25px;
        font-size: 16px;
        padding: 14px 0;
        margin-bottom: 25px;
        text-align: center;
        border: 1px solid #7e5d30;
    }
    .Extension-Content-Invitation-Count>p>a{
        color: #b99053;
        text-decoration: underline;
    }
    .Extension-Content-Invitation-Count>p>span{
        color: #b99053;
    }
    .el-table td, .el-table th{
        text-align: center;
    }
    .Extension-Content-Statistics-list{
        margin-top: 15px;
        width: 90%;
        margin: 0 5%;
    }
    .Extension-Content-Statistics-list>.el-table>.el-table__body-wrapper>table>tbody>tr>td.el-table_1_column_1>div>span{
        float: left;
    }
    /* .Extension-Content-Statistics-list>.el-table>.el-table__body-wrapper>table>tbody>tr>td.el-table_1_column_2>div>span{
        float: right;
        margin-right: 115px;
    } */
    .Extension-Content-Statistics-list>.el-table>.el-table__body-wrapper>table>tbody>tr>td.el-table_1_column_3>div>span{
        float: right;
    }
    .el-table td, .el-table th.is-leaf, .el-table__empty-block{
        border: none;
        background-color: transparent;
    }
    .el-table, .el-table__expanded-cell{
        background-color: transparent;
    }
    .el-table th, .el-table tr{
        background-color: transparent;
    }
    #Extension .el-table .cell{
        padding: 10px 0;
    }
    .el-table::before{
        height: 0;
    }
    #Extension .el-table__footer-wrapper, #Extension .el-table__header-wrapper{
        border-bottom: 1px solid #f6b37f;
    }
    .Extension-Content-Statistics-list-Prompt{
        padding: 30px 0;
        width: 50%;
        min-width: 380px;
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        color: #606266;
    }
    .ExtensionFontColor{
        color: #d8d8d8;
    }
    .el-table thead{
        color: #d8d8d8;
    }
    .Extension-Content-Statistics-list .el-table td:nth-child(1), .Extension-Content-Statistics-list .el-table th:nth-child(1){
        text-align: left;
    }
    .Extension-Content-Statistics-list .el-table td:nth-child(3), .Extension-Content-Statistics-list .el-table th:nth-child(3){
        text-align: right;
    }
    .Extension-Content-Statistics-list .el-table td:nth-child(3){
        padding-right: 24px;
    }
    .Extension-Content-Statistics-list .el-table th:nth-child(1){
        padding-left: 43px;
    }
    .Extension-Content-Statistics-list .el-table__row .cell>img{
        float: left;
        margin-right: 11px;
        width: 32px;
        height: 32px;
    }
    .Extension-Content-Statistics-list .el-table__row .cell>span{
        position: relative;
        top: 6px;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{
        background: transparent !important;
    }
    .Invitation-ToFinish{
        margin-top: 35px;
        font-size: 14px;
    }
    .Invitation-ToFinish>a{
        text-decoration: underline;
    }
    .Extension-Content-AlreadyInvited .el-pagination .el-pagination button.disabled{
        font-size: 14px;
        background-color: transparent !important;
    }
    .Extension-Content-AlreadyInvited .el-pagination .btn-next{
        font-size: 14px;
        background-color: transparent;
    }
    .el-pager li, .el-pagination .btn-next, .el-pagination .btn-prev{
        font-size: 14px;
        background-color: transparent !important;
    }
    .QRCodeStatebanner-box{
        z-index: 9999;
        width: 100%;
        height: 150px;
    }
</style>
