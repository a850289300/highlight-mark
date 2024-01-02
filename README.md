## 初步设计：
初步设定 Highlight、Render、EventEmitter、其它工具类（如 selection等）

### Highlight: 主类
 接受参数如下
 * edit 文本是否允许编辑 默认 true
 * repeat 是否允许重复划选 默认 true
 * className 高亮元素的类名可自定义 默认 highlight-mark-text
 * immediate 是否划选后立即高亮 默认 false
 * text 初始的文本
 * data 标记的数据
 * root 根节点

### Render: dom操作

### EventEmitter 事件注册
 * on事件注册 
 * emit 事件触发 
 * destory 事件销毁

### Range：记录当前的range区域
 * 开始节点
 * 结束节点
 * 唯一id等

其它类，如工具类等

### 2023/12/31

初步完成 range类 getSelectNodes（获取所有待高亮节点）
初步完成 render类的高亮渲染

### 2024/1/1

完善 EventEmitter 类, 提供 on，emit, destory方法

待完善：

* 考虑到 immediate 参数。用户可以在划选后，该以什么形式触发
* 完善 repeat 功能
* 完善 edit 功能

### 2024/1/2

完善 repeat 功能、 完善 edit功能

待完善：

* 考虑到 immediate 参数。用户可以在划选后，该以什么形式触发
