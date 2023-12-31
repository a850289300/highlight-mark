/**
 * 事件类
 */
export default class EventEmitter {
  handlers = Object.create(null);
  on(type, fn) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(fn)
  }
  emit(type) {

  }
}
