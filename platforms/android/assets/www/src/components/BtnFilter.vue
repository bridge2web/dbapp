<template>
    <div class="header__btn header__btn_filter btn_filter" @click="onClick"></div>
</template>

<script>
    export default {
        name: 'btn-filter',
        methods: {
            onClick: function () {
                this.$emit('click')
            }
        }
    }
</script>

<style>
    .btn_filter {
        float: right;
        background: url('../assets/android/images/btn_filter.svg') no-repeat 50% 50%;
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }
</style>
