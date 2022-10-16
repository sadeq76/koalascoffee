import { defineStore } from "pinia";
import { cart } from "./cart/index";
import getters from "./getters";
import actions from "./actions";

export const useGlobalVariable = defineStore({
  id: "globalVars",
  state: () => ({
    modal: false,
    isLoggedIn: !!localStorage.getItem('token'),
    size: {
      xs: document.documentElement.clientWidth <= 600,
      sm:
        document.documentElement.clientWidth <= 750 &&
        document.documentElement.clientWidth > 600,
      md:
        document.documentElement.clientWidth <= 1264 &&
        document.documentElement.clientWidth > 750,
      lg:
        document.documentElement.clientWidth <= 1904 &&
        document.documentElement.clientWidth > 1264,
      xl: document.documentElement.clientWidth >= 1904,
    },
  }),
  getters,
  actions,
});

export const useShoppingCart = cart;
