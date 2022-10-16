<template>
  <BaseModal :fullscreen="screenSize.smAndDown" width="25%" :persistent="true">
    <button
      @click="closeModal"
      :class="[login['dialog-close'], 'primary-color icon']"
    >
      <span :class="`icon-${icon} pointer`" />
    </button>
    <div class="d-flex flex-column align-center">
      <img
        :class="[login.logo, 'mb-4']"
        src="@/assets/orginal-primary-logo.png"
        alt="koalas-coffee logo"
      />
      <h1 class="mb-2 primary-color">صفحه ورود</h1>
      <p class="mb-4">{{ description }}</p>
      <div v-if="step == 2" class="mb-4 d-flex justify-center align-center">
        <button @click="priviousStep" class="icon ml-4">
          <span class="icon-edit" />
        </button>

        <p :class="[login['phone-number-letter-space'], 'primary-color bold']">
          {{ phoneNumber }}
        </p>
      </div>
      <BaseInput
        class="full-width mb-8"
        v-bind="{
          name,
          type,
          placeholder,
          append,
          label,
          required,
          maxlength,
          autocomplete,
          textAlign,
          rules,
          seperator,
        }"
        dir="ltr"
        v-model="inputValue"
        @keypress.enter="buttonClicked"
        @keyup="addDash"
        color="primary"
      />
    </div>
    <div class="full-width d-flex flex-column justify-end align-center">
      <button
        @click="buttonClicked"
        class="primary full-width rounded-sm secondary-color"
      >
        {{ buttonText }}
      </button>
      <p class="font-size-6 my-4 tex-center">
        ورود در کوآلاز به معنی پذیرش <strong>قوانین و مقررات</strong> است
      </p>
    </div>
  </BaseModal>
</template>

<script>
import { useGlobalVariable, useShoppingCart } from "../store";
import { mapActions, mapState, mapWritableState } from "pinia";
import { fetchData } from "@/helpers/functions";
import BaseModal from "./popup/BaseModal.vue";
import BaseInput from "./BaseInput.vue";

export default {
  components: { BaseModal, BaseInput },
  data() {
    return {
      step: 1,
      prefix: "09",
      inputValue: "",
      phoneNumber: "",
      code: null,
      type: "tel",
      autocomplete: "off",
      codeLength: 4,
      phoneNumberRules: [
        {
          validation: (value) => !!value || "شماره همراه الزامیست",
          type: "error",
        },
        {
          validation: (value) => value.length === 9 || "۹ رقم الزامیست",
          type: "error",
        },
        {
          validation: (value) =>
            !value.startsWith("09") || "پیش شماره را حذف کنید",
          type: "warn",
        },
      ],
      codeRules: [
        {
          validation: (value) => !!value || "کد الزامیست",
          type: "error",
        },
        {
          validation: (value) =>
            value.length === 2 * this.codeLength - 1 ||
            `کد${this.codeLength} رقمی است`,
          type: "error",
        },
      ],
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    ...mapWritableState(useGlobalVariable, ["isLoggedIn"]),
    icon() {
      return this.screenSize.smAndDown ? "angle-down" : "xmark";
    },
    description() {
      return this.step === 1
        ? "لطفا شماره تماس خود را وارد کنید"
        : "کد ارسالی به شماره تماس زیر را وارد کنید";
    },

    name() {
      return this.step == 1 ? "phone" : "code";
    },
    placeholder() {
      return this.step == 1 ? "شماره تماس" : "کد";
    },
    append() {
      return this.step == 1 ? "۰۹" : "";
    },
    label() {
      return this.step == 1 ? "همراه" : "کد";
    },
    required() {
      return this.step == 1 ? true : false;
    },
    maxlength() {
      return this.step == 1 ? 9 : this.codeLength;
    },
    textAlign() {
      return this.step === 1 ? "left" : "center";
    },
    rules() {
      return this.step === 1 ? this.phoneNumberRules : this.codeRules;
    },
    seperator() {
      return this.step === 1 ? null : "-";
    },
    buttonText() {
      return this.step === 1 ? "مرحله بعد" : "ورود";
    },
  },
  methods: {
    ...mapActions(useGlobalVariable, ["toggleModal"]),
    ...mapActions(useShoppingCart, ["getAddresses"]),
    async buttonClicked() {
      if (this.step == 1 && this.inputValue.length === 9) {
        this.phoneNumber = "09" + this.inputValue;
        this.inputValue = "";

        let body = new FormData();
        body.append("phone_number", this.phoneNumber);
        await fetchData({ url: "/user/login/", method: "POST", body })
          .then(() => {
            this.step = 2;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.step == 2 && this.inputValue.length === 4) {
        let body = new FormData();
        body.append("otp", this.inputValue);
        body.append("phone_number", this.phoneNumber);
        fetchData({
          url: "/user/otp/",
          method: "POST",
          body,
        })
          .then((result) => {
            localStorage.setItem("token", result.token);
            this.isLoggedIn = true;
            this.getAddresses();
            this.closeModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" module="login">
.logo {
  width: 30%;
}
.phone-number-letter-space {
  letter-spacing: 0.25ch;
}
.dialog-close {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>
