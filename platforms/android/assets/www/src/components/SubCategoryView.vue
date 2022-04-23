<template>    
    <main class="post-index">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title :h1="h1" slot="center"/>
            <btn-search slot="right"/>
        </app-bar>
        <category-select :parent="category.id" v-model="category.id"/>
        <post-list :list="list" :subcategory-depth="3"/>
    </main>
</template>

<script>
    import $ from 'jquery';
    import AppBar from './AppBar.vue';
    import BtnBack from './BtnBack.vue';
    import AppBarTitle from './AppBarTitle.vue';
    import BtnSearch from './BtnSearch.vue';
    import CategorySelect from './CategorySelect.vue';
    import PostList from './PostList.vue';
    export default {
        name: 'category-view',
        props: {
            params: {
                type: Object
            }
        },
        data: function () {
            return {
                category: {id: parseInt(this.params.id), name: 'Все'},
                list: [],
                h1: ''
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            BtnSearch,
            CategorySelect,
            PostList
        },
        watch: {
            'category.id': function (categoryId) {
                this.$router.push({path: '/sub-sub-category/view', query: {id: categoryId}});
            }
        },
        created: function () {
            this.fetch()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this

                xhr.open('GET', 'http://m.delovoibiysk.ru/category/view?' + $.param(this.$props.params))
                xhr.onload = function () {
                    var data = JSON.parse(xhr.responseText)
                    self.list = data.list;
                    self.h1 = data.model.name;
                }
                xhr.send()
            }
        }
    }
</script>

<style>

</style>
