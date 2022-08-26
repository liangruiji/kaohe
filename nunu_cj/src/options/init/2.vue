<!--
 * @ Description: 生意参谋市场大盘-行业趋势点击面板
 -->

<template>
  <div class="xws-show-board-warp">
    <div class="arrow-warp">
      <div v-show="currentPage != 1" class="arrow-item" @click="leftClick">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>

    <div v-if="type == 'radio'" class="main">
      <div v-for="item in boardShowList" :key="item" :label="item" class="xws-show-board-item-warp" :style="{ width: 100 / pageSize + '%' }">
        <div class="xws-show-board-item" :class="{ nodata: hasDataList ? !hasDataList.includes(item) : false, active: item == value }" @click="change(item)">
          <div :class="{ paddingborder: hasPaddingBorder(item) }">
            <slot :item="item"></slot>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="main">
      <div v-for="item in boardShowList" :key="item" :label="item" class="xws-show-board-item-warp" :style="{ width: 100 / pageSize + '%' }">
        <div
          class="xws-show-board-item"
          :class="{ nodata: hasDataList ? !hasDataList.includes(item) : false, active: value.includes(item) }"
          @click="changeCheck(item)"
        >
          <div :class="{ paddingborder: hasPaddingBorderCheck(item) }">
            <slot :item="item"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-warp">
      <div v-show="currentPage != page" class="arrow-item" @click="rightClick">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XwsShowBoard',
  props: {
    hasDataList: {
      type: Array,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    pageSize: {
      type: Number,
      default: 8,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: 'radio',
    },
  },
  data() {
    return {
      // currentIndexCode: this.indexCodeList[0],
      // currentPage: 1,
    }
  },
  computed: {
    page() {
      return Math.ceil(this.list.length / this.pageSize)
    },
    boardShowList() {
      let arr
      if (this.currentPage == 1) {
        if (this.list.length < this.pageSize) {
          arr = this.list.slice(0, this.list.length)
        } else {
          arr = this.list.slice(0, this.pageSize)
        }
      } else if (this.currentPage == this.page) {
        arr = this.list.slice((this.page - 1) * this.pageSize, this.list.length)
      } else {
        arr = this.list.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
      return arr
    },
  },
  methods: {
    change(val) {
      console.log('提交', val)
      this.$emit('input', val)
      this.$emit('change', val)
    },
    changeCheck(val) {
      let index = this.value.indexOf(val)
      if (index >= 0) {
        this.value.splice(index, 1)
        console.log('提交', this.value)
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      } else {
        this.value.push(val)
        console.log('提交', this.value)
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      }
    },

    rightClick() {
      if (this.currentPage < this.page) {
        this.$emit('pageChange', 'right')
        this.currentPage++
        let currentPage = this.currentPage
        this.$emit('update:currentPage', currentPage)
      }
    },
    leftClick() {
      if (this.currentPage > 1) {
        this.$emit('pageChange', 'left')
        this.currentPage--
        let currentPage = this.currentPage
        this.$emit('update:currentPage', currentPage)
      }
    },
    hasPaddingBorder(item) {
      if (item == this.value) {
        return false
      }
      if (this.hasDataList && !this.hasDataList.includes(item)) {
        return false
      }
      return true
    },
    hasPaddingBorderCheck(item) {
      if (this.value.includes(item)) {
        return false
      }
      if (this.hasDataList && !this.hasDataList.includes(item)) {
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss" scope>
.xws-show-board-warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  line-height: 1.3;
  .main {
    display: flex;
    align-items: center;
    flex: 1;
    .xws-show-board-item-warp {
      padding: 0 5px;
      position: relative;
      box-sizing: border-box;
      // width: 12.5%;
      .xws-show-board-item {
        cursor: pointer;
        color: #303133;
        border-width: 1px;
        border-color: #e4e7ed;
        border-style: solid;
        border-radius: 4px;
        padding: 5px 10px;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        .paddingborder {
          border: 1px solid transparent;
        }
        .label {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .value-box {
          margin-top: 5px;
          font-size: 20px;
          font-family: Helvetica Neue, Tahoma, Helvetica, Arial, Microsoft YaHei;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cycle {
          margin-top: 5px;
          font-size: 12px;
          color: #c0c4cc;
          max-width: 150px;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .nodata {
        border-width: 2px;
        border-color: #ebeef5;
        border-style: dashed;
        color: #c0c4cc;
      }
      .active {
        border-width: 2px;
        border-color: #409eff;
        border-style: solid;
      }
    }
  }
  .arrow-warp {
    width: 30px;
    height: 30px;
    .arrow-item {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid transparent;
      line-height: 28px;
      text-align: center;
      font-size: 18px;
      &:hover {
        border: 1px solid #dbe5ed;
        color: #409eff;
      }
    }
  }
}
</style>
