<template>
    <div class="login-form">
        <h2>Please, log in</h2>
        <form @submit.prevent="login"></form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        login() {},
    },
};
</script>

<style></style>
