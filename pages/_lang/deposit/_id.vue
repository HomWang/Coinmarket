<template>
  <section class="container">
    <Head/>
    <section class="rechargelList">
        <section class="rechargelListTitle">
            USDT {{$t('Deposit.Title')}}
        </section>
        <section class="rechargelListContent">
            <section class="rechargelListContentTitle">
                <section class="rechargelListContentTitleTop">
                    {{$t('Deposit.ContentTitle')}}
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=1844613034&site=qq&menu=yes" class="RechargePurchase">{{$t('Deposit.Purchase')}}</a>
                </section>
                <section class="rechargelListContentTitleBottom">
                    {{$t('Deposit.Authentication')}}: 1844613034
                </section>
            </section>
        </section>
        <section class="rechargelListContent">
            <section class="rechargelListContentTitle">
                <section class="rechargelListContentTitleTop">
                    {{$t('Deposit.ContentTitle')}}
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=3137452566&site=qq&menu=yes" class="RechargeSellout">{{$t('Deposit.Sellout')}}</a>
                </section>
                <section class="rechargelListContentTitleBottom">
                    {{$t('Deposit.Authentication')}}: 3137452566
                </section>
            </section>
        </section>
        <section class="rechargelListPrompt">
            <section class="rechargelListPromptContent">
                <section class="rechargelListPromptContent-Title">{{$t('Deposit.kindlyReminder')}} :</section>
                <p>1.{{$t('Deposit.Prompt1')}}</p>
                <p>2.{{$t('Deposit.Prompt2')}}</p>
                <p>3.{{$t('Deposit.Prompt3')}}</p>
                <p>4.{{$t('Deposit.Prompt4')}}</p>
                <p>5.{{$t('Deposit.Prompt5')}}</p>
                <p>6.{{$t('Deposit.Prompt6')}}</p>
                <p>7.{{$t('Deposit.Prompt7')}}</p>
                <p>8.{{$t('Deposit.Prompt8')}}</p>
                <p>9.{{$t('Deposit.Prompt9')}}</p>
                <p>10.{{$t('Deposit.Prompt10')}}</p>
                <p>11.{{$t('Deposit.Prompt11')}}</p>
                <p>12.{{$t('Deposit.Prompt12')}}</p>
                <p>13.{{$t('Deposit.Prompt13')}}</p>
                <p>14.{{$t('Deposit.Prompt14')}}</p>
            </section>
        </section>
    </section>
    <About/>
    <Footer/>
  </section>
</template>

<script>
import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import Footer from '~/components/home/Footer.vue'

export default {
    name: 'recharge',
    components: {
        Head,
        About,
        Footer
    },
    head () {
      return {title: 'Coinmarket '+this.$t('common.header.recharge')}
    },
    data() {
        return {

        }
    },
    mounted(){

    },
    methods: {

    }
}
</script>
<style>
    .rechargelList{
        width: 1240px;
        margin: 50px auto;
        border-radius: 10px;
        background-color: #25272e;
        padding-bottom: 15px;
    }
    .rechargelListTitle{
        font-size: 24px;
        padding: 25px 20px;
        border-bottom: 1px solid #333333;
    }
    .rechargelListContent{
        float: left;
        padding: 25px 20px;
    }
    .rechargelListContentTitle{
        height: 160px;
        width: 385px;
        border-radius: 10px;
        background-color: #333333;
    }
    .rechargelListContentTitleTop, .rechargelListContentTitleBottom{
        height: 80px;
        line-height: 80px;
        padding: 0 20px;
        font-size: 16px;
    }
    .rechargelListContentTitleTop{
        border-radius: 10px 10px 0 0;
        background-color: #3366cc;
        font-size: 18px;
    }
    .RechargePurchase{
        color: #00af2d;
    }
    .RechargeSellout{
        color: #942626;
    }
    .rechargelListPrompt{
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 0 20px;
    }
    .rechargelListPromptContent-Title{
        padding: 15px 0;
    }
    .rechargelListPromptContent>p{
        line-height: 25px;
    }
</style>
