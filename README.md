# **print-demo**

网页打印插件示例项目。

## 项目运行
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 关于print.js
功能：网页打印插件，支持打印或不打印指定区域，同时支持将网页导出为pdf。

- 已实现：
  1. 原生js书写，不依赖其他库
  2. 可指定打印（或不打印）的区域
  3. 支持定制css，内联、外联均可
  4. 支持select、input（text、redio、checkbox）、textarea获取参数

- 待验证：
  1. 目前测试谷歌浏览器运行正常，其他低版本浏览器兼容性待验证

## 如何使用
本插件可在 `js` 或 `vue` 项目中使用，其他框架未验证。两种使用场景引入的`js`大同小异。
#### 1、声明打印区域：

可通过设置`class` 类名或 `id `指定打印区域，但由于`vue`项目涉及到打包部署，推荐使用`ref`获取DOM节点，如果使用`id`或`class`获取，打包部署后打印内容可能显示空白。

```
<div class="printDom">指定打印区域</div>

<div id="printDom">指定打印区域</div>

<div ref="printDom">指定打印区域</div>
```

#### 2、调用打印方法：

##### 2.1  js 项目


```
// 引入
<script src="print.js"></script>

// 调用
Print('#printDom',{});
```

##### 2.2  vue 项目

main.js引入，xx.vue页面引用

```
//main.js
import Print from './print';
Vue.use(Print);

// xx.vue
 this.$print(this.$refs.printDom, {});
```

#### 3、声明不打印区域：

`js`和`vue`项目通用

##### 3.1 声明`"no-print"`类名
此时`print`方法中，不需要特意声明，默认会剔除`.no-print`区域
```
<div class="no-print">不打印区域</div>

Print('#printDom');
```

##### 3.2 自定义类名

此时需要在`print`方法中通过`"noPrint"`属性指定不打印区域

```
<div class="no-print-box">自定义不打印区域类名</div>

Print('#printDom',{noPrint:'.no-print-box'});
```
#### 4 参数说明
`js`和`vue`项目通用，以`vue`项目为例。
```
this.$print(this.$refs.printDom, {
     noPrint: '.noPrint',
     onStart: () => {
        console.log('打印开始');
     },
     onEnd: () => {
         onsole.log('打印完成');
     }
});
```

| 参数位置  | 属性          | 说明                           |
| -------- | ------------- | -------------------------------|
| 参数1    | 类名、id、ref声明dom  | 打印区域                 |
|          | noPrint       | 不打印区域，默认'.no-print'     |
| 参数2    | onStart       | 打印前回调函数                   |
|          | onEnd         | 打印后回调函数，确定和取消都会触发|

#### 5、实例项目介绍：

 该项目，示范了普通`js`项目，和`vue`项目中通过调用`print.js`实现打印(或不打印)指定区域。

- 1、普通`js`项目：主页面 `src/printTest.html`，引用 `src/utils/print2.js`
- 2、`vue`项目：主页面 `src/components/index.vue`，引用 `src/utils/print.js`

## TIPS
关于插件如何使用的详细解释，可参照该指南 [guide](https://www.cnblogs.com/lemoncool/p/14210465.html).

同时，欢迎志同道合的小伙伴关注小编公棕号【前端便利贴】，前端加餐，头脑风暴，来了都是客，期待您的光临。

![banner](\src\assets\images\banner.png)
