<!-- table: 买卖单挂单区 -->
<template>
  <section class="cm-dtable">
    <el-row v-if="hasHead" class="cm-dhead" :class="[thClass]" type="flex" align="middle">
      <el-col v-for="(col, colIndex) in columns"
              class="cm-th-td"
              :key="colIndex"
              :span="col.span ? col.span : 6"
              :class="[col.class, cellClass]">
        {{col.label}}
      </el-col>
    </el-row>
    <!--<vue-scrollbar ref="scroller" class="my-scrollbar" :speed="scrollSpeed">-->
    <section ref="table" class="cm-dbody" :class="[tbClass]" v-bar="{preventParentScroll: true, scrollThrottle: 30,}">
      <div ref="scroller">
        <el-row v-for="(row, rowIndex) in tableData"
                :key="rowIndex"
                type="flex"
                align="middle"
                :class="[rowClass]"
                @click.native="handleRowSelected(row, rowIndex)">
          <el-col v-for="(col, colIndex) in columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 6"
                  :class="[col.class, row.specialClass, cellClass]"
                  :style="{color: Boolean(col.colorMethod)? col.colorMethod(row[col.prop]) : ''}"
                  style="z-index: 10"
                  @click="handleCellClicked(item, item[col.prop])">
            <span v-if="Boolean(col.processMethod)">{{col.processMethod(row[col.prop])}}</span>
            <span v-else>{{row[col.prop]}}</span>
          </el-col>
          <div v-if="hasVolBar" class="cm-dtable-vol"
               :style="{width: row.amountRatio? (row.amountRatio * 100) + '%' : '0', backgroundColor: barColor}">
            vol
          </div>
        </el-row>
      </div>
    </section>
    <!--</vue-scrollbar>-->
  </section>
</template>

<script>
  import VueScrollbar from 'vue2-scrollbar';
  require('vue2-scrollbar/dist/style/vue2-scrollbar.css');
  import Bus from '~/plugins/bus.js';

  export default {
    name: 'DTable',

    components: {
      VueScrollbar,
    },

    props: {
      barColor: {
        type: String,
      },
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
      lineHeight: {
        type: Number,
        default: 28,
      },
      cellClass: {
        type: String,
      }
    },

    mounted() {
      Bus.$on('pending-init', () => {
        if (this.toBottom) {
          if (this.$refs.scroller) {
            this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
          }
        } else {
          if (this.$refs.scroller) {
            this.$refs.scroller.scrollTop = 0;
          }
        }
      });
    },

    data() {
      return {
        hlightRow: 1,
        scrollTop: 20,
      }
    },

    methods: {
      handleRowSelected(row, index) {
        this.$emit('row-selected', row, index);
      },

      handleCellClicked(row, cell) {
        this.$emit('cell-click', row, cell);
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

  .cm-dbody {
    /*height: 140px;*/
  }

  .cm-dtable {
    font-size: 14px;
    line-height: 1;
    .cm-th-td {
      color: inherit;
      text-overflow: ellipsis;
    }
    .el-row {
      height: 20px;
    }
    .el-row:hover {
      background-color: rgba(#b5bfdd, 0.21);
    }
    .el-row::selection {
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
      height: 20px;
      right: 0;
      color: transparent;
    }
  }

</style>

<style>
  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    background-color: rgba(153, 153, 153, 0.1);
    margin: 2px;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(153, 153, 153, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(153, 153, 153, 0.8);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(153, 153, 153, 0.8);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(153, 153, 153, 0.8);
  }
</style>
