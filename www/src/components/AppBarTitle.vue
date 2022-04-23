<template>
    <div class="app-bar-title">
        <div class="header__h1" v-if="h1" v-html="h1"></div>
        <div class="header__h2" v-if="h2" v-html="h2"></div>
    </div>
</template>

<script>
    export default {
        name: 'app-bar-title',
        props: ['h1', 'h2', 'count']
    }
</script>

<style>
    .header__h1 {
        font-size: 16px;
        font-weight: 500;
    }
</style>
