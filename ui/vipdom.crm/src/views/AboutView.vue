<template>
    <div class="about">
        <h1>This is an about page</h1>
        <CreateUser />
    </div>
</template>

<script>
import CreateUser from "../components/CreateUser.vue";

export default {
    name: "AboutView",
    components: {
        CreateUser,
    },
};
</script>
