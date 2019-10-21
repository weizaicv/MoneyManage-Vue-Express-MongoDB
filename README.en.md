愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
`
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
Vue.js devtools开发⼯工具安装教程
浏览器器商店直接安装
Chrome Extension(⾕谷歌浏览器器)
https://chrome.google.com/webstore/detail/vuejsdevtools/
nhdogjmejiglipccpnnnanhbledajbpd
Firefox Addon(⽕火狐浏览器器)
https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools
Workaround for Safari(Safari浏览器器)
https://github.com/vuejs/vue-devtools/blob/master/docs/workaround-for-safari.md
(不不翻墙，⽆无法访问⾕谷歌的)⼿手动安装教程(需要安装node)：
https://www.cnblogs.com/chenhuichao/p/11039427.html
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第⼀一章 课程介绍
第1集 ⼩小滴后台管理理系统课程介绍
课前准备
node
vue.js devtools
基础部分讲解
element组件库常⽤用部分讲解
封装组件的思路路
EChart运⽤用
权限管理理之动态⽣生成菜单
路路由守卫判断token 是否存在，跳转对应⻚页⾯面
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第⼆二章 Vue全家桶各部分核⼼心知识详解
第1集 构建vue项⽬目的利利器器—脚⼿手架vue-cli3详解
简介：vue-cli3全⽅方位对⽐比vue-cli2
参考地址： https://cli.vuejs.org/zh/config/#vue-config-js
安装node
选择对应系统进⾏行行下载，下载完成后直接安装即可
http://nodejs.cn/download/
安装vue-cli3
创建项⽬目
vue create project 或 可视化创建 vue ui
vue init webpack project
CLI服务
脚本名更更改
启动服务的依赖更更改
CLi3启动⽅方式是vue-cli-service serve
CLi2启动⽅方式是webpack-dev-server --inline --progress --config
⽣生成的⽬目录结构介绍
// 输⼊入⼀一下命令，成功输出版本即为安装成功
node -v
npm install -g @vue/cli
// 输出版本号即为安装成功
vue -V
3.0的⽬目录简单了了很多，少了了build、config两个⽬目录。需要对webpack进⾏行行配置的话，要⼿手动在根
⽬目录新建⼀一个vue.config.js⽂文件
vue.config.js常⽤用配置
// vue.config.js 常⽤用配置
module.exports = {
// 基本路路径, vue.cli 3.3以前请使⽤用baseUrl
publicPath: '/',
// 输出⽂文件⽬目录
outputDir: 'dist',
// ⽤用于嵌套⽣生成的静态资产（js，css，img，fonts）的⽬目录。
assetsDir: '',
// ⽣生产环境sourceMap
productionSourceMap: true,
// webpack配置
configureWebpack: () => {},
chainWebpack: () => {},
// css相关配置
css: {
// 启⽤用 CSS modules
modules: false,
// 是否使⽤用css分离插件
extract: true,
// 开启 CSS source maps?
sourceMap: false,
// css预设器器配置项
loaderOptions: {},
},
// webpack-dev-server 相关配置
devServer: {
host: '0.0.0.0',
port: 8080,
proxy: {}, // 设置代理理
},
// 第三⽅方插件配置
pluginOptions: {
// ...
}
}
第2集 vue中组件间传值常⽤用的⼏几种⽅方式(上)
⽗父⼦子组件传值
props / $emit
⼦子组件中通过定义props接收⽗父组件中通过v-bind绑定的数据
⽗父组件中通过监听⼦子组件中$emit的⾃自定义事件接收数据
$parent / children
⼦子组件中通过this.$parent这个对象获取⽗父组件中的数据
⽗父组件中通过this.$children这个数组获取⼦子组件中的数据
$ref
⽗父组件中定义⼦子组件中的ref属性后，通过this.$refs.定义的属性名获取⼦子组件数据
第3集 vue中组件间传值常⽤用的⼏几种⽅方式(下)
⾮非⽗父⼦子间传值
事件总线
$attrs / listeners
vuex
// 原理理上就是建⽴立⼀一个公共的js⽂文件，专⻔门⽤用来传递消息
// bus.js
import Vue from 'vue'
export default new Vue;
// 在需要传递消息的地⽅方引⼊入
import bus from './bus.js'
// 传递消息
bus.$emit('msg', val)
// 接受消息
bus.$emit('msg', val => {
console.log(val)
})
// 解决多级组件间传值的问题
// $attr 将⽗父组件中不不包含props的属性传⼊入⼦子组件，通常配合 interitAttrs 选项
⼀一起使⽤用。
// 如果不不想在dom上出现属性，可设置interitAttrs: false
// $listeners监听⼦子组件中数据变化，传递给⽗父组件
第4集 玩转单⻚页⾯面应⽤用的控制中⼼心—vue-router
路路由的基本配置
基本参数
path
路路由的访问路路径。即url
component
访问路路径对应的组件
扩展参数
name
路路由指定命名，设置后可⽤用params传参及使⽤用name进⾏行行路路由跳转
路路由的跳转
router-link标签跳转
编程式导航
动态路路由
什什么是动态路路由
组件是同⼀一个，只是通过不不同的url参数渲染不不同的数据
路路径参数"使⽤用冒号" : 标记
// route可以是对象，或者是字符串串
// 对象的时候可通过路路由的path或者name进⾏行行跳转
// 字符串串的话只能是路路由的path
this.$router.push(route)
// 路路由传递参数, query和path配合， params和name配合
query: this.$router.push({path: '/', query: {id: 2}})
params: this.$router.push({name: 'home', params: {id: 2}})
在path⾥里里显式声明后，通过params传参后，参数不不丢失同时参数被设置成必传参数
嵌套路路由
⽬目的： 组件中嵌套不不同组件
实现
导航守卫
通过router中的beforeEach注册全局守卫，每次切换路路由时触发
参数
to： 将进⼊入的路路由对象
from： 将离开的路路由对象
next() 确认完成操作，最后⼀一定要调⽤用，不不然路路由就不不会进⾏行行切换
路路由懒加载
提⾼高⻚页⾯面加载速度
避免进⼊入项⽬目后加载全部组件
在路路由中的component中设置函数，⽤用import⽅方式进⾏行行使⽤用
{
path: '/home/:id',
component: home
}
// 在需要嵌套的路路由中补充children字段
{
path: '/home/:id',
component: home,
children: []
}
// to, from是路路由对象，我们在路路由⾥里里定义的参数都可以在这⾥里里取到，例例如to.path或
from.name
router.beforeEach((to, from, next) => {
// ...
next()
})
component: () => import('./views/Home.vue'),
第5集 状态管理理中⼼心—vuex的基础⽤用法
State
数据，存放⼀一些公⽤用部分的数据
Mutations
数据怎么改变，定义改变state的⼀一些⽅方法
Actions
异步改变， 如果需要异步改变state，则在这书写
vuex⾥里里包含的基本参数
export default {
// 组件间公共数据部分
state: {},
// 需要改变state中的数据时，要在mutation⾥里里定义改变的⽅方法
mutations: {},
// 当改变state中的数据是异步操作时，在action⾥里里定义
actions: {}
}
第6集 状态管理理中⼼心—vuex的⾼高级⽤用法
vuex中的计算属性—Getters
当你需要依赖vuex⾥里里的state中的数据，做进⼀一步处理理时使⽤用
模块化概念—Modules
当vuex⾥里里的数据⼗十分庞⼤大时，可根据存放的数据所属模块进⾏行行划分
state: {
count: 0,
},
// 根据state中的count进⼀一步处理理，计算双倍值
getters: {
doubleCount (state) {
return state.count * 2
}
},
import Vue from 'vue'
import Vuex from 'vuex'
// 第⼀一步 引⼊入模块
import text from './text'
Vue.use(Vuex)
// 第⼆二步 在初始化store时，加载模块
export default new Vuex.Store({
modules: {
text
}
})
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第三章 Element常⽤用组件详解
第1集 Element常⽤用组件之布局组件详解
布局组件
el-row、el-col
el-container、el-header、el-aside、el-main、el-footer
常⽤用属性
span
gutter
如何构建5等分布局
布局⼩小试
第2集 Element常⽤用组件之弹出类型组件详解
常⽤用弹出组件
el-dialog
el-popover
sync修饰符的作⽤用
示例例：ElementUI中的el-dialog
dialog组件中的插槽
title
footer
// 第⼀一种写法
<el-dialog :visible.sync="dialogVisible">
// 第⼆二种写法
<el-dialog :visible="dialogVisible" :before-close="beforeClose">
// 第⼀一种写法关闭或是点击空⽩白处⽆无需特别处理理，el-dialog组件内部会修改当前值状态，通
过.sync修饰符传递给⽗父组件；
// 第⼆二种写法，需要再beforeClose⽅方法内⼿手动处理理this.dialogVisible = false。
第3集 Element常⽤用组件之表格组件详解
基础表格
在 Table 组件中，每⼀一个表格由⼀一个 Table-Column 组件构成，也就是表格的列列
属性名作⽤用
height 给表格设置⾼高度，同时固定表头
show-header 设置是否显示表头
row-class-name 设置⼀一个函数或者固定的名字作为⾏行行的类名
border 是否显示表格竖直⽅方向的边框，设置后可通过改变边框设置列列宽
表格常⽤用属性介绍
属性名作⽤用
label 当前列列的表头名称
prop 传⼊入的表格json数据的key值
show-overflow-tooltip 是否设置⽂文字超出列列宽时悬浮显示完整内容
列列常⽤用属性介绍
通过v-for封装适⽤用性更更好的表格
第4集 Element常⽤用组件之表单组件详解
基础表单
在 Form 组件中，每⼀一个表单域由⼀一个 Form-Item 组件构成，Form-item可以是下拉框、输
⼊入框、⽇日期选择器器等各种表单组件
添加表单验证
封装表单组件
观察基础表单
总结⼀一个表单组件动态的参数有哪些
最基础
label，model、type
扩展
rule、placeholder、其他配置(⾃自动补全，可清除等)
定义循环的数据结构
数组对象
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第四章 实战项⽬目之环境准备及配置改装
第1集 项⽬目搭建及技术选型
通过命令⾏行行创建项⽬目
Vue create <项⽬目名>
⼿手动配置项⽬目，上下键移动光标后，回⻋车即可
选择需要的配置
babel转译js的新特性，兼容低版本浏览器器
CSS预处理理器器，设置全局变量量
ESLint检查代码写法是否规范
是否使⽤用
第2集 配置项⽬目的基本环境及项⽬目⽬目录结构总体介绍
配置项⽬目按eslint规范格式化代码
vscode下载ESlint , Prettier , Vetur 插件
打开vscode的设置
选择扩展中的ESLint，之后点击在setting.json中编辑
添加如图配置
可⾃自定义eslint的⼀一些规则
在.eslintrc 中覆盖prettier规则即可，覆盖是为了了防⽌止冲突
在rules⾥里里配置
// 每次保存的时候将代码按eslint格式进⾏行行修复
"eslint.autoFixOnSave": true,
// 添加 vue ⽀支持
"eslint.validate": [
"javascript",
"javascriptreact",
{
"language": "vue",
"autoFix": true
}
],
配置完成后可运⾏行行npm run lint 格式化全部⽂文件，或者保存后⾃自动格式化代码
router部分模块化
vuex部分模块化
调整项⽬目⽬目录
删除多余代码
项⽬目⽬目录结构调整
配置scss全局变量量
在项⽬目的根⽬目录下新建vue.config.js
新建_variable.scss ⽂文件
在vue.config.js ⽂文件进⾏行行如下配置
rules: {
'no-console': process.env.NODE_ENV === 'production' ? 'error'
: 'off',
'no-debugger': process.env.NODE_ENV === 'production' ? 'error'
: 'off',
// 添加⾃自定义规则
'prettier/prettier': [
// eslint校验不不成功后，error或2则报错，warn或1则警告，off或0则⽆无提
示
'error',
{
singleQuote: true,
semi: false
}
]
},
module.exports = {
// 配置项⽬目启动端⼝口及⾃自动打开浏览器器
devServer: {
port: 3333,
open: true
},
// 配置scss全局变量量
css: {
loaderOptions: {
sass: {
data: `@import "@/assets/scss/_variable.scss";`
}
}
}
}
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第五章 ⼩小D课堂后台视频管理理系统之公⽤用部分开发
第五章 ⼩小D课堂后台视频管理理系统之公⽤用部分开发
第1集 需求分析及模块划分
分析视频管理理后台需要的功能
可视化展示数据
视频的成交量量
⽤用户总量量
订单总额
登录⻚页
视频管理理
上传视频
更更新视频
删除视频
查看已有视频
⽤用户管理理
更更新⽤用户信息
删除⽤用户
新增⽤用户
权限管理理
设计对应⻚页⾯面
⾸首⻚页⽤用来展示数据
使⽤用Echart柱状图、折线图及饼图展示
视频管理理⻚页、⽤用户管理理⻚页
选⽤用el-table及el-form展示和编辑数据
el-dialog组件实现编辑和新增功能
第2集 路路由设计及左侧公⽤用导航菜单开发
新建Main.vue 组件放置公共部分组件
建⽴立⻚页⾯面组件
在views/Home 下建⽴立Home.vue
在views/UserManage 下建⽴立UserManage.vue
在views/VideoManage 下建⽴立VideoManage.vue
在views/Other 下建⽴立PageOne.vue 、PageTwo.vue
在router/index.js 中引⼊入路路由
<template>
<el-container>
<el-aside><common-aside></common-aside></el-aside>
<el-container>
<el-header><common-header></common-header></el-header>
<common-tab></common-tab>
<el-main>
<router-view />
</el-main>
</el-container>
</el-container>
</template>
<script>
import CommonHeader from '../components/CommonHeader'
import CommonAside from '../components/CommonAside'
import CommonTab from '../components/CommonTab'
</script>
{
// 主要配置3个参数,访问的路路由地址，路路由名字及懒加载加载哪个组件
path: '',
// name属性⽤用于路路由跳转及params传参
name: '',
component: ''
}
// 完整路路由代码
export default new Router({
routes: [
{
path: '/',
component: () => import('@/views/Main'),
children: [
{
path: '/',
name: 'home'
component: () => import('@/views/Home/Home'),
},
{
path: '/user',
name: 'user'
component: () => import('@/views/UserManage/UserManage'),
},
{
path: '/video',
name: 'video'
component: () => import('@/views/VideoManage/VideoManage'),
},
{
path: '/page1',
name: 'page1'
component: () => import('@/views/Other/PageOne'),
},
{
path: '/page2',
name: 'page2'
component: () => import('@/views/Other/PageTwo'),
},
]
}
]
})
第3集 顶部导航菜单及与左侧导航联动的⾯面包屑实现(上)
核⼼心点
使⽤用vuex进⾏行行传值
// tab.js
export default {
state: {
isCollapse: false,
currentMenu: null,
menu: [],
tabsList: [
{
path: '/',
name: 'home',
label: '⾸首⻚页',
icon: 'home'
}
]
},
mutations: {
selectMenu(state, val) {
if (val.name !== 'home') {
state.currentMenu = val
let result = state.tabsList.findIndex(item => item.name === val.name)
result === -1 ? state.tabsList.push(val) : ''
} else {
state.currentMenu = null
}
// val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu
= val)
},
},
actions: {}
}
第4集 顶部导航菜单及与左侧导航联动的⾯面包屑实现(下)
vuex中的tab.js
第5集 使⽤用vuex实现切换tab⻚页功能
在Main.vue 中引⼊入CommonTab.vue 组件
在vuex⾥里里定义存取标签的tagList ，⽅方便便⾮非⽗父⼦子传递数据
定义vuex 中侧边栏点击后将菜单加⼊入到tagList 中的⽅方法
// tab.js
export default {
state: {
isCollapse: false,
currentMenu: null,
menu: [],
tabsList: [
{
path: '/',
name: 'home',
label: '⾸首⻚页',
icon: 'home'
}
]
},
mutations: {
closeTab(state, val) {
let result = state.tabsList.findIndex(item => item.name === val.name)
state.tabsList.splice(result, 1)
},
},
actions: {}
}
定义vuex 中点击标签后触发删除的⽅方法
第6集 构建⻚页⾯面组件，连通公共组件
建⽴立每个⻚页⾯面组件
连通⾯面包屑
连通侧边栏
连通标签栏
第7集 ⻚页⾯面布局整体样式优化
侧边栏背景⾊色改变
tag选中样式优化
⾯面包屑当前激活菜单样式优化
细节优化
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第六章 ⼩小D课堂后台视频管理理系统之⾸首⻚页开发
第1集 介绍mock.js及axios全局配置
Mock.js
作⽤用：⽣生成随机数据，拦截ajax请求
安装：
核⼼心：
Mock.mock()
Mock.Random()
随机⽣生成数据
yarn add mockjs
npm install mockjs
// 根据数据模板⽣生成模拟数据
Mock.mock( rurl, rtype, template)
/*
** rurl: 表示需要拦截的 URL，可以是 URL 字符串串或 URL 正则
** eg. /\/domain\/list\.json/、'/domian/list.json'
*/
第2集 使⽤用Mock随机返回主⻚页数据
新建mock ⽂文件夹
配置mock请求时间
新建home.js 存放主⻚页的数据
安装mock的语法⽣生成数据
第3集 使⽤用element布局组件实现⾸首⻚页布局
⾸首⻚页截图
分析布局
选择组件
第4集 完成⾸首⻚页除图表外的内容
定义右上⻆角统计数据格式
countData: [
{
name: '今⽇日⽀支付订单',
通过v-for循环，渲染⻚页⾯面
value: 1234,
icon: 'success',
color: '#2ec7c9'
},
{
name: '今⽇日收藏订单',
value: 210,
icon: 'star-on',
color: '#ffb980'
},
{
name: '今⽇日未⽀支付订单',
value: 1234,
icon: 's-goods',
color: '#5ab1ef'
},
{
name: '本⽉月⽀支付订单',
value: 1234,
icon: 'success',
color: '#2ec7c9'
},
{
name: '本⽉月收藏订单',
value: 210,
icon: 'star-on',
color: '#ffb980'
},
{
name: '本⽉月未⽀支付订单',
value: 1234,
icon: 's-goods',
color: '#5ab1ef'
}
],
<div class="num">
<el-card shadow="hover" v-for="item in countData"
:key="item.name" :body-style="{display: 'flex', padding: 0 }">
<i class="icon" :class="`el-icon-${item.icon}`"
:style="{ background: item.color }"></i>
<div class="detail">
<p class="num">￥ {{ item.value }}</p>
<p class="txt">{{ item.name }}</p>
</div>
</el-card>
</div>
第5集 完成⾸首⻚页table部分及ECharts介绍
ECharts
⼀一个使⽤用 JavaScript 实现的开源可视化库，通过这个库可实现可视化展示数据
快速⼊入⻔门
先设置ECharts要在哪显示，设置EChart容器器
通过 echarts.init ⽅方法初始化⼀一个 echarts 实例例并通过 setOption ⽅方法⽣生成⼀一个简单的
柱状图
案例例
<body>
<!-- 为 ECharts 准备⼀一个具备⼤大⼩小（宽⾼高）的 DOM -->
<div id="main" style="width: 600px;height:400px;"></div>
</body>
// data中声明echart对象
// 通过ref获取dom，初始化echarts实例例
this.echart = echarts.init(this.$refs.ref名字);
// 指定图表的配置项和数据
var option = {
title: {
text: 'ECharts ⼊入⻔门示例例'
},
tooltip: {},
legend: {
data:['销量量']
},
xAxis: {
data: ["衬衫","⽺羊⽑毛衫","雪纺衫","裤⼦子","⾼高跟鞋","袜⼦子"]
},
yAxis: {},
series: [{
name: '销量量',
type: 'bar',
data: [5, 20, 36, 10, 10, 20]
}]
};
// 使⽤用刚指定的配置项和数据显示图表。
this.echart.setOption(option);

第6集 谈谈封装⼀一个EChart组件的⼀一些想法
图表的⼤大分类
组件的⼀一些动态参数抽离
组件的基本配置
主题颜⾊色
color: [
'#2ec7c9',
'#b6a2de',
'#5ab1ef',
'#ffb980',
'#d87a80',
'#8d98b3',
'#e5cf0d',
'#97b552',
'#95706d',
'#dc69aa',
'#07a2a4',
'#9a7fd1',
'#588dd5',
'#f5994e',
'#c05050',
'#59678c',
'#c9ab00',
'#7eb00a',
'#6f5553',
'#c14089'
]
第7集 上⼿手封装⼀一个EChart组件并处理理数据展示图表
有坐标轴的图表
数据格式
没坐标轴的图表
数据格式
// 类⽬目轴
xAxis: {
data: [],
type: 'category',
},
// 数据部分
yAxis: {
type: 'value'
},
series: []
{
series: []
}
第8集 修改EChart组件样式及⾃自适应图表(上)
完善图表选项
axisOption: {
tooltip: {
trigger: 'axis'
},
legend: {
textStyle: {
//图例例⽂文字的样式
color: '#333'
}
},
grid: {
left: '20%'
},
color: [
'#2ec7c9',
'#b6a2de',
'#5ab1ef',
'#ffb980',
'#d87a80',
'#8d98b3',
'#e5cf0d',
'#97b552',
'#95706d',
'#dc69aa',
'#07a2a4',
'#9a7fd1',
'#588dd5',
'#f5994e',
'#c05050',
'#59678c',
'#c9ab00',
'#7eb00a',
'#6f5553',
'#c14089'
],
xAxis: {
data: [],
type: 'category',
axisLine: {
lineStyle: {
color: '#17b3a3' //x轴颜⾊色
}
},
// 字体倾斜
axisLabel: {
color: '#333'
}
},
yAxis: {
type: 'value',
axisLabel: {
formatter: '{value} '
},
axisLine: {
lineStyle: {
color: '#17b3a3' //坐标轴颜⾊色
}
},
splitLine: {
show: true,
lineStyle: {
color: ['#eee'],
width: 1,
type: 'solid'
}
第9集 修改EChart组件样式及⾃自适应图表(下)
完善组件样式
}
},
series: []
},
需要⾃自适应的地⽅方
浏览器器窗⼝口⼤大⼩小发⽣生变化
折叠菜单的时候
第10集 Echart组件封装总结
观察⽂文档，考虑组件需要的基本参数
参数筛选，分为从⽗父组件传来的参数和⾃自身的参数
完善组件，观察设计图，找不不同，在⽂文档中寻找对应的配置项
细节优化，考虑多种场景下，图表⾃自适应的处理理
normalOption: {
tooltip: {
trigger: 'item'
},
color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22',
'#39c362', '#3ed1cf'],
series: []
}
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第七章 ⽤用户管理理⻚页及详解权限管理理
第1集 ⽤用户管理理⻚页介绍及⻚页⾯面实现思路路讲解
管理理⻚页功能
新增⽤用户
搜索⽤用户
更更新⽤用户
删除⽤用户
分⻚页展示⽤用户列列表
分析⻚页⾯面组成
考虑组件设计
第2集 更更完善的表单组件封装及思路路讲解
分析表单组成
输⼊入框
下拉框
⽇日期选择器器
单选列列表
多选列列表
。。。
考虑基本参数
绑定的表单字段
表单描述⽂文本
插槽拓拓展组件
按钮组
第3集 通⽤用表格组件封装及思路路讲解
表格基本参数分析
data： 传⼊入的数据列列表
prop： 传⼊入的数据字段
label： 列列名
表格可选参数分析
width：列列宽
type：类型
表格扩展
分⻚页参数
total： 数据条数总计
page： 当前⻚页数
加载状态
loading：布尔值
第4集 完成表格组件的封装
调整表格样式，固定表格⾼高度
添加操作列列
添加分⻚页组件
<el-table-column label="操作" min-width="180">
<template slot-scope="scope">
<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删
除</el-button>
</template>
</el-table-column>
<el-pagination
class="pager" layout="prev, pager, next"
:total="config.total" :current-page.sync="config.page"
@current-change="changePage">
</el-pagination>
第5集 ⽤用户管理理⻚页⻚页⾯面功能实现(上)
表格加载状态
分⻚页功能
编辑功能
删除功能
第6集 ⽤用户管理理⻚页⻚页⾯面功能实现(下)
表格加载状态
elementUI中v-loading 的使⽤用
分⻚页功能
编辑功能
删除功能
第7集 企业开发之权限管理理思路路讲解
什什么是权限管理理
根据不不同⽤用户，返回不不同菜单
严格控制⽤用户权限
实现思路路
动态路路由
后端返回的数据格式要求
触发时机
登陆成功的时候触发操作
Cookie中存在对应数据，⾸首次进⼊入⻚页⾯面时
第8集 权限管理理之动态返回菜单的实现
更更改路路由表
根据是否需要权限的路路由分类
vuex⾥里里补充mutation
保存菜单
动态添加菜单
⽣生成路路由的时机
登录时
刷新时
点击退出时，清除cookie后，刷新下⻚页⾯面
第9集 权限管理理之路路由守卫判断⽤用户登录状态
permission.js 中返回token
登录时保存token
保存在vuex⾥里里
保存在cookie⾥里里
路路由守卫根据判断token存不不存在，判断⽤用户⻚页⾯面跳转
愿景："让编程不不在难学，让技术与⽣生活更更加有趣" 更更多课程请访问xdclass.net
第⼋八章 项⽬目总结
第1集 ⼩小滴后台管理理系统项⽬目总结
项⽬目当中遇到的坑以及解决思路路
// 判断⽤用户登录状态，未登录跳转到登录⻚页，已登录跳转到⾸首⻚页
router.beforeEach((to, from, next) => {
// 从cookie⾥里里获取token，防⽌止刷新后token丢失
store.commit('getToken')
let token = store.state.user.token
if (!token && to.name !== 'login') {
next({ name: 'login' })
} else {
next()
}
})
通过vue-devtool调试
通过console输出调试
组件的封装思路路
判断的基本参数
哪些写死
哪些是传进来
拓拓展
⾃自定义事件，判断传出哪些参数
插槽扩展
优化
提⾼高他的适应性
vif，velse根据⽗父组件传⼊入的条件来⽣生成对应的模板
学习⼀一个新技术
EChart
⼤大局观，直接看快速教程
分成⼏几部分，在对应部分查找⽂文档