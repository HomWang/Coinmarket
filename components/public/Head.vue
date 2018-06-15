<!-- 头部 -->
<template>
  <section class="header-container" id="Head">
    <nav class="menu-bar">
      <section class="menu-section">
        <nuxt-link :to="{path: '/'}"><img class="logo" src="@/assets/img/home/logo.svg" alt="Coin-Market"></nuxt-link>
        <Navigator v-for="(item, index) in pages" :key="index" :index="index" :title="item.title" :href="item.href"
                   :icon="item.icon" :subMenu="item.subMenu"></Navigator>
      </section>
      <section class="menu-section">
        <div v-if="username" class="menu-section-username">
          <span @click="handleUserAssetsRequest" style="cursor: pointer">UID:{{username}}</span>
          <a href="javascript:void(0)" @click="SignOut">{{Out}}</a>
        </div>
        <div v-else style="margin: 0 30px;">
          <!-- <button class="login" @click="SignIn">{{sign}}</button> -->
          <nuxt-link class="login" to="/user/Login">{{Log}}</nuxt-link>
          <nuxt-link class="login" to="/user/Register">{{sign}}</nuxt-link>
        </div>
        <Selector :langs="langs" :locale="locale" @select="handleLocaleSwitch" style="z-index: 100"></Selector>
      </section>
    </nav>
    <ScrollTop/>
  </section>
</template>

<script>
  import Navigator from './Navigator';
  import Selector from './Selector';
  import {MessageBox} from 'element-ui';
  import localeRequest from '~/api/localeRequest';
  import ScrollTop from '~/components/public/ScrollTop.vue'
  import Bus from '~/plugins/bus.js'

  export default {
    name: 'Head',

    components: {
      Navigator,
      Selector,
      ScrollTop
    },

    data() {
      return {
        langs: {
          zh_CN: '简体中文',
          zh_TW: '繁体中文',
          en_US: 'English'
        },
        locale: this.$store.state.locale,
        username: '',
        userHref: this.getUserHref(),
        Out: this.$t('home.Head.Out'),
        Log: this.$t('home.Head.Log'),
        sign: this.$t('home.Head.sign'),
        WhetherToContinue: this.$t('home.Head.WhetherToContinue'),
        Prompt: this.$t('home.Head.Prompt'),
        Sure: this.$t('home.Head.Sure'),
        Cancel: this.$t('home.Head.Cancel'),
        OutSuccess: this.$t('home.Head.OutSuccess'),
        CancelOut: this.$t('home.Head.CancelOut'),
      }
    },

    props: {},

    mounted() {
      this.username = this.$store.state.uid;
      this.userHref = this.getUserHref();

      Bus.$on('user-logout', () => {
        this.$store.commit('SET_TOKEN', '');
        this.$store.commit('SET_UID', '');
        this.username = '';
      });
    },

    computed: {
      pages() {
        const pages = [
          {title: this.$t('common.header.trade'), href: '/trade'},
          {
            title: this.$t('common.header.personal'), href: this.GetHref('user', 'personal'), subMenu: [
            {title: this.$t('common.header.userCenter'), icon: 'icm-user', href: this.GetHref('user', 'personal')},
            {
              title: this.$t('common.header.securityCenter'),
              icon: 'icm-security',
              href: this.GetHref('user', 'security')
            },
          ]
          },
          {
            title: this.$t('common.header.financeCenter'), href: this.GetHref('Financial', 'assets'), subMenu: [
            {title: this.$t('common.header.assets'), icon: 'icm-qiabao', href: this.GetHref('Financial', 'assets')},
            {title: this.$t('common.header.account'), icon: 'icm-icon--', href: this.GetHref('Financial', 'account')},
            {
              title: this.$t('common.header.entrust'),
              icon: 'icm-weituofangziliao',
              href: this.GetHref('Financial', 'entrusts')
            },
          ]
          },
          {title: this.$t('common.header.Notice'), icon: 'icm-Notice', href: '/home/Notice/NoticeList'},
          {title: this.$t('common.header.tutorial'), icon: 'icm-Help', href: '/tutorial'},
          {title: this.$t('common.header.recharge'), icon: 'icm-Help', href: '/deposit'}
        ];
        return pages;
      }
    },

    methods: {
      GetHref(path, id){
        if (this.username) {
          return `/${path}/${id}`
        } else {
          return '/user/Login'
        }
      },

      getUserHref() {
        if (this.username) {
          return `/user/${this.username}`
        } else {
          return '/user/Login'
        }
      },

      SignIn(){
        if (this.$route.fullPath !== "/user/Login") {
          window.sessionStorage.setItem('fullPath', this.$route.fullPath);
        }
        //跳转登录页面
        this.$router.push({path: '/user/Login'});
        this.$destroy();
      },

      SignOut(){
        this.$confirm(this.WhetherToContinue, this.Prompt, {
          confirmButtonText: this.Sure,
          cancelButtonText: this.Cancel,
          type: 'warning'
        }).then(() => {
          this.username = this.$store.state.uid;
          localeRequest.logout().then((response) => {
            // 获取调用退出登录
            this.$store.commit('SET_TOKEN', '');
            this.$store.commit('SET_UID', '');
            this.username = '';
            this.$message({
              type: 'success',
              message: this.OutSuccess
            });
            this.$router.push({path: '/'});
          }).catch((err) => {
            console.log('login err: ', err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.CancelOut
          });
        });
      },

      handleLocaleSwitch (e) {
        if (this.$store.state.locale === e) {
          return
        }
        const link = this.$route.path.replace(`/${this.$store.state.locale}`, '');
        this.$store.commit('SET_LANG', e);
        this.locale = this.$store.state.locale;
        this.$nextTick(function () {
          localeRequest.switchLocale().catch(err => console.log('err: ', err));
          this.$router.push(this.$i18n.getPath(link));
          this.$destroy();
        });
      },

      handleUserAssetsRequest() {
        this.$router.push('/Financial/assets');
        this.$destroy();
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'assets/styles/mixins.scss';

  .header-container {
    background-color: rgba(37, 39, 46, 0.5);
    overflow: visible;
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;
  }

  .menu-bar {
    background-color: transparent;
    height: 40px;
    // width: 1240px;
    min-width: $minWidth;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: $primaryFontSize + 2px;
    padding: 0 50px;
    // margin: 0 auto;
    .menu-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      .logo {
        width: 127px;
        height: 25px;
        margin: 0 7px;
      }
      .login {
        outline: none;
        width: fit-content;
        font-size: 14px;
        color: $primaryFontColor;
        padding: 5px 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        top: -3px;
        position: relative;
      }
      .login:hover {
        color: #3366cc;
      }
    }
  }

  .menu-section-username {
    text-align: right;
    margin-right: 33px;
    width: 170px;
    height: 40px;
    line-height: 40px;
    color: #6d7dab;
    font-size: 14px;
  }

  .menu-section-username > a {
    color: #6d7dab;
    margin-left: 15px;
  }
</style>
