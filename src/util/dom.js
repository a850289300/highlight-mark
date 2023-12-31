// 判断是否在划选节点
export const isHighlight = function (node, className) {
  return node.classList.contains(className)
}
// 判断节点是否存在，或者是否有意义 存在且有文本
export const isExist = function (node) {
  return node && node.textContent
}