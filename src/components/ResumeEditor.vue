<!--编辑区，实际就是一个tab组件-->
<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="item in resumeConfig"
        :class="{active: item.field === selected}"
        @click = "selected = item.field">
          {{translateToZh(item.field)}}
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resumeConfig" v-show="item.field === selected">
        <!--可扩增的标签页内容和不可扩增的标签页内容要分别处理-->
        <div v-if="item.type === 'active'">
          <h2>{{translateToZh(item.field)}}</h2>
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <button class="button btn-remove btn-small" @click="removeResumeSubfield(item.field, i)">删除</button>
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{translateToZh(key)}} </label>
              <input type="text" :value="value" @input="changeResumeField(resume[item.field][i], key, $event.target.value)">
            </div>
            <hr>
          </div>
          <button class="button" @click="addResumeSubfield(item.field)">新增</button>
        </div>

        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{translateToZh(key)}} </label>
          <input type="text" :value="value" @input="changeResumeField(resume[item.field], key, $event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  import Vue from 'vue'
  import translate from '../lib/translate'

  export default{
    name: 'ResumeEditor',
    computed: {
      //由于使用了Vuex，所以要改变selected的getter和setter
      selected: {
        get(){
          return this.$store.state.selected
        },
        set(value){
          return this.$store.commit('switchTab', value)
        }
      },

      resume(){
        return this.$store.state.resume
      },
      resumeConfig(){
        return this.$store.state.resumeConfig
      },
    },
    methods: {
      changeResumeField(field, subfield, value){
        this.$store.commit('updateResume', {
          field,
          subfield,
          value
        })
      },
      addResumeSubfield(field){
        this.$store.commit('addResumeSubfield', {field})
      },
      removeResumeSubfield(field, index){
        this.$store.commit('removeResumeSubfield', {field, index})
      },
      //将英文翻译成中文的方法
      translateToZh(en){
        return translate(en);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #resumeEditor{
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    >nav{
      width: 80px;
      background-color: black;
      color: white;
      >ol{
        >li{
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          &.active{
            background-color: white;
            color: black;
          }
        }
      }
    }
    > .panels{
      flex-grow: 1;
      > li{
        padding: 24px;
        h2{
          margin-bottom: 24px;
        }
      }
    }
  }
  .resumeField{
    > label{
      display: block;
    }
    input[type=text]{
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0,0,0,25);
      width: 100%;
      height: 40px;
      padding:0 8px;
    }
  }
  hr{
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
  .subitem{
    position: relative;
    .button.btn-remove{
      position: absolute;
      right: 0;
      top: -3px;
    }
  }
</style>
