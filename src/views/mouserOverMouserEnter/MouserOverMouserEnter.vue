<template>
  <div>
    <MouseoverBad />
    <MouseroverGood />
  </div>
</template>

<script>
import MouseoverBad from "./modules/MouseoverBad.vue";
import MouseroverGood from "./modules/MouseroverGood.vue";

export default {
  name: "MouserOverMouseEnter",
  components: { MouseoverBad, MouseroverGood },
};
</script>
