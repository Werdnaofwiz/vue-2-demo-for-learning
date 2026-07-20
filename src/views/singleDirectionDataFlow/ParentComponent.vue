<template>
  <div>
    <h2>父组件</h2>

    <p>已完成：{{ doneCount }} / {{ todos.length }}</p>

    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo"
    />
  </div>
</template>

<script>
import TodoItem from "@/views/singleDirectionDataFlow/ChildComponent.vue";

export default {
  components: {
    TodoItem,
  },

  data() {
    return {
      todos: [
        {
          id: 1,
          content: "学习 Vue",
          done: false,
        },
        {
          id: 2,
          content: "学习单向数据流",
          done: false,
        },
      ],
    };
  },

  computed: {
    doneCount() {
      return this.todos.filter((todo) => todo.done).length;
    },
  },

  methods: {
    toggleTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },
  },
};
</script>
