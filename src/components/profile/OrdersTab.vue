<template>
  <h3 class="mb-4 primary-color">لیست سفارشات</h3>
  <div class="d-flex flex-wrap justify-space-between">
    <OrderCard
      v-for="order in orders"
      :key="order.id"
      v-bind="{ ...order }"
      class="mb-4"
    ></OrderCard>
  </div>
</template>

<script>
import OrderCard from "../OrderCard.vue";
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

<style lang="scss" module="ordersTab"></style>
