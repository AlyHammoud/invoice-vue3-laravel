<template>
    <div class="container">
        <div class="invoices">
            <div class="card__header">

                <div>
                    <h2 class="invoice__title">Invoices</h2>
                </div>

                <div>
                    <a class="btn btn-secondary" @click="newInvoice"> New Invoice </a>
                </div>
            </div>

            <div class="table card__content">
                <div class="table--filter">
                    <span class="table--filter--collapseBtn">
                        <i class="fas fa-ellipsis-h"></i>
                    </span>
                    <div class="table--filter--listWrapper">
                        <ul class="table--filter--list">
                            <li>
                                <p
                                    class="table--filter--link table--filter--link--active"
                                >
                                    All
                                </p>
                            </li>
                            <li>
                                <p class="table--filter--link">Paid</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="table--search">
                    <div class="table--search--wrapper">
                        <select class="table--search--select" name="" id="">
                            <option value="">Filter</option>
                        </select>
                    </div>
                    <div class="relative">
                        <i class="table--search--input--icon fas fa-search"></i>
                        <input
                            class="table--search--input"
                            type="text"
                            placeholder="Search invoice"
                            v-model="searchInvoice"
                            @keyup="search"
                        />
                    </div>
                </div>

                <div class="table--heading">
                    <p>ID</p>
                    <p>Date</p>
                    <p>Number</p>
                    <p>Customer</p>
                    <p>Due Date</p>
                    <p>Total</p>
                </div>

                <!-- item 1 -->
                <div class="table--items" v-if="storeInvoice.isLoading">
                    Loading...
                </div>
                <div v-else>
                    <div class="" v-if="storeInvoice.getInvoices.length">
                        <div
                            class="table--items"
                            v-for="invoice in storeInvoice.getInvoices"
                            :key="invoice"
                        >
                            <a href="#" @click="onShow(invoice.id)">{{
                                invoice.id
                            }}</a>
                            <p>{{ invoice.date }}</p>
                            <p>#{{ invoice.number }}</p>
                            <p v-if="invoice.customer" >{{ invoice.customer.firstname }}</p>
                            <p v-else></p>
                            <p>{{ invoice.due_date }}</p>
                            <p>$ {{ invoice.total }}</p>
                        </div>
                    </div>
                    <div v-else class="table--items">
                        <p>No Invoices found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useInvoiceStore } from "@/stores/Invoices";
import { useRoute, useRouter} from 'vue-router';

const storeInvoice = useInvoiceStore();
const searchInvoice = ref([]);

const router = useRouter();

onMounted(async () => {
    await storeInvoice.fetchInvoices();
});

const search = async () => {
    await storeInvoice.searchInvoice(searchInvoice.value);
}

const newInvoice = async () => {
    // await storeInvoice.createInvoice();
    await router.push('/invoice/new');
}

const onShow = (id) => {
    router.push(`/invoice/show/${id}`);
}
</script>

<style></style>
