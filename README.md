# 在线简历编辑器
##介绍
* 一款基于Vue的在线简历编辑器
* 利用Vue双向绑定的特性，实现实时预览
* 使用leancloud作为后台，使用其提供的API来实现登录，注册，保存至后台等功能
* 使用了localStorage实时本地保存
* 使用了Vuex实现状态管理，提升代码的维护性。但这个优点由于本项目比较简单，优势不明显
##组件的结构
```javascript
{
    resume: {
        topbar: {
            dialog: {
                signIn
                signUp
            }
        },
        resumeEditor,
        resumePreview
    }
}
```
