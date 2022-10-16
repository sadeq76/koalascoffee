<template>
  <div
    v-for="(item, index) in items"
    :key="index"
    v-show="slideIndex === index"
    :class="[carousel.container, 'full-height full-width fade']"
  >
    <img
      class="full-height full-width"
      :src="item.image"
      style="object-fit: cover"
    />
    <div
      :class="[
        carousel.overlay,
        'pa-4 secondary-color d-flex flex-column justify-space-between',
      ]"
    >
      <h3 :class="[carousel.title, 'bold font-size-8']">
        {{ item.title ? item.title : "" }}
      </h3>
      <div class="d-flex justify-space-between">
        <button
          @click="previousSlide"
          :class="[carousel.btns, 'secondary-border rounded-sm']"
        >
          <span class="secondary-color icon-angle-right" />
        </button>
        <button
          @click="nextSlide"
          :class="[carousel.btns, 'secondary-border rounded-sm']"
        >
          <span class="secondary-color icon-angle-left" />
        </button>
      </div>
      <div class="d-flex justify-center">
        <span
          v-for="(item, index) in items.length"
          :key="index"
          :class="[
            { [carousel.active]: slideIndex === index },
            carousel.dot,
            'secondary rounded-circle ml-2',
          ]"
          @click="selectSlide(index)"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {},
  },
  data() {
    return {
      slideIndex: 0,
    };
  },
  methods: {
    previousSlide() {
      if (this.slideIndex !== 0) {
        this.slideIndex--;
      } else {
        this.slideIndex = this.items.length - 1;
      }
    },

    nextSlide() {
      if (this.slideIndex < this.items.length - 1) {
        this.slideIndex++;
      } else {
        this.slideIndex = 0;
      }
    },
    selectSlide(index) {
      this.slideIndex = index;
    },
  },
};
</script>

<style lang="scss" module="carousel">
.container {
  position: relative;
  min-width: 100%;
  padding-top: 56%;

  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.overlay {
  background-color: rgba(8, 56, 48, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.btns {
  border: 1px solid;
  width: 32px;
  height: 32px;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  transition: opacity 0.6s ease;
}
.dot:last-child {
  margin: 0;
}

.active {
  opacity: 0.5;
}
</style>
