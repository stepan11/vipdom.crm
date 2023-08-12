<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div class="modal-header">
                <slot name="header">Success!</slot>
            </div>
            <div class="modal-body">
                <slot name="body">User created successfully.</slot>
            </div>
            <div class="modal-footer">
                <button class="modal-button" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
/* Add styling for your modal here */
</style>
