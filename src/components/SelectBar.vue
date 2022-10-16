<template>
  <div
    @click="showOptions"
    class="position-relative full-width d-flex align-center pa-2 shadow mb-4"
  >
    <div class="d-flex align-center grow-1 overflow-hidden ml-2">
      <span class="icon-pin ml-2"></span>
      <h4 class="ml-2">آدرس :</h4>
      <p class="more">{{ selectedOption ? selectedOption.title : title }}</p>
    </div>
    <span class="icon-angle-down"></span>
    <div
      v-show="isVisible"
      :class="[selectBar.options, 'shadow light pa-2 rounded-sm']"
    >
      <transition enter-active-class="fade-down" leave-active-class="fade-up">
        <ul class="primary-color" v-show="isVisible">
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            :class="[selectBar.option, , 'full-width d-flex align-center']"
          >
            <h4 class="py-4 no-wrap ml-2">
              {{ option.title }}
            </h4>
            <p class="py-4 grow-1 more">
              {{ option.description }}
            </p>
          </li>
          <li v-if="!options?.length">آدرسی موجود نیست.</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: false,
    },
    modelValue: {},
  },
  data() {
    return {
      isVisible: false,
      selectedOption: "",
    };
  },
  methods: {
    showOptions() {
      this.isVisible = !this.isVisible;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.$emit("update:modelValue", this.selectedOption.id);
    },
  },
};
</script>

<style lang="scss" module="selectBar">
.options {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  transform: translateY(calc(100% + 0.5rem));

  .option {
    border-bottom: solid 0.5px rgba(0, 0, 0, 0.1);
  }
  .option:last-child {
    border-bottom: none;
  }
}
</style>
