<template>
  <div :class="[order.container, 'pa-2 white shadow rounded-sm']">
    <div class="d-flex justify-space-between">
      <h3><span> سفارش &nbsp;</span> {{ id }}#</h3>
      <p>{{ date_created }}</p>
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      :class="[order.card, 'pa-2 mb-2 d-flex align-center']"
    >
      <div :class="[order.image, 'pa-2 ml-2 secondary rounded-circle']">
        <img :src="product.image" alt="" />
      </div>
      <div>
        <h4 class="mb-2 regular">{{ product.title }}</h4>
        <p class="bold">{{ product.price }} تومان</p>
      </div>
      <p class="grow-1 text-end bold">×{{ product.qty }}</p>
    </div>
    <hr class="mb-2 full-width" />
    <div class="mb-4 d-flex justify-space-between">
      <p>قیمت نهایی :</p>
      <p class="bold">{{ finalPrice }} <span>تومان</span></p>
    </div>
    <p><span>آدرس :</span>{{ address }}</p>
    <div
      :class="[
        order.status,
        colors,
        'full-width rounded-sm text-center pa-2 my-2',
      ]"
    >
      {{ statusTitle }}
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
export default {
  props: {
    id: {},
    date_created: {},
    address: {},
    status: {},
    products: {},
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    finalPrice() {
      let sum = 0;
      this.products?.map((product) => (sum += product.price * product.qty));
      return sum;
    },
    statusTitle() {
      return this.status === "done"
        ? "انجام شده"
        : this.status === "sent"
        ? "ارسال شده"
        : this.status === "preparing"
        ? "در حال آماده سازی"
        : "لغو شده";
    },
    colors() {
      return this.status === "done"
        ? "border-success success-color"
        : this.status === "sent"
        ? "border-info info-color"
        : this.status === "preparing"
        ? "border-warn warn-color"
        : "border-error error-color";
    },
  },
};
</script>

<style lang="scss" module="order">
.container {
  width: 100%;
  @media (min-width: 750px) {
    width: calc(50% - .5em);
  }
  .image {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }

  .status {
    border: 1px solid;
  }
}
</style>
