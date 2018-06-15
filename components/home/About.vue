<template>
  <div class="coin-market-About" :style="{'background-color': AboutTitleShow === true?'':'#1a1917'}">
        <!-- <div class="coin-market-home-title" v-show="AboutTitleShow">
            <div class="coin-market-home-title-left">
            </div>
            <div class="coin-market-home-title-center">
                <p>{{this.AboutTitle}}</p>
                <p>{{this.$store.state.locale === "en"?"":"ABOUT US"}}</p>
            </div>
            <div class="coin-market-home-title-right">
            </div>
        </div> -->
        <div class="coin-market-About-Content">
            <section class="coin-market-About-Content-left">
                <my-Wave v-show="LoadingState" :ParentHeight="294"></my-Wave>
                <img v-show="LoadingState === false" src="../../assets/img/home/AboutLogo.png" class="AboutLogo" alt="">
                <section v-show="LoadingState === false" class="coin-market-About-Content-AboutHref">
                    <section>
                        {{this.$t('home.Cooperation.CooperationTitle')}}
                    </section>
                    <img src="../../assets/img/home/AboutHref.png" alt="">
                </section>
            </section>
            <section class="coin-market-About-Content-right">
                <my-Wave v-show="LoadingState" :ParentHeight="294"></my-Wave>
                <ul class="coin-market-About-Content-list">
                    <li v-show="LoadingState === false" :title="this.AboutTitle1">{{this.AboutTitle1}}</li>
                    <li v-for="(item, index) in fwzcAbouts" :key="index">
                        <nuxt-link :to="{path: `/home/About/${item.fid}`, query: {id: item.fid, name: item.ftitle}}" :title="item.ftitle">{{item.ftitle}}</nuxt-link>
                    </li>
                </ul>
                <ul class="coin-market-About-Content-list">
                    <li v-show="LoadingState === false" :title="this.AboutTitle9">{{this.AboutTitle9}}</li>
                    <li v-for="(item, index) in yhsmAbouts" :key="index">
                        <nuxt-link :to="{path: `/home/About/${item.fid}`, query: {id: item.fid, name: item.ftitle}}" :title="item.ftitle">{{item.ftitle}}</nuxt-link>
                    </li>
                </ul>
                <ul v-show="LoadingState === false" class="coin-market-About-Content-list">
                    <li :title="this.AboutTitle10">{{this.AboutTitle10}}</li>
                    <li>
                        <a href="javascript:void(0)" @mouseover="onMouseOver" @mouseout="onMouseout" :title="this.AboutTitle11">
                            <span>{{this.AboutTitle11}}</span>
                            <img src="../../assets/img/home/wx.png"/>
                        </a>
                        <section v-show="WeChatState" class="QRcode"><img src="../../assets/img/home/QRcode.jpg"/></section>
                    </li>
                    <li>
                        <a href="https://twitter.com/coinmarket_mc" target="_blank" :title="this.AboutTitle12">
                            <span>{{this.AboutTitle12}}</span>
                            <img src="../../assets/img/home/tt.png"/>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" class="QQTitleStyle" @mouseover="QQonMouseOver" @mouseout="QQonMouseout" title="541593385">
                            <span>541593385</span>
                            <img src="../../assets/img/home/qq.png"/>
                        </a>
                        <section v-show="QQState" class="QQcode"><img src="../../assets/img/home/QQcode.jpg"/></section>
                    </li>
                    <li>
                        <a href="javascript:void(0)" class="QQTitleStyle" title="services@coinmarketxyz.com">
                            <span>services@coinmarketxyz.com</span>
                            <img src="../../assets/img/home/mail.png">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" class="QQTitleStyle" title="(852)  96219909">
                            <span>(852)  96219909</span>
                            <img src="../../assets/img/home/phone.png">
                        </a>
                    </li>
                </ul>
            </section>
        </div>
  </div>
