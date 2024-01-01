import EventEmitter from './event'
import Range from './range'
import { defaultClassName, EventMap, EventType } from './util/const'
import { isHighlight, isExist } from './util/dom'
import { removeSelection } from './util/selection'
/**
 * 渲染类
 * 文本渲染, 划词渲染
 */
 export default class Render extends EventEmitter{
  constructor() {
    super()
  }
  // 初始化
  initRender(options = {}) {
    const { root, text, marks, className, immediate } = options
    this.$root = document.querySelector(root);
    if (!this.$root) {
      throw Error('error: Wrong root element, please correct it');
    }
    this.text = text;
    this.marks = marks;
    this.className = className;
    this.immediate = immediate;
    this.bindEvent()
    this.parsingDataToDom();
  }
  // 解析数据到dom节点
  parsingDataToDom() {
    this.$root.innerHTML = this.text;
  }

  // 绑定事件
  bindEvent() {
    this.$root.addEventListener(EventMap.mouseup, this.selectWords.bind(this))
  }

  // 取消绑定
  destory() {
    this.$root.removeEventListener(EventMap.mouseup, this.selectWords.bind(this))
  }

  // 划词 
  selectWords() {
    const range = new Range(this.$root);
    // 立即标记
    if (this.immediate) {
      this.nodeHighlight(range.getSelectNodes(), range.id)
      removeSelection();
      this.emit(EventType.create, range)
    } else {
      this.emit(EventType.select, range)
    }
  }

  // 高亮划选区域
  nodeHighlight(nodes, id) {
    const className = this.className || defaultClassName
    nodes.forEach((node)=> {
      node = node.node;
      const parentNode = node.parentNode;
      const { previousSibling, nextSibling } = node;
      // 非高亮节点中
      if (!isHighlight(parentNode, className)) {
        const element = document.createElement('span'); // 创建一个元素
        element.className = className;
        element.appendChild(node.cloneNode(false));
        element.setAttribute('data-id', id)
        parentNode.replaceChild(element, node)
      } else if (!isHighlight(parentNode, className) && (isExist(previousSibling) || isExist(nextSibling))) {
        const fr = document.createDocumentFragment(); // 创建一个dom片段
        // 上一个节点存在
        if (previousSibling) {
          const dom = parentNode.cloneNode(false); // 直接复制父节点 就会继承基本信息
          dom.innerText = previousSibling.innerText;
          fr.appendChild(dom)
        }

        const element = document.createElement('span'); // 创建一个元素
        element.className = className;
        element.appendChild(node.cloneNode(false));
        element.setAttribute('data-id', `${id};${parentNode.dataset['id']}`)
        fr.appendChild(element)

        // 下一个节点存在
        if (nextSibling) {
          const dom = parentNode.cloneNode(false); // 直接复制父节点 就会继承基本信息
          dom.innerText = nextSibling.innerText;
          fr.appendChild(dom)
        }
        // 替换整个fr
        parentNode.parentNode.replaceChild(fr, parentNode);
      } else { // 表示占据了整个高亮节点，此时只需要添加个属性就行
        parentNode.setAttribute('data-id', `${id};${parentNode.dataset['id']}`)
      }
    })
  }
}