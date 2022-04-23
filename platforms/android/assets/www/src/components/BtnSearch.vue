<template>
    <div class="header__btn search__toggle btn_search" v-on:click="onClick"></div>
</template>

<script>
    export default {
        name: 'btn-search',
        methods: {
            onClick: function (event) {
                this.$router.push({path: '/post', query: {search: true}})
                window.location.reload()
            }
        }
    }
</script>

<style>
    .btn_search {
        float: right;
        background: url('../assets/android/images/btn_search.svg') no-repeat 50% 50%;
        width: 24px;
        height: 24px;
    }
</style>
