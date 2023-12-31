// 获取 range
export const getDomRange = () => {
  const selection = window.getSelection();

  if (selection.isCollapsed) {
    console.error('no text selected');
    return null;
  }

  return selection.getRangeAt(0);
};

// 清空 range
export const removeSelection = () => {
  window.getSelection().removeAllRanges();
};