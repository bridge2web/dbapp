<template>
    <button class="btn_submit mdl-button mdl-js-button mdl-js-ripple-effect" @click="onClick">{{ value }}</button>
</template>

<script>
    export default {
        name: 'btn-submit',
        props: ['value'],
        methods: {
            onClick: function () {
                this.$emit('click')
            }
        }
    }
</script>

<style>
    .btn_submit {
        float: right;
        padding: 0px 10px;
    }
</style>
