<template>
  <BaseModal :fullscreen="screenSize.smAndDown" width="25%" :persistent="true">
    <button
      @click="closeModal"
      :class="[address['dialog-close'], 'primary-color icon']"
    >
      <span :class="`icon-${icon}`" />
    </button>
    <h3 class="mb-4">افزودن آدرس</h3>
    <BaseInput
      type="text"
      name="title"
      label="عنوان"
      autocomplete="off"
      class="full-width"
      color="primary"
      :rules="titleRule"
      v-model="title"
    />
    <textarea
      class="full-width pa-2 rounded-sm mb-4"
      aria-label="message"
      placeholder="متن آدرس خود را وارد کنید ..."
      v-model="address"
    ></textarea>
    <BaseInput
      type="number"
      name="zip_code"
      label="کدپستی"
      autocomplete="off"
      class="full-width"
      color="primary"
      :rules="zipCodeRule"
      v-model="zip_code"
    />
    <button
      @click="add"
      class="primary secondary-color rounded-sm full-width text-center"
    >
      ثبت
    </button>
  </BaseModal>
</template>

<script>
import BaseModal from "./popup/BaseModal.vue";
import BaseInput from "./BaseInput.vue";
import { fetchData } from "@/helpers/functions";
import { mapState, mapWritableState } from "pinia";
import { useGlobalVariable, useShoppingCart } from "@/store";
export default {
  components: { BaseModal, BaseInput },
  data() {
    return {
      center: { lat: this.latitude, lng: this.longitude },
      title: "",
      latitude: "35.658750",
      longitude: "51.352987",
      address: "",
      zip_code: "",
      titleRule: [
        {
          validation: (value) => !!value || "عنوان الزامیست",
          type: "error",
        },
      ],
      zipCodeRule: [
        {
          validation: (value) => !!value || "کد پستی الزامیست",
          type: "error",
        },
      ],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    ...mapWritableState(useShoppingCart, ["addresses"]),
    icon() {
      return this.screenSize.smAndDown ? "angle-down" : "xmark";
    },
  },
  methods: {
    add() {
      if (this.title && this.address && this.zip_code) {
        const body = new FormData();
        body.append("title", this.title);
        body.append("latitude", this.latitude);
        body.append("longitude", this.longitude);
        body.append("address", this.address);
        body.append("zip_code", this.zip_code);

        fetchData({ url: "/user/address/", method: "POST", body })
          .then((result) => {
            this.addresses.push(result);
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" module="address">
.dialog-close {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>
