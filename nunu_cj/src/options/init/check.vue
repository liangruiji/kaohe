<!-- <template>
  <label
    :id="id"
    class="el-checkbox"
    :class="[
      border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked },
    ]"
  >
    <span
      class="el-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus,
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="el-checkbox__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        v-model="model"
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span v-if="$slots.default || label" class="el-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
// function broadcast(componentName, eventName, params) {
//   this.$children.forEach(child => {
//     var name = child.$options.componentName

//     if (name === componentName) {
//       child.$emit.apply(child, [eventName].concat(params))
//     } else {
//       broadcast.apply(child, [componentName, eventName].concat([params]))
//     }
//   })
// }
// export default {
//   name: 'Check',

//   mixins: [],

//   inject: {
//     elForm: {
//       default: '',
//     },
//     elFormItem: {
//       default: '',
//     },
//   },

//   componentName: 'Check',

//   props: {
//     value: {},
//     label: {},
//     indeterminate: Boolean,
//     disabled: Boolean,
//     checked: Boolean,
//     name: String,
//     trueLabel: [String, Number],
//     falseLabel: [String, Number],
//     id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
//     controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
//     border: Boolean,
//     size: String,
//   },

//   data() {
//     return {
//       selfModel: false,
//       focus: false,
//       isLimitExceeded: false,
//     }
//   },

//   computed: {
//     model: {
//       get() {
//         return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel
//       },

//       set(val) {
//         console.log(val)
//         if (this.isGroup) {
//           this.isLimitExceeded = false
//           this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true)

//           this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true)

//           this.isLimitExceeded === false && this.dispatch('CheckboxG', 'input', [val])
//         } else {
//           this.$emit('input', val)
//           this.selfModel = val
//         }
//       },
//     },

//     isChecked() {
//       if ({}.toString.call(this.model) === '[object Boolean]') {
//         return this.model
//       } else if (Array.isArray(this.model)) {
//         return this.model.indexOf(this.label) > -1
//       } else if (this.model !== null && this.model !== undefined) {
//         return this.model === this.trueLabel
//       }
//       return false
//     },

//     isGroup() {
//       let parent = this.$parent
//       while (parent) {
//         if (parent.$options.componentName !== 'CheckboxG') {
//           parent = parent.$parent
//         } else {
//           this._checkboxGroup = parent
//           return true
//         }
//       }
//       return false
//     },

//     store() {
//       return this._checkboxGroup ? this._checkboxGroup.value : this.value
//     },

//     /* used to make the isDisabled judgment under max/min props */
//     isLimitDisabled() {
//       const { max, min } = this._checkboxGroup
//       return (!!(max || min) && this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked)
//     },

//     isDisabled() {
//       return this.isGroup
//         ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled || this.isLimitDisabled
//         : this.disabled || (this.elForm || {}).disabled
//     },

//     _elFormItemSize() {
//       return (this.elFormItem || {}).elFormItemSize
//     },

//     checkboxSize() {
//       const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
//       return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize
//     },
//   },

//   watch: {
//     value(value) {
//       this.dispatch('ElFormItem', 'el.form.change', value)
//     },
//   },

//   created() {
//     this.checked && this.addToStore()
//   },
//   mounted() {
//     // 为indeterminate元素 添加aria-controls 属性
//     if (this.indeterminate) {
//       this.$el.setAttribute('aria-controls', this.controls)
//     }
//   },

//   methods: {
//     addToStore() {
//       if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
//         this.model.push(this.label)
//       } else {
//         this.model = this.trueLabel || true
//       }
//     },
//     handleChange(ev) {
//       if (this.isLimitExceeded) return
//       let value
//       if (ev.target.checked) {
//         value = this.trueLabel === undefined ? true : this.trueLabel
//       } else {
//         value = this.falseLabel === undefined ? false : this.falseLabel
//       }
//       this.$emit('change', value, ev)
//       this.$nextTick(() => {
//         if (this.isGroup) {
//           this.dispatch('CheckboxG', 'change', [this._checkboxGroup.value])
//         }
//       })
//     },
//     dispatch(componentName, eventName, params) {
//       var parent = this.$parent || this.$root
//       var name = parent.$options.componentName

//       while (parent && (!name || name !== componentName)) {
//         parent = parent.$parent

//         if (parent) {
//           name = parent.$options.componentName
//         }
//       }
//       if (parent) {
//         parent.$emit.apply(parent, [eventName].concat(params))
//       }
//     },
//     broadcast(componentName, eventName, params) {
//       broadcast.call(this, componentName, eventName, params)
//     },
//   },
// }
</script> !-->

<template>
  <input v-model="model" type="checkbox" :value="label" :name="name" @change="handleChange" @focus="focus = true" @blur="focus = false" />
</template>
<script>
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  name: 'Check',

  mixins: [],

  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },

  componentName: 'Check',

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    controls: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/,
    border: Boolean,
    size: String,
  },

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    }
  },

  computed: {
    model: {
      get() {
        console.log(this.isGroup)
        return this._checkboxGroup ? this._checkboxGroup.value : []
      },

      set(val) {
        console.log(val)
        // if (this.isGroup) {
        //   this.isLimitExceeded = false
        //   this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true)

        //   this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true)

        this.dispatch('CheckboxG', 'input', [val])
        // } else {
        //   this.$emit('input', val)
        //   this.selfModel = val
        // }
      },
    },

    // isChecked() {
    //   if ({}.toString.call(this.model) === '[object Boolean]') {
    //     return this.model
    //   } else if (Array.isArray(this.model)) {
    //     return this.model.indexOf(this.label) > -1
    //   } else if (this.model !== null && this.model !== undefined) {
    //     return this.model === this.trueLabel
    //   }
    //   return false
    // },

    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'CheckboxG') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },

    // store() {
    //   return this._checkboxGroup.value
    // },

    /* used to make the isDisabled judgment under max/min props */
    // isLimitDisabled() {
    //   const { max, min } = this._checkboxGroup
    //   return (!!(max || min) && this.model.length >= max && !this.isChecked) || (this.model.length <= min && this.isChecked)
    // },

    // isDisabled() {
    //   return this.isGroup
    //     ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled || this.isLimitDisabled
    //     : this.disabled || (this.elForm || {}).disabled
    // },

    // _elFormItemSize() {
    //   return (this.elFormItem || {}).elFormItemSize
    // },

    // checkboxSize() {
    //   const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    //   return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize
    // },
  },

  // watch: {
  //   value(value) {
  //     this.dispatch('ElFormItem', 'el.form.change', value)
  //   },
  // },

  created() {
    // this.checked && this.addToStore()
  },
  mounted() {
    // let parent = this.$parent
    // while (parent) {
    //   if (parent.$options.componentName !== 'CheckboxG') {
    //     parent = parent.$parent
    //     break
    // } else {
    this._checkboxGroup = this.$parent
    // console.log(this.$parent)
    //   }
    // }
    // 为indeterminate元素 添加aria-controls 属性
    // if (this.indeterminate) {
    //   this.$el.setAttribute('aria-controls', this.controls)
    // }
  },

  methods: {
    // addToStore() {
    //   if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
    //     this.model.push(this.label)
    //   } else {
    //     this.model = this.trueLabel || true
    //   }
    // },
    handleChange(ev) {
      this.$emit('change', ev.target.checked, ev)
      this.$nextTick(() => {
        this.dispatch('CheckboxG', 'change', [this._checkboxGroup.value])
      })
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
  },
}
</script>
