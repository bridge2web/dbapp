<template>    
    <main class="post-create">
        <app-bar>
            <btn-back slot="left" :to="backTo"/>
            <app-bar-title h1="Новое объявление" slot="center"/>            
        </app-bar>
        <category-list :tree="categoryTree" v-model="category_id" :initial-selected="category_id"/>
    </main>
</template>

<script>
    import $ from 'jquery';
    import AppBar from './AppBar.vue';
    import BtnBack from './BtnBack.vue';
    import AppBarTitle from './AppBarTitle.vue';
    import CategoryList from './CategoryList.vue';
    export default {
        props: {
            params: {
                type: Object,
                default: function () {
                    return {category_id: 0}
                }
            }
        },
        data: function () {
            return {
                backTo: this.params.category_id ? null : '/',
                category_id: parseInt(this.params.category_id),
                categoryTree: []
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            CategoryList
        },
        watch: {
            category_id: function (category_id) {
                this.$router.push({path: '/post/create', query: {category_id: category_id}})
            }
        },
        created: function () {
            this.fetch()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/category/tree')
                xhr.onload = function () {
                    self.categoryTree = JSON.parse(xhr.responseText)
                }
                xhr.send()
            }
        }
    }
</script>

<style>

</style>