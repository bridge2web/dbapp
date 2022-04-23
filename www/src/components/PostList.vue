<template>
    <div class="post-list wrapper">
        <template v-for="item in list">
            <post-item :subcategory-depth="subcategoryDepth" :model="item" :q="q"/>
        </template>
    </div>
</template>

<script>
    import $ from 'jquery';
    import PostItem from './PostItem.vue';
    export default {
        name: 'post-list',
        components: {
            PostItem
        },
        props: {
            q: {
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default: []
            },
            subcategoryDepth: {
                type: Number,
                default: 1
            }
        }
    }
</script>

<style>

</style>
