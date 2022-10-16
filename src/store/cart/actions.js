import { fetchData } from "@/helpers/functions";

export default {
  addProduct(product) {
    const indexNumber = this.products.findIndex(
      (item) => item.id === product.id
    );
    if (indexNumber === -1) {
      this.products.push(product);
    } else {
      this.products[indexNumber].qty++;
    }
    this.updateStorage();
  },
  increaseQty(id) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index].qty++;
    this.updateStorage();
  },

  decreaseQty(id) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index].qty--;
    this.updateStorage();
  },

  removeItem(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.updateStorage();
  },
  updateStorage() {
    localStorage.setItem("cart", JSON.stringify(this.products));
  },
  async getAddresses() {
    await fetchData({
      url: "/user/profile/",
    })
      .then((result) => {
        this.addresses = result.addresses;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
