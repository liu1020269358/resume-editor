const dict = {
  'profile': '个人简介',
  'workHistory': '工作经历',
  'education': '教育经历',
  'projects': '项目经历',
  'awards': '获得奖项',
  'contacts': '联系方式',
  'city': '城市',
  'title': '头衔',
  'birthday': '生日',
  'company': '公司',
  'details': '详情',
  'school': '院校',
  'name': '名字',
  'contact': '联系方式'
// { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday']},
// { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'details']},
// { field: 'education', icon: 'book', type: 'array', keys: ['school', 'details']},
// { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'details']},
// { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'details']},
// { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact']},
}

export default function (en) {
  return dict[en] || 'undefined'
}
