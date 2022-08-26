<!--
 * @Author: your name
 * @Date: 2021-09-18 08:33:49
 * @LastEditTime: 2021-11-30 14:45:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init/settings.vue
-->
<template>
  <div>
    <div class="item" @click="open">
      设置
    </div>
    <el-drawer append-to-body size="90%" title="设置" :visible.sync="drawer" :direction="direction">
      <el-tabs tab-position="left">
        <el-tab-pane label="插入页面的库">
          <!-- <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" @change="change"></el-switch> -->

          <el-form ref="form" label-position="top" :model="form" label-width="80px">
            <el-form-item label="插入的js">
              <el-checkbox-group v-model="form.checkList" @change="change">
                <el-checkbox v-for="(item, index) in option" :key="index" :label="item.name"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <public-table highlight-hover-row border="inner" :data="option" :header-cell-style="{ background: '#f3f4f6' }" :column="column" />
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          配置管理
        </el-tab-pane>
        <el-tab-pane label="角色管理">
          角色管理
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">
          定时任务补偿
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form ref="formTwo" label-position="right" :model="formTwo" label-width="80px">
        <el-form-item label="名字">
          <el-input v-model="formTwo.name" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="url" type="textarea" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="matches">
          <el-input v-model="matches" type="textarea" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="run_at">
          <el-radio-group v-model="formTwo.run_at" size="mini">
            <el-radio-button label="document_start">
              document_start
            </el-radio-button>
            <el-radio-button label="document_end">
              document_end
            </el-radio-button>
            <el-radio-button label="document_idle">
              document_idle
            </el-radio-button>
          </el-radio-group>
          <!-- <el-input v-model="formTwo.run_at" placeholder="请输入内容" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="type">
          <el-radio-group v-model="formTwo.type" size="mini">
            <el-radio-button label="">
              无
            </el-radio-button>
            <el-radio-button label="async">
              async
            </el-radio-button>
            <el-radio-button label="defer">
              defer
            </el-radio-button>
          </el-radio-group>
          <!-- <el-input v-model="formTwo.run_at" placeholder="请输入内容" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="act">
          <el-input v-model="formTwo.act" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="injectCb">
          <el-input v-model="formTwo.injectCb" type="textarea" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="switch">
          <el-switch v-model="formTwo.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="lll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// const op = [
