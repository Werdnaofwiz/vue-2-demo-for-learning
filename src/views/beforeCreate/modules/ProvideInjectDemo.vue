<template>
  <div>
    <h2>4. 在“依赖注入”中充当“中间商”</h2>
    <Form @submit="onSubmit" @reset="onReset">
      <FormItem label="用户名：" v-model="username" :required="true" />
      <FormItem label="密码：" v-model="password" :required="true" />
    </Form>
  </div>
</template>

<script>
import Form from "./modules/FormComponent.vue";
import FormItem from "./modules/FormItem.vue";

export default {
  components: { Form, FormItem },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      alert(
        "提交：" +
          JSON.stringify({ username: this.username, password: this.password }),
      );
    },
    onReset() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>
