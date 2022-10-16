<template>
  <div v-if="screenSize.smAndDown" class="green-rect primary"></div>

  <LandingHeader />

  <div
    :class="{
      'ma-4': screenSize.smAndDown,
    }"
  >
    <div class="primary-color mt-4 d-flex justify-space-between">
      <h2>محصولات</h2>
      <button class="icon primary-color">
        <span @click="goTocat" class="ml-2 font-size-8">{{
          !screenSize.smAndDown ? "مشاهده همه محصولات" : "بیشتر"
        }}</span>
        <span class="icon-angle-left pointer" />
      </button>
    </div>
    <ul class="d-flex overflow-scroll hide-scroll my-4">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="pointer ml-4 no-wrap font-size-8"
        :class="[{ active: selectedCategory == category.value }]"
        @click="selectCategory(category.value)"
      >
        {{ category.title }}
      </li>
    </ul>
    <div class="d-flex flex-wrap">
      <ProductsCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :price="product.price"
        :title="product.title"
        class="mb-4"
      />
    </div>
  </div>

  <img
    :class="[{ 'my-8': !screenSize.smAndDown }, 'banner my-4']"
    src="@/assets/banner.png"
    alt="adBanner"
  />

  <div
    :class="{
      'ma-4': screenSize.smAndDown,
    }"
  >
    <div class="primary-color mt-4 d-flex justify-space-between">
      <h2>بلاگ ها</h2>
      <button class="icon primary-color">
        <span @click="goTocat" class="ml-2 font-size-12">{{
          screenSize.mdAndUp ? "مشاهده همه بلاگ ها" : "بیشتر"
        }}</span>
        <span class="icon-angle-left" />
      </button>
    </div>
    <div v-if="screenSize.mdAndUp" class="blogs mt-4">
      <BlogCard
        v-for="blog in blogs"
        :key="blog.id"
        :id="blog.id"
        :image="blog.image"
        :title="blog.title"
        :description="blog.description"
      />
    </div>
    <div class="mt-4" v-else>
      <ImagesCarousel :items="blogs" />
    </div>
  </div>

  <div :class="['my-4', { 'mx-4': screenSize.smAndDown }]">
    <DefaultFooter />
  </div>
</template>

<script>
import { useGlobalVariable, useShoppingCart } from "@/store/index";
import { fetchData } from "@/helpers/functions";
//components
import ProductsCard from "@/components/ProductsCard.vue";
import BlogCard from "@/components/BlogCard.vue";
import DefaultFooter from "@/components/DefaultFooter.vue";
import LandingHeader from "@/components/LandingHeader.vue";
import { mapState } from "pinia";
import ImagesCarousel from "@/components/ImagesCarousel.vue";

export default {
  components: {
    ProductsCard,
    BlogCard,
    DefaultFooter,
    LandingHeader,
    ImagesCarousel,
  },
  data() {
    return {
      counters: {},
      products: [],
      blogs: [],
      selectedCategory: "bean",
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    ...mapState(useShoppingCart, ["categories"]),
  },
  methods: {
    goTocat() {
      this.$router.push("/shop");
    },
    selectCategory(value) {
      this.selectedCategory = value;
      this.getProducts();
    },
    getProducts() {
      fetchData({
        url: "/product/",
        params: { limit: 4, offset: 0, category: this.selectedCategory },
      })
        .then((result) => {
          this.products = result.result;
        })
        .catch((error) => console.log(error));
    },
    getBlogs() {
      fetchData({ url: "/blog/", params: { limit: 4, offset: 0 } })
        .then((result) => {
          this.blogs = result.result;
        })
        .catch((error) => console.log(error));
    },
  },
  async mounted() {
    this.getProducts();
    this.getBlogs();
  },
};
</script>

<style lang="scss" scoped>
.green-rect {
  position: absolute;
  right: 0;
  top: 0;
  height: 95vw;
  width: 50vw;
  z-index: 0;
}

.active {
  opacity: 50%;
}

.banner {
  aspect-ratio: 4/2;
  width: 100%;
  object-fit: cover;

  @media (min-width: 750px) {
    aspect-ratio: 16/4;
  }
}

.blogs {
  width: 100%;
  height: calc(9 * (min(100vw, 1400px) - 4em / 2) / 16);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
}
</style>
