<template>
  <section :class="[categories.container, { 'mx-4': screenSize.smAndDown }]">
    <slot> </slot>
  </section>
</template>

<script>
import { useGlobalVariable } from "@/store";
import { mapState } from "pinia";

export default {
  props: {},
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
};
</script>

<style lang="scss" module="categories">
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(8, 1fr);
  gap: 1rem;
  height: 200%;

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
    height: 100%;
  }
}
</style>
