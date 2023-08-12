<template>
    <div class="form-container">
        <h2>Assign customer to the user</h2>
        <form @submit.prevent="assignCustomerToUser">
            <div class="form-group">
                <label class="label" for="users">Users:</label>
                <select
                    name="user"
                    id="user"
                    class="input"
                    v-model="customerAndUserData.userId"
                    required
                >
                    <option
                        value="user.id"
                        v-for="user in users"
                        :key="user.id"
                    >
                        User: {{ user.id }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label class="label" for="customers">Customers:</label>
                <select
                    name="customer"
                    id="customer"
                    class="input"
                    v-model="customerAndUserData.customerId"
                    required
                >
                    <option
                        value="customer.id"
                        v-for="customer in customers"
                        :key="customer.id"
                    >
                        Customer: {{ customer.id }}
                    </option>
                </select>
            </div>

            <button class="submit-button" type="submit">
                Assign customer to the user
            </button>
        </form>

        <success-modal v-if="showModal" @close="closeModal">
            <template #header> Success! </template>
            <template #body> Property created successfully. </template>
        </success-modal>
    </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from './SuccessModal.vue';

export default {
    components: {
        SuccessModal,
    },
    data() {
        return {
            customers: [],
            users: [],
            customerAndUserData: {
                userId: '',
                customerId: '',
            },
            showModal: false,
        };
    },
    created() {
        axios
            .get('http://localhost:3000/customers')
            .then((response) => {
                this.customers = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('http://localhost:3000/users')
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },
    methods: {
        async assignCustomerToUser() {
            await axios
                .post(
                    'http://localhost:3000/customerAndUserData',
                    this.propertyData
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.error(e);
                });

            // Clear form fields after successful submission
            this.customers = '';
            this.users = '';

            // Open success modal
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
};
</script>
<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #3dc21b;
    margin-top: 60px;
}

.form-container {
    max-width: 350px;
    margin: 0 auto;
    padding: 20px;
    border: 3px solid #147d6d;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.form-group {
    margin-bottom: 15px;
}

.label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.submit-button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