//   {
//     name: 'jq',
//     url: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
//     matches: ['*://*.taobao.com/*'],
//     switch: true,
//     run_at: 'document_start',
//     act: 'inject_cdn_script',
//     injectCb:
//       '(' +
//       function bb() {
//         console.log(666)
//       }.toString() +
//       ')()',
//   },
// ]
function tranToArr(str) {
  let val = []
  let arr = str.split(',')
  arr.map(i => {
    let item = i.trim()
    if (item != '') {
      val.push(item)
    }
  })
  return val
}
export default {
  name: '',
  data() {
    return {
      value: false,
      drawer: false,
      direction: 'ltr',
      checkList: [],
      option: [],
      form: {
        checkList: [],
      },

      column: [
        {
          label: '名字',
          field: 'name',
          width: '90',
        },
        {
          label: '地址',
          field: 'url',
          minWidth: '300',
          render: (h, scope) => {
            let val = scope.row.url.join(`,
`)
            return <div>{val}</div>
          },
        },
        {
          label: '规则',
          field: 'matches',
          width: '200',
          render: (h, scope) => {
            let val = scope.row.matches.join(`,
`)
            return <div>{val}</div>
          },
        },
        {
          label: '启用',
          field: 'switch',
          render: (h, scope) => {
            let value = scope.row.switch

            return <state-symbol class="mr-5" state={value ? 'on' : 'off'} />
          },
        },
        {
          label: '类型',
          field: 'type',
        },
        {
          label: '操作',
          render: (h, scope) => {
            return (
              <div>
                <el-link type="primary" onClick={() => this.edit(scope.row, scope.rowIndex)}>
                  编辑
                </el-link>
                <span class="break-line"> | </span>
                <el-popconfirm title="这是一段内容确定删除吗？" vOn:confirm={() => this.lll()}>
                  <el-link slot="reference" type="danger" onClick={() => this.delete(scope.rowIndex)}>
                    删除
                  </el-link>
                </el-popconfirm>

                <span class="break-line"> | </span>
                <el-link type="primary" onClick={() => this.add(scope.rowIndex)}>
                  新增
                </el-link>
              </div>
            )
          },
        },
      ],
      dialogVisible: false,
      formTwo: {
        name: '',
        url: '',
        matches: [],
        switch: true,
        run_at: 'document_start',
        act: 'inject_cdn_script',
        injectCb:
          '(' +
          function bb() {
            console.log(666)
          }.toString() +
          ')()',
        type: '',
      },
      url: '',
      matches: '',
      currentIndex: '',
      action: '',
    }
  },
  computed: {
    op() {
      let matches = []
      let url = []
      try {
        matches = tranToArr(this.matches)
        url = tranToArr(this.url)
      } catch (error) {
        console.log('出错了')
      }

      let val = Object.assign({}, this.formTwo, { matches, url })
      console.log('>>>>>>>>', val)
      return val
    },
  },

  methods: {
    // 编辑
    edit(data, index) {
      this.action = 'Edit'
      console.log('编辑')
      this.dialogVisible = true
      this.matches = data.matches.join(`,
`)
      this.url = data.url.join(`,
`)
      this.formTwo = data
      this.currentIndex = index
    },
    delete(index) {
      this.action = 'Delete'
      this.currentIndex = index
      console.log('删除')
    },
    add(index) {
      this.action = 'Add'
      this.dialogVisible = true
      this.currentIndex = index
      this.matches = '.*://.*/.*'
      this.url = ''
      this.formTwo = {
        name: '',
        url: '',
        matches: [],
        switch: true,
        run_at: 'document_start',
        act: 'inject_cdn_script',
        injectCb: '(' + function bb() {}.toString() + ')()',
        type: '',
      }
    },

    open() {
      this.drawer = !this.drawer
      if (this.drawer) {
        chrome.runtime.sendMessage({ act: 'getLocalforageData', type: 'injectOption' }, res => {
          let arr = []
          res.data.map(item => {
            item.switch && arr.push(item.name)
          })
          this.form.checkList = arr
          this.option = res.data
        })
      }
    },
    change() {
      this.option.map(i => {
        i.switch = false
        if (this.form.checkList.includes(i.name)) {
          i.switch = true
        }
      })
      chrome.runtime.sendMessage({ act: 'setLocalforageData', type: 'injectOption', data: this.option }, res => {
        console.log('保存', res)
      })
    },
    lll() {
      this['confirm' + this.action]()
    },
    confirmAdd() {
      this.option.splice(this.currentIndex + 1, 0, this.op)
      console.log(this.op)
      console.log(this.option)
      chrome.runtime.sendMessage({ act: 'setLocalforageData', type: 'injectOption', data: this.option }, res => {
        console.log('保存', res)
      })
      this.dialogVisible = false
      this.action = ''
    },
    confirmEdit() {
      this.option.splice(this.currentIndex, 1, this.op)
      console.log(this.op)
      console.log(this.option)
      chrome.runtime.sendMessage({ act: 'setLocalforageData', type: 'injectOption', data: this.option }, res => {
        console.log('保存', res)
      })
      this.dialogVisible = false
      this.action = ''
    },
    confirmDelete() {
      this.option.splice(this.currentIndex, 1)
      console.log(this.option)
      chrome.runtime.sendMessage({ act: 'setLocalforageData', type: 'injectOption', data: this.option }, res => {
        console.log('保存', res)
      })
      this.dialogVisible = false
      this.action = ''
    },
  },
}
</script>

<style scope></style>
