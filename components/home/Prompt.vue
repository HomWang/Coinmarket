<template>
  <div class="coin-market-Prompt">
        <!-- <div class="coin-market-home-title">
            <div class="coin-market-home-title-left">
            </div>
            <div class="coin-market-home-title-center">
                <p>{{this.PromptTitle}}</p>
                <p>{{this.$store.state.locale === "en"?"":"RISK DISCLAIMER"}}</p>
            </div>
            <div class="coin-market-home-title-right">
            </div>
        </div> -->
        <div class="coin-market-Prompt-Content">
            <div id="coin-market-Prompt-Content">
                <div class="coin-market-Prompt-Content-left">
                    <my-Wave v-show="LoadingState1" :ParentHeight="418"></my-Wave>
                    <div v-show="LoadingState1 === false" class="coin-market-Prompt-Content-left-Title">
                        <div class="coin-market-Prompt-Content-left-Title-left">
                            <p>{{$t('home.Notice.NoticeTitle')}}</p>
                            <p>{{this.$store.state.locale === "en"?"":"OFFICIAL ANNOUNCEMENT"}}</p>
                        </div>
                        <div class="coin-market-Prompt-Content-left-Title-right" v-show="PromptDateRight.pageSize !== 0">
                            <nuxt-link :to="{path: 'home/Notice/NoticeList'}">{{$t('home.Notice.More')}}</nuxt-link>
                        </div>
                    </div>
                    <ul v-show="LoadingState1 === false">
                        <li v-for="(item, index) in PromptDateRight.data" :key="index" v-if="index < 4">
                            <nuxt-link :to="{path: `home/Notice/${item.fid}`}">
                                <section class="PromptDateRight-left">
                                    <span>{{item.ftitle}}</span>
                                    <span>{{item.fkeyword}}</span>
                                </section>
                                <section class="PromptDateRight-right">
                                    <span>{{new Date(item.fcreatedate).format("yyyy-MM-dd")}}</span>
                                    <span>{{new Date(item.fcreatedate).format("hh:mm:ss")}}</span>
                                </section>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="coin-market-Prompt-Content-right">
                    <my-Wave v-show="LoadingState2" :ParentHeight="418"></my-Wave>
                    <div v-show="LoadingState2 === false" class="coin-market-Prompt-Content-left-Title">
                        <div class="coin-market-Prompt-Content-left-Title-left">
                            <p>{{this.PromptTitle}}</p>
                            <p>{{this.$store.state.locale === "en"?"":"RECENT NEWS"}}</p>
                        </div>
                        <div class="coin-market-Prompt-Content-left-Title-right" v-show="PromptDateLift.pageSize !== 0">
                            <nuxt-link :to="{path: 'home/Prompt/PromptList'}">{{$t('home.Notice.More')}}</nuxt-link>
                        </div>
                    </div>
                    <ul v-show="LoadingState2 === false">
                        <li v-for="(item, index) in PromptDateLift.data" :key="index" v-if="index < 4">
                            <nuxt-link v-if="item.islink === false" :to="{path: `home/Prompt/${item.fid}`}">
                                <section class="PromptDateLift-left">
                                    <span>{{new Date(item.fcreatedate).format("yyyy-MM-dd")}}</span>
                                    <span>{{new Date(item.fcreatedate).format("hh:mm:ss")}}</span>
                                </section>
                                <section class="PromptDateLift-right">
                                    <span>{{item.ftitle}}</span>
                                    <span>{{item.fkeyword}}</span>
                                </section>
                            </nuxt-link>
                            <a v-if="item.islink === true" :href="item.link" target="_blank" :title="item.ftitle">
                                <section class="PromptDateLift-left">
                                    <span>{{new Date(item.fcreatedate).format("yyyy-MM-dd")}}</span>
                                    <span>{{new Date(item.fcreatedate).format("hh:mm:ss")}}</span>
                                </section>
                                <section class="PromptDateLift-right">
                                    <span>{{item.ftitle}}</span>
                                    <span>{{item.fkeyword}}</span>
                                </section>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    import {Home} from '~/api/Home';
    import Bus from '~/plugins/bus.js'

    export default {
        data(){
            return {
                PromptTitle: this.$t('home.Prompt.PromptTitle'),
                Content1: this.$t('home.Prompt.Content1'),
                Content2: this.$t('home.Prompt.Content2'),
                Content3: this.$t('home.Prompt.Content3'),
                Content4: this.$t('home.Prompt.Content4'),
                ListCurrentPage: 1,
                PromptDateLift: [],
                PromptDateRight: [],
                LoadingState1: true,
                LoadingState2: true,
            }
        },
        mounted () {
            this.noticeList();
            this.getRiskHintsList();
        },
        methods: {
            noticeList(){
                let Notice = {
                    id: 2,
                    currentPage: 1,
                }
                //获取首页公告列表
                Home.noticeList(Notice).then((response) => {
                    this.PromptDateRight = response.result;
                    this.LoadingState1 = false;
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            },
            getRiskHintsList() {
                let RiskHintsObj = {
                    currentPage: this.ListCurrentPage
                }
                // 获取风险提示列表
                Home.getRiskHintsList(RiskHintsObj).then((response) => {
                    this.PromptDateLift = response.result.list;
                    this.LoadingState2 = false;
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            }
        }
    }
</script>
<style>
    #coin-market-Prompt-Content {
        width: 1240px;
        height: 418px;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
    }

    .coin-market-Prompt-Content-left-Title{
        width: 100%;
        position: relative;
        overflow: hidden;
        color: #ffffff;
    }
    .coin-market-Prompt-Content-left-Title-left{
        width: 300px;
        float: left;
    }
    .coin-market-Prompt-Content-left-Title-right{
        width: 70px;
        float: right;
    }
    .coin-market-Prompt-Content-left-Title-right>a{
        display: block;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        height: 21px;
        color: #d8d8d8;
    }
    .coin-market-Prompt-Content-left-Title-right>a:hover{
        color: #ffc200;
    }
    .coin-market-Prompt-Content-left-Title-left>p:nth-child(1){
        font-size: 24px;
        line-height: 1.4;
    }
    .coin-market-Prompt-Content-left-Title-left>p:nth-child(2){
        font-size: 12px;
    }
    .coin-market-Prompt-Content-left{
        position: relative;
        float: left;
        width: 47%;
    }

    .coin-market-Prompt-Content-right{
        position: relative;
        float: right;
        width: 47%;
    }

    .coin-market-Prompt{
        width: 100%;
        min-width: 1240px;
    }
    .coin-market-Prompt-Content{
        background: url(../../assets/img/home/PromptBackground.jpg) no-repeat center top;
        padding: 40px 0;
    }
    .coin-market-Prompt-Content ul{
        margin-top: 17px;
    }
    .coin-market-Prompt-Content ul li{
        position: relative;
        overflow: hidden;
        margin-bottom: 17px;
        height: 70px;
    }
    .coin-market-Prompt-Content ul li:hover .PromptDateLift-left>span, .coin-market-Prompt-Content ul li:hover .PromptDateLift-right>span, .coin-market-Prompt-Content ul li:hover .PromptDateRight-left>span, .coin-market-Prompt-Content ul li:hover .PromptDateRight-right>span{
        color: #ffc200;
    }
    .PromptDateLift-left, .PromptDateRight-right{
        width: 21.5%;
        float: left;
        font-size: 16px;
        padding: 13px 9px;
        background: #215e64;
        color: #d8d8d8;
    }
    .PromptDateRight-right{
        background: #1f294c;
        /* float: right; */
    }
    .PromptDateLift-left>span, .PromptDateRight-right>span{
        display: block;
    }
    .PromptDateLift-left>span:nth-child(2), .PromptDateRight-right>span:nth-child(2){
        margin-top: 14px;
        font-size: 14px;
        color: #999999;
    }
    .PromptDateLift-right>span, .PromptDateRight-left>span{
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .PromptDateLift-right>span:nth-child(2), .PromptDateRight-left>span:nth-child(2){
        margin-top: 16px;
        font-size: 12px;
        color: #999999;
    }
    .PromptDateLift-right, .PromptDateRight-left{
        width: 78%;
        float: right;
        background: rgba(34, 34, 34, .8);
        height: 70px;
        padding: 11px 14px;
        font-size: 18px;
        color: #d8d8d8;
    }
    /* .PromptDateRight-left{
        float: left;
    } */
</style>
