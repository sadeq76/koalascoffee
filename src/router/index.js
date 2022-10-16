import { createRouter, createWebHistory } from "vue-router";

//pages
import TheLanding from "../pages/TheLanding.vue";
import TheSupport from "../pages/TheSupport.vue";
import TheCart from "../pages/TheCart.vue";
import TheShop from "../pages/TheShop.vue";
import TheProduct from "../pages/TheProduct.vue";
import TheProductsList from "../pages/TheProductsList.vue";
import TheBlogsList from "../pages/TheBlogsList.vue";
import TheBlog from "../pages/TheBlog.vue";
import TheProfile from "../pages/TheProfile.vue";
import TheAddressesList from "../pages/TheAddressesList.vue";
import TheOrdersList from "../pages/TheOrdersList.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: TheLanding, name: "landing" },
    { path: "/shop", component: TheShop, name: "shop" },
    { path: "/products/:category", component: TheProductsList, name: "products" },
    {
      path: "/product/:id",
      component: TheProduct,
      name: "product",
    },
    { path: "/blogs", component: TheBlogsList, name: "blogs" },
    { path: "/blog/:id", component: TheBlog, name: "blog" },
    { path: "/support", component: TheSupport, name: "support" },
    { path: "/cart", component: TheCart, name: "cart" },
    { path: "/profile", component: TheProfile, name: "profile" },
    { path: "/addresses", component: TheAddressesList, name: "addresses" },
    { path: "/orders", component: TheOrdersList, name: "orders" },
  ],
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
