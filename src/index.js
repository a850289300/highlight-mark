import Highlight from './highlight'
let highlight = new Highlight({
  root: '.text',
  text: '张三喜欢吃屎',
  data: [],
  immediate: true
})
highlight.on('select', ()=> {
  console.log(11111)
})