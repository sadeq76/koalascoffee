<template>
  <div :class="[layout.container, { [layout['nav-bg']]: scrollPos }]">
    <div :class="layout.navbar">
      <img
        @click="goToRoot"
        :class="[layout['navbar-logo'], 'pointer']"
        src="../assets/logo.png"
        alt="koalasLogo"
      />
      <ul v-if="!screenSize.smAndDown" :class="layout['navbar-links']">
        <li v-for="link in links" :key="link">
          <RouterLink class="font-size-6" :to="link.path">{{
            link.title
          }}</RouterLink>
        </li>
      </ul>
      <div :class="layout['navbar-btns']">
        <button
          v-if="!screenSize.smAndDown"
          @click="openModal"
          class="primary secondary-color rounded-sm pa-2 px-4 ml-4"
        >
          ورود
        </button>
        <button v-else @click="openModal" class="ml-4">
          <span class="icon-user"></span>
        </button>

        <button
          v-if="screenSize.smAndDown"
          @click="openMenu"
          class="pa-0 ma-0 icon"
        >
          <span class="icon-bars"></span>
        </button>
        <button v-else @click="goToCart" class="pa-0 ma-0 icon"><span class="icon-basket"></span></button>
      </div>
    </div>
    <transition enter-active-class="move-in" leave-active-class="move-out">
      <TheMenu
        v-bind="{ links, isOpen }"
        @closeMenu="closeMenu"
        @openModal="openModal"
      />
    </transition>
  </div>
</template>

<script>
import { useGlobalVariable } from "@/store/index";
import { mapState } from "pinia";

//components
import TheMenu from "../components/NavbarMenu.vue";

export default {
  components: { TheMenu },
  data() {
    return {
      links: [
        { title: "خانه", path: "/" },
        { title: "محصولات", path: "/shop" },
        { title: "بلاگ ها", path: "/blogs" },
        { title: "پشتیبانی", path: "/support" },
      ],
      scrollPos: 0,
      isOpen: false,
    };
  },

  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },

  methods: {
    openModal() {
      this.$emit("open");
    },
    goToRoot() {
      window.open(window.location.origin, "_self");
    },

    updateScrollPosition() {
      this.scrollPos = document.documentElement.scrollTop;
    },

    openMenu() {
      this.isOpen = true;
      document.body.style.overflow = "hidden";
    },

    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = "visible";
    },

    goToCart() {
      this.$router.push("/cart");
    },
  },

  //lifecycles
  created() {
    window.addEventListener("scroll", this.updateScrollPosition);
  },
  unmounted() {
    window.removeEventListener("scroll", this.updateScrollPosition);
  },
};
</script>

<style lang="scss" module="layout">
.nav-bg {
  background-color: white;
  box-shadow: $shadow;
}

.container {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;
    max-width: 1400px;

    padding-right: 1em;
    padding-left: 1em;

    .navbar-logo {
      height: 80%;
    }

    .navbar-links {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        margin-left: 2em;
        font-size: 1rem;

        a {
          color: $primary-color;
        }
      }
      li:last-child {
        margin-left: 0;
      }
    }

    .navbar-btns {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
