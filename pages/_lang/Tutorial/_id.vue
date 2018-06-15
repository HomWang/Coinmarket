<template>
  <section class="container">
    <Head/>
    <section class="TutorialList">
        <section class="TutorialList-Left">
            <section class="TutorialList-Left-Title">
                {{$t('Tutorial.TutorialTitle')}}
            </section>
            <section class="TutorialList-Left-ListWhole">
                <my-Wave v-show="LoadingState" :ParentHeight="680"></my-Wave>
                <section v-show="LoadingState === false" class="TutorialList-Left-List" v-for="(item, index) in activeNames" :key="index">
                    <div tabindex="0" class="el-collapse-item__header TutorialList-Left-List-Title" @click="ListTitleClick(index)">
                        <i class="el-collapse-item__arrow el-icon-arrow-right" :class="{'is-active': ListTitleState === index}"></i>
                        {{item.ftitle?item.ftitle:''}}
                    </div>
                    <section class="TutorialList-Left-List-Type" v-show="ListTitleState === index">
                        <section class="TutorialList-Left-List-TypeList el-collapse-item__header" v-for="(ChildItem, ChildIndex) in activeNames[index].abouts" :key="ChildIndex" @click="ChildItemClick(ChildIndex)">
                            {{ChildItem.ftitle?ChildItem.ftitle:''}}
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <section class="TutorialList-Right-List">
            <section class="TutorialList-Right-List-Details">
                <section class="TutorialList-Right-List-Details-Title">
                    {{DetailsMsg.ftitle?DetailsMsg.ftitle:''}}
                </section>
            </section>
            <section class="TutorialList-Right-List-Details-Msg">
                <my-Wave v-show="LoadingState" :ParentHeight="657"></my-Wave>
                <section v-show="LoadingState === false" v-html="DetailsMsg.fcontent"></section>
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
import {Home} from '~/api/Home';
import Bus from '~/plugins/bus.js'

export default {
    name: 'Tutorial',
    components: {
        Head,
        About,
        Footer
    },
    head () {
      return {title: 'Coinmarket '+this.$t('common.header.tutorial')}
    },
    data() {
        return {
            LoadingState: true,
            ParentIndex: '',
            ChildIndex: '',
            DetailsMsg: '',
            activeNames: [],
            CurrentId: 1,
            DetailsChildIndex: '',
            ListTitleState: '',
            ReadyAutoClick: {
                ParentIndex: '',
                ChildIndex: '',
            },
        }
    },
    mounted(){
        let ReadyAutoClickContent = window.sessionStorage.getItem('ReadyAutoClick');
        if(ReadyAutoClickContent){
            this.ReadyAutoClick = JSON.parse(ReadyAutoClickContent);
        }
        this.getCourseList();
    },
    methods: {
        ChildItemClick(index){
            this.ReadyAutoClick.ChildIndex = index;
            window.sessionStorage.setItem('ReadyAutoClick', JSON.stringify(this.ReadyAutoClick));
            this.ChildIndex = index;
            this.DetailsChildIndex = index;
            this.DetailsMsg = this.activeNames[this.ParentIndex].abouts[this.ChildIndex]?this.activeNames[this.ParentIndex].abouts[this.ChildIndex]:'';
        },
        ListTitleClick(index){
            this.ReadyAutoClick.ParentIndex = index;
            window.sessionStorage.setItem('ReadyAutoClick', JSON.stringify(this.ReadyAutoClick));
            this.ParentIndex = index;
            this.ListTitleState = this.ListTitleState === index?'':index;
        },
        getCourseList(){
            this.LoadingState = true;
            let TypeIdObj = {
                id: this.CurrentId
            }
            // 调用新手教程及操作
            Home.getCourseList().then((response) => {
                this.activeNames = response.result.fabouttypes;
                if(this.ReadyAutoClick.ParentIndex || this.ReadyAutoClick.ChildIndex === 0){
                    this.ListTitleClick(this.ReadyAutoClick.ParentIndex)
                }
                if(this.ReadyAutoClick.ChildIndex || this.ReadyAutoClick.ChildIndex === 0){
                    this.ChildItemClick(this.ReadyAutoClick.ChildIndex)
                }
                this.LoadingState = false;
            }).catch((err) => {
              console.log('getCourseList err: ', err);
            });
        }
    }
}
</script>
<style>
    .TutorialList{
        position: relative;
        overflow: hidden;
        width: 1240px;
        margin: 30px auto;
        min-height: 755px;
    }
    .TutorialList-Left{
        width: 16%;
        float: left;
    }
    .TutorialList-Left-Title{
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        color: #d8d8d8;
        font-size: 16px;
        background-color: #3366cc;
    }
    .TutorialList-Left-ListWhole{
        position: relative;
        text-align: center;
        height: 680px;
        padding-top: 5px;
        background-color: #222222;
        color: #d8d8d8;
    }
    .TutorialList-Left-List{
        width: 100%;
        text-align: center;
    }
    .TutorialList-Left-List>div{
        border: 0;
        background-color: #222222;
        color: #d8d8d8;
        padding-left: 20px;
        font-size: 14px;
    }
    .TutorialList-Left-List .el-collapse-item{
        text-align: center;
    }
    .TutorialList-Right-List{
        float: right;
        width: 83.5%;
        margin-left: 0.5%;
        min-height: 755px;
        background-color: #222222;
    }
    .TutorialList-Right-List-Details{
        position: relative;
        overflow: hidden;
        width: 96%;
        margin: 0 auto;
        padding-left: 2%;
        border-bottom: 1px solid #a9a9a9;
    }
    .TutorialList-Right-List-Details-Title{
        margin: 26px 0;
        width: auto;
        float: left;
        font-size: 14px;
        padding-left: 20px;
        margin-right: 30px;
        border-left: 1px solid #1c1f2a;
    }
    .TutorialList-Right-List-Details-Msg{
        position: relative;
        width: 95.5%;
        margin: 1.5% auto;
    }
    .el-collapse-item__header{
        background-color: #222222;
        color: #d8d8d8;
        border: 0;
    }
</style>
