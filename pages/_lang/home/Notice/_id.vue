<template>
  <section class="container">
    <Head/>
    <section class="NoticeDetails">
      <section class="NoticeDetails-Title">
        <span><nuxt-link :to="{path: '/home/Notice/NoticeList'}">{{this.NoticeListTitle}}{{this.listTitle}} ></nuxt-link></span><span :title="this.ftitle"> {{this.ftitle}}</span>
      </section>
      <section class="NoticeDetails-List NoticeDetails-List-background">
        <section class="NoticeDetails-List-Title-Content">
          <section class="NoticeDetails-List-Title-List">
            <div v-html='this.fcontent'></div>
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
    return {title: 'Coinmarket '+this.$t('common.header.Notice')}
  },
  data() {
    return {
      id: '',
      fcontent: '',
      ftitle: '',
      noticeDetailMsg: '',
      listTitle: this.$t('home.Notice.NoticeList.listTitle'),
      NoticeListTitle: this.$t('home.Notice.NoticeList.NoticeListTitle'),
      NoticeDetailsTitle: this.$t('home.Notice.NoticeList.NoticeDetailsTitle'),
    }
  },
  mounted(){
    this.lan = this.$store.state.locale;
    this.id = Number(this.$route.params.id);
    this.listTitle = this.$t('home.Notice.NoticeList.listTitle');
    this.NoticeListTitle = this.$t('home.Notice.NoticeList.NoticeListTitle');
    this.NoticeDetailsTitle = this.$t('home.Notice.NoticeList.NoticeDetailsTitle');

    this.GetnoticeDetail();
  },
  methods: {
    GetnoticeDetail(){
//      this.$store.commit('SET_LANG', this.lan);
      let AboutWe = {
        id: this.id
      }
      // 获取公告详情
      Home.noticeDetail(AboutWe).then((response) => {
        if(response.code === "200"){
          this.fcontent = response.result.fcontent;
          this.ftitle = response.result.ftitle;
        }
      }).catch((err) => {
        console.log('login err: ', err);
      });
    }
  }
}
</script>
<style>
  .NoticeDetails{
    position: relative;
    overflow: hidden;
    width: 1240px;
    margin: 30px auto;
    color: #000000;
    min-height: 600px;
  }
  .NoticeDetails-Title {
    background-color: #3366cc;
    color: #d8d8d8;
    padding: 13px 45px;
    font-size: 16px;
    position: relative;
    overflow: hidden;
  }
  .NoticeDetails-Title > span:nth-child(1) {
    color: #d8d8d8;
    font-size: 16px;
    float: left;
  }
  .NoticeDetails-Title > span:nth-child(2) {
    color: #d8d8d8;
    display: block;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 5px;
    width: 800px;
  }
  .NoticeDetails-Title > span:nth-child(1) > a{
    color: #d8d8d8;
  }
  .NoticeDetails-List-background {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-top: 5px solid #222222;
    background-color: #222222;
    color: #d8d8d8;
    padding: 0 45px;
    min-height: 650px;
}
.NoticeDetails-List-Title-Content {
    font-size: 18px;
    position: relative;
    overflow: hidden;
    padding: 20px 0;
}
</style>
