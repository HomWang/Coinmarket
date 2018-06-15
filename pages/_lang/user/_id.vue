<template>
  <section>
    <Head></Head>

    <section class="cm-user">
      <el-row :gutter="8">

        <!-- 左侧菜单区 -->
        <el-col :span="4">
          <cm-side-menu v-for="(item, ParentIndex) in menus"
            :key="ParentIndex"
            :menu="item"
            :isActive="item.isActive">
            <cm-sub-menu slot="subtitle"
              v-for="(submenu, ChildIndex) in item.submenus"
              :key="ChildIndex"
              :isActive="submenu.isActive"
              :submenu="submenu"
              @click.native="SelectTitle(ParentIndex, ChildIndex)"
              @select-menu="selectMenu(ParentIndex, ChildIndex)">
              </cm-sub-menu>
          </cm-side-menu>
        </el-col>

        <!-- 右侧内容区 -->
        <el-col :span="20">

          <!-- 安全设置 -->
          <section v-if="PersonalCenterParentState === 0 && PersonalCenterChildState === 0">
            <SecuritySet></SecuritySet>
          </section>

          <!-- 登录记录 -->
          <section v-if="PersonalCenterParentState === 0 && PersonalCenterChildState === 1">
            <LoginRecord></LoginRecord>
          </section>

          <!-- 积分中心 -->
          <IntegralGrade v-if="PersonalCenterParentState === 1 && PersonalCenterChildState === 0"></IntegralGrade>

          <!-- 收货地址 -->
          <section v-if="PersonalCenterParentState === 1 && PersonalCenterChildState === 1">
            <Address></Address>
          </section>

          <!-- 市场代理人 -->
          <Extension v-if="PersonalCenterParentState === 1 && PersonalCenterChildState === 2"></Extension>

          <!-- api -->
          <UserAPI v-if="PersonalCenterParentState === 1 && PersonalCenterChildState === 3"></UserAPI>
        </el-col>
      </el-row>
    </section>
    <About/>
    <Footer/>
  </section>
</template>

<script>
import Head from '~/components/public/Head.vue';
import SideMenu from '~/components/public/SideMenu.vue';
import SubMenu from '~/components/public/SubMenu.vue';

import UserAPI from '~/components/user/UserAPI.vue';
import IntegralGrade from '~/components/user/IntegralGrade.vue';
import Extension from '~/components/user/Extension.vue';

import About from '~/components/home/About.vue';
import Footer from '~/components/home/Footer.vue';
import Address from '~/components/user/Address.vue';
import LoginRecord from '~/components/user/LoginRecord.vue';
import SecuritySet from '~/components/user/SecuritySet.vue';

import Bus from '~/plugins/bus.js'

export default {
  components: {
    Head,
    About,
    Footer,
    UserAPI,
    IntegralGrade,
    Extension,
    'cm-side-menu': SideMenu,
    'cm-sub-menu': SubMenu,
    Address,
    LoginRecord,
    SecuritySet
  },

  asyncData () {
  },

  head () {
    return {
      title: 'Coinmarket '+this.$t('common.header.personal'),
      meta: [
        { hid: 'description', name: 'description', content: 'Coinmarket '+this.$t('common.header.personal') }
      ]
    }
  },

  mounted () {
    this.menus = {params: this.$route.params, parentIndex: 0, childIndex: 0};

    if(!this.$store.state.token) {
      this.$router.push('/user');
      this.$destroy();
    }

    // 根据路由判断显示安全中心还是个人中心
    if (this.$route.params.id === 'security') {
      this.PersonalCenterParentState = 0;
      this.PersonalCenterChildState = 0;
    } else {
      this.PersonalCenterParentState = 1;
      this.PersonalCenterChildState = 0;
    }
  },

  data() {
    return {
      menu: [{
        name: 'securityCenter',
        title: this.$t('user.SecurityCenterTitle'),
        icon: 'icm-security',
        isActive: true,
        submenus: [
          {name: 'securitySet', title: this.$t('user.SecuritySeTitle')},
          {name: 'loginRecord', title: this.$t('user.LoginRecordTitle'), },
        ]
      }],
      UserListCount: 0,
      UserListState: false,
      PersonalCenterParentState: null,
      PersonalCenterChildState: null,
    }
  },

  computed: {
    menus: {
      get: function () {
        return this.menu;
      },

      set: function (payload) {
        if (payload.params.id === 'security') {

          // 安全中心
          this.menu = [{
            name: 'securityCenter',
            title: this.$t('user.SecurityCenterTitle'),
            icon: 'icm-security',
            isActive: true,
            submenus: [
              {name: 'securitySet', title: this.$t('user.SecuritySeTitle')},
              {name: 'loginRecord', title: this.$t('user.LoginRecordTitle'), },
            ]
          }];
        } else {
          this.menu = [
            {
              name: 'userCenter',
              title: this.$t('user.UsercenterTitle'),
              icon: 'icm-user',
              isActive: true,
              submenus: [
                {name: 'scoreLevel', title: this.$t('user.IntegralGradeTitle')},
                {name: 'address', title: this.$t('user.AddressTitle')},
                {name: 'agent', title: this.$t('user.ExtensionTitle')},
                // {name: 'api', title: 'API', },
              ]
            }
          ];
        }
        this.menu[payload.parentIndex].submenus[payload.childIndex]['isActive'] = true;
      }
    },
  },

  methods: {
    SelectTitle(ParentIndex, ChildIndex){
      this.PersonalCenterParentState = this.$route.params.id==='security'? 0 : 1;
      this.PersonalCenterChildState = ChildIndex;
    },

    // 菜单选中效果
    selectMenu(parentIndex, childIndex) {
      this.menus = {params: this.$route.params, parentIndex: parentIndex, childIndex: childIndex}
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-user {
  position: relative;
  padding: 30px 0;
  width: 1240px;
  margin: 0 auto;
}

</style>
