module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules:{"no-unused-vars": [2, { 
    // 允许声明未使用变量
    "vars": "local",
    // 参数不检查
    "args": "none" 
  }]}
}
