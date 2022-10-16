<template>
  <img :src="blog.cover" :alt="blog.title" />
  <div class="overlay primary"></div>
  <div class="content d-flex flex-column justify-start align-center">
    <div class="header d-flex flex-column justify-center align-start px-16">
      <div class="secondary-color full-width d-flex justify-space-between align-center">
      <h1 class="secondary-color bold">{{ blog.title }}</h1>
        <p>تاریخ : {{ blog.date_created }}</p>
      </div>
    </div>
    <div class="body mb-4 secondary overflow-hidden pa-4 full-width">
      <div class="htmlText" v-html="htmlContent"></div>
      <div class="full-width">
        <video width="100%" controls>
          <source :src="blog.video" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    </div>
    <div
      class="full-width"
      :class="{ 'd-flex justify-space-between ': !screenSize.smAndDown }"
    >
      <div class="d-flex align-center primary-color mb-4">
        <span
          v-if="!screenSize.smAndDown"
          class="icon-angle-right"
        />
        <p v-if="screenSize.smAndDown" class="ml-2 bold">بلاگ قبلی:</p>
        <p class="mr-2 bold">
          {{ blog.next?.title }}
        </p>
      </div>
      <div class="d-flex align-center primary-color">
        <p v-if="screenSize.smAndDown" class="ml-2 bold">بلاگ بعدی:</p>

        <p class="ml-2 bold">
          {{ blog.previous?.title }}
        </p>
        <span
          v-if="!screenSize.smAndDown"
          class="icon-angle-left"
        />
      </div>
    </div>
  </div>
  <div :class="['my-4', { 'mx-4': screenSize.smAndDown }]">
    <DefaultFooter />
  </div>
</template>

<script>
import { useGlobalVariable } from "@/store/index";
import { fetchData } from "@/helpers/functions";
import DefaultFooter from "@/components/DefaultFooter.vue";
import { mapState } from "pinia";

export default {
  components: { DefaultFooter },
  data() {
    return {
      blog: {},
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    htmlContent() {
      return this.blog.description?.replaceAll(
        "<img ",
        '<img style="width:100%; aspect-ratio: 16/9;"'
      );
    },
  },
  methods: {
    getBlogs() {
      fetchData({ url: `/blog/${this.$route.params.id}/` })
        .then((result) => {
          this.blog = result;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getBlogs()
  },
};
</script>

<style lang="scss" scoped>
img {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 56px;
  right: 0;
  width: 100%;
  aspect-ratio: 16/7;
  z-index: 0;
  object-fit: cover;

  @media screen and (max-width: 900px) {
    aspect-ratio: 4/3;
  }
}

.overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 56px;
  right: 0;
  width: 100%;
  height: (7 * 100vw / 16);
  opacity: 0.7;

  @media screen and (max-width: 900px) {
    height: (3 * 100vw / 4);
  }
}

.content {
  position: relative;
  z-index: 1;
  line-height: 1.75em;

  .header {
    width: 70%;
    height: (4 * 100vw / 16);

    @media screen and (max-width: 900px) {
      height: (2 * 100vw / 4);
    }
  }
}
</style>
