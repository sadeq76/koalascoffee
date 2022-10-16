<template>
  <div class="full-width my-4 px-4 primary-color justify-space-between">
    <h2 class="mb-4">سفارشات شما</h2>
    <OrderCard
      v-for="order in orders"
      :key="order.id"
      v-bind="{ ...order }"
      class="mb-4"
    ></OrderCard>
  </div>
</template>

<script>
import OrderCard from "../components/OrderCard.vue";
import { fetchData } from "@/helpers/functions";
export default {
  components: { OrderCard },
  data() {
    return {
      orders: [],
      offset: 0
    };
  },
  methods: {
    getOrders() {
      fetchData({
        url: "/product/order/",
        params: { limit: 4, offset: this.offset },
      })
        .then((result) => {
          this.orders = result;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style lang="scss" module="orders"></style>
