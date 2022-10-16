<template>
  <div
    :class="{
      'ma-4': screenSize.smAndDown,
    }"
  >
    <h2 class="mb-4">محصولات</h2>
    <div class="d-flex flex-wrap">
      <ProductsCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :price="product.price"
        :title="product.title"
        @click="productPage(product.id)"
        class="mb-4 card"
      />
    </div>
  </div>
  <DefaultFooter> </DefaultFooter>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
import { fetchData } from "../helpers/functions.js";
import ProductsCard from "@/components/ProductsCard.vue";
import DefaultFooter from "@/components/DefaultFooter.vue";
export default {
  components: { ProductsCard, DefaultFooter },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
  methods: {
    productPage(id) {
      this.$router.push({ name: "product", params: { id } });
    },
    getProducts() {
      fetchData({
        url: "/product/",
        params: { limit: 4, offset: 0, category: this.$route.params.category },
      })
        .then((result) => {
          this.products = result.result;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
