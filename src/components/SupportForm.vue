<template>
  <form class="full-height d-flex flex-column">
    <h1 class="mb-2">پشتیبانی</h1>
    <p class="mb-4">به ما در بهبود سایت کمک کنید</p>
    <textarea
      class="full-width pa-2 rounded-sm"
      aria-label="message"
      placeholder="پیام خود را وارد کنید ..."
      :value="modelValue"
      @input="updateValue"
    ></textarea>
    <div
      :class="[
        { 'flex-column justify-end': screenSize.smAndDown },
        'mb-4 grow-1 d-flex align-end',
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        id="file"
        @change="submitFile"
      />
      <button
        @click.prevent="changeFile"
        :class="[
          { 'full-width mb-4 secondary ': screenSize.smAndDown },
          { 'ml-4 light': !screenSize.smAndDown },
          ,
          'position-relative px-4 d-flex  primary-color rounded-sm full-width',
        ]"
      >
        <span class="grow-1 more">
          {{ file?.name || "آپلود" }}
        </span>
        <span class="no-wrap" v-if="file">| {{ fileSize }}</span>
        <span v-if="file" :class="[supportForm.close, 'icon-close']"></span>
      </button>
      <button
        @click.prevent="sendMessage"
        :class="[
          'primary secondary-color rounded-sm',
          { 'full-width': screenSize.smAndDown },
          { 'half-width': !screenSize.smAndDown },
          ,
        ]"
      >
        ارسال
      </button>
    </div>
    <p>پاسخ شما در اسرع وقت به <b>ایمیلتان </b> ارسال خواهد شد</p>
  </form>
</template>

<script>
import { useGlobalVariable } from "@/store";
import { mapState } from "pinia";

export default {
  props: {
    modelValue: {},
  },
  emits: ["send"],
  data() {
    return {
      fullName: "",
      email: "",
      message: "",
      file: null,
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
    fileSize() {
      return (this.file?.size / 1024).toFixed(1) + " کیلوبایت";
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    submitFile(e) {
      this.file = e.target.files[0];
      console.log(this.file);
    },
    async changeFile() {
      if (this.file) {
        this.file = null;
        this.$refs.fileInput.value = null;
      } else {
        this.$refs.fileInput.click();
      }
      return console.log();
    },
    sendMessage() {
      this.$emit("send", this.file);
    },
  },
};
</script>

<style lang="scss" module="supportForm">
.close {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-30%, -30%);
  width: 20px;
  height: 20px;
  color: white;
  background-color: red;
  border-radius: 50%;
}
</style>
