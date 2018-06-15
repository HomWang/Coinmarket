<!-- 币种交易列表table -->
<template>
  <section class="cm-coin-table">

    <!-- 表头 -->
    <el-row v-if="hasHead" class="cm-dhead" :class="[thClass]" type="flex" align="middle">
      <el-col v-for="(col, colIndex) in columns"
        class="cm-th-td"
        :key="colIndex"
        :span="col.span ? col.span : 6"
        :class="[col.class,]">
        <span  @click="handleSortRequest(colIndex)" style="cursor: pointer">
          {{col.label}}
          <i v-if="col.sortable" class="iconfont icm-shangxia"></i>
        </span>
      </el-col>
    </el-row>

    <!-- 表身 -->
    <section ref="body" class="cm-dbody" :class="[tbClass]">
      <el-row v-for="(row, rowIndex) in tableData"
        :key="rowIndex"
        type="flex"
        align="middle"
        :class="[rowClass, row.specialClass]"
        @click.native="handleRowSelected(row, rowIndex)">
        <el-col v-for="(col, colIndex) in columns"
          :key="colIndex"
          :span="col.span ? col.span : 6"
          :class="[col.class]">
          <span
            :class="{'cm-coin-list__red': colIndex!==0 && row[columns[2].prop]<0, 'cm-coin-list__green': colIndex!==0 && row[columns[2].prop]>=0}">
            {{row[col.prop]}}
            <span v-if="colIndex===2">%</span>
          </span>
        </el-col>
        <div v-if="hasVolBar" class="cm-dtable-vol">
          vol
        </div>
      </el-row>
    </section>
  </section>
</template>

<script>

export default {
  name: 'CoinTable',
  components: {
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    thClass: {
      type: String,
    },
    tbClass: {
      type: String,
    },
    rowClass: {
      type: String,
      default: 'default-row'
    },
    hasVolBar: {
      type: Boolean,
      default: false,
    },
    toBottom: {
      type: Boolean,
      default: false,
    },
    hasHead: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    if (this.toBottom) {
      this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
    }
  },

  data() {
    return {
    }
  },

  methods: {

    // 触发排序操作
    handleSortRequest(colIndex) {
      this.$emit('sort-trigger', colIndex);
    },

    // 选择某行
    handleRowSelected(row, index) {
      this.$emit('row-selected', row, index);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

i {
  font-size: 10px;
  margin: 0;
  padding: 0;
}
.cm-coin-table {
  font-size: 14px;
  line-height: 1;
  .cm-th-td {
    color: inherit;
  }
  .el-row {
    height: 20px;
  }
  .el-row:hover {
    background-color: rgba(#b5bfdd, 0.21);
  }
  .cm-dhead {
    font-weight: bold;
    // margin-right: 12px;
  }
  .cm-dhead:hover {
    background-color: inherit;
    cursor: default;
  }
  .default-table {
    font-size: 14px;
  }
  .cm-dtable-vol {
    position: absolute;
    background-color: red;
    right: 0;
  }
  .cm__isselected {
    background-color: rgba(#b5bfdd, 0.21);
  }
}
.cm-coin-list__red {
  color: $redColor;
}
.cm-coin-list__green {
  color: $greenColor;
}
</style>

<style>
</style>
