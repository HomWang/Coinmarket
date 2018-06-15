import {axios} from '@/plugins/request';
import qs from 'qs';

export default {
  buy: function(limited, symbol, tradeAmount, tradePrice, tradePwd) {
    const params = qs.stringify({
      'limited': limited,
      'symbol': symbol,
      'tradeAmount': tradeAmount,
      'tradePrice': tradePrice,
      'tradePwd': tradePwd,
    });
    return axios.post('/web_market/trade/coin_buy', params);
  },

  sell: function(limited, symbol, tradeAmount, tradePrice, tradePwd) {
    const params = qs.stringify({
      'limited': limited,
      'symbol': symbol,
      'tradeAmount': tradeAmount,
      'tradePrice': tradePrice,
      'tradePwd': tradePwd,
    });
    return axios.post('/web_market/trade/coin_sell', params);
  },

  getUserAssets: function(tradeid, cancelable=true) {
    const config = {};
    if(!cancelable) {
      config.cancelToken = null;
    }

    const params = qs.stringify({
      'tradeid': tradeid,
    });
    return axios.post('/web_market/real/userassets', params, config);
  },
};
