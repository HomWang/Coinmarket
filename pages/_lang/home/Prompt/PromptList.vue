<template>
  <section class="container">
    <Head/>
    <section class="NoticeList">
      <section class="NoticeList-Title">
        <span>{{this.listTitle}}</span>
        <!-- {{this.NoticeListTitle}} -->
      </section>
      <section class="NoticeList-List">
        <!-- <section class="NoticeList-List-Title">
          <section class="NoticeList-List-Title-left">{{this.listTitle}}</section>
        </section> -->
        <my-Wave v-show="LoadingState" :ParentHeight="809"></my-Wave>
        <section v-show="LoadingState === false" class="NoticeList-List-Title-Content">
          <section class="NoticeList-List-Title-List" v-for="(item, index) in DateArray" :key="index">
            <nuxt-link v-if="item.islink === false" :to="{path: `/home/Prompt/${item.fid}`}">
              <section class="NoticeList-List-Title-List-right">
                <p>{{item.getFullYear}}.<span>{{item.getMonth.toString().length === 1?'0'+item.getMonth:item.getMonth}}</span></p>
                <p>{{item.getDate.toString().length === 1?'0'+item.getDate:item.getDate}}</p>
              </section>
              <section class="NoticeList-List-Title-List-Left">
                  <p class="NoticeList-List-Title-List-Left-Title1" :title="item.ftitle">{{item.ftitle}}</p>
                  <p class="NoticeList-List-Title-List-Left-Title2" :title="item.fkeyword">{{item.fkeyword}}</p>
              </section>
            </nuxt-link>
            <a v-if="item.islink === true" :href="item.link" target="_blank" :title="item.ftitle">
              <section class="NoticeList-List-Title-List-right">
                <p>{{item.getFullYear}}.<span>{{item.getMonth.toString().length === 1?'0'+item.getMonth:item.getMonth}}</span></p>
                <p>{{item.getDate.toString().length === 1?'0'+item.getDate:item.getDate}}</p>
              </section>
              <section class="NoticeList-List-Title-List-Left">
                  <p class="NoticeList-List-Title-List-Left-Title1" :title="item.ftitle">{{item.ftitle}}</p>
                  <p class="NoticeList-List-Title-List-Left-Title2" :title="item.fkeyword">{{item.fkeyword}}</p>
              </section>
            </a>
            <!-- <section class="NoticeList-List-Title-List-Left">
              <nuxt-link v-if="item.islink === false" :to="{path: `/home/Prompt/${item.fid}`}" :title="item.ftitle">{{item.ftitle}}</nuxt-link>
              <a v-if="item.islink === true" :href="item.link" target="_blank" :title="item.ftitle">{{item.ftitle}}</a>
            </section>
            <section class="NoticeList-List-Title-List-right">
              {{item.getFullYear}}.{{item.getMonth}}.{{item.getDate}}
            </section> -->
          </section>
        </section>
        <el-pagination v-show="LoadingState === false" class="NoticeListPagination" layout="prev, pager, next" :page-size="PromptListData.pageSize" :total="PromptListData.totalRows" :current-page="Number(Notice.currentPage)" @current-change="handleCurrentChange"></el-pagination>
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
  },
  data() {
    return {
      LoadingState: true,
      PromptListData: '',
      DateArrayTotalRows: '',
      NoticeData: [],
      DateArray: [],
      NoticeListTitle: this.$t('home.Prompt.PromptListTitle'),
      listTitle: this.$t('home.Prompt.PromptListTitle'),
      ListCurrentPage: 1,
      Notice: {
        id: 2,
        currentPage: 1,
      }
    }
  },
  head () {
    return {
      title: "Coinmarket "+this.$t('common.header.Prompt'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.Prompt') }
      ]
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    this.Notice.currentPage = window.sessionStorage.getItem('PromptListIndex')?window.sessionStorage.getItem('PromptListIndex'):1;
    this.NoticeListTitle = this.$t('home.Prompt.PromptListTitle');
    this.listTitle = this.$t('home.Prompt.PromptListTitle');
    this.GetNoticeList();
  },
  methods: {
    handleCurrentChange(val) {
      window.sessionStorage.setItem('PromptListIndex', val);
      this.ListCurrentPage = val;
      this.GetNoticeList();
    },
    GetNoticeList(){
      this.LoadingState = true;
      let RiskHintsObj = {
        currentPage: this.ListCurrentPage
      }
      // 获取风险提示列表
      Home.getRiskHintsList(RiskHintsObj).then((response) => {
        this.PromptListData = response.result.list;
        this.DateArray = [];
        for(let i = 0; i < response.result.list.data.length; i++){
            let Time = new Date(response.result.list.data[i].fcreatedate);
            let TimeArr = new Array();
            TimeArr.push(Time);
            TimeArr.sort(function(a, b){
                return a > b ? 1 : -1; // 这里改为大于号
            });
            let DateObj = {
                fid: response.result.list.data[i].fid,
                ftitle: response.result.list.data[i].ftitle,
                islink: response.result.list.data[i].islink,
                link: response.result.list.data[i].link,
                fkeyword: response.result.list.data[i].fkeyword,
                totalRows: response.result.list.totalRows,
                getFullYear: TimeArr[0].getFullYear(),
                getMonth: TimeArr[0].getMonth()+1,
                getDate: TimeArr[0].getDate(),
            }
          this.DateArray.push(DateObj);
          this.LoadingState = false;
        }
      }).catch((err) => {
          console.log('login err: ', err);
      });
    }
  }
}
</script>
<style>
  .NoticeList-List-Title{
    font-size: 15px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(210, 210, 210, 0.82353);
  }
  .NoticeList-List-Title-List:hover{
    background-color: #30302f;
  }
  .NoticeList-List-Title-Content{
    position: relative;
    overflow: hidden;
  }
  .NoticeListPagination{
    text-align: right;
    white-space: unset;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
