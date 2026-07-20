// mixinA.js
export const mixinA = {
  data() {
    return {
      name: "A",
      age: 18,
      hobby: "coding",
    };
  },
  methods: {
    show() {
      console.log("mixinA show");
    },
    hello() {
      console.log("Hello from A");
    },
  },
  computed: {
    desc() {
      return "desc from A";
    },
  },
  watch: {
    name(newVal) {
      console.log("watch A:", newVal);
    },
  },
  mounted() {
    console.log("mixinA mounted");
  },
};

// mixinB.js
export const mixinB = {
  data() {
    return {
      name: "B", // 和 mixinA 冲突
      score: 100, // 新增
      hobby: "reading", // 和 mixinA 冲突
    };
  },
  methods: {
    show() {
      console.log("mixinB show");
    }, // 和 mixinA 冲突
    world() {
      console.log("Hello from B");
    },
  },
  computed: {
    desc() {
      return "desc from B";
    }, // 和 mixinA 冲突
  },
  watch: {
    name(newVal) {
      console.log("watch B:", newVal);
    },
  },
  mounted() {
    console.log("mixinB mounted");
  },
};
