##这是用 React 和 antd 完成的一个开源react后台管理项目 
***
后期将要开发 node 为后台 （暂未）

**clone项目**
>使用 **cnpm i** 或者 yarn npm 都行
>项目没有使用 `yarn eject` 暴露webpack全部文件 ，执行过后，项目所有的依赖都会在**dependencies**
采用了`yarn add react-app-rewired customize-cra babel-plugin-import less less-loader -D`
这样需要创建一个新的文件config-overrides.js
```
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');
module.exports = override(
    // antd按需加载，不需要每个页面都引入“antd/dist/antd.css”了
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true  //这里一定要写true，css和less都不行
    }),
    // 配置路径别名
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "./src"),
    }),
    addLessLoader({
      javascriptEnabled: true,
      //配置antd主题的颜色。
      modifyVars: { "@primary-color": "#f47983"} 
      // 具体配置
    })
)
```
[antd主题具体配置(点这里)](https://ant.design/docs/react/customize-theme-cn#Ant-Design-%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F)

>2020.6.4 已完成登陆页面开发、注册页、路由访问限制、菜单模块