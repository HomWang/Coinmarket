const mutations = {
  // 多种语言版本
  SET_LOCALES(state, locales) {
    state.locales = locales;
  },

  // 切换语言
  SET_LANG(state, locale) {
    // locales中存在相应的语言即设置其为locale
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },

  //联合推广人状态 0、带申请 1、已申请 2、审核不通过 3、审核通过
  SET_ISPROMOTER(state, isPromoter){
    state.isPromoter = isPromoter;
  },

  //安全认证等级（已通过）
  SET_AUTHLEVEL(state, authLevel){
    state.authLevel = authLevel;
  },

  //手机绑定并且实名认证 1：通过 0：没通过
  SET_AUTHTYPE(state, authType){
    state.authType = authType;
  },

  //手机号
  SET_FTELEPHONE(state, ftelephone) {
    state.ftelephone = ftelephone;
  },

  //邮箱号
  SET_FEMAIL(state, femail) {
    state.femail = femail;
  },

  SET_TOKEN(state, token) {
    state.token = token;
  },

  SET_UID(state, uid) {
    state.uid = uid;
  },

  SET_COIN(state, payload) {
    if (payload.id) state.selectedCoin.id = payload.id;
    if (payload.name) state.selectedCoin.name = payload.name;
    if (payload.tradeId) state.selectedCoin.tradeId = payload.tradeId;
    if (payload.apiSource) state.selectedCoin.apiSource = payload.apiSource;
    if (payload.decimal && payload.decimal.price) state.selectedCoin.decimal = payload.decimal;
  },

  SET_AREA_ID(state, areaId = 2) {
    state.areaId = areaId;
  },

  SET_USDT_CNY(state, price) {
    state.usdt_cny = price;
  },

  SET_MC_CNY(state, price) {
    state.mc_cny = price;
  },

  SET_PICTURES(state, payload) {
    if (payload.pic1) {
      state.pictures.pic1 = payload.pic1;
    }
    if (payload.pic2) {
      state.pictures.pic2 = payload.pic2;
    }
    if (payload.pic3) {
      state.pictures.pic3 = payload.pic3;
    }
  },

  // 用戶一二三級實名認證狀態
  SET_REALSTATUS(state, payload) {
    if (payload.level1 || payload.level1 === 0) {
      state.realStatus.level1 = payload.level1;
    }
    if (payload.level2 || payload.level2 === 0) {
      state.realStatus.level2 = payload.level2;
    }
    if (payload.level3 || payload.level3 === 0) {
      state.realStatus.level3 = payload.level3;
    }
    if (payload.countryType || payload.countryType === 0) {
      state.realStatus.countryType = payload.countryType;
    }
  },

  SET_TRADEPRICE(state, price) {
    state.tradePrice = price;
  },
};

export default mutations;
