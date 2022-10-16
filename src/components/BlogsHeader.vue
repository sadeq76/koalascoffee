<template>
  <header
    :class="[
      { [header['four-three-ratio']]: screenSize.smAndDown },
      header.banner,
      'position-relative overflow-hidden full-width',
    ]"
  >
  </header>
</template>

<script>
import { mapState } from "pinia";
import { useGlobalVariable } from "@/store";
export default {
  computed: {
    ...mapState(useGlobalVariable, ["screenSize"]),
  },
};
</script>

<style lang="scss" module="header">
.banner {
  padding-top: 40%;
  position: relative;
  background-image: url("@/assets/productBanner.png");
  background-size: contain;

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    input {
      width: 200px;
    }
  }
}

.four-three-ratio {
  padding-top: 75%;
  background-size: cover;
}
</style>
