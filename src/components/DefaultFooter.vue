<template>
  <footer class="pa-4 full-width primary rounded-sm">
    <section class="d-flex flex-column align-center">
      <img
        class="mb-4"
        src="@/assets/orginal-logo.png"
        alt="koalas-coffee logo"
      />
      <div class="icons d-flex justify-center align-center mb-8">
        <a
          class="mx-2"
          v-for="(social, index) in socials"
          :key="index"
          :href="social.path"
        >
          <span :class="`secondary-color icon-${social.icon}`" />
        </a>
      </div>
    </section>

    <div
      :class="[
        { 'justify-space-between': !screenSize.smAndDown },
        { ' flex-column': screenSize.smAndDown },
        'd-flex align-space-between',
      ]"
    >
      <div
        class="d-flex flex-column mb-4"
        :class="{
          'align-center': screenSize.smAndDown,
        }"
      >
        <h3 class="mb-4 secondary-color">لینک ها</h3>
        <ul
          :class="[
            { 'align-center': screenSize.smAndDown },
            'px-2 d-flex flex-column flex-wrap',
          ]"
        >
          <li v-for="link in links" :key="link" class="mb-2">
            <RouterLink class="secondary-color font-size-6" :to="link.path">{{
              link.title
            }}</RouterLink>
          </li>
        </ul>
      </div>

      <div
        class="d-flex flex-column mb-4"
        :class="{
          'align-center': screenSize.smAndDown,
        }"
      >
        <h3 class="mb-4 secondary-color">تماس با ما</h3>
        <address class="px-2" :class="{ 'px-8': screenSize.smAndDown }">
          <div
            v-for="(contact, index) in contactInformation"
            :key="index"
            class="d-flex align-start vertical-middel mb-2"
            :class="{ 'justify-center': screenSize.smAndDown }"
          >
            <h4 class="secondary-color ml-2">{{ contact.title }}:</h4>
            <a
              class="secondary-color text-justify regular font-size-8"
              :href="contact.path"
              >{{ contact.description }}</a
            >
          </div>
        </address>
      </div>
    </div>

    <section class="d-flex flex-column align-center">
      <hr class="full-width" />
      <p class="my-2 secondary-color text-center font-size-4">
        کلیه حقوق این سایت نزد کوآلاز محفوظ بوده و کپی با ذکر منبع بلامانع است
      </p>
      <p class="mb-2 secondary-color text-center font-size-6">
        powerd by <strong>Best-Vision</strong>
      </p>
    </section>
  </footer>
</template>

<script>
import { useGlobalVariable } from "@/store/index";
import { mapState } from "pinia";
export default {
  data() {
    return {
      links: [
        { title: "خانه", path: "/" },
        { title: "محصولات", path: "/shop" },
        { title: "بلاگ ها", path: "/blogs" },
        { title: "پشتیبانی", path: "/support" },
      ],
      socials: [
        { icon: "insta", path: "" },
        { icon: "whatsapp", path: "" },
        { icon: "telegram", path: "" },
        { icon: "facebook", path: "" },
      ],
      contactInformation: [
        {
          title: "شماره تماس",
          description: "0939 355 77 44",
          path: "tel:+989393557744",
        },
        {
          title: "ایمیل",
          description: "info@koalas-coffee.com",
          path: "info@koalas-coffee.com",
        },
        {
          title: "آدرس",
          description:
            " تهران ، چهاررا نظام آباد ، خیابان وحیدیه ، جنب خیابان وحیدیه پلاک 1",
          path: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 90px;
  height: 90px;
}
</style>
