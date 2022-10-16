<template>
  <div class="full-width full-height py-2">
    <div
      v-if="screenSize.smAndDown"
      class="full-height overflow-hidden pa-4 d-flex flex-column"
    >
      <div class="mb-4 grow-1 overflow-scroll overflow-x-hidden">
        <SelectBar
          v-if="options.length"
          v-model="address"
          v-bind="{ title, options }"
        />
        <CartCard
          v-for="product in productsList"
          :key="product.id"
          v-bind="{ ...product }"
          v-on="{ increase, decrease, remove }"
          class="mb-4"
        ></CartCard>
      </div>
      <div class="primary full-width pa-2 rounded">
        <div class="mb-2 secondary-color d-flex justify-space-between">
          <h4 class="regular">مجموع قیمت کالاها</h4>
          <p class="bold font-size-10">
            {{ productsPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <div class="mb-2 secondary-color d-flex justify-space-between">
          <h4 class="regular">هزینه ارسال</h4>
          <p class="bold font-size-10">
            {{ deliveryPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <div class="mb-2 secondary-color d-flex justify-space-between">
          <h4 class="regular">مبلغ نهایی</h4>
          <p class="bold font-size-10">
            {{ finalPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <button
          @click="buttonClicked"
          class="secondary rounded full-width text-center"
        >
          {{ buttonTitle }}
        </button>
      </div>
    </div>
    <section v-else :class="[cart.container, 'position-relative full-width']">
      <div :class="[cart.main, 'secondary rounded']">
        <div :class="[cart.products, 'overflow-scroll']">
          <CartCard
            v-for="product in productsList"
            :key="product.id"
            v-bind="{ ...product }"
            v-on="{ increase, decrease, remove }"
            class="mb-4"
          ></CartCard>
        </div>
      </div>
      <div :class="[cart.price, 'pa-4 primary rounded d-flex flex-column']">
        <div class="mb-2 secondary-color d-flex justify-space-between">
          <h4 class="regular">مجموع قیمت کالاها</h4>
          <p class="bold font-size-10">
            {{ productsPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <div class="mb-2 secondary-color d-flex justify-space-between">
          <h4 class="regular">هزینه ارسال</h4>
          <p class="bold font-size-10">
            {{ deliveryPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <div class="secondary-color d-flex justify-space-between">
          <h4 class="regular">مبلغ نهایی</h4>
          <p class="bold font-size-10">
            {{ finalPrice }} <span class="regular">تومان</span>
          </p>
        </div>
        <hr v-if="options.length" class="my-2" />
        <SelectBar
          v-if="options.length"
          v-model="address"
          v-bind="{ title, options }"
          class="secondary-color"
        />
        <div class="grow-1 d-flex align-end">
          <button
            @click="buttonClicked"
            class="secondary rounded full-width text-center"
          >
            {{ buttonTitle }}
          </button>
        </div>
      </div>
    </section>
    <TheLogin v-if="isOpen" @close="toggleModal" />
  </div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";
import SelectBar from "@/components/SelectBar.vue";
import { mapActions, mapState } from "pinia";
import { fetchData } from "@/helpers/functions";
import { useGlobalVariable, useShoppingCart } from "@/store";
import TheLogin from "@/components/TheLogin.vue";

export default {
  components: { CartCard, SelectBar, TheLogin },
  data() {
    return {
      address: "",
      isOpen: false,
      title: "آدرس را انتخاب کنید",
    };
  },
  computed: {
    ...mapState(useGlobalVariable, ["screenSize", "isLoggedIn"]),
    ...mapState(useShoppingCart, {
      options: "addresses",
      productsList: "products",
    }),

    productsPrice() {
      let sum = 0;
      this.productsList?.map((product) => (sum += product.price * product.qty));
      return sum;
    },
    deliveryPrice() {
      return 60000;
    },

    finalPrice() {
      return this.productsPrice + this.deliveryPrice;
    },

    buttonTitle() {
      return this.isLoggedIn ? "پرداخت نهایی" : "ورود";
    },
  },
  methods: {
    ...mapActions(useShoppingCart, {
      increase: "increaseQty",
      decrease: "decreaseQty",
      remove: "removeItem",
      getAddresses: "getAddresses",
    }),
    buttonClicked() {
      if (!this.isLoggedIn) {
        this.isOpen = true;
      } else {
        let products = [];
        for (let product of this.productsList) {
          products.push({ product_id: product.id, qty: product.qty });
        }
        let body = JSON.stringify({
          address_id: this.address,
          products,
        });
        fetchData({ url: "/product/order/", method: "POST", body })
          .then((result) => {
            window.open(result.link, '_self');
            localStorage.removeItem('cart')
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
    this.getAddresses();
  },
};
</script>

<style lang="scss" module="cart">
.container {
  padding-top: 52%;

  .main {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;

    .products {
      position: absolute;
      top: 10%;
      bottom: 10%;
      right: 2%;
      width: 70%;
    }
  }

  .price {
    position: absolute;
    top: 10%;
    left: 0;
    width: 40%;
    height: 80%;
  }
}
</style>
