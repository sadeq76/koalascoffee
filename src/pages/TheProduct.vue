<template>
  <div :class="[product.container, 'full-height d-flex flex-column']">
    <section :class="['full-width grow-1 overflow-scroll']">
      <ProductHeader :details="product.details" />
      <div class="grow-1">
        <DetailsBox v-for="(detail, index) in product.details" :key="index">
          <template #header>
            {{ detail.title }}
          </template>
          <template #details>
            <div v-html="detail.description"></div>
          </template>
        </DetailsBox>
      </div>
    </section>
    <div
      v-if="screenSize.smAndDown"
      :class="[
        product['action-bar'],
        'full-width pa-4 d-flex justify-space-between align-center',
      ]"
    >
      <div>
        <h2 class="regular">قیمت نهایی:</h2>
        <span
          :class="[product['total-price'], 'primary-color font-size-12 bold']"
        >
          {{ totalPrice }}</span
        >
      </div>
      <div class="d-flex align-center">
        <button class="secondary primary-color rounded-circle px-4 ml-2">
          <span class="icon-like" />
        </button>
        <button class="primary secondary-color px-4 rounded-pill">
          افزودن به سبد
          <span icon="icon-plus mr-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import DetailsBox from "../components/DetailsBox.vue";
import { useGlobalVariable } from "@/store";
import ProductHeader from "@/components/ProductHeader.vue";
export default {
  provide() {
    return {
      images: this.product.images,
    };
  },
  data() {
    return {
      product: {
        images: [
          { src: "/data/images/bag.png", caption: "" },
          { src: "/data/images/cup.png", caption: "" },
          { src: "/data/images/gift.jpg", caption: "" },
        ],
        details: [
          {
            title: "1221",
            description:
              "asdasdsdasdds asdasdasa adsdasd asd asdsd adsdasdsadadsdadas adsafsadk sk ",
          },
          {
            title: "12144",
            description:
              "asdasdsdasdds asdasdasa adsdasd asd asdsd adsdasdsadadsdadas adsafsadk sk ",
          },
          {
            title: "12312388",
            description:
              "asdasdsdasdds asdasdasa adsdasd asd asdsd adsdasdsadadsdadas adsafsadk sk ",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    totalPrice() {
      return 500000 + " تومان";
    },
  },
  components: { DetailsBox, ProductHeader },
};
</script>

<style lang="scss" module="product">
.container {
  .section {
    width: 100%;
    @media (min-width: 750px) {
      width: 50%;
    }
  }
  .image {
    width: 100%;
    overflow: hidden;
    object-fit: contain;
  }
  .action-bar {
    background-color: white;
    box-shadow: $shadow;
  }
}
</style>
