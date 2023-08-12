<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <CreateProperty />
    <CreateCustomer />
    <CreateUser />
    <AssignCustomerToUser />

    <!-- Retrieve all customers -->
    <div>
        <h1>All customers</h1>
        <ul>
            <li v-for="customer in customers" :key="customer._id">
                {{ customer.name }} ID : {{ customer._id }}
            </li>
        </ul>
    </div>

    <!-- Retrieve all users -->
    <div>
        <h1>All users</h1>
        <ul>
            <li v-for="user in users" :key="user._id">
                {{ user.name }} ID : {{ user._id }}
            </li>
        </ul>
    </div>

    <!-- Retrieve all properties -->
    <div>
        <h1>All properties</h1>
        <ul>
            <li v-for="property in properties" :key="property._id">
                {{ property.name }} ID : {{ property._id }}
                <p>
                    Price:
                    {{
                        property.priceUSD
                            ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0,
                              }).format(property.priceUSD)
                            : 'not selected'
                    }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import CreateProperty from '@/components/CreateProperty.vue';
import CreateCustomer from '@/components/CreateCustomer.vue';
import CreateUser from '@/components/CreateUser.vue';
import AssignCustomerToUser from './components/AssignCustomerToUser.vue';
import axios from 'axios';

export default {
    name: 'App',
    components: {
        // HelloWorld,
        CreateProperty,
        CreateCustomer,
        CreateUser,
        AssignCustomerToUser,
    },
    data() {
        return {
            customers: [],
            users: [],
            properties: [],
            propertyData: {
                id: '',
                name: '',
                type: '',
                priceUSD: '',
            },
            customerData: {
                id: 33,
                name: 'Stephanio123123',
                email: 'v894621323423312335sdm@ml.com',
                type: 'buyer',
            },
            showModal: false,
        };
    },
    async created() {
        await axios
            .get('http://localhost:3000/customers')
            .then((response) => {
                this.customers = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        await axios
            .get('http://localhost:3000/users')
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        await axios
            .get('http://localhost:3000/properties')
            .then((response) => {
                this.properties = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },
    methods: {
        async sendRequest() {
            await axios
                .post('http://localhost:3000/newcustomer', this.customerData)
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        async createProperty() {
            await axios
                .post('http://localhost:3000/newproperty', this.propertyData)
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.error(e);
                });

            // Clear form fields after successful submission
            this.propertyData.name = '';
            this.propertyData.type = '';
            this.propertyData.id = '';
            this.propertyData.priceUSD = '';

            // Open success modal
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
};
</script>

<style>
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
