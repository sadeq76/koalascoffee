import { defineStore } from "pinia";
import actions from "./actions";

export const cart = defineStore({
  id: "cart",
  state: () => ({
    products: [],
    categories: [
      {
        title: "پودر و دانه قهوه",
        value: "bean",
        sub: [
          { title: "قهوه های تک خواستگاه", value: "single-region" },
          { title: "قهوه های ترکیبی", value: "multi" },
          { title: "قهوه های ترک", value: "turk" },
        ],
      },
      { title: "قهوه فوری", value: "powder" },
      { title: "سایر محصولات", value: "other" },
      { title: "اکسسوری های قهوه", value: "accessories" },
      { title: "ماگ", value: "mug" },
      { title: "جعبه هدیه", value: "gift" },
    ],
    addresses: [],
  }),
  actions,
});
