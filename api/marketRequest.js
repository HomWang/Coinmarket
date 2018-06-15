import {axios} from '@/plugins/request';
import qs from 'qs';

export default {
  getInitInfo() {
    return axios({
      method: 'get',
      url: '/web_market/initconfig',
    });
  },

  getMarket(cancelable=true) {
    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }
    return axios.post('/web_common/real/indexmarket', undefined, config);
  },

  getRealMarket(symbol, buysellcount=20, successcount=50, cancelable=true) {
    const params = qs.stringify({
      'symbol': symbol,
      'buysellcount': buysellcount,
      'successcount': successcount,
    });
    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }
    return axios.post('/web_market/real/market', params, config);
  },

  /**
   * [getHuobiDepth 请求获得火币的深度数据]
   * @param  {[type]} symbol            [交易对tradeId]
   * @param  {Number} [priceDecimal=2]  [价格小数点]
   * @param  {Number} [amountDecimal=2] [数量小数点]
   */
  getHuobiDepth(symbol, priceDecimal=2, amountDecimal=2, cancelable=true) {
    const params = qs.stringify({
      'symbol': symbol,
    });

    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }

    return axios.post('/web_market/hb_trade_depth', params, config).then(res => {
      const bids = res.result.bids.slice(0, 20);  // 买单
      const asks = res.result.asks.slice(0, 20);  // 卖单
      // const integralBids = new Array(bids.length);
      // const integralAsks = new Array(asks.length);
      // for(let i=0; i<integralBids.length; i++) {
      //   integralBids[i] = 0;
      //   for(let j=0; j<=i; j++) {
      //     integralBids[i] += bids[j][0] * bids[j][1];
      //   }
      // }
      // for(let i=0; i<integralAsks.length; i++) {
      //   integralAsks[i] = 0;
      //   for(let j=0; j<=i; j++) {
      //     integralAsks[i] += asks[j][0] * asks[j][1];
      //   }
      // }
      // const max = Math.max(integralBids[integralBids.length-1], integralAsks[integralAsks.length-1]);

      const amounts = [];
      for(let i=0; i<bids.length; i++) {
        amounts.push(bids[i][1]);
        amounts.push(asks[i][1]);
      }
      const max = Math.max(...amounts);

      for(let i=0; i<bids.length; i++) {
        // bids[i] = {id: i+1, price: bids[i][0].toFixed(priceDecimal), amount: bids[i][1].toFixed(amountDecimal), amountRatio: integralBids[i]/max};
        bids[i] = {id: i+1, price: bids[i][0].toFixed(priceDecimal), amount: bids[i][1].toFixed(amountDecimal), amountRatio: bids[i][1]/max};
      }
      for(let i=0; i<asks.length; i++) {
        // asks[i] = {id: i+1, price: asks[i][0].toFixed(priceDecimal), amount: asks[i][1].toFixed(amountDecimal), amountRatio: integralAsks[i]/max};
        asks[i] = {id: i+1, price: asks[i][0].toFixed(priceDecimal), amount: asks[i][1].toFixed(amountDecimal), amountRatio: asks[i][1]/max};
      }
      asks.sort(function(a, b) {
        return b.id - a.id;
      });
      return {bids, asks};
    });
  },

  // 火币成交历史数据
  getHuobiTradeHistory(symbol, size=50, priceDecimal=2, amountDecimal=2, cancelable=true) {
    const params = qs.stringify({
      'symbol': symbol,
      'successcount': size,
    });

    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }

    return axios.post('/web_market/hb_trade_history', params, config).then(res => {
      const list = res.result;
      if(list.length) {
        let dealList = [];
        for(let i=0; i<list.length; i++) {
          for(let j=0; j<list[i].data.length; j++) {
            if(dealList.length<50) {
              const ts = new Date(list[i].data[j].ts);
              const formateTime = ts.format('hh:mm:ss');
              const ele = {
                time    : formateTime,
                tw_type : list[i].data[j].direction==='sell'? '賣出' : '買入',
                price   : list[i].data[j].price.toFixed(priceDecimal),
                amount  : list[i].data[j].amount.toFixed(amountDecimal),
              };
              dealList.push(ele);
            }
          }
          if(dealList.length>=50) {
            break;
          }
        }
        return dealList;
      }
    });
  },

  getLastPrice(symbol, cancelable=true) {
    const params = qs.stringify({
      'symbol': symbol,
    });

    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }

    return axios.post('/web_market/real/lastprice', params);
  }
};
