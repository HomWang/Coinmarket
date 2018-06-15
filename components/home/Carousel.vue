<template>
  <div class="coin-market-Carousel">
        <my-Wave v-show="LoadingState" :ParentHeight="600"></my-Wave>
        <el-carousel :interval="5000">
            <el-carousel-item v-for="(item, index) in CarouselData" :key="index">
                <nuxt-link v-if="item.islink === false" :to="{path: `home/Notice/${item.fid}`}" class="CarouselImg">
                    <img :src="item.findeximg"/>
                </nuxt-link>
                <a v-if="item.islink === true" :href="item.link" target="_blank" title="" class="CarouselImg">
                    <img :src="item.findeximg"/>
                </a>
            </el-carousel-item>
        </el-carousel>
  </div>
</template>
<script>
    import {Home} from '~/api/Home';
    export default {
        name: 'Carousel',
        data() {
            return {
                CarouselData: [],
                LoadingState: true
            }
        },
        mounted(){
            // 获取首页轮播图
            Home.recommendNotice().then((response) => {
                this.CarouselData = response.result;
                this.LoadingState = false;
            }).catch((err) => {
                console.log('login err: ', err);
            });
        },
        methods: {

        }
    }
</script>
<style>
    .coin-market-Carousel{
        position: relative;
        top: -40px;
        width: 100%;
        height: 600px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel{
        height: 100%;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-carousel__container{
        height: 100%;
    }
    .CarouselImg{
        display: block;
        text-align: center;
    }
    .CarouselImg>img{
        vertical-align: middle;
        left: 50%;
        position: absolute;
        margin-left: -2048px;
    }
</style>
