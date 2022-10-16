<template>
  <h3 class="mb-4 primary-color">اطلاعات شخصی</h3>
  <div class="mb-8 full-width d-flex justify-center">
    <div :class="[editProfile.avatar, 'primary ml-4 rounded-circle']">
      <img src="" alt="" />
    </div>
  </div>
  <form action="submit" class="d-flex flex-wrap">
    <BaseInput
      :class="[editProfile.input, 'rounded-sm ml-4 mb-4']"
      type="text"
      required="true"
      name="fullname"
      id="fullname"
      autocomplete="off"
      placeholder="نام کامل"
      v-model="fullName"
      color="primary"
    />
    <BaseInput
      :class="[editProfile.input, 'rounded-sm ml-4 mb-4']"
      type="text"
      required="true"
      name="fullname"
      id="fullname"
      autocomplete="off"
      placeholder="همراه"
      v-model="fullName"
      color="primary"
    />
    <BaseInput
      :class="[editProfile.input, 'rounded-sm ml-4 mb-4']"
      type="text"
      required="true"
      name="fullname"
      id="fullname"
      autocomplete="off"
      placeholder="تولد"
      v-model="fullName"
      color="primary"
    />
    <div class="full-width d-flex justify-end">
      <button class="px-4 primary">ویرایش</button>
    </div>
  </form>
  <hr />
  <div class="full-width mt-4 px-4 primary-color d-flex justify-space-between">
    <h2>آدرس ها شما</h2>
    <div class="pointer bold" @click="toggleModal">افزودن آدرس</div>
  </div>
  <div class="d-flex flex-wrap justify-space-between mt-4 px-4">
    <AddressCard
      v-for="address in addresses"
      :key="address.id"
      v-bind="{ ...address }"
      class="mb-4"
    ></AddressCard>
  </div>
  <AddAddressModal v-if="isOpen" @close="toggleModal"></AddAddressModal>
</template>

<script>
import BaseInput from "../BaseInput.vue";
import AddressCard from "../AddressCard.vue";
import AddAddressModal from "../AddAddressModal.vue";
import { mapActions, mapState } from 'pinia';
import { useShoppingCart } from '@/store';
export default {
  components: { BaseInput, AddressCard, AddAddressModal },
  data() {
    return {
      isOpen: false,
    };
  },
  computed:{
    ...mapState(useShoppingCart, ["addresses"]),
  },
  methods: {
    ...mapActions(useShoppingCart, ["getAddresses"]),
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted(){
    this.getAddresses()
  }
};
</script>

<style lang="scss" module="editProfile">
.avatar {
  width: 130px;
  height: 130px;
  border: 5px solid $primary-color;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}
.input {
  width: calc(50% - 1em);
}
</style>
