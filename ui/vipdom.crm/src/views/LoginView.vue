<template>
    <img alt="Vue logo" src="../assets/logo.png" />

    <LoginComponent />
</template>
<script>
import LoginComponent from "../components/LoginComponent.vue";

export default {
    name: "LoginPage",
    components: {
        LoginComponent,
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
    width: 90%;
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
