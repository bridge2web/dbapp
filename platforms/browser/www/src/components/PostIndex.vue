<template>    
    <main class="post-index">
        <search-bar v-if="params.search" v-model="searchModel.q"/>
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title :h1="h1" :h2="h2" slot="center"/>
            <btn-filter slot="right"  @click="onFilterClick"/>
            <btn-search slot="right"/>            
        </app-bar>

        <category-select :categoryList="categoryList" v-model="searchModel.category_id" :initialSelected="searchModel.category_id"/>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <post-list :list="list" :subcategory-depth="1" :q="searchModel.q"/>
        </div>

        <div class="wrapper wrapper_x_2" v-if="notFound">
            <div class="h1" style="margin-top: 28px">По вашему запросу ничего не найдено</div>
            <p>Попробуйте сократить или задать запрос по-другому.</p>
            <p>Установите более мягкие ограничения.</p>
            <p>Или перейдите на страницу<br><router-link :to="{path: '/post', query: {reset: true}}">всех объявлений</router-link>.</p>
        </div>
    </main>
</template>

<script>
    import $ from 'jquery'
            import AppBar from './AppBar.vue'
            import BtnBack from './BtnBack.vue'
            import AppBarTitle from './AppBarTitle.vue'
            import BtnSearch from './BtnSearch.vue'
            import SearchBar from './SearchBar.vue'
            import BtnFilter from './BtnFilter.vue'
            import CategorySelect from './CategorySelect.vue'
            import PostList from './PostList.vue'
            export default {
                name: 'post-index',
                props: {
                    params: {
                        type: Object,
                        default: function () {
                            return {
                                search: false,
                                reset: false,
                                category_id: 0
                            }
                        }
                    }
                },
                data: function () {
                    return {
                        state: '',
                        searchModel: {
                            category_id: this.params.category_id,
                            q: '',
                            page: 1
                        },
                        notFound: false,
                        categorySet: [],
                        categoryList: [],
                        list: []
                    }
                },
                components: {
                    AppBar,
                    BtnBack,
                    AppBarTitle,
                    BtnSearch,
                    SearchBar,
                    BtnFilter,
                    CategorySelect,
                    PostList
                },
                watch: {
                    'searchModel.category_id': function (val) {
                        if (this.state == 'loaded') {
                            this.save()
                            this.$router.push({path: '/post'})
                            window.location.reload()
                        }
                    },
                    'searchModel.q': function (val) {
                        if (this.state == 'loaded') {
                            this.searchModel.page = 1
                            this.save()
                            this.fetch()
                        }
                    }
                },
                created: function () {
                    this.state = 'load'
                    if (this.params.reset) {
                        this.clear()
                    } else {
                        this.load()
                    }
                    this.fetch()
                },
                methods: {
                    fetch: function () {
                        var xhr = new XMLHttpRequest()
                        var self = this
                        xhr.open('GET', 'http://m.delovoibiysk.ru/post?' + self.modelParam)
                        xhr.onload = function () {
                            var data = JSON.parse(xhr.responseText)
                            for (var prop in data) {
                                if (data.hasOwnProperty(prop)) {
                                    self.$set(self, prop, data[prop])
                                }
                            }
                            self.notFound = !self.list || !self.list.length
                            self.state = 'loaded'
                        }
                        xhr.send()
                    },
                    loadMore: function () {
                        this.busy = true;
                        setTimeout(() => {
                            var xhr = new XMLHttpRequest()
                            var self = this
                            if ('page' in this.searchModel) {
                                this.searchModel.page++;
                            } else {
                                this.searchModel.page = 1;
                            }
                            xhr.open('GET', 'http://m.delovoibiysk.ru/post?' + self.modelParam)
                            xhr.onload = function () {
                                var data = JSON.parse(xhr.responseText)
                                self.list = self.list.concat(data.list)
                                self.state = 'loaded'
                            }
                            xhr.send()
                            this.busy = false;
                        }, 1000)
                    },
                    onFilterClick: function () {
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
                                    this.$set(this.searchModel, prop, searchModel[prop])
                                }
                            }
                        }
                        if (!this.params.search)
                            this.searchModel.q = ''
                    },
                    save: function () {
                        if (!this.params.search)
                            this.searchModel.q = ''
                        this.searchModel.page = 1
                        localStorage.setItem('postFilter', JSON.stringify(this.searchModel))
                    },
                    clear: function () {
                        localStorage.setItem('postFilter', JSON.stringify({}))
                    }
                },
                computed: {
                    h1: function () {
                        if (!this.searchModel.category_id)
                            return 'Объявления'
                        if (this.categorySet && this.categorySet.length) {
                            var h1 = this.categorySet.find(function (node) {
                                return node.depth == 1
                            })
                            if (!h1)
                                return 'Объявления'
                            return h1.name
                        }
                        return ''
                    },
                    h2: function () {
                        if (!this.searchModel.category_id)
                            return null
                        if (this.categorySet && this.categorySet.length) {
                            var h2 = this.categorySet.find(function (node) {
                                return node.id == this
                            }, this.searchModel.category_id)
                            if (!h2)
                                return null
                            return h2.name
                        }

                        return null
                    },
                    modelParam: function () {
                        var modelParam = {}
                        for (var prop in this.searchModel) {
                            if (this.searchModel.hasOwnProperty(prop)) {
                                if (!this.searchModel[prop]) continue
                                if (prop == 'meta') {
                                    var meta = {}
                                    for (var metaKey in this.searchModel['meta']) {
                                        if (this.searchModel['meta'][metaKey]) this.$set(meta, metaKey, this.searchModel['meta'][metaKey])
                                    }
                                    this.$set(modelParam, prop, meta)
                                    continue
                                }
                                this.$set(modelParam, prop, this.searchModel[prop])
                            }
                        }
                        return $.param(modelParam)
                    }
                }
            }
</script>

<style>

</style>
