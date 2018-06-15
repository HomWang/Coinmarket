<!-- 基于原生table的table组件，用于最新成交列表和委托记录列表 -->
<template>
  <section class="cm-table" :style="tableStyle">
    <section>
      <table v-if="hasHead">
        <colgroup>
          <col v-for="col in columns" :key="col.id" :width="col.width" :class="col.class">
        </colgroup>
        <thead :class="thead">
        <tr>
          <th v-for="col in columns"
              :key="col.id"
              class="cm-th-td" :class="col.class">
            {{col.label}}<i v-if="col.sortable" class="iconfont icm-shangxia"></i>
          </th>
        </tr>
        </thead>
      </table>
    </section>
    <section ref="body" class="cm-table-body" v-bar="{preventParentScroll: true, scrollThrottle: 30,}" :style="{height: bodyHeight}">
      <table>
        <colgroup>
          <col v-for="col in columns" :key="col.id" :width="col.width">
        </colgroup>
        <tbody :class="tbody">
        <tr v-for="item in tableData" :key="item.id" :class="trClass" :style="trStyle" style="position: relative">
          <td v-for="col in columns" :key="col.id" :class="col.class" @click="handleCellClicked(item, item[col.prop], col.isResponsive)">
            <i v-if="col.iconleft && item.up && col.prop=='rate'" class="iconfont icm-plus" style="color: #207B2A"></i>
            <i v-if="col.iconleft && !item.up && col.prop=='rate'" class="iconfont icm-minus"
               style="color: #e34242"></i>
            <span
              :class="{'cm__green': item[col.prop]==$t('trade.Buy') || item[col.prop]==$t('trade.Settled') || item[col.prop]==$t('trade.partSettled'), 'cm__red': item[col.prop]==$t('trade.Sell') || item[col.prop]==$t('trade.Unsettled')}">
                  {{item[col.prop]}}
                </span>
            <i v-if="col.iconright && item.up && col.prop=='price'" class="iconfont icm-arrowup"
               style="color: #207B2A"></i>
            <i v-if="col.iconright && !item.up && col.prop=='price'" class="iconfont icm-arrowdown"
               style="color: #e34242"></i>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script>
  import VueScrollbar from 'vue2-scrollbar';
  require('vue2-scrollbar/dist/style/vue2-scrollbar.css');

  export default {
    name: 'Table',

    components: {
      VueScrollbar
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
      theadClasses: {
        type: Array,
      },
      tbodyClasses: {
        type: Array,
      },
      bodyHeight: {
        type: String,
      },
      padding: {
        type: String,
      },
      trClasses: {
        type: String,
      },
      align: {
        type: String,
      },
      toBottom: {
        type: Boolean,
      },
      hasHead: {
        type: Boolean,
        default: true,
      },
      tdColor: {
        type: String,
      },
      trHeight: {
        type: String,
      },
      trBottom: {
        type: String,
      },
    },

    mounted() {
      const thead = {};
      const tbody = {};
      const trCls = {};
      this.addClasses(thead, this.theadClasses);
      this.addClasses(tbody, this.tbodyClasses);
      this.addClasses(trCls, this.trClasses);
      this.thead = thead;
      this.tbody = tbody;
      this.trClass = trCls;
      if (this.toBottom) {
        this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
      }
    },

    data() {
      return {
        thead: {},
        tbody: {},
        trClass: {},
        bodyStyle: {
          height: this.bodyHeight,
        },
        tableStyle: {
          padding: this.padding,
          textAlign: this.align,
        },
        tdStyle: {
          color: this.tdColor,
        },
        directColor: '',
        trStyle: {
          lineHeight: this.trHeight,
          borderBottom: this.trBottom,
        }
      }
    },

    methods: {
      addClasses(obj, arr) {
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            obj[arr[i]] = true
          }
        }
      },

      handleCellClicked(row, cell, flag) {
        if(flag) {
          this.$emit('cell-click', row, cell);
        }
      },
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

  .cm-table {
    table {
      table-layout: auto;
      border-collapse: collapse;
      width: 100%;
      tr {
        line-height: 34px;
      }
    }
    .cm-th-td {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .cm-table-body {
      display: block;
      overflow: hidden;
      tr:hover {
        background-color: rgba(#b5bfdd, 0.21);
      }
      td span.up {
        color: $greenColor;
        letter-spacing: 4px;
      }
    }
  }

  .cm__red {
    color: $redColor;
  }

  .cm__green {
    color: $greenColor;
  }
</style>

<style>

</style>