</template>
<script>
    import {Home} from '~/api/Home';
    import Bus from '~/plugins/bus.js'

    export default {
        name: 'About',
        data(){
            return {
                fwzcAbouts: [],//服務支持
                yhsmAbouts: [],//用戶聲明
                lxwmAbouts: [],//聯繫我們
                QQState: false,
                WeChatState: false,
                AboutTitleShow: false,
                LoadingState: true,
                AboutTitle: this.$t('home.About.AboutTitle'),
                AboutTitle1: this.$t('home.About.AboutTitle1'),
                AboutTitle2: this.$t('home.About.AboutTitle2'),
                AboutTitle3: this.$t('home.About.AboutTitle3'),
                AboutTitle4: this.$t('home.About.AboutTitle4'),
                AboutTitle5: this.$t('home.About.AboutTitle5'),
                AboutTitle6: this.$t('home.About.AboutTitle6'),
                AboutTitle7: this.$t('home.About.AboutTitle7'),
                AboutTitle8: this.$t('home.About.AboutTitle8'),
                AboutTitle9: this.$t('home.About.AboutTitle9'),
                AboutTitle10: this.$t('home.About.AboutTitle10'),
                AboutTitle11: this.$t('home.About.AboutTitle11'),
                AboutTitle12: this.$t('home.About.AboutTitle12'),
            }
        },
        mounted(){
            if(this.$route.path === '/'){
                this.AboutTitleShow = true;
            }
            this.getContentList()
        },
        methods: {
            QQonMouseOver(){
                this.QQState = true;
            },
            QQonMouseout(){
                this.QQState = false;
            },
            onMouseOver(){
                this.WeChatState = true;
            },
            onMouseout(){
                this.WeChatState = false;
            },
            getContentList(){
                Home.getContentList().then((response) => {
                    this.fwzcAbouts = response.result.fwzcAbouts;
                    this.yhsmAbouts = response.result.yhsmAbouts;
                    this.lxwmAbouts = response.result.lxwmAbouts;
                    this.LoadingState = false;
                }).catch((err) => {
                    console.log('login err: ', err);
                });
            }
        }
    }
</script>
<style>
    .coin-market-About{
        width: 100%;
        position: relative;
        background-color: #25272e;
        height: 417px;
        padding-bottom: 8px;
        padding-top: 41px;
    }
    .coin-market-About-Content{
        width: 1240px;
        padding: 32.5px 0;
        margin: 0 auto;
        position: relative;
        font-size: 14px;
        color: #d8d8d8;
        height: 100%;
        top: -18px;
    }
    .coin-market-About-Content-title{
        position: relative;
        overflow: hidden;
        padding-bottom: 16px;
        /* border-bottom: 1px solid #000000; */
    }
    .coin-market-About-Content-list a{
        color: #d8d8d8;
        display: block;
        width: 100%;
    }
    .coin-market-About-Content-list a:hover{
        color: #3366cc;
    }
    .coin-market-About-Content-title li:nth-child(1){
        text-align: left;
    }
    .coin-market-About-Content-title li{
        float: left;
        width: 33.33%;
    }
    .coin-market-About-Content-list{
        width: 33.33%;
        float: left;
    }
    .coin-market-About-Content-list li{
        line-height: 15px;
        padding: 17px 0;
        height: 49px;
        position: relative;
    }
    .coin-market-About-Content-list img{
        float: left;
        margin-right: 10px;
    }
    .coin-market-About-Content-list span{
        position: absolute;
        left: 25px;
        top: 18px;
    }
    .QRcode{
        position: absolute;
        top: -100px;
        width: 100px;
        height: 100px;
        z-index: 999;
    }
    .QQcode{
        position: absolute;
        top: -135px;
        width: 100px;
        height: 100px;
        z-index: 999;
    }
    .QRcode>img, .QQcode>img{
        width: 100%;
    }
    .AboutLogo{
        position: absolute;
        top: 50px;
    }
    .coin-market-About-Content-left{
        float: left;
        width: 490px;
        height: 100%;
        position: relative;
    }
    .coin-market-About-Content-right{
        width: 580px;
        float: right;
        position: relative;
    }
    .coin-market-About-Content-AboutHref>section{
        padding-top: 30px;
        padding-bottom: 22px;
        font-size: 14px;
    }
    .coin-market-About-Content-AboutHref{
        margin-top: 65px;
    }
</style>
