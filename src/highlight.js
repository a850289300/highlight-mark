import Render from './render'
import { defaultClassName } from './util/const'
/**
 * 组件用于覆盖几乎所有场景的文本划词高亮标注
 * edit 文本是否允许编辑 默认 true
 * repeat 是否允许重复划选 默认 true
 * className 高亮元素的类名可自定义 默认 highlight-mark-text
 * immediate 是否划选后立即高亮 默认 false
 * text 初始的文本
 * data 标记的数据
 * root 根节点
 */

export default class Highlight extends Render{
  options = {
    edit: true,
    repeat: true,
    className: defaultClassName,
    immediate: false,
    text: '',
    data: []
  }
  constructor (options) {
    super();
    // 参数合并
    this.options = Object.assign(this.options, options);
    // 初始化渲染容器
    this.initRender(this.options)
  }
}