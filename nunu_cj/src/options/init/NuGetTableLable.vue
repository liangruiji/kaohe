<template>
  <div>
    <div class="item" @click="drawer = !drawer">
      表头配置
    </div>
    <el-drawer append-to-body size="85%" custom-class="nunu-drawer" title="生意参谋生成表头配置" :visible.sync="drawer" :direction="direction" @opened="open">
      <div class="nunu-input">
        <el-input v-model="textarea1" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容" @input="inputChange"></el-input>
        <el-input id="hhh" v-model="textarea2" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容"></el-input>
      </div>
      <el-input v-model="textarea3" clearable type="textarea" :rows="5" :cols="5" placeholder="请输入内容" @input="inputChange"></el-input>
      <el-button type="primary" size="mini" @click="choseOption(1)">
        配置1
      </el-button>
      <el-button type="primary" size="mini" @click="choseOption(2)">
        配置2
      </el-button>
      <el-button type="primary" size="mini" @click="copy">
        复制
      </el-button>

      <div class="nunu-input">
        <el-input v-model="textarea4" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容"></el-input>
        <el-input v-model="textarea5" clearable type="textarea" :rows="20" :cols="100" placeholder="请输入内容"></el-input>
      </div>
      <textarea ref="code" name="code">
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>HTML5 canvas demo</title>
    <style>p {font-family: monospace;}</style>
  </head>
  <body>
    <p>Canvas pane goes here:</p>
    <canvas id=pane width=300 height=200></canvas>
    <script>
      var canvas = document.getElementById('pane');
      var context = canvas.getContext('2d');

      context.fillStyle = 'rgb(250,0,0)';
      context.fillRect(10, 10, 55, 50);

      context.fillStyle = 'rgba(0, 0, 250, 0.5)';
      context.fillRect(30, 30, 55, 50);
    </script>
  </body>
</html></textarea
      >
      <iframe id="preview"></iframe>
    </el-drawer>
  </div>
</template>

<script>
import { op } from '@/utils/data.js'
let reOne = /^\w+$/
let reTwo = /^[\u4e00-\u9fa5]+$/
const opKeys = Object.keys(op)
function isArrayFn(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}
const option = {
  1: `{
    sortable: true,
    minWidth: 'byLabel + 8',
    filterType: 'number',
  }`,
  2: `{
    sortable: true,
    minWidth: width+44,
  }`,
}
// eslint-disable-next-line no-unused-vars
let width
// 表头配置
export default {
  name: 'NuGetTableLable',
  data() {
    return {
      drawer: false,
      direction: 'ltr',
      textarea1: '{"dd":55,"ddd":"dasda"}',
      textarea2: '',
      textarea3: `{

  
}`,
      textarea4: '',
      textarea5: '',
    }
  },
  mounted() {},
  methods: {
    inputChange() {
      let val = this.textarea1
      try {
        console.log(val)
        let data = eval('(' + val + ')')
        console.log(data)
        isArrayFn(data) ? this.arrTran(data) : this.objTran(data)
      } catch (error) {
        let text = ''
        if (val.length >= 5 && reOne.test(val)) {
          console.log('>>>')
          opKeys.map(key => {
            let keyLower = key.toLowerCase()
            val = val.toLowerCase()
            if (keyLower.includes(val)) {
              let item = `${key} : ${op[key]}
`
              text += item
            }
          })
          console.log('text')
          this.textarea2 = text
        } else if (val.length >= 2 && reTwo.test(val)) {
          for (let key in op) {
            let value = op[key]
            if (value.includes(val)) {
              let item = `${key} : ${value}
`
              text += item
            }
          }
          this.textarea2 = text
        }
      }
    },
    arrTran(data) {
      console.log('arr')
      let bb = []
      let obj = {}
      for (let i of data) {
        let item = {
          prop: i,
          label: op[i],
          // sortable: true,
          // minWidth: 'byLabel + 8',
          // filterType: 'number',
        }
        width = 80
        if (op[i]) {
          width = op[i].length * 12
        }
        Object.assign(item, this.textarea3Obj())
        bb.push(item)
        obj[i] = item
      }
      console.log(bb)
      console.log(obj)
      this.textarea2 = JSON.stringify(bb)
      let bbMaps = {}
      let bbMapsTwo = {}
      bb.map((i, index) => {
        bbMaps[i.prop] = i
        bbMapsTwo[i.prop] = i.label ? i.label : '-'
        bbMapsTwo[i.label ? i.label : index] = i.prop
      })
      this.textarea4 = JSON.stringify(bbMaps)
      this.textarea5 = JSON.stringify(bbMapsTwo)
    },
    objTran(data) {
      let bb = []
      let obj = {}

      for (let i in data) {
        // if (i.includes('Crc')) continue
        let item = {
          prop: i,
          label: op[i],
          // sortable: true,
          // minWidth: 'byLabel + 8',
          // filterType: 'number',
        }
        width = 80
        if (op[i]) {
          width = op[i].length * 12
        }
        Object.assign(item, this.textarea3Obj())
        bb.push(item)
        obj[i] = item
      }
      console.log(bb)
      console.log(obj)
      this.textarea2 = JSON.stringify(bb)
      let bbMaps = {}
      let bbMapsTwo = {}
      bb.map((i, index) => {
        bbMaps[i.prop] = i
        bbMapsTwo[i.prop] = i.label ? i.label : '-'
        bbMapsTwo[i.label ? i.label : index] = i.prop
      })
      this.textarea4 = JSON.stringify(bbMaps)
      this.textarea5 = JSON.stringify(bbMapsTwo)
    },
    choseOption(i) {
      this.textarea3 = option[i]
      this.inputChange()
    },
    textarea3Obj() {
      try {
        let width = width
        let textarea3 = eval('(' + this.textarea3 + ')')
        return textarea3
      } catch (error) {
        return {}
      }
    },
    copy() {
      const inputElement = document.querySelector('#hhh')
      inputElement.select()
      document.execCommand('copy')
    },
    open() {
      var delay
      // Initialize CodeMirror editor with a nice html5 canvas demo.
      var editor = CodeMirror.fromTextArea(this.$refs.code, {
        mode: 'text/html',
      })
      editor.on('change', function() {
        clearTimeout(delay)
        delay = setTimeout(updatePreview, 300)
      })

      function updatePreview() {
        var previewFrame = document.getElementById('preview')
        var preview = previewFrame.contentDocument || previewFrame.contentWindow.document
        preview.open()
        preview.write(editor.getValue())
        preview.close()
      }
      setTimeout(updatePreview, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
.nunu-input {
  display: flex;
  margin-left: 5px;
}
</style>
<style lang="scss">
.nunu-drawer {
  overflow: scroll;
}
</style>
