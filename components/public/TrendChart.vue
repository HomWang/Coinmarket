<template id="TrendChart">
    <canvas v-bind:id="CanvasIndex" v-bind:style="CanvasStyle"></canvas>
</template>
<script>
    import {Home} from '~/api/Home';
    import {TrendChart} from '~/assets/js/TrendChart.js'

    export default {
        name: 'TrendChart',

        props: {
            CanvasStyle: {
                type: Object,
            },
            CanvasIndex: {
                type: String,
            },
            CanvasStyleState: {
                type: String,
            },
            priceArray: {
              type: Array,
              default: () => [15, 23, 30, 33, 40, 23, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        },

        mounted () {
          TrendChart.minCurve(this.priceArray, this.CanvasIndex, this.CanvasStyle, this.CanvasStyleState);
        },

        data(){
            return {
                TrendChartClear: '',
            }
        },

        watch:{
            '$route'(val){
                // reset data
                console.log(val)
            },
            priceArray: function(value, oldValue) {
                TrendChart.minCurve(value, this.CanvasIndex, this.CanvasStyle, this.CanvasStyleState);
            }
        },
        
        methods: {
        }
    }
</script>
<style>
    canvas{
        float: right;
        border-radius: 0 10px 10px 0;
    }
</style>
