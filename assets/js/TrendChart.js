var echarts = require('echarts');
let drawLine = {};
!function () {
  function draw(arr, Id, TrendChartStyle, TrendChartStyleState) {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(Id));
    let rose = Number(TrendChartStyleState);
    // 绘制图表
    myChart.setOption({
        width: '300',
        height: '120',
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: false
        },
        xAxis: [{
            show: false,
            type: 'category',
        }],
        yAxis: [{
            show: false,
        }],
        series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 3
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        // color: 'rgba(110, 231, 47, 0.3)'
                        color: rose > 0?'rgba(20, 204, 112, 0.6)':rose === 0?'rgba(255, 255, 255, 0.6)':'rgba(255, 97, 76, 0.6)'
                    }, {
                        offset: 0.8,
                        // color: 'rgba(221, 244, 58, 0.3)'
                        color: rose > 0?'rgba(20, 204, 112, 0.3)':rose === 0?'rgba(255, 255, 255, 0.3)':'rgba(255, 97, 76, 0.3)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: rose > 0?'rgb(26, 250, 41)':rose === 0?'rgb(252, 194, 0)':'rgb(234, 76, 67)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12
                }
            },
            data: arr
        }, ]
    });
    // let width = 300, height = 120;
    // let maxV = Math.max.apply(null, arr) === 0 ? 1 : Math.max.apply(null, arr);
    // let minV = Math.min.apply(null, arr);

    // //计算y轴增量
    // let yStep = height * 0.8 / (maxV - minV);

    // let domCan = document.getElementById(Id);
    // let g = domCan.getContext("2d");
    // g.clearRect(0, 0, domCan.width, domCan.height);
    // g.beginPath();
    // g.lineWidth = 7;
    // g.strokeStyle = TrendChartStyle.strokeStyle;
    // let x_space = width / (arr.length - 1);//水平点的间隙像素
    // let xLen = 0;
    // for (let i = 0; i < arr.length; i++) {
    //   let yValue = arr[i];//纵坐标值
    //   xLen += x_space;

    //   let yPont = 0.1 * height + (maxV - yValue) * yStep;
    //   if (i == 0) {
    //     xLen = 0;
    //   }
    //   g.lineTo(xLen, yPont);
    // }
    // g.stroke();
    // g.closePath();
  }

  drawLine.minCurve = draw;
}();
export const TrendChart = drawLine;
