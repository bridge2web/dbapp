<template>
    <main class="post-filter">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title h1="Фильтры" slot="center"/>
            <btn-submit value="Готово" slot="right" v-on:click="onSubmit"/>
        </app-bar>
        <category-list :tree="categoryTree" v-model="model.category_id" :initial-selected="model.category_id" :need-leaf="false" v-on:leaf="onSubmit"/>
    </main>
</template>

<script>
    import $ from 'jquery'
            import AppBar from './AppBar.vue'
            import BtnBack from './BtnBack.vue'
            import AppBarTitle from './AppBarTitle.vue'
            import BtnSubmit from './BtnSubmit.vue'
            import CategoryList from './CategoryList.vue';
    export default {
        name: 'post-filter',
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            BtnSubmit,
            CategoryList
        },
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
                state: '',
                model: {
                    category_id: parseInt(this.params.category_id)
                },
                categoryTree: []
            }
        },
        created: function () {
            this.state = 'load'
            this.load()
            this.fetch()
        },
        watch: {
            category_id: function (val) {
                this.save()
                this.$router.push({path: '/post/filter'})
            }
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/category/tree')
                xhr.onload = function () {
                    self.categoryTree = JSON.parse(xhr.responseText)
                    self.state = 'loaded'
                }
                xhr.send()
            },
            onSubmit: function () {
                this.save()
                this.$router.push({path: '/post/filter'})
            },
            load: function () {
                var searchModel = JSON.parse(localStorage.getItem('postFilter'))
                if (!searchModel) {
                    localStorage.setItem('postFilter', JSON.stringify({}))
                } else {
                    for (var prop in searchModel) {
                        if (searchModel.hasOwnProperty(prop)) {
                            this.$set(this.model, prop, searchModel[prop])
                        }
                    }
                }
            },
            save: function () {
                localStorage.setItem('postFilter', JSON.stringify(this.model))
            }
        }
    }
</script>

<style>

</style>
