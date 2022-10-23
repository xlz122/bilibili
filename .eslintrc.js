module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // 是否使用prettier(error/off)
    'prettier/prettier': 'error',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 取消函数参数需要重新赋值给另一个变量才能使用
    'no-param-reassign': [0],
    // 取消 { a, b, c } 多个变量需要换行
    'object-curly-newline': [0],
    // 禁止出现未使用的变量
    'no-unused-vars': [0],

    // 禁用var，使用let、const
    'no-var': 2,
    // 强制单引号
    'quotes': [2, 'single'],
    // 强制全等(===、!==)
    'eqeqeq': 2,
    // 强制语句分号结尾
    'semi': [2, 'always'],
    // 强制文件末尾换行
    'eol-last': 2,
    // 箭头函数参数括号(1个参数不需要,1个以上需要)
    'arrow-parens': [2, 'as-needed'],
    // 箭头函数(箭头前后空格)
    'arrow-spacing': [2, { before: true, after: true }],
    // 对象末尾是否需要逗号
    'comma-dangle': [2, 'never'],
    // 单行代码最大长度
    'max-len': [2, { code: 120 }],

    // 空格缩进
    // 'indent': [2, 2],
    // jsx空格缩进
    'react/jsx-indent': [2, 2],
    // 标签(组件省略闭合标签，html不省略闭合标签)
    'react/self-closing-comp': [2, { 'component': true, 'html': false }],
    // 检查 Hook 的规则(不允许在if for里面使用)
    'react-hooks/rules-of-hooks': [2],
    // 检查 effect 的依赖
    'react-hooks/exhaustive-deps': [0]
  }
};
