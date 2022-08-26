/**
 * @ Author:
 * @ Create Time: 2019-12-08 11:05:29
 * @ Modified by: 你的名字
 * @ Modified time: 2021-01-05 09:21:46
 * @ Description: Eslint && Prettier
 */

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  globals: {
    Eye: true,
    chrome:true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],

  // 这里添加自定义的规则
  //详细查看 -> https://github.com/vuejs/eslint-config-vue
  rules: {
    // 采用prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        // 是否使用尾逗号，有三个可选值"<none|es5|all>"
        trailingComma: 'all',
        // 行位是否使用分号，默认为true
        semi: false,
        // 一行的字符数，如果超过会进行换行，默认为80
        printWidth: 160,
      },
    ],
    // 关闭不允许使用console.log()
    'no-console': 'off',
    // 关闭尾随逗号
    'comma-dangle': 0,
    //关闭此规则在多行元素的内容之前和之后强制换行。
    'vue/multiline-html-element-content-newline': 0,
    // 关闭每行预期字符判断
    'vue/html-indent': 0,
    'vue/html-closing-bracket-newline': 0,
    // 关闭Vue每行最大属性数量判断
    'vue/max-attributes-per-line': 0,
    // 无内容标签统一为自闭合
    'vue/html-self-closing': 0,
    // 保持prettier推荐的分号使用,关闭Eslint中的no-extra-semi规则判断
    'no-extra-semi': 0
  },
}
