<template>
    <section id="ScrollTop" @click="ScrollTopClick" v-show="HideScrollY">
        <img src="../../assets/img/home/ScrollTop.png" alt="">
    </section>
</template>
<script>
    export default {
        name: 'ScrollTop',
        data(){
            return {
                HideScrollY: false
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop === 0){
                    this.HideScrollY = false;
                }else{
                    this.HideScrollY = true;
                }
            },
            ScrollTopClick(){
                let scrollDuration = 150;
                var scrollStep = -window.scrollY / (scrollDuration / 15),
                    scrollInterval = setInterval(function(){
                    if ( window.scrollY != 0 ) {
                        window.scrollBy( 0, scrollStep );
                    }else{
                        clearInterval(scrollInterval);
                    } 
                },15);
            }
        }
    }
</script>
<style>
    #ScrollTop{
        height: 52px;
        cursor: pointer;
        position: fixed;
        right: 0px;
        bottom: 100px;
        background-color: blanchedalmond;
    }
</style>
