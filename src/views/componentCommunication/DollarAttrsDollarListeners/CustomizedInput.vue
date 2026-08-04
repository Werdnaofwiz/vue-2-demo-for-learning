<template>
  <div>
    <input v-bind="$attrs" v-on="$listeners" class="input-class" />
  </div>
</template>

<script>
export default {
  name: "CustomizedInput",
  props: ["haha"],
  mounted() {
    // 这里会接收到初声明props接收以外的所有的数据
    console.log("this.$attrs: ", this.$attrs);
    // 全部监听
    console.log("this.$listeners: ", this.$listeners);
    // props数据 里面就一个 haha
    console.log("this.$props: ", this.$props);
  },
};
</script>
