<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
        <h1>All customers</h1>
        <ul>
            <li v-for="customer in customers" :key="customer._id">
                {{ customer.name }} ID : {{ customer._id }}
            </li>
        </ul>
    </div>
    <div>
        <h1>All users</h1>
        <ul>
            <li v-for="user in users" :key="user._id">
                {{ user.name }} ID : {{ user._id }}
            </li>
        </ul>
    </div>
    <div>
        <h1>All properties</h1>
        <ul>
            <li v-for="property in properties" :key="property._id">
                {{ property.name }} ID : {{ property._id }}
            </li>
        </ul>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';

export default {
    name: 'App',
    components: {
        HelloWorld,
    },
    data() {
        return {
            customers: [],
            users: [],
            properties: [],
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
        axios
            .get('http://localhost:3000/properties')
            .then((response) => {
                this.properties = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
