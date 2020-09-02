<template>
  <div>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <!-- 内容  容器-->
    <slot></slot>
    <!-- 校验 错误信息 -->
    <!-- <p class="error" v-if="error">{{error}}</p> -->
    <!-- 获取值 -->
    <!-- {{form.rules[prop]}}
    {{form.model[prop]}}-->
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  inject: ["form"],
  data() {
    return {
      error: "错误信息"
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      defaulst: ""
    }
  },
  mounted() {
    // 监听valudate事件
    this.$on("validate", () => {
      //执行方法
      this.validate();
    });
  },
  methods: {
    validate() {
      // 真正执行校验
      // async-validator  校验库

      // 1、获取校验规则
      const rules = this.form.rules[this.prop]; //校验规则
      const value = this.form.model[this.prop]; //值
      //   console.log(rules);
      //   console.log(value);

      // 2、构造一个validate实例
      const validator = new Schema({ [this.prop]: rules });
      //   console.log(validator);

      //   3、执行校验---可以得到校验结果Promise
      return validator.validate({ [this.prop]: value }, errors => {
        // console.log(errors);
        //   errors数组存在则有校验错误
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
.error {
  font-size: 16px;
  color: #f00;
}
</style>