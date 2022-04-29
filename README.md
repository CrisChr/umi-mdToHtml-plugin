# umi 插件开发

## 通过编译将Markdown格式转化成HTML并显示在页面上

```
  export default defineConfig({
  plugins: [require.resolve('../lib/index')],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  mdToHtml: {
    mdPath: resolve(__dirname, './README.md')
  }
});

```

## 用到的umi API

  ### 插件API（注册 -> 运行 -> 编译 -> 编译完成 -> 构建完成）
    - describe

      用于描述插件的id、key、配置信息、启用方式等

    - onGenerateFile

      生成临时文件，触发时机在webpack编译之前

    - writeTmpFile

      写入临时文件

    - addUmiExports

      导出方法，可在组件内直接引用
