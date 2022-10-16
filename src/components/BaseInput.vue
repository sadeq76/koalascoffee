<template>
  <div ref="myInput">
    <div
      ref="container"
      :class="[
        input.container,
        'd-flex justify-start align-center rounded-sm',
        fieldBorderColor,
      ]"
    >
      <label
        v-if="inputLabel"
        :class="[input.label, contentTextColor, fieldBorderColor, 'px-2']"
        :for="`base-input-${name}`"
        >{{ inputLabel }}</label
      >
      <input
        ref="input"
        placeholder=" "
        :id="`base-input-${name}`"
        :class="[
          input.field,
          'font-size-8 px-2 full-width grow-1',
          contentTextColor,
        ]"
        :aria-placeholder="placeholder"
        v-bind="{
          type,
          required,
          name,
          maxlength,
          autocomplete,
          dir,
        }"
        :value="modelValue"
        @focus="focused"
        @blur="blurred"
        @input="updateValue"
        @keypress="checkInput"
      />

      <div
        v-if="append"
        @click="focused"
        :class="[input.append, contentTextColor, fieldBorderColor, 'px-2']"
      >
        {{ append }}
      </div>
    </div>
    <div :class="[input.alert, 'overflow-hidden']">
      <p
        v-if="message"
        :class="[
          { 'error-color': messageType == 'error' },
          { 'warn-color': messageType == 'warn' },
          'd-flex align-center mt-2',
        ]"
      >
        <span :class="`icon-${icon}`"></span>
        <span> {{ message }} </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      required: false,
      default: "text",
      validator(value) {
        return ["text", "file", "number", "tel", "email", "search"].includes(
          value
        );
      },
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    maxlength: {
      type: Number,
      required: false,
      default: 524288,
      validator(value) {
        if (value <= 0 || value >= 524288) {
          console.warn("value should be between 1 and 524287");
        }
      },
    },
    autocomplete: {
      type: String,
      required: false,
      default: "off",
      validator(value) {
        if (["on", "off"].includes(value)) {
          console.warn("should be on or off");
        }
      },
    },
    label: {
      type: String,
      required: false,
    },
    append: {
      type: String,
      required: false,
    },
    textAlign: {
      type: String,
      required: false,
      default: "right",
      validator(value) {
        if (["right", "left", "center"].includes(value)) {
          console.warn("should be right, left or center");
        }
      },
    },

    dir: {
      type: String,
      required: false,
      default: "rtl",
      validator(value) {
        if (["rtl", "ltr"].includes(value)) {
          console.warn("should be rtl or ltr");
        }
      },
    },
    seperator: {
      type: String,
      required: false,
    },
    rules: {},
    color: {
      type: String,
      required: false,
      default: "red",
    },
    modelValue: {},
  },
  data() {
    return {
      messageType: null,
      message: null,
      icon: null,
    };
  },
  computed: {
    inputLabel() {
      return this.label
        ? this.label
        : this.placeholder
        ? this.placeholder
        : "بدون لیبل";
    },
    fieldBorderColor() {
      return this.messageType ? `${this.messageType}-border` : "";
    },
    contentTextColor() {
      return this.messageType ? `${this.messageType}-color` : "";
    },
    fieldColor() {
      return this.color === "primary" ? "#083830" : "#e4f6f8";
    },
  },
  methods: {
    focused() {
      this.$refs.input.focus();
      this.$refs.container.classList.add(this.input["full-opacity"]);
    },
    blurred() {
      this.$refs.container.classList.remove(this.input["full-opacity"]);
      this.validate();
    },
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    validate() {
      for (const rule of this.rules) {
        this.message =
          typeof rule.validation === "function"
            ? rule.validation(this.modelValue)
            : rule;
        if (typeof this.message == "string") {
          this.messageType = rule.type;
          this.icon = rule.type === "error" ? "xmark" : "alert";
          break;
        } else {
          this.message = null;
          this.messageType = "success";
        }
      }
    },
    checkInput(event) {
      if (
        (this.type == "tel" || this.type == "number") &&
        !(event.keyCode >= 48 && event.keyCode <= 58) &&
        !(event.keyCode >= 1776 && event.keyCode <= 1785)
      ) {
        event.preventDefault();
      }
    },
  },
  watch: {
    label() {
      this.messageType = null;
      this.message = null;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" module="input">
.container {
  position: relative;
  font-family: "iransans";
  border: 1.5px solid v-bind(fieldColor);
  opacity: 0.6;

  .field {
    background: transparent;
    min-height: 40px;
    border: none;
    text-align: v-bind(textAlign);
    color: v-bind(fieldColor);
  }

  .label {
    white-space: nowrap;
    min-width: 10ch;
    text-align: center;
    font-size: 1rem;
    transition: all 0.3s;
    border-left: 1px solid v-bind(fieldColor);
    color: v-bind(fieldColor);
  }

  .append {
    border-right: 1px solid v-bind(fieldColor);
    color: v-bind(fieldColor);
  }
  .field:focus {
    outline: none;
  }
}
.full-opacity {
  opacity: 1;
}

.alert {
  height: 50px;
}
</style>
