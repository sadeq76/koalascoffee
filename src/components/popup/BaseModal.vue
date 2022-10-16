<template>
  <div
    @click.self="outsideClicked"
    :class="[
      modal.container,
      'd-flex',
      fullscreen ? 'align-end' : 'align-center',
    ]"
  >
    <transition
      :enter-active-class="fullscreen ? 'move-up' : 'bounce-in'"
      :leave-active-class="fullscreen ? 'move-down' : 'bounce-out'"
    >
      <div
        v-if="isMounted"
        ref="dialog"
        :class="[
          modal.dialog,
          'pa-4 hide-scroll shadow',
          { rounded: !fullscreen },
        ]"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { useGlobalVariable } from "../../store";
import { mapActions } from "pinia";

export default {
  props: {
    width: {
      type: String,
      required: false,
    },
    fullscreen: {
      type: Boolean,
      required: false,
      default: false,
    },
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  data() {
    return {
      animationTimeout: undefined,
      isMounted: false,
    };
  },
  computed: {
    modalWidth() {
      return this.fullscreen ? "100%" : this.width ? this.width : "fit-content";
    },
  },
  methods: {
    ...mapActions(useGlobalVariable, ["toggleModal"]),
    outsideClicked() {
      if (this.persistent) {
        if (!this.fullscreen) {
          //first remove previous animate
          this.$refs.dialog.classList.remove("shake");
          this.$nextTick(() => {
            this.$refs.dialog.classList.add("shake");
            window.clearTimeout(this.animationTimeout);
            this.animationTimeout = window.setTimeout(
              () => this.$refs.dialog.classList.remove("shake"),
              500
            );
          });
        }
      } else {
        this.isMounted = false;
        this.closeModal();
      }
    },
    async closeModal() {
      this.isMounted = false;
      await new Promise(function (resolve) {
        setTimeout(resolve.bind(null, undefined), 300);
      });
      this.$emit("close");
    },
  },
  mounted() {
    this.isMounted = true;
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    document.body.style.overflow = "visible";
  },
};
</script>

<style lang="scss" module="modal">
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(8, 56, 48, 0.3);
  backdrop-filter: blur(10px);

  .dialog {
    background-color: white;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    overflow: scroll;
    width: v-bind(modalWidth);
    height: fit-content;
    max-height: 85%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
}
</style>
