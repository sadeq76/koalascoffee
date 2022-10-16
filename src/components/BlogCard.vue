<template>
  <div class="container">
    <img v-if="image" :src="image" alt="" />
    <div
      class="overlay full-width full-height px-2 d-flex flex-column justify-start primary-color"
    >
      <div class="title d-flex align-center">
        <h2 class="my-4">{{ title ? title : "بدون عنوان" }}</h2>
      </div>
      <div class="description d-flex flex-column">
        <p class="grow-1 overflow-hidden text-justify">
          {{ description ? description : "بدون توضیحات" }}
        </p>
        <button class="my-2 icon primary-color">
          <span class="font-size-8 more"> مشاهده بیشتر </span>

          <span class="icon-angle-left" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: $primary-color;
  position: relative;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }

  .overlay {
    background-color: rgba(228, 246, 248, 0.7);
    height: 100%;
    position: absolute;
    top: 80%;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 1s;

    .title {
      height: 20%;
      overflow: hidden;
    }
    .description {
      height: 80%;
    }
    button {
      margin-right: auto;
    }
  }
}
.container:hover {
  .overlay {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
