import { createRouter, createWebHistory } from "vue-router";

import InvoiceIndex from "../Components/invoices/InvoiceIndex.vue";
import NewInvoice from "../Components/invoices/NewInvoice.vue";
import ShowInvoice from "../Components/invoices/ShowInvoice.vue";
import EditInvoice from "../Components/invoices/EditInvoice.vue";
import NotFound from "../Components/NotFound.vue";

const routes = [
    {
        path: "/",
        component: InvoiceIndex,
        name: "InvoiceIndex",
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
        name: "NotFound",
    },
    {
        path: "/invoice/new",
        component: NewInvoice,
        name: "NewInvoice",
    },
    {
        path: "/invoice/show/:id",
        component: ShowInvoice,
        name: "ShowInvoice",
    },
    {
        path: "/invoice/edit/:id",
        component: EditInvoice,
        name: "EditInvoice",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;