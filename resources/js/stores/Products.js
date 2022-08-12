import { defineStore, acceptHMRUpdate } from "pinia";
import axiosClient from "../axios";

export const useProductsStore = defineStore("useProductsStore", {
    //state
    state: () => ({
        products: [],
        productsLoader: false,
    }),

    //actions
    actions: {
        async getAllProducts() {
            return axiosClient.get("/products").then(({ data }) => {
                this.products = data.products;
            });
        },
    },

    //getters
    getters: {
        getProducts: (state) => state.products,
        isLoading: (state) => state.productsLoader,
    },
});

if (import.meta.hot) {
    //update without reloading the page if any state or actions of getters naming change
    import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot));
}
