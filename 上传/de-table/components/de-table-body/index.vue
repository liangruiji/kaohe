<!--
 * @Author: your name
 * @Date: 2022-03-03 16:43:31
 * @LastEditTime: 2022-03-12 15:33:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-body/index.vue
-->
<template>
  <div class="body-wrap">
    <el-table ref="elTable" :data="store.states.data" size="mini" header-row-class-name="defined-header-row" v-bind="$attrs" v-on="$listeners">
      <template v-for="r in store.states.columns">
        <template v-if="r.hasOwnProperty('isShow') ? r.isShow : !r.hidden">
          <template v-if="r.type && nativeColumnTypes.includes(r.type)">
            <el-table-column :key="r.prop" :type="r.type"></el-table-column>
          </template>
          <template v-else>
            <el-table-column :key="r.prop">
              <template v-slot:header>
                <column-header key="header" :store="store" :column="r">
                  <slot :name="r.slotHeader"></slot>
                </column-header>
                <count-down v-if="r.hasOwnProperty('isLogin')" :is-login="r.isLogin"> </count-down>
              </template>
              <template v-slot:default="scope">
                <div v-if="r.numStripe">
                  <num-stripe :percentage="getNumStripeValue(scope.$index, r.prop)"></num-stripe>
                </div>
                <div class="cell-value">
                  <div v-if="r.slot">
                    <slot :name="r.slot" v-bind="scope">
                      <!-- {{ scope.row[r.prop] || valueFilter(scope.row[r.prop], r) }} -->
                      {{ scope.row[r.prop] }}
                    </slot>
                  </div>
                  <div v-else>
                    <!-- {{ scope.row[r.prop] || valueFilter(scope.row[r.prop], r) }} -->
                    {{ scope.row[r.prop] }}
                  </div>
                </div>
                <div v-if="r.subProp" class="sub-cell-value">
                  {{ scope.row[r.subProp] || valueFilter(scope.row[r.subProp], r, r.subValueFilter) }}
                </div>
              </template>
              <template v-if="r.children">
                <template v-for="n in r.children">
                  <div v-if="n.hasOwnProperty('isShow') ? n.isShow : !n.hidden" :key="n.prop">
                    <div v-if="n.type && nativeColumnTypes.includes(n.type)">
                      <el-table-column :type="n.type"></el-table-column>
                    </div>
                    <div v-else>
                      <el-table-column>
                        <template v-slot:header>
                          <column-header key="header" :store="store" :column="n">
                            <slot :name="n.slotHeader"></slot>
                          </column-header>
                          <count-down v-if="n.hasOwnProperty('isLogin')" :is-login="n.isLogin"> </count-down>
                        </template>

                        <template v-slot:default="scope">
                          <div v-if="n.numStripe">
                            <num-stripe :percentage="getNumStripeValue(scope.$index, n.prop)"></num-stripe>
                          </div>
                          <div class="cell-value">
                            <div v-if="n.slot"></div>
                            <div v-else>
                              {{ scope.row[n.prop] || valueFilter(scope.row[n.prop], n) }}
                            </div>
                          </div>
                          <div v-if="n.subProp" class="sub-cell-value">
                            {{ scope.row[n.subProp] || valueFilter(scope.row[n.subProp], n, n.subValueFilter) }}
                          </div>
                        </template>
                        <template v-if="n.children">
                          <template v-for="t in n.children">
                            <div v-if="t.hasOwnProperty('isShow') ? t.isShow : !t.hidden" :key="t.prop">
                              <div v-if="t.type && nativeColumnTypes.includes(t.type)">
                                <el-table-column :type="t.type"></el-table-column>
                              </div>
                              <div v-else>
                                <el-table-column>
                                  <template v-slot:header>
                                    <column-header key="header" :store="store" :column="t">
                                      <slot :name="t.slotHeader"></slot>
                                    </column-header>
                                    <count-down v-if="t.hasOwnProperty('isLogin')" :is-login="t.isLogin"> </count-down>
                                  </template>
                                  <template v-slot:default="scope">
                                    <div v-if="t.numStripe">
                                      <num-stripe :percentage="getNumStripeValue(scope.$index, t.prop)"></num-stripe>
                                    </div>
                                    <div class="cell-value">
                                      <div v-if="t.slot"></div>
                                      <div v-else>
                                        {{ scope.row[t.prop] || valueFilter(scope.row[t.prop], t) }}
                                      </div>
                                    </div>
                                    <div v-if="t.subProp" class="sub-cell-value">
                                      {{ scope.row[t.subProp] || valueFilter(scope.row[t.subProp], t, t.subValueFilter) }}
                                    </div>
                                  </template>
                                </el-table-column>
                              </div>
                            </div>
                          </template>
                        </template>
                      </el-table-column>
                    </div>
                  </div>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>
import ColumnHeader from './column-header.vue'
import NumStripe from './num-stripe.vue'
import CountDown from './count-down.vue'

import { handlerValueFilter } from '@/components/de-table/public.js' // 一些处理数据格式公共函数

export default {
  name: 'DeTableBody',
  components: {
    ColumnHeader,
    NumStripe,
    CountDown,
  },
  filters: {
    valueFilter: function(e, t) {
      return handlerValueFilter(e, t)
    },
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    store: {
      required: !0,
    },
  },
  data: function() {
    return (this.nativeColumnTypes = ['selection', 'index', 'expand']), {}
  },
  mounted: function() {
    this.store.elTable = this.$refs.elTable || null
  },
  methods: {
    getNumStripeValue: function(e, t) {
      return this.store.states.numStripeData.hasOwnProperty(e) && this.store.states.numStripeData[e].hasOwnProperty(t)
        ? this.store.states.numStripeData[e][t]
        : 0
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.cell-value {
  /*解决超出不显示省略号问题*/ /*display: inline;*/
  position: relative;
  z-index: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
