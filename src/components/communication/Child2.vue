<template>
  <div>
    <h3>child2</h3>
    <button @click="sendToChild1">给child1发送消息</button>
    <button @click="sendMsg">给child1发送消息22222</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendToChild1() {
      // 利用事件总线发送事件
      // this.$bus.$emit('event-from-child2', 'some msg from child2')
      // 利用共同祖辈元素发送事件
      this.$parent.$emit("event-from-child2", "some msg from child2组件2");
    },
    sendMsg() {
      this.$parent.$emit("handleClick", "child2222");
    }
  }
};
</script>

<style scoped>
</style>