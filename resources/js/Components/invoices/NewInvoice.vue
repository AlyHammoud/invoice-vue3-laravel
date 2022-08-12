<template>
    <div class="container">
        <div class="invoices">
            <div class="card__header">
                <div>
                    <router-link
                        to="/"
                        style="color: white; text-decoration: none"
                    >
                        <h2 class="invoice__title">New Invoice</h2>
                    </router-link>
                </div>
                <div></div>
            </div>

            <div class="card__content">
                <div class="card__content--header">
                    <div>
                        <p class="my-1">Customer</p>
                        <select
                            name=""
                            id=""
                            class="input"
                            v-model="costomer_id"
                        >
                            <option value="" disabled>Select a customer</option>
                            <option
                                v-for="customer in storeCustomer.getCustomers"
                                :key="customer"
                                :value="customer.id"
                            >
                                {{ customer.firstname }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <p class="my-1">Date</p>
                        <input
                            id="date"
                            placeholder="dd-mm-yyyy"
                            type="date"
                            class="input"
                            v-model="form.date"
                        />
                        <!---->
                        <p class="my-1">Due Date</p>
                        <input
                            id="due_date"
                            type="date"
                            class="input"
                            v-model="form.due_date"
                        />
                    </div>
                    <div>
                        <p class="my-1">Numero</p>
                        <input
                            type="text"
                            class="input"
                            v-model="form.number"
                        />
                        <p class="my-1">Reference(Optional)</p>
                        <input
                            type="text"
                            class="input"
                            v-model="form.reference"
                        />
                    </div>
                </div>
                <br /><br />
                <div class="table">
                    <div class="table--heading2">
                        <p>Item Description</p>
                        <p>Unit Price</p>
                        <p>Qty</p>
                        <p>Total</p>
                        <p></p>
                    </div>

                    <!-- item 1 -->
                    <div
                        class="table--items2"
                        v-for="(itemCart, i) in listCart"
                        :key="i"
                    >
                        <p>
                            #{{ itemCart.item_code }} {{ itemCart.description }}
                        </p>
                        <p>
                            <input
                                type="text"
                                class="input"
                                v-model="itemCart.unit_price"
                            />
                        </p>
                        <p>
                            <input
                                type="text"
                                class="input"
                                v-model="itemCart.quantity"
                            />
                        </p>
                        <p v-if="itemCart.quantity">
                            $ {{ itemCart.quantity * itemCart.unit_price }}
                        </p>
                        <p v-else></p>
                        <p style="color: red; font-size: 24px; cursor: pointer" @click="removeItem(i)">
                            &times;
                        </p>
                    </div>
                    <div style="padding: 10px 30px !important">
                        <button
                            class="btn btn-sm btn__open--modal"
                            @click="showModel = !showModel"
                        >
                            Add New Line
                        </button>
                    </div>
                </div>

                <div class="table__footer">
                    <div class="document-footer">
                        <p>Terms and Conditions</p>
                        <textarea
                            cols="50"
                            rows="7"
                            class="textarea"
                            v-model="form.terms_and_conditions"
                        ></textarea>
                    </div>
                    <div>
                        <div class="table__footer--subtotal">
                            <p>Sub Total</p>
                            <span>$ {{ subTotal() }}</span>
                        </div>
                        <div class="table__footer--discount">
                            <p>Discount</p>
                            <input type="text" class="input" v-model="form.discount" />
                        </div>
                        <div class="table__footer--total">
                            <p>Grand Total</p>
                            <span>$ {{ total() }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card__header" style="margin-top: 40px">
                <div></div>
                <div  @click="onSave">
                    <a class="btn btn-secondary"> Save All </a>
                </div>
            </div>
        </div>

        <!--==================== add modal items ====================-->
        <div class="modal main__modal" :class="{ show: showModel }">
            <div class="modal__content">
                <span
                    class="modal__close btn__close--modal"
                    @click="showModel = !showModel"
                    >×</span
                >
                <h3 class="modal__title">Add Item</h3>
                <hr />
                <br />
                <div class="modal__items">
                    <ul style=" style-decoration: none;">
                        <li
                            v-for="(item, i) in storeProduct.products"
                            :key="i"
                            style="
                                display: grid;
                                grid-template-columns: 30px 350px 15px;
                                align-items: center;
                                padding-bottom: 5px;
                            "
                        >
                            <p>{{ i + 1 }}</p>
                            <a href="#"
                                >{{ item.item_code }} {{ item.description }}</a
                            >
                            <button
                                @click="addCart(item)"
                                style="
                                    border: 1px solid #e0e0e0;
                                    width: 35px;
                                    height: 35px;
                                    cursor: pointer;
                                "
                            >
                                +
                            </button>
                        </li>
                    </ul>
                </div>
                <br />
                <hr />
                <div class="model__footer">
                    <button
                        class="btn btn-light mr-2 btn__close--modal"
                        @click="showModel = !showModel"
                    >
                        Cancel
                    </button>
                    <button class="btn btn-light btn__close--modal">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useInvoiceStore } from "@/stores/Invoices";
import { useCustomersStore } from "@/stores/Customers";
import { useProductsStore } from "@/stores/Products";
import { useRoute, useRouter } from "vue-router";

const form = ref([]);
const allCustomers = ref([]);
const costomer_id = ref([]);
const item = ref([]);
const listCart = ref([]);
const listProducts = ref([]);

const showModel = ref(false);

const storeInvoice = useInvoiceStore();
const storeCustomer = useCustomersStore();
const storeProduct = useProductsStore();

const router = useRouter();

onMounted(async () => {
    indexForm();
    await storeCustomer.getAllCustomers();
    await storeProduct.getAllProducts();
});

const indexForm = async () => {
    const response = await storeInvoice.createInvoice();
    form.value = response.data;
};

const addCart = (item) => {
    const itemCart = {
        id: item.id,
        item_code: item.item_code,
        description: item.description,
        unit_price: item.unit_price || 1,
        quantity: item.quantity || 1,
    };

    listCart.value.push(itemCart);
    showModel.value = false;
};

const removeItem = (index) => {
    listCart.value.splice(index,1);
}

const subTotal = () => {
    let total = 0;
    listCart.value.map((data) => {
        total = total + (data.quantity*data.unit_price)
    });

    return total;
}

const total = () => subTotal() - form.value.discount;

        
const onSave = async () => {
    if(listCart.value){
        form.value.total = total();
        form.value.sub_total = subTotal();
        await storeInvoice.saveInvoice(costomer_id.value, form.value, listCart.value);
        await router.push('/');
    }
}
</script>

<style></style>
