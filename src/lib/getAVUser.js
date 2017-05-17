import AV from '../lib/leancloud'
export default function(){
  // AV.User.current()返回的是一个对象，里面有很多属性，利用解构赋值将id和username取出并返回
  var {id, attributes:{username}} = AV.User.current() || {attributes:{}}
  return {
    id: id || '',
    username: username || ''
  }
}
