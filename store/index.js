
import Vuex from 'vuex'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['zh_CN','zh_TW', 'en_US'],
      locale: 'zh_TW',
      token: '',
      uid: '',
      selectedCoin: {id: null, name: '', tradeId: null, apiSource: 1, decimal: {}},
      areaId: 2,
      usdt_cny: 0,
      mc_cny: 0,
      pictures: {pic1: '', pic2: '', pic3: ''},
      realStatus: {level1: 10, level2: 10, level3: 10, countryType: 0}, // 用户实名认证等级状态 10: 未申请, 0: 申请中, 1: 审核通过, 2: 审核未通过
      tradePrice: 0, //币币交易用户下单的价格
    },
    mutations
  });
}

export default createStore
