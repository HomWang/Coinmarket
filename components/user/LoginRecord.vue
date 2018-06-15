
<template>
  <section class="cm-logrecord">
    <section class="cm-logrecord-nav">
      <span style="margin-left: 32px" :class="{'cm-list-title__color': isLoginList}" @click="handleTableChange(true)">{{$t('user.SecurityCenter.RecentLogInHistory')}}</span>
      <span style="margin-left: 45px;" :class="{'cm-list-title__color': !isLoginList}" @click="handleTableChange(false)">{{$t('user.SecurityCenter.HistoryOfSecuritySettings')}}</span>
    </section>
    <section style="" class="cm-logrecord-banner">
      {{$t('user.SecurityCenter.UserLoginTimeRecord')}}
    </section>
    <el-table
      :data="tableData"
      fit
      fixed
      style="width: 100%">
      <el-table-column
        prop="fcreatetime"
        :label="$t('user.SecurityCenter.Date')"
        align="left"
        width="140px"
        :formatter="formateDate">
      </el-table-column>
      <el-table-column
        prop="fcreatetime"
        :label="$t('user.SecurityCenter.Time')"
        align="right"
        :formatter="formateTime">
      </el-table-column>
      <el-table-column
        prop="fip"
        :label="$t('user.SecurityCenter.IpAddress')"
        align="right">
      </el-table-column>
      <el-table-column
        v-if="!isLoginList"
        prop="ftype_s"
        :label="$t('user.SecurityCenter.Operation')"
        align="right">
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :pageSize="pageSize"
      :current-page.sync="currentPage"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </section>
</template>

<script>
import Input from '~/components/public/Input.vue';
import userRequest from '~/api/userRequest';

export default {
  name: 'loginRecord',

  components: {
  },

  props: {
  },

  mounted() {
    this.setLoginTable();
    this.setSetTable();
  },

  data() {
    return {
      isLoginList: true,
      tableData: [],
      loginPage: 0,
      loginList: [],
      setPage: 0,
      setList: [],
      loginMore: true,
      setMore: true,
      currentPage: 1,
      setTotal: 100,
      loginTotal: 100,
      loginSize: 10,
      setSize: 10,
      pageSize: 10,
      total: 100,
    }
  },

  computed: {
  },

  methods: {

    // 根据是否为登录表单赋值数组
    setTable() {
      this.tableData = this.isLoginList? this.loginList : this.setList;
      this.currentPage = this.isLoginList? this.loginPage : this.setPage;
      this.total = this.isLoginList? this.loginTotal : this.setTotal;

    },

    // 请求分页数据
    handleCurrentChange(currentPage) {
      if(this.isLoginList) {
        this.setLoginTable(currentPage);
      } else {
        this.setSetTable(currentPage);
      }
    },

    // 选择不同的表单
    handleTableChange(e) {
      this.isLoginList = e;
      this.setTable();
    },

    // 请求登录数据接口
    setLoginTable(currentPage) {
      userRequest.getLoginRecord(currentPage).then(res=> {
        if(res && res.result && res.result.flogs) {
          this.loginPage = res.result.flogs.currentPage;
          const rawList = res.result.flogs.data;
          this.loginList = rawList;
          this.loginSize = res.result.flogs.pageSize;
          this.loginTotal = res.result.flogs.totalRows;
        }
      }).then(() => {
        this.setTable();
      }).catch(err => console.log('err: ', err));
    },

    // 请求设置数据接口
    setSetTable(currentPage) {
      userRequest.getSettingRecord(currentPage).then(res=> {
        if (res && res.result && res.result.flogs) {
          this.setPage = res.result.flogs.currentPage;
          const rawList = res.result.flogs.data;
          this.setList = rawList;
          this.setTotal = res.result.flogs.totalRows;
          this.setSize = res.result.flogs.pageSize;
        }
      }).then(() => {
        this.setTable();
      }).catch(err => console.log('err: ', err));
    },

    // 日期格式化
    formateDate(row, column, cellValue) {
      const date = new Date(cellValue);
      const year = date.getFullYear();
      const month = numberFormatter(date.getMonth() + 1);
      const day = numberFormatter(date.getDate());
      return `${year}-${month}-${day}`;
    },

    // 时间格式化
    formateTime(row, column, cellValue) {
      const date = new Date(cellValue);
      const hour = numberFormatter(date.getHours());
      const minute = numberFormatter(date.getMinutes());
      const second = numberFormatter(date.getSeconds());
      return `${hour}:${minute}:${second}`;
    },
  }
}

function numberFormatter(number) {
  return number>=10 ? number.toString() : '0'+number;
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

$shadowFont: #e7e7e7;

.cm-logrecord {
  min-height: 733px;
  background-color: #222222;
  padding: 33px;
  .cm-logrecord-nav {
    font-size: 18px;
  }
}
.cm-list-title__color {
  color: #fcc200;
  cursor: pointer;
}

.cm-logrecord-nav{
  cursor: pointer;
}

.cm-logrecord-banner {
    height: 60px;
    background-color: $goldenColor;
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding-left: 32px;
}
.el-table {
  background-color: #222222;
  top: -25px;
  height: 517px;
  overflow: auto;
  color: $primaryColor;
  tr {
    border: 1px solid $primaryColor;
  }
  tr:hover {
    background-color: $goldenColor !important;
  }
}

.cm-update__more {
  background-color: rgba(82, 95, 133, 0.3);
  color: #6d7dab;
  font-size: 16px;
  text-align: center;
  padding: 5px 0;
}

</style>

<style>
  .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
    color: #d8d8d8;
  }
</style>
