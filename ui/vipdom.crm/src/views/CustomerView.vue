<template>
    <div class="about">
        <h1>This is customers page</h1>
        <CreateCustomer />
    </div>

    <!-- Retrieve all customers -->
    <div>
        <h1>All customers</h1>
        <ul>
            <li v-for="customer in customers" :key="customer._id">
                {{ customer.name }} ID : {{ customer._id }}
            </li>
        </ul>
    </div>
</template>

<script>
import CreateCustomer from "../components/CreateCustomer.vue";
import axios from "axios";

export default {
    name: "AboutView",
    components: {
        CreateCustomer,
    },
    data() {
        return {
            customers: [],
        };
    },
    async created() {
        await axios
            .get("http://localhost:3000/customers")
            .then((response) => {
                this.customers = response.data;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },
};
</script>
