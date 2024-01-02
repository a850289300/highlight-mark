import { getDomRange } from './util/selection'
import { defaultClassName } from './util/const'
/**
 * range 类
 * startContainer 开始节点
 * startOffset 起始偏移量
 * endContainer 结束节点
 * endOffset 结束偏移量
 */
export default class Range {
  $root = null;
  className = defaultClassName;
  range = null;
  nodes = [];
  id = new Date().getTime()
  constructor(root, className) {
    // 根节点
    this.$root = root;
    if (!this.$root) {
      throw Error('error: Wrong root element, please correct it');
    }
    if (className) this.className = className;
    this.parseRange(getDomRange())
  }

  /**
   * 解析range
   * @param {*} range 
   */
  parseRange (range) {
    if (range) {
      let { startContainer, endContainer, startOffset, endOffset } = range;
      this.startContainer = startContainer;
      this.endContainer = endContainer;
      this.startOffset = startOffset;
      this.endOffset = endOffset;
      this.range = range;
    }
  }

  /**
   * 判断划选的range是否符合规则
   */
  checkRange() {
    const range = this.range;
    if (!range) {
      return;
    }
    const commonAncestorContainer = range.commonAncestorContainer; // 共同的父节点
    // 找到错误节点
    const error = [...commonAncestorContainer.childNodes].find((node) => {
      // 如果是文本节点就找父级
      if (node.nodeType === 3) {
        node = node.parentNode;
      }
      if (node.classList.contains(this.className)) {
        return true
      }
      return false;
    })
    if (error) {
      return {
        type: 'repeat',
        error
      }
    }
  }

  /**
   * 获取所有选择的区域
   */
  getSelectNodes () {
    const nodes = [];
    const range = this.range;
    if (!range) {
      return nodes;
    }
    // 获取基本信息
    let { startContainer, endContainer, startOffset, endOffset, commonAncestorContainer } = range;
    // 如果开始结束节点相同
    if (startContainer === endContainer && startContainer instanceof Text) {
      // 根据 startOffset 分割文本节点, 此时整个文本节点分为2块
      startContainer.splitText(startOffset);
      // 取下一个节点
      const targetNode = startContainer.nextSibling; // 找到划选的文本
      // 此时再根据 endOffset 继续分割文本节点, 由于 endOffset是相对于整个文本节点，所以需要减去 startOffset
      targetNode.splitText(endOffset - startOffset);
      nodes.push({ node: targetNode })
    } else { // 说明跨节点
      // 这里如果用 cloneContents 部分节点的父级会是 document-fragment
      const container = commonAncestorContainer; // 找到共同的父级
      let childNodes = container.childNodes; // 所有的子元素
      let inSelectRange = false;
      // 如果这里使用 commonAncestorContainer, 也就共同的父级, 这里对dom进行操作时, 会影响for循环, 所以这里不能使用for循环
      // 所以需要对childNodes处理
      const nodeMap = [];
      for (let i = 0; i < childNodes.length; i++) {
        nodeMap.push(childNodes[i])
      }
      for (let i = 0; i < nodeMap.length; i++) {
        let dom = nodeMap[i];
        // 由于开始结束节点都是文本节点，但是我们在找的时候，可能会找其父级，所以要判断相等，或者父节点与当前dom相等
        // 说明是开始节点
        if (dom === startContainer || dom === startContainer.parentNode) {
          startContainer.splitText(startOffset);
          const targetNode = startContainer.nextSibling; // 划选文本
          nodes.push({ node: targetNode });
          inSelectRange = true;
        } else if (dom === endContainer || dom === endContainer.parentNode) {
          endContainer.splitText(endOffset);
          nodes.push({ node: endContainer });
          inSelectRange = false;
        } else if (inSelectRange) { // 说明是中间节点
          const nodeType = dom.nodeType;
          // 文本节点直接添加
          if (nodeType === 3) {
            nodes.push({ node: dom });
            // 元素节点
          } else if (nodeType === 1) {
            // 是划选的区域我们只收集其子元素,并将其子元素变为纯文本节点
            if (dom.classList.contains(this.className)) {
              dom.innerHTML = dom.innerText;
              nodes.push({ node: dom.childNodes[0] });
            // 如果不是划选的区域，我们将其强制转化为纯文本节点
            } else {
              const textNode = document.createTextNode(dom.innerText);
              const parentNode = dom.parentNode;
              parentNode.insertBefore(textNode, dom)
              parentNode.removeChild(dom);
              nodes.push({ node: textNode });
            }
          }
        }
      }
    }
    return nodes
  }
}