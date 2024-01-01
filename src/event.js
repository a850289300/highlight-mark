/**
 * 事件类
 */
export default class EventEmitter {
  handlers = Object.create(null);
  // 事件绑定
  on(type, fn) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(fn)
  }
  // 事件触发
  emit(...arg) {
    const type = arg.shift();
    const handlers = this.handlers[type] || [];
    handlers.forEach((fn)=> {
      fn(...arg)
    })
  }
  // 事件销毁 
  destory(type, fn) {
    const handler = this.handlers[type] || []
    if (fn) {
      handler.splice(handlers.indexOf(handler) >>> 0, 1)
    } else {
      handler = [];
    }
  }
}
