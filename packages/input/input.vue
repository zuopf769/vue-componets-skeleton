<template lang="html">
  <input type="text" name="input" :value="value">
</template>

<script>
export default {
  name: 'JtdInput',
  props: ['value'],
  data () {
    return{
      inputValue: '输入框组件测试按需引入'
    }
  }
}
</script>