<template>
  <div class="coin-market-Trend">
        <!-- <div class="coin-market-Trend-Content">
            <div class="coin-market-Trend-Content-left">
                <section v-for="(item, index) in Trendlist" v-bind:key="index" :class="{ 'TrendlistAddClickStyle': index === TrendlistAddClickStyleState }" @mouseover="TrendlistClick(index)">
                    <span>{{ item.name }}</span><br>
                    <span class="USDTChangeStyle">{{ index === 1?"USDT":"" }}</span>
                    <span class="USDTChangeStyle">{{ index !== 1?"MC":"" }}</span>
                </section>
            </div>
            <ScrollBar v-bind:TitleIndex="TrendlistAddClickStyleState"></ScrollBar>
        </div> -->
        <ScrollBar v-bind:TitleIndex="TrendlistAddClickStyleState"></ScrollBar>
  </div>
</template>
<script>
    import ScrollBar from '~/components/public/ScrollBar.vue'
    import Bus from '~/plugins/bus.js'

    export default {
        data(){
            return{
                Trendlist: [
                    { name: this.$t('home.Trend.StudyArea') },
                    { name: this.$t('home.Trend.USDT') },
                    { name: this.$t('home.Trend.QuitArea') }
                ],
                TrendlistAddClickStyleState: 1,
            }
        },
        components: {
            ScrollBar
        },
        mounted(){
            this.Trendlist = [
                { name: this.$t('home.Trend.StudyArea') },
                { name: this.$t('home.Trend.USDT') },
                { name: this.$t('home.Trend.QuitArea') }
            ];
        },
        methods: {
            TrendlistClick(index){
                this.TrendlistAddClickStyleState = index;
            }
        }
    }

</script>
<style>
    .coin-market-Trend{
        width: 100%;
        margin-top: -16px;
        padding-bottom: 24px;
    }
    .coin-market-Trend-Content{
        width: 1240px;
        margin: 0 auto;
        height: 572px;
        background-color: #161712;
    }
    .coin-market-Trend-Content-left{
        float: left;
        width: 245px;
        height: 532px;
        background-color: #25272e;
        position: relative;
        top: 22px;
        left: 22px;
    }
    .coin-market-Trend-Content-left>section{
        position: relative;
        color: #d8d8d8;
        height: 153.31px;
        padding-top: 65px;
        margin: 18px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .USDTChangeStyle{
        display: block;
        margin-top: 3px;
        font-size: 14px;
    }
    .TrendlistAddClickStyle{
        font-size: 20px !important;
        background-color: #16130f;
        border: 1px solid #3366cc;
        color: #3366cc !important;
    }
    .TrendlistAddClickStyle>p{
        position: relative;
        top: -70px;
    }
</style>
