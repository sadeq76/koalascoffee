<template>
  <div v-if="isOpen" :class="[menu.container, 'primary secondary-color']">
    <button @click="closeMenu" :class="[menu.close, 'secondary-color icon']">
      <span class="icon-close secondary-color"></span>
    </button>
    <ul>
      <li v-for="link in links" :key="link" class="my-8">
        <RouterLink :to="link.path" @click="closeMenu">{{
          link.title
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    links: {
      type: Array,
      required: true,
    },
  },
  emits: ["closeMenu"],
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    openLoginModal() {
      this.closeMenu();
      this.$emit("openLogin");
    },
  },
};
</script>

<style lang="scss" module="menu">
.container {
  position: fixed;
  z-index: 3;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .close {
    position: absolute;
    left: 1rem;
    top: 1rem;
  }

  li {
    text-align: center;

    a {
      color: $secondary-color;
    }
  }
}
</style>
