<template>
  <div
    class="container pa-6 secondary d-flex flex-column justify-center align-center"
  >
    <form
      class="d-flex flex-column justify-center align-center"
      action="submit"
      @submit.prevent
    >
      <h2 class="primary-color bold mb-4">بروز باش ...</h2>
      <p class="dark-color text-center mb-8">
        ثبت ایمیل برای دریافت آخرین بروزرسانی محصولات و بلاگهای کوآلاز
      </p>
      <div
        :class="[
          { 'flex-column': screenSize.smAndDown },
          'full-width d-flex justify-center align-center',
        ]"
      >
        <BaseInput
          type="email"
          name="email1"
          label="ایمیل"
          placeholder="ایمیل را وارد کنید ..."
          autocomplete="off"
          class="full-width mb-4 grow-1"
          color="primary"
        />
        <button
          :class="[
            { 'full-width mx-0': screenSize.smAndDown },
            'primary px-8 light-color bold mb-4 mr-2 rounded-sm',
          ]"
        >
          ثبت
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useGlobalVariable } from "@/store/index";
import BaseInput from "./BaseInput.vue";
import { mapState } from "pinia";
export default {
  components: { BaseInput },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: fit-content;
  width: 100%;
  overflow: hidden;
}
</style>
