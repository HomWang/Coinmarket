<template>
    <div class="coin-market-Notice">
        <div class="coin-market-home-title">
            <div class="coin-market-home-title-left">
            </div>
            <div class="coin-market-home-title-center">
                <p>{{$t('home.Notice.NoticeTitle')}}</p>
                <p>{{this.$store.state.locale === "en"?"":"OFFICIAL ANNOUNCEMENT"}}</p>
            </div>
            <div class="coin-market-home-title-right">
            </div>
        </div>
        <div class="coin-market-Notice-Content">
            <div class="coin-market-Notice-Content-BottomLine">
                <ul>
                    <li v-for="(item, index) in DateArray" v-if="index < 5" :key="index" :style="DateArray.length <= 5 && index === 0?`margin-left: ${(5 - DateArray.length) * 124}px`:''">
                        <div class="coin-market-Notice-Content-Details-list" :style="{'display': index === OverShowIndex ? 'block' : 'none' }" :class="index > 2? 'coin-market-Notice-Content-Details-list-ChangeFloat': ''">
                            <div class="coin-market-Notice-Content-Details-list-left">
                                <ul>
                                    <li v-for="(itemChild, itemIndex) in item.monthdata" :key="itemIndex" v-if="itemIndex < 3">
                                        <a href="javascript:void(0);" target="_blank">{{new Date(itemChild.fcreatedate).format("yyyy-MM-dd")}}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="coin-market-Notice-Content-Details-list-right">
                                <ul>
                                    <li v-for="(itemChild, itemIndex) in item.monthdata" :key="itemIndex" v-if="itemIndex < 3">
                                        <nuxt-link :to="{path: `home/Notice/${itemChild.fid}`}" :title="itemChild.ftitle">{{itemChild.ftitle}}</nuxt-link>
                                    </li>
                                </ul>
                                <div style="color: #958b69;padding-top: 69px;text-indent: 30px;">
                                    <nuxt-link :to="{path: 'home/Notice/NoticeList'}">{{$t('home.Notice.More')}}</nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div @mouseover="overShow(index)" :class="{'coin-market-Notice-Content-BottomLine-radius': true, 'coin-market-Notice-Content-BottomLine-radius-select': index === OverShowIndex}"></div>
                        <p>{{item.monthtype}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {Home} from '~/api/Home';
    import Bus from '~/plugins/bus.js'

    export default{
        data(){
            return{
                OverShowIndex: 0,
                DateArray:[],
                Notice:{
                    id: 2,
                    currentPage: 1,
                },
                NoticeTitle: this.$t('home.Notice.NoticeTitle'),
                More: this.$t('home.Notice.More'),
            }
        },
        beforeCreate(){

        },
        created(){

        },
        mounted(){
            this.NoticeTitle = this.$t('home.Notice.NoticeTitle');
            this.More = this.$t('home.Notice.More');

            //获取首页公告列表
            Home.noticeListByMonth().then((response) => {
                if(response.code === "200"){
                    this.DateArray = response.result;
                }
            }).catch((err) => {
                console.log('login err: ', err);
            });
            Date.prototype.format=function(pattern){
                var month=this.getMonth()+1
                ,date=this.getDate()
                ,hours=this.getHours()
                ,min=this.getMinutes()
                ,sec=this.getSeconds();
                return pattern.replace(/yyyy/g,this.getFullYear())
                            .replace(/yy/g,String(this.getFullYear()).substr(2,2))
                            .replace(/MM/g,month>=10?month:"0"+month)
                            .replace(/M\*/g,month)
                            .replace(/dd/g,date>=10?date:"0"+date)
                            .replace(/d\*/g,date)
                            .replace(/hh/gi,hours>=10?hours:"0"+hours)
                            .replace(/h\*/gi,hours)
                            .replace(/m\*/g,min)
                            .replace(/mm/g,min>=10?min:"0"+min)
                            .replace(/ss/g,sec>=10?sec:"0"+sec)
                            .replace(/s\*/g,sec);
            };
        },
        methods: {
            overShow(index){
                this.OverShowIndex = index;
            },
        }
    }
</script>
<style>
.coin-market-Notice {
    width: 100%;
}
.coin-market-Notice-Content {
    width: 1240px;
    margin: 0 auto;
    position: relative;
    height: 550px;
}
.coin-market-Notice-Content-Details{
    position: absolute;
    bottom: 45px;
    font-size: 16px;
    color: #d8d8d8;
}
.coin-market-Notice-Content-Details-list{
    width: 575px;
    height: 505px;
    position: absolute;
    bottom: 55px;
    display: none;
}
.coin-market-Notice-Content-Details-list-left{
    width: 126.5px;
    height: 100%;
    float: left;
    padding-top: 85px;
    border-right: 3px solid #d8d8d8;
}
.coin-market-Notice-Content-Details-list-left>ul>li{
    height: 81px;
    line-height: 81px;
    text-align: right;
    padding-right: 18px;
}
.coin-market-Notice-Content-Details-list-left>ul>li>a{
    color: #d8d8d8;
}
.coin-market-Notice-Content-Details-list-right{
    width: 448.5px;
    height: 100%;
    padding-top: 81px;
    float: right;
}
.coin-market-Notice-Content-Details-list-right>ul{
    border-top: 4px dashed #d8d8d8;
}
.coin-market-Notice-Content-Details-list-right>ul>li{
    height: 81px;
    line-height: 81px;
    text-indent: 30px;
    border-bottom: 4px dashed #d8d8d8;
}
.coin-market-Notice-Content-Details-list-right>ul>li>a{
    color: #d8d8d8;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.coin-market-Notice-Content-Details-list-right>ul>li>a:hover{
    color: #3366cc;
}
.coin-market-Notice-Content-BottomLine{
    position: absolute;
    bottom: 25px;
    width: 100%;
    height: 20px;
    font-size: 16px;
    color: #d8d8d8;
}
.coin-market-Notice-Content-BottomLine>ul>li{
    float: left;
    width: 248px;
    position: relative;
}
.coin-market-Notice-Content-BottomLine>ul>li>p{
    text-align: center;
    padding-top: 5px;
}
.coin-market-Notice-Content-BottomLine-radius{
    border: 3px solid #d8d8d8;
    border-radius: 100%;
    width: 22px;
    height: 22px;
    margin: 0 auto;
}
.coin-market-Notice-Content-BottomLine-radius-select{
    background-color: #d8d8d8;
    border: 3px solid #4750d5;
}
.coin-market-Notice-Content-BottomLine>ul>li:after, .coin-market-Notice-Content-BottomLine>ul>li:before{
    content: "";
    width: 113px;
    height: 3px;
    background: #d8d8d8;
    position: absolute;
    top: 8.5px;
    z-index: 1;
}
.coin-market-Notice-Content-BottomLine>ul>li:after{
    left: 0;
}
.coin-market-Notice-Content-BottomLine>ul>li:before{
    right: 0;
}
.coin-market-Notice-Content-Details-list-ChangeFloat{
    right: -1px;
}
.coin-market-Notice-Content-Details-list-ChangeFloat>.coin-market-Notice-Content-Details-list-left{
    border-left: 3px solid rgb(255, 255, 255) !important;
    border-right: 0;
    float: right !important;
}
.coin-market-Notice-Content-Details-list-ChangeFloat>.coin-market-Notice-Content-Details-list-left>ul>li{
    text-align: left !important;
    padding-left: 22px !important;
}
.coin-market-Notice-Content-Details-list-ChangeFloat>.coin-market-Notice-Content-Details-list-right{
    float: left !important;
}
.coin-market-Notice-Content-Details-list-ChangeFloat>.coin-market-Notice-Content-Details-list-right>ul>li{
    text-align: right;
    padding-right: 30px;
}
.coin-market-Notice-Content-Details-list-default{
    display: block;
}
.coin-market-Notice-Content-BottomLine-radius-default{
    background-color: #d8d8d8;
    border: 3px solid #4750d5;
}
.coin-market-Notice-Content-Details-list-right-select{
    color: #4750d5;
}
.coin-market-Notice-Content-Details-list-right>div{
    padding-top: 69px;
    text-indent: 30px;
}
.coin-market-Notice-Content-Details-list-right>div>a:hover{
    color: #3366cc;
}
.coin-market-Notice-Content-Details-list-right>div>a{
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 4px;
    font-size: 14px;
    color: #d8d8d8;
}
.coin-market-Notice-Content-Details-list-ChangeFloat>.coin-market-Notice-Content-Details-list-right>div{
    text-align: right;
    padding-right: 30px;
}
</style>
