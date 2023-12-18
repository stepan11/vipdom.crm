<template>
    <div class="about">
        <h1>This is properties page</h1>
        <CreateProperty />
    </div>

    <!-- Retrieve all properties -->
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
import CreateProperty from "../components/CreateProperty.vue";
import axios from "axios";

export default {
    name: "AboutView",
    components: {
        CreateProperty,
    },
    data() {
        return {
            properties: [],
        };
    },
    async created() {
        await axios
            .get("http://localhost:3000/properties")
            .then((response) => {
                this.properties = response.data;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },
};
</script>
