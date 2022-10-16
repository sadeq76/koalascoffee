<template>
  <BlogsHeader />

  <section class="d-flex flex-column">
    <div
      :class="[
        { 'px-4': screenSize.smAndDown },
        'primary-color my-4 d-flex justify-space-between',
      ]"
    >
      <h2>بلاگ ها</h2>
    </div>
    <MobileBlogCard
      v-for="blog in blogs"
      :key="blog.id"
      :id="blog.id"
      :date="blog.date"
      :image="blog.image"
      :title="blog.title"
      :description="blog.summary"
    />
  </section>

  <div :class="['my-4', { 'mx-4': screenSize.smAndDown }]">
    <DefaultFooter />
  </div>
</template>

<script>
import { useGlobalVariable } from "@/store";
import MobileBlogCard from "@/components/MobileBlogCard.vue";
import DefaultFooter from "@/components/DefaultFooter.vue";
import { fetchData } from "@/helpers/functions";
import BlogsHeader from "@/components/BlogsHeader.vue";
import { mapState } from "pinia";

export default {
  components: { MobileBlogCard, DefaultFooter, BlogsHeader },
  data() {
    return {
      email: null,
      blogs: [],
      offset: 0,
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
  methods: {
    getBlogs() {
      fetchData({ url: "/blog/", params: { limit: 10, offset: this.offset } })
        .then((result) => {
          this.blogs = result.result;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getBlogs();
  },
};
</script>
