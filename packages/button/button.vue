<template lang="html">
  <input 
    class="jtd-button" 
    type="button" 
    :name="name" 
    :value="value"
    @click="buttonClick"
    @mouseenter="buttonEnter"/>
</template>

<script>
export default {
  name: 'JtdButton',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: String,
      default: '按钮'
    },
    name: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    buttonClick (ev) {
      this.$emit('click', 1)
    },
    buttonEnter (ev) {
      this.$emit('enter', 1)
    }
  }
}
</script>

