<template>
  <div :class="[addressesCard.container, 'pa-2 full-width shadow']">
    <h3 class="mb-2 primary-color">{{ title || "بدون عنوان" }}</h3>
    <p class="mb-2">
      <strong class="dark-color">آدرس :</strong>
      {{ address || "بدون آدرس" }}
    </p>
    <p class="mb-4">
      <strong class="dark-color">کدپستی :</strong>
      {{ zip_code || "بدون کد پستی" }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
    title: {},
    address: {},
    zip_code: {},
    latitude: {},
    longitude: {},
  },
  data() {
    return {
      center: { lat: +this.latitude, lng: +this.longitude },
    };
  },
};
</script>

<style lang="scss" module="addressesCard">
.container {
  width: 100%;
  @media (min-width: 750px) {
    width: calc(50% - 0.5em);
  }
}
</style>
