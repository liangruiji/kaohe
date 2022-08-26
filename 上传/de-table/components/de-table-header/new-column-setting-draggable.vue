<!--
 * @Author: your name
 * @Date: 2022-03-03 16:41:03
 * @LastEditTime: 2022-03-10 11:46:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /kaohe/上传/WebGL/src/components/de-table/components/de-table-header/new-column-setting-draggable.vue
-->
<template>
  <draggable v-model="draggableData">
    <transition-group type="transition" name="flip-list">
      <div v-for="t in draggableData" v-show="arrowStatus" :key="t.prop || t.label">
        <div v-show="!t.isFilter" class="draggable-item">
          <div v-if="hasChildren || isChildren" class="item-arrow" style="width:14px;height:14px">
            <i v-if="t.children" :class="'el-icon-arrow-' + arrowObj.hasOwnProperty(t.label) ? arrowObj[t.label] : 'down'" @click="arrowChange(t.label)"></i>
          </div>
          <div class="item-content" style="width:30px">
            <el-checkbox v-model="t.checked" @change="handleCheck"></el-checkbox>
          </div>
          <div class="item-content title" :style="{ width: 14 * titleLength + 'px' }">
            <span :title="t.label"> {{ isChildren ? '  ' : '' }}{{ t.label }} </span>
          </div>
          <div class="item-content item-sort" style="width:28px">
            <span class="caret-wrapper">
              <i class="sort-caret ascending" title="向上移动" @click.stop="onClickMoveIcon('top', t)"></i>
              <i class="sort-caret descending" title="向下移动" @click.stop="onClickMoveIcon('bottom', t)"></i>
            </span>
          </div>
          <div class="item-content" style="width:50px">
            <el-switch
              v-model="t.isShow"
              class="switch"
              @change="
                e => {
                  return onSwitchChange(t, e, 'isShow')
                }
              "
            ></el-switch>
          </div>
          <div class="item-content" style="width:50px">
            <el-switch
              v-model="t.isExport"
              class="switch"
              @change="
                e => {
                  return onSwitchChange(t, e, 'isExport')
                }
              "
            ></el-switch>
          </div>
          <div class="item-content" style="width:50px">
            <el-switch
              v-show="t.hasOwnProperty('numStripe')"
              v-model="t.numStripe"
              class="switch"
              @change="
                e => {
                  return onSwitchChange(t, e, 'numStripe')
                }
              "
            ></el-switch>
          </div>
        </div>
        <div>
          <new-column-setting-draggable
            v-if="t.children"
            v-model="t.children"
            :group="t.prop"
            :title-length="titleLength"
            :is-all-checked="isAllChecked"
            :arrow-status="!arrowObj.hasOwnProperty(t.label) || 'down' === arrowObj[t.label]"
            :is-children="true"
            @handleCheck="handleCheck"
            @switch-change="onSwitchChange"
          ></new-column-setting-draggable>
        </div>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'NewColumnSettingDraggable',
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      },
    },
    draggableGroup: {
      type: String,
      default: 'directory',
    },
    isAllChecked: {
      type: Boolean,
      default: !1,
    },
    titleLength: {
      type: Number,
      default: 5,
    },
    arrowStatus: {
      type: Boolean,
      default: !0,
    },
    hasChildren: {
      type: Boolean,
      default: !1,
    },
    isChildren: {
      type: Boolean,
      default: !1,
    },
  },
  data: function() {
    return {
      arrowObj: {},
    }
  },
  computed: {
    draggableData: {
      get: function() {
        return this.value
      },
      set: function(e) {
        this.$emit('input', e)
      },
    },
  },
  methods: {
    arrowChange: function(e) {
      this.$set(this.arrowObj, e, this.arrowObj.hasOwnProperty(e) && 'up' === this.arrowObj[e] ? 'down' : 'up')
    },
    setAllCheck: function(t) {
      var n = this
      this.draggableData.forEach(function(e) {
        if (('checked' === t.key && !e.isFilter) || (e.checked && (('numStripe' === t.key && e.hasOwnProperty(t.key)) || 'numStripe' !== t.key))) {
          n.$set(e, t.key, t.value)
        }
        e.children &&
          e.children.forEach(function(e) {
            if (('checked' === t.key && !e.isFilter) || (e.checked && (('numStripe' === t.key && e.hasOwnProperty(t.key)) || 'numStripe' !== t.key))) {
              n.$set(e, t.key, t.value)
            }
          })
      })
    },
    handleCheck: function() {
      var e = this.draggableData.every(function(e) {
          if (e.checked)
            return !(
              e.children &&
              !e.children.every(function(e) {
                return e.checked
              })
            )
        }),
        t =
          this.draggableData.some(function(e) {
            if (
              e.checked ||
              (e.children &&
                e.children.some(function(e) {
                  return e.checked
                }))
            )
              return !0
          }) && !e
      this.$emit('handleCheck', {
        isAllChecked: e,
        isIndeterminate: t,
      })
    },
    onClickMoveIcon: function(e, t) {
      for (var n = 0; n < this.draggableData.length; n++) {
        var r = this.draggableData[n]
        if ((r.prop && r.prop === t.prop) || (!r.prop && r.label && r.label === t.label)) {
          'top' === e
            ? 0 < n && (this.draggableData.splice(n, 1), this.draggableData.splice(n - 1, 0, r))
            : n < this.draggableData.length - 1 && (this.draggableData.splice(n, 1), this.draggableData.splice(n + 1, 0, r))
          break
        }
      }
    },
    onSwitchChange: function(e, t, n) {
      this.$emit('switch-change', e, t, n)
    },
  },
}
</script>

<style lang="scss" scoped>
@charset "UTF-8"; /* ========= 全局变量预定义 =========== */ /*  ==== 颜色相关 ===  */ /* ==== 默认字体大小 ==== */ /* === 布局相关  === */
.draggable-item {
  background-color: #fff;
  padding: 4px 10px;
  line-height: 1;
  cursor: move;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
.draggable-item .item-arrow {
  cursor: pointer;
}
.draggable-item .item-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.draggable-item .item-content.title,
.draggable-item .item-content.title span {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.draggable-item .item-content .caret-wrapper {
  flex-shrink: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.draggable-item .item-content .caret-wrapper .sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
  transition: border 0.2s ease;
}
.draggable-item .item-content .caret-wrapper .sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 6px;
}
.draggable-item .item-content .caret-wrapper .sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 6px;
}
.draggable-item .item-content .caret-wrapper .ascending:hover {
  border-bottom-color: #409eff;
}
.draggable-item .item-content .caret-wrapper .descending:hover {
  border-top-color: #409eff;
}
.draggable-item .item-content .switch {
  margin-left: 10px;
}
.draggable-item:hover .caret-wrapper {
  opacity: 1;
}
.draggable-item:hover .item-setting {
  opacity: 1;
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
