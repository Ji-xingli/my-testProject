<template>
  <div>
    <!-- 自定义组件的双绑 v-model语法糖  :value   @input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false, //控制组件根元素上，是否允许添加父级组件，在子组件上定义的特性；
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 值发生变化-触发校验
      this.$parent.$emit("validate");

    }
  }
};
</script>

<style lang="scss" scoped>
</style>