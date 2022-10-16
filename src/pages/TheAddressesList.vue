<template>
  <div class="full-width mt-4 px-4 primary-color d-flex justify-space-between">
    <h2>آدرس ها شما</h2>
    <div @click="toggleModal">plus</div>
  </div>
  <div class="mt-4 px-4">
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
import AddressCard from "../components/AddressCard.vue";
import AddAddressModal from "../components/AddAddressModal.vue";
import { mapActions, mapState } from "pinia";
import { useShoppingCart } from "@/store";
export default {
  components: { AddressCard, AddAddressModal },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(useShoppingCart, ["addresses"]),
  },
  methods: {
    ...mapActions(useShoppingCart,['getAddresses']),
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted(){
    this.getAddresses()
  }
};
</script>

<style lang="scss" module="addresses"></style>
