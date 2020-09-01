<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm 自定义组件的双绑 v-model语法糖  :value   @input  -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="submit">提交</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";

import create from '@/utils/create';
import Notice from '@/components/Notice.vue';

export default {
  components: {
    ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      model: {
        username: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      // 调用form 的全局校验方法
      this.$refs.loginForm.validate(isValid=>{
        create(Notice,{
          title:"提示",
          message:isValid?'杨哥喊你来搬砖':'失败请重试',
          duration:3000
        }).show();
        // console.log(Notice)
        // if(isValid){
        //   console.log("提交")
        // }else{
        //   console.log("校验失败")
        // }
      })
    }
  },
};
</script>

<style scoped>
</style>