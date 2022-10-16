<template>
  <div class="py-4 full-width full-height d-flex">
    <div
      :class="[
        profile.sidebar,
        'pa-4 ml-4 rounded shadow white d-flex flex-column align-center',
      ]"
    >
      <div :class="[profile.avatar, 'primary ml-4 rounded-circle mb-4']">
        <img src="" alt="" />
      </div>
      <div class="d-flex flex-column justify-start">
        <p class="mb-2 font-size-8 bold primary-color">سید صادق شاهمرادی</p>
        <p class="font-size-6 dark-color mb-12">09393557744</p>
        <div class="d-flex flex-column justify-start">
          <h2
            v-for="(item, index) in list"
            :key="index"
            @click="changeTab(item.component)"
            :class="[
              { ' router-link-active ': item.component === currentTab },
              'pointer primary-color semi-bold font-size-8 mb-6',
            ]"
          >
            {{ item.title }}
          </h2>
        </div>
      </div>
    </div>
    <div
      class="grow-1 white shadow rounded full-height pa-4 overflow-x-hidden overflow-y-scroll hide-scroll"
    >
      <KeepAlive>
        <component :is="currentTab"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import EditProfileTab from "../components/profile/EditProfileTab.vue";
import OrdersTab from "../components/profile/OrdersTab.vue";

export default {
  components: { OrdersTab,  EditProfileTab },
  data() {
    return {
      list: [
        { title: "سفارشات", component: OrdersTab },
        { title: "ویرایش پروفایل", component: EditProfileTab },
      ],
      currentTab: OrdersTab,
    };
  },
  methods: {
    changeTab(selectedTab) {
      this.currentTab = selectedTab;
    },
  },
};
</script>

<style lang="scss" module="profile">
.sidebar {
  min-width: 30%;

  .avatar {
    width: 130px;
    height: 130px;
    border: 5px solid $primary-color;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }
}
</style>
