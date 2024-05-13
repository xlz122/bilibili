module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // 是否开启prettier(error/off)
    'prettier/prettier': 'error',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 禁止使用var
    'no-var': 2,
    // 字符串单引号
    'quotes': [2, 'single'],
    // 对象末尾逗号
    'comma-dangle': [2, 'never'],
    // 箭头函数前后空格
    'arrow-spacing': [2, { before: true, after: true }],
    // 箭头函数参数括号(1个参数不需要, 1个以上需要)
    'arrow-parens': [2, 'as-needed'],
    // 全等(===、!==)
    'eqeqeq': 2,
    // 语句结尾分号
    'semi': [2, 'always'],
    // 空格缩进
    'indent': [2, 2],
    // jsx空格缩进
    'react/jsx-indent': [2, 2],
    // 单行代码最大长度
    'max-len': [2, { code: 120 }],
    // 强制文件末尾换行
    'eol-last': 2,

    // 标签(组件省略闭合标签，html不省略闭合标签)
    'react/self-closing-comp': [2, { 'component': true, 'html': false }],
    // 检查 Hook 的规则(不允许在if for里面使用)
    'react-hooks/rules-of-hooks': [2],
    // 检查 effect 的依赖
    'react-hooks/exhaustive-deps': [0]
  }
};
