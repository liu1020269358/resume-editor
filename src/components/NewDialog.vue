<template>
  <div class="dialogWrapper" v-show="visible">
    <div class="dialog">
      <header>
        {{title}}
        <!--点击触发close事件，该事件在父组件Topbar里被定义-->
        <span class="close" @click="close">X</span>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Dialog',
    props: ['title', 'visible'],
    methods: {
        close(){
            this.$emit('close')
        }
    }
  }
</script>

<style scoped lang="scss">
  .dialogWrapper{
    position: fixed;
    background: hsla(0, 0%,0%,0.25);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
  .dialog{
    background: white;
    min-height: 4em;
    min-width: 10em;
      > header{
        padding: 16px;
        display: flex;
        justify-content: space-between;
          > span{
            cursor: pointer;
          }
      }
      > main{
        padding: 16px;
      }
  }
</style>
