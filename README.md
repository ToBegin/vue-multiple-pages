# vue-multiple-pages

## Add Project

新增项目,命名规则需按照{ <b>project</b> }字段配置

<b>下方三个目录必须全部配置,且project字段不可存在特殊符号</b>

* src/pages/{<b>project</b>}/{<b>project</b>}_main.js (必须)

* src/pages/{<b>project</b>}{<b>project</b>}.html (必须)

* static/{<b>project</b>}/** (存放对应项目的静态文件，可不创建)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:{config.dev.port}
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# serve for production
npm run server
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
