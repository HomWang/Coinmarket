<template>
  <section class="container">
    <Head/>
    <section class="NoticeList">
      <section class="NoticeList-Title">
        <span><nuxt-link :to="{path: '/home/Prompt/PromptList'}">{{listTitle}}</nuxt-link></span> > <span>{{RiskHintsDetail.title}}</span>
      </section>
      <section class="NoticeList-List PromptDetails-List-background">
        <section class="NoticeList-List-Title-Content">
          <section class="PromptList-List-Title-List">
            <div v-html='RiskHintsDetail.content'></div>
          </section>
        </section>
      </section>
    </section>
    <About/>
  </section>
</template>

<script>
import {Home} from '~/api/Home';
import Head from '~/components/public/Head.vue'
import About from '~/components/home/About.vue'
import Bus from '~/plugins/bus.js'

export default {
  components: {
    Head,
    About,
  },head () {
    return {title: 'Coinmarket '+this.$t('common.header.RiskHints')}
  },
  data() {
    return {
      RiskHintsDetail: [],
      listTitle: this.$t('home.Prompt.PromptListTitle'),
    }
  },
  mounted(){
    this.listTitle = this.$t('home.Prompt.PromptListTitle');

    this.getRiskHintsDetail();
  },
  methods: {
    getRiskHintsDetail(){
        let RiskHintsObj = {
          id: Number(this.$route.params.id)
        }
        // 获取风险提示详情
        Home.getRiskHintsDetail(RiskHintsObj).then((response) => {
            if(response.code === "200"){
              this.RiskHintsDetail = response.result;
            }
        }).catch((err) => {
            console.log('login err: ', err);
        });
    }
  }
}
</script>
<style>
  .PromptDetails-List-background {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-top: 5px solid #222222;
    background-color: #222222;
    color: #d8d8d8;
    padding: 0 45px;
    min-height: 650px;
  }
</style>
