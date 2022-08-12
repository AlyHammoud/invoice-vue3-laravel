import { defineStore, acceptHMRUpdate } from "pinia";
import axiosClient from "../axios";

export const useCustomersStore = defineStore("useCustomersStore", {
    //state
    state: () => ({
        customers: [],
        customersLoader: false,
    }),

    //actions
    actions: {
        async getAllCustomers() {
            return axiosClient.get("/customers").then(({ data }) => {
                this.customers = data.customers;
            });
        },
    },

    //getters
    getters: {
        getCustomers: (state) => state.customers,
        isLoading: (state) => state.customersLoader,
    },
});

if (import.meta.hot) {
    //update without reloading the page if any state or actions of getters naming change
    import.meta.hot.accept(acceptHMRUpdate(useCustomersStore, import.meta.hot));
}
