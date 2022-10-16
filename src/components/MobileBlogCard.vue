<template>
  <div v-if="screenSize.smAndDown" class="card ma-4">
    <img :src="image" :alt="'تصویر' + title" />
    <div class="content pa-2"></div>
    <div class="date primary">
      <p
        class="full-width full-height secondary-color bold d-flex flex-column justify-center align-center"
      >
        <span class="day">2</span>
        <span class="month">مهر</span>
      </p>
    </div>
    <button @click="goToBlog" class="icon secondary-color">
      <span class="ml-2 bold">مشاهده بلاگ</span>
      <span class="secondary-color icon-angle-left" />
    </button>
    <div class="text secondary pa-2">
      <h2 class="primary-color mb-2">{{ title || "بدون تیتر" }}</h2>
      <p class="mb-2">{{ description || "بدون توضیحات" }}</p>
    </div>
  </div>
  <div v-else class="desktop-card full-width d-flex justify-start my-4">
    <img :src="image" :alt="'تصویر' + title" />
    <div class="content mx-4 grow-1">
      <div class="text d-flex flex-column justify-start secondary pa-2">
        <div class="grow-1">
          <h2 class="primary-color mb-2">{{ title || "بدون تیتر" }}</h2>
          <p class="mb-2">{{ description || "بدون توضیحات" }}</p>
        </div>
        <button @click="goToBlog" class="icon primary-color d-flex justify-end">
          <p class="ml-2 bold">مشاهده بلاگ</p>
          <span class="icon-angle-left"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalVariable } from "@/store";
import { mapState } from "pinia";
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
        if (!["jpg", "png", "svg", "webp"].includes(value)) {
          console.warn("should be jpg , webp , png or svg");
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
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
  methods: {
    goToBlog() {
      this.$router.push({ path: `/blog/${this.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-top: 56%;
  position: relative;
  margin-bottom: 20%;

  img {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(8, 56, 48, 0.3);
  }
  .date {
    position: absolute;
    top: 0;
    right: 1em;
    width: 15%;
    height: 35%;
  }
  button {
    position: absolute;
    top: 1em;
    left: 1em;
  }
  .text {
    position: absolute;
    top: 80%;
    left: 1em;
    right: 1em;
    width: calc(100% - 2em);
    height: 51%;
    overflow: hidden;

    h1 {
      height: 10%;
    }
    p {
      height: 90%;
    }
  }
}
.desktop-card {
  img {
    width: 45%;
    aspect-ratio: 16/9;
  }
  .content {
    border-top: 1px solid $dark-color;
    position: relative;

    .text {
      position: absolute;
      left: 0;
      right: -10%;
      top: 1em;
      bottom: 1em;
      width: 110%;
    }
  }
}
</style>
