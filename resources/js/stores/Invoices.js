import { defineStore, acceptHMRUpdate } from "pinia";
import axiosClient from "../axios";

export const useInvoiceStore = defineStore("useInvoiceStore", {
    //state
    state: () => ({
        invoices: [],
        invoicesLoader: false,
        invoice: null
    }),

    //actions
    actions: {
        async fetchInvoices() {
            this.invoicesLoader = true;
            return axiosClient.get("get_all_invoices").then(({ data }) => {
                this.invoices = data.invoices.data;
                this.invoicesLoader = false;
            });
        },

        async searchInvoice(searchInvoice){
            return axiosClient.get(`search_invoice?s=${searchInvoice}`)
                .then(({data}) => {
                    this.invoices = data.invoices.data;
                })
        },

        async createInvoice(){
            return axiosClient.post('/create_invoice');
        },

        async saveInvoice(customer_id, form, listCart){
            return axiosClient.post("/saveInvoice", {
                customer_id,
                form,
                listCart,
            });
        },

        async show_invoice(id){
            return axiosClient.get(`show_invoice/${id}`).then(({data}) => {
                this.invoice = data.invoice;
            })

        },

        async edit_invoice(id){
            return axiosClient.put(`edit_invoice/${id}`);
        }
    },
    
    //getters
    getters: {
        getInvoices: (state) => state.invoices,
        getInvoice: (state) => state.invoice,
        isLoading: (state) => state.invoicesLoader,
    },
});


if (import.meta.hot) { //update without reloading the page if any state or actions of getters naming change
    import.meta.hot.accept(acceptHMRUpdate(useInvoiceStore, import.meta.hot));
}