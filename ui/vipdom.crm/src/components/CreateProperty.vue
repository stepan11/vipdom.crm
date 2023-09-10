<template>
    <div class="form-container">
        <h2>Create a new property</h2>
        <form @submit.prevent="createProperty">
            <div class="form-group">
                <label class="label" for="name">Name:</label>
                <input
                    class="input"
                    v-model="propertyData.name"
                    type="text"
                    id="name"
                    required
                />
            </div>

            <div class="form-group">
                <label class="label" for="id">ID:</label>
                <input
                    class="input"
                    v-model="propertyData.id"
                    type="number"
                    id="id"
                    required
                />
            </div>

            <div class="form-group">
                <label class="label" for="type">Type:</label>
                <select
                    class="input"
                    v-model="propertyData.type"
                    id="type"
                    required
                >
                    <option value="house">House</option>
                    <option value="appartment">Appartment</option>
                    <option value="spot">Spot</option>
                </select>
            </div>

            <div class="form-group">
                <label class="label" for="price">Price:</label>
                <input
                    class="input"
                    v-model="propertyData.priceUSD"
                    type="number"
                    id="priceUSD"
                    required
                />
            </div>

            <button class="submit-button" type="submit">
                Create a property
            </button>
        </form>

        <success-modal v-if="showModal" @close="closeModal">
            <template #header> Success! </template>
            <template #body> Property created successfully. </template>
        </success-modal>
    </div>
</template>

<script>
import axios from "axios";
import SuccessModal from "./SuccessModal.vue";

export default {
    components: {
        SuccessModal,
    },
    data() {
        return {
            propertyData: {
                id: "",
                name: "",
                type: "",
                priceUSD: "",
            },
            showModal: false,
        };
    },
    methods: {
        async createProperty() {
            await axios
                .post("http://localhost:3000/newproperty", this.propertyData)
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.error(e);
                });

            // Clear form fields after successful submission
            this.propertyData.name = "";
            this.propertyData.type = "";
            this.propertyData.id = "";
            this.propertyData.priceUSD = "";

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
