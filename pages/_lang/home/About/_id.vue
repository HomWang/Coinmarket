<template>
  <section class="container">
    <Head/>
    <section class="NoticeDetails">
      <section class="NoticeDetails-Title">
        {{this.name}}
      </section>
      <section class="NoticeDetails-List">
        <section class="NoticeDetails-List-Title-Content">
          <section class="NoticeDetails-List-Title-List">
            <div v-html='this.AboutContent'></div>
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

export default {
  components: {
    Head,
    About,
  },
  head () {
    return {title: 'Coinmarket '+this.$t('common.header.AboutUs')}
  },
  data() {
    return {
      lan: '',
      id: '',
      name: '',
      AboutContent: '',
    }
  },
  head () {
    return {
      title: "Coinmarket "+this.$t('common.header.AboutUs'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.AboutUs') }
      ]
    }
  },
  asyncData () {

  },
  mounted(){
    this.lan = this.$store.state.locale;
    this.id = Number(this.$route.params.id);
    this.GetAboutDetails();
  },
  methods: {
    GetAboutDetails(){
      let AboutWe = {
        id: this.id
      }
      // 获取关于我们
      Home.getContentDetail(AboutWe).then((response) => {
        this.name = response.result.fabout.ftitle;
        this.AboutContent = response.result.fabout.fcontent;
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
  }
  .NoticeDetails-Title > span:nth-child(1) {
    color: #d8d8d8;
    font-size: 16px;
  }
  .NoticeDetails-List {
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
