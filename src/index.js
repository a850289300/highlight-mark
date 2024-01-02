import Highlight from './highlight'
let highlight = new Highlight({
  root: '.text',
  text: '张三喜欢吃屎',
  data: [],
  immediate: true
})
highlight.on('select', (range)=> {
  console.log('选择一个新的选取', range)
})
highlight.on('create', (range)=> {
  console.log('创建一个新的选取', range)
})
highlight.on('error', (error)=> {
  alert('选取重复')
})