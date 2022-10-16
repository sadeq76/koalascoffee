<template>
  <BaseModal :fullscreen="true" :persistent="true">
    <button
      @click="closeModal"
      :class="[profile['dialog-close'], 'primary-color icon']"
    >
      <span class="icon-angle-down pointer" />
    </button>
    <div class="full-width full-height d-flex flex-column align-center">
      <div :class="[profile.avatar, 'primary mb-4 rounded-circle']">
        <img src="" alt="" />
      </div>
      <p class="mb-2 font-size-8 bold primary-color">سید صادق شاهمرادی</p>
      <p class="mb-4 font-size-6 dark-color">sadeqshahmoradi76@gmail.com</p>
      <div class="full-width d-flex flex-column align-start justify-start">
        <h2 class="mb-4 primary-color">لیست ها</h2>
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="goTo(item.path)"
          class="pointer shadow rounded-sm full-width d-flex pa-2 mb-4"
        >
          <div
            :class="[
              profile.icon,
              'ml-2 primary secondary-color rounded-circle d-flex justify-center align-center',
            ]"
          >
            {{ item.icon }}
          </div>
          <h3 class="primary-color d-flex align-center">{{ item.title }}</h3>
          <div class="grow-1 d-flex justify-end align-center">
            <span class="icon-angle-left" />
          </div>
        </div>
      </div>
      <div
        @click="logout"
        class="grow-1 full-width d-flex justify-end align-end"
      >
        exit
      </div>
    </div>
  </BaseModal>
</template>

<script>
import { mapActions, mapState } from "pinia";
import BaseModal from "./popup/BaseModal.vue";
import { useGlobalVariable } from "@/store";

export default {
  components: { BaseModal },
  data() {
    return {
      list: [
        { icon: "A", title: "آدرس های شما", path: "/addresses" },
        { icon: "B", title: "سفارشات شما", path: "/orders" },
      ],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["isLoggedIn"]),
    icon() {
      return this.fullscreen ? "angle-down" : "xmark";
    },
  },
  methods: {
    ...mapActions(useGlobalVariable, ["toggleModal"]),
    closeModal() {
      this.$emit("close");
    },
    goTo(path) {
      this.$router.push(path);
      this.closeModal();
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
};
</script>

<style lang="scss" module="profile">
.avatar {
  width: 100px;
  height: 100px;
  border: 5px solid $primary-color;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}
.icon {
  width: 50px;
  height: 50px;
}
.dialog-close {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>
