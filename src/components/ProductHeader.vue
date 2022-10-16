<template>
  <div class="full-height d-flex">
    <div
      :class="[
        productHeader.container,
        'full-height full-width d-flex flex-column secondary',
      ]"
    >
      <span :class="[productHeader.back, 'primary-color icon-angle-right']" />
      <div class="grow-1 overflow-hidden">
        <ImagesCarousel
          :class="[
            productHeader.carousel,
            'd-flex justify-center align-center pa-8',
          ]"
        />
      </div>
      <div v-if="screenSize.smAndDown" class="full-width pa-4">
        <h1 class="mb-2 primary-color">شکلات باراکا اصل ژاپن</h1>
        <p>بدون پالم و روغن و اسید های چرب ترانس</p>
      </div>
    </div>
    <div
      v-if="!screenSize.smAndDown"
      class="d-flex flex-column grow-1 overflow-hidden"
    >
      <h1 class="mb-2 primary-color px-4 pt-4">شکلات باراکا اصل ژاپن</h1>
      <p class="px-4 pb-4">بدون پالم و روغن و اسید های چرب ترانس</p>
      <p class="px-4 pb-8 bold primary-color font-size-12">قیمت : ۱۵۰۰۰۰</p>
      <div class="full-width">
        <DetailsBox v-for="(detail, index) in details" :key="index">
          <template #header>
            {{ detail.title }}
          </template>
          <template #details>
            <div v-html="detail.description"></div>
          </template>
        </DetailsBox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
import ImagesCarousel from "./ImagesCarousel.vue";
import DetailsBox from "./DetailsBox.vue";
export default {
  components: { ImagesCarousel, DetailsBox },
  props: {
    details: {},
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
};
</script>

<style lang="scss" module="productHeader">
.container {
  position: relative;
  width: 100%;
  @media (min-width: 750px) {
    width: 55%;
  }

  .back {
    position: absolute;
    top: 1em;
    right: 1em;
  }
}

.carousel {
  overflow: hidden;
}
</style>
