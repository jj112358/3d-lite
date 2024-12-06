export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023, // 支持最新的 ECMAScript 语法
      sourceType: 'module', // 使用 ES Modules
    },
    rules: {
      // 基础语法检查规则
      'semi': ['error', 'always'], // 强制使用分号
      'quotes': ['error', 'single'], // 强制使用单引号
      'no-unused-vars': ['warn'], // 警告未使用的变量
      'eqeqeq': ['error', 'always'], // 强制使用 === 和 !==
      'no-console': 'off', // 允许使用 console
    },
  },
];