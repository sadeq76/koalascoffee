<template>
  <div
    :class="[
      product.container,
      'rounded-sm d-flex flex-column align-center pa-2',
    ]"
  >
    <div
      :class="[
        product.image,
        'rounded-sm d-flex justify-center align-center secondary pa-8',
      ]"
    >
      <img :src="productImage" :alt="imagAlt" />
    </div>
    <div
      :class="[
        product.information,
        'mt-2 d-flex flex-column justify-center align-center',
      ]"
    >
      <h3 class="thin more">{{ title ? title : "بدون نام" }}</h3>
      <p class="bold mt-2 primary-color">
        {{ price ? price : "ناموجود" }}
      </p>
      <button
        @click.stop="addProduct({ id, image, title, price, qty: 1 })"
        class="my-2 icon d-flex justify-center align-center"
      >
        <span class="bold font-size-8 more primary-color"> افزودن به سبد </span>
        <span class="icon-plus pointer"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useShoppingCart } from "@/store";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
      validator(value) {
        if (!["jpg", "png", "svg"].includes(value)) {
          console.warn("should be jpg , png or svg");
        }
        if (["https://www.", "http://www."].includes(value)) {
          console.warn("shouldn't contain baseUrl");
        }
      },
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    productImage() {
      return this.image ? this.image : "@/assets/defaultProduct.svg";
    },
    imageAlt() {
      return "تصویر " + this.title;
    },
  },
  methods: {
    ...mapActions(useShoppingCart, ["addProduct"]),
  },
};
</script>

<style lang="scss" module="product">
.container {
  overflow: hidden;
  background-color: transparent;
  width: 50%;
  @media (min-width: 750px) {
    width: 25%;
  }

  .image {
    width: 100%;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }
    .heart-icon {
      position: absolute;
      z-index: 1;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
  .information {
    p {
      letter-spacing: 0.08rem;
    }
  }
}
</style>
