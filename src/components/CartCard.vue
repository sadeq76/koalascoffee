<template>
  <div ref="card" class="light full-width d-flex rounded pa-2 shadow">
    <div
      :class="[
        cartCard.image,
        'secondary pa-2 ml-4 rounded d-flex justify-center align-center',
      ]"
    >
      <img :src="image" alt="src" />
    </div>
    <div class="d-flex flex-column">
      <h3 class="primary-color mb-4 more font-size-8 regular">
        {{ title || "بدون نام" }}
      </h3>
      <p class="mb-2">قیمت نهایی:</p>
      <p class="bold primary-color font-size-12">
        {{ finalPrice }}
      </p>
    </div>
    <div class="grow-1 d-flex flex-column align-end justify-space-between px-2">
      <div
        :class="[
          cartCard.qty,
          { 'flex-column': screenSize.smAndDown },
          'd-flex justify-space-between align-center',
        ]"
      >
        <button class="mx-2" @click="increase">
          <span class="icon-plus" />
        </button>
        <p class="bold primary secondary-color px-4 py-2 rounded">
          {{ qty }}
        </p>
        <button class="mx-2" @click="decrease">
          <span class="icon-minus" />
        </button>
      </div>
      <button v-if="!screenSize.smAndDown" @click="remove" class="mx-2">
        <span class="icon-delete" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
export default {
  props: {
    id: {},
    image: {},
    title: {},
    price: {},
    qty: {
      type: Number,
      required: true,
    },
  },
  emits: ["increase", "decrease", "remove"],
  data() {
    return {
      touchStartPos: 0,
      touchEndPos: 0,
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    finalPrice() {
      return this.price * this.qty || 0;
    },
  },
  methods: {
    increase() {
      this.$emit("increase", this.id);
    },
    decrease() {
      this.$emit("decrease", this.id);
    },
    remove() {
      return this.$emit("remove", this.id);
    },
  },
  watch: {
    qty(value) {
      if (!value) {
        return this.$emit("remove", this.id);
      }
    },
  },
  mounted() {
    this.$refs.card.addEventListener("touchstart", (e) => {
      this.touchStartPos = e.touches[0].clientX;
    });

    this.$refs.card.addEventListener("touchmove", (e) => {
      let distance = e.touches[0].clientX - this.touchStartPos;
      if (distance > 100 || distance < -100) {
        this.$refs.card.style.transform = `translate(${distance}px)`;
        this.touchEndtPos = e.touches[0].clientX;
      }
    });

    this.$refs.card.addEventListener("touchend", () => {
      this.touchStartPos = 0;
      if (
        Math.abs(this.touchEndtPos) - this.touchStartPos >
        this.$refs.card.clientWidth
      ) {
        return this.$emit("remove", this.id);
      } else {
        this.$refs.card.style.transform = `translate(0px)`;
      }
    });
  },
};
</script>

<style lang="scss" module="cartCard">
.image {
  width: 30%;

  @media screen and (min-width: 750px) {
    width: 20%;
  }

  img {
    aspect-ratio: 1;
    object-fit: contain;
    width: 100%;
  }
}
</style>
