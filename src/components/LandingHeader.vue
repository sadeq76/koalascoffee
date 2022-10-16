<template>
  <header :class="[header.container, 'd-flex flex-column']">
    <div
      :class="[
        {
          'flex-column ma-4': screenSize.smAndDown,
          'px-12': !screenSize.smAndDown,
        },
        header.content,
        'pa-4 mb-4 secondary d-flex justify-space-around align-center rounded-xs',
      ]"
    >
      <div class="primary-color full-width">
        <h1 class="mb-4">به <strong>کوالاز </strong>خوش آمدید</h1>
        <h2 class="mb-8 thin dark-color">
          فروشگاه دانه ، اکسسوری و لوازم تهیه قهوه
        </h2>
        <div
          :class="[
            { 'mx-auto': screenSize.smAndDown },
            header['go-to-products'],
          ]"
        >
          <RouterLink class="font-size-8 pl-2" to="/shop"
            >ورود به فروشگاه</RouterLink
          >
          <span class="icon-angle-left" />
        </div>
      </div>
      <img src="@/assets/koalascup.png" alt="koalascup" />
    </div>
  </header>

  <div
    class="primary secondary-color full-width d-flex justify-space-around py-10"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="d-flex flex-column justify-center align-center"
    >
      <object
        :class="[header.whyus, 'mb-4']"
        :data="getImgUrl(item.fileName)"
        type="image/svg+xml"
      />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
export default {
  props: {},
  data() {
    return {
      items: [
        { title: "بهداشتی", fileName: "best-price" },
        { title: "با کیفیت", fileName: "checked" },
        { title: "ارزان", fileName: "sanitary" },
      ],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
  methods: {
    getImgUrl(pic) {
      var images = require.context("../assets/whyus", false, /\.svg$/);
      return images("./" + pic + ".svg");
    },
  },
};
</script>

<style lang="scss" module="header">
.container {
  width: 100%;
  position: relative;
  padding-top: calc(150% - 56px);

  @media (min-width: 750px) {
    padding-top: calc(56% - 56px);
  }

  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    .go-to-products {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 0.1em solid $primary-color;
      width: fit-content;

      a {
        font-weight: normal;
        color: $primary-color;
        white-space: nowrap;
      }
    }
    img {
      height: 50%;
      @media (min-width: 750px) {
        height: 80%;
      }
    }
  }
}

.whyus {
  height: 40px;
  aspect-ratio: 1;

  @media only screen and (min-width: 900px) {
    height: 100px;
  }
}
</style>
