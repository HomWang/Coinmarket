import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Element from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import twLocale from 'element-ui/lib/locale/lang/zh-TW';
import zh_cn from '~/locales/zh_CN.js';
import zh_tw from '~/locales/zh_TW.js';
import en_us from '~/locales/en_US.js';

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh_TW',
    messages: {
      'zh_CN': Object.assign(zh_cn, zhLocale),
      'zh_TW': Object.assign(zh_tw, twLocale),
      'en_US': Object.assign(en_us, enLocale),
    }
  });

  Vue.use(Element, {
    i18n: (key, value) => app.i18n.t(key, value)
  });

  app.i18n.getPath = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `${link}`
    }
    return `/${app.i18n.locale}${link}`
  };

  store.commit('SET_LOCALES', Object.keys(app.i18n.messages));

  // 切换路由时进行跳转
  store.watch(state => state.locale, (value) => {
    app.i18n.locale = value;
  });
}
