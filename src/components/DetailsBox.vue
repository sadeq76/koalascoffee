<template>
  <div @click="toggleDetails" class="full-width pa-4">
    <div class="d-flex justify-space-between">
      <h2>
        <slot name="header"></slot>
      </h2>
      <div ref="icon" :class="details.icon">
        <span class="icon-angle-down" />
      </div>
    </div>
    <transition enter-active-class="fade-down" leave-active-class="fade-up">
      <div v-show="isVisible" class="mt-2">
        <slot name="details"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleDetails() {
      this.isVisible = !this.isVisible;
      this.$refs.icon.style.transform = `rotate(${
        this.isVisible ? "180deg" : "0deg"
      })`;
    },
  },
};
</script>

<style lang="scss" module="details">
.icon {
  transition: all 0.5s;
  transform-origin: center;
}
</style>
