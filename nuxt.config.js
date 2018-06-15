module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Coinmarket',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.1' },
      { hid: 'description', name: 'description', content: 'CoinMarket' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_603406_gfif65y0q1ev1jor.css' }
    ]
  },
  generate: {
    routes: [
      '/user/personal',
      '/user/security',
      '/Financial/assets',
      '/Financial/account',
      '/Financial/entrusts',
      // '/users/3'
    ]
  },
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#66b1ff',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios', 'vuebar', 'element-ui', 'qrcode', 'vuex-persistedstate']
  },
  css: [
    'assets/styles/main.css',
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  router: {
    middleware: ['i18n', 'bus']
  },
  plugins: [
    '@/plugins/request',
    '@/plugins/VueClipboard',
    '@/plugins/vuebar',
    { src: '~/plugins/localStorage', ssr: false },
    '@/plugins/i18n',
    '@/plugins/common',
    '@/plugins/GlobalComponents',
  ],
  // generate: {
  //   routes: ['/', '/about', '/fr', '/fr/about']
  // }
}
