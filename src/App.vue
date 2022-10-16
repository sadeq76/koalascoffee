<template>
  <TheNavbar @open="toggleModal" />
  <div :class="['main', { 'px-4': !screenSize.smAndDown }]">
    <RouterView />
  </div>
  <TheLogin v-if="isOpen && !isLoggedIn" @close="toggleModal" />
  <TheProfileModal v-if="isOpen && isLoggedIn" @close="toggleModal" />
</template>

<script>
import TheNavbar from "./layout/TheNavbar.vue";
import TheLogin from "./components/TheLogin.vue";
import TheProfileModal from "./components/TheProfileModal.vue";
import { useGlobalVariable, useShoppingCart } from "@/store/index";
import { mapState, mapWritableState } from "pinia";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheLogin,
    TheProfileModal,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize", "isLoggedIn"]),
    ...mapWritableState(useShoppingCart, ["products"]),
  },
  methods: {
    toggleModal() {
      if (this.screenSize.smAndDown || !this.isLoggedIn) {
        this.isOpen = !this.isOpen;
      } else {
        this.$router.push("profile");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      this.products = JSON.parse(localStorage.getItem("cart"));
    }
  },
};
</script>

<style lang="scss">
body {
  background-color: $light-color;
}
#app {
  width: 100%;
  display: flex;
  justify-content: center;
}
.main {
  margin-top: 56px;
  height: calc(100% - 56px);
  width: 100%;
  max-width: 1400px;
}
</style>
