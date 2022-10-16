<template>
  <div class="full-width full-height py-2">
    <SupportForm
      v-if="screenSize.smAndDown"
      class="pa-4"
      v-model="message"
      @send="sendMessage"
    ></SupportForm>
    <section
      v-else
      :class="[support.container, 'position-relative full-width']"
    >
      <div :class="[support.main, 'secondary rounded']">
        <div :class="support.form">
          <SupportForm v-model="message" @send="sendMessage"></SupportForm>
        </div>
      </div>
      <div :class="[support['contact-info'], 'rounded']">
        <div
          :class="[
            support.content,
            'pa-8 full-height full-width d-flex flex-column justify-center',
          ]"
        >
          <address>
            <div
              v-for="(contact, index) in contactInformation"
              :key="index"
              class="d-flex align-start vertical-middel mb-8"
            >
              <h3 class="secondary-color ml-2 font-size-6">
                {{ contact.title }}:
              </h3>
              <a
                class="secondary-color text-justify font-size-6"
                :href="contact.path"
                >{{ contact.description }}</a
              >
            </div>
          </address>
        </div>
      </div>
    </section>
    <TheLogin v-if="isOpen" @close="toggleModal" />
  </div>
</template>

<script>
import SupportForm from "@/components/SupportForm.vue";
import TheLogin from "@/components/TheLogin.vue";
import { fetchData } from "@/helpers/functions";
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";

export default {
  components: { SupportForm, TheLogin },
  data() {
    return {
      message: "",
      isOpen: false,
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
    ...mapState(useGlobalVariable, ["screenSize", "isLoggedIn"]),
  },
  methods: {
    async sendMessage(file) {
      if (!this.isLoggedIn) {
        this.isOpen = true;
      } else if (this.message) {
        let body = new FormData();
        body.append("message", this.message);
        file && body.append("file", file);
        await fetchData({ url: "/user/support/", method: "POST", body })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("error");
      }
    },
    toggleModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" module="support">
.container {
  padding-top: 52%;

  .main {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;

    .form {
      position: absolute;
      top: 10%;
      bottom: 10%;
      right: 8%;
      width: 60%;
    }
  }

  .contact-info {
    position: absolute;
    top: 10%;
    left: 0;
    width: 40%;
    height: 80%;
    background-image: url("@/assets/support.jpg");
    background-size: cover;
    background-position: center;
    overflow: hidden;

    .content {
      background-color: rgba(8, 56, 48, 0.9);
    }
  }
}
</style>
