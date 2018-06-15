<template>
  <section class="container">
    <Head/>
    <section class="rechargelList">
        <section class="rechargelListTitle">
            USDT 合作承兌商
        </section>
        <section class="rechargelListContent">
            <section class="rechargelListContentTitle">
                <section class="rechargelListContentTitleTop">
                    USDT快速
                    <a href="tencent://message/?uin=1844613034&Site=&Menu-=yes" class="RechargePurchase">購買</a>
                </section>
                <section class="rechargelListContentTitleBottom">
                    認證QQ: 1844613034
                </section>
            </section>
        </section>
        <section class="rechargelListContent">
            <section class="rechargelListContentTitle">
                <section class="rechargelListContentTitleTop">
                    USDT快速
                    <a href="tencent://message/?uin=3137452566&Site=&Menu-=yes" class="RechargeSellout">賣出</a>
                </section>
                <section class="rechargelListContentTitleBottom">
                    認證QQ: 3137452566
                </section>
            </section>
        </section>
        <section class="rechargelListPrompt">
            <section class="rechargelListPromptContent">
                <section class="rechargelListPromptContent-Title">溫馨提示 :</section>
                <p>1.USDT不是貨幣，它是一種價值隨匯率小幅波動的區塊鏈資產。</p>
                <p>2.USDT價格按照實时市場價格進行兌換，具體金額以實際到賬為准（銀行轉帳手續費由用戶承擔）。</p>
                <p>3.最低買入USDT數量為500個，最低賣出USDT數量為1000個。</p>
                <p>4.平臺暫時不收取任何兌換手續費，承兌商也暫時不收取任何兌換手續費。</p>
                <p>5.進行兌換之前，確認您在Coinmarket的帳戶資訊是否正確，收付款銀行卡資訊是否正確。</p>
                <p>6.賣出USDT需完成二級認證，賣出量高於8000USDT（含）需完成視頻認證，並配合工作人員的其它稽核要求，且賣出必須以平臺實名的銀行卡為收款卡。</p>
                <p>7.承兌商聯繫方式以Coinmarket平臺發佈為准，切勿相信他人發佈的其他聯繫方式，承兌商與平臺僅為合作關係，並不隸屬於平臺。</p>
                <p>8.比特幣等虛擬貨幣的交易存在風險，在全球範圍7x24小時無休止交易，沒有每日漲停跌停限制，價格受到新聞事件，各國政策，市場需求等多種因素影響，浮動很大。我們強烈建議您事先調查瞭解，在自身所能承受的風險範圍內參與交易。</p>
                <p>9.用戶應保證自己的資金來源完全符合當地法律法規，且承諾兌換的虛擬資產用於合法領域。</p>
                <p>10.如果在承兌過程中出現任何問題、疑問或意見，請及時通過官方發佈的通路與Coinmarket取得聯系。</p>
                <p>11.我們只通過本平臺上的有效的聯繫方式發佈公告和資訊或在本平臺張貼公告，所以我們對由於您信任了未通過以上管道獲得的資訊而產生的任何損失不承擔責任。</p>
                <p>12.Coinmarket在承兌過程中對用戶的個人資料和財務資訊進行保密。</p>
                <p>13.如因法律、市場、駭客攻擊、資訊被盜取以及其它客觀原因所造成的損失，平臺享有最終解釋權。</p>
                <p>14.承兌商服務時間，每週一至週六，早上10點-下午6點。</p>
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
