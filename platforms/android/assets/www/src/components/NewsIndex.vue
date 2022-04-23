<template>
    <main class="news">
        <app-bar>
            <btn-back slot="left" to="/"/>
            <app-bar-title h1="Новости" slot="center"/>
        </app-bar>
        <category-select :category-list="categoryList" v-model="categoryId" v-if="categoryList.length" />
        <div class="wrapper">
            <h2 class="h1 news__h">Популярное</h2>
            <news-list :news-list="popList" v-if="popList.length"/>
            <h2 class="h1 news__h">Свежее</h2>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <news-list :news-list="newsList" v-if="newsList.length"/>
            </div>
        </div>
    </main>
</template>

<script>
    import AppBar from './AppBar.vue';
    import BtnBack from './BtnBack.vue';
    import AppBarTitle from './AppBarTitle.vue';
    import CategorySelect from './CategorySelect.vue';
    import NewsList from './NewsList.vue';
    export default {
        props: {
            params: {
                type: Object,
                default: function () {
                    return {page: 1}
                }
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            CategorySelect,
            NewsList
        },
        data: function () {
            return {
                categoryId: 0,
                categoryList: [],
                popList: [],
                newsList: []
            }
        },
        created: function () {
            this.fetch()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/news')
                xhr.onload = function () {
                    var data = JSON.parse(xhr.responseText)
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            self.$set(self, prop, data[prop])
                        }
                    }
                }
                xhr.send()
            },
            loadMore: function () {
                this.busy = true;
                setTimeout(() => {
                    var xhr = new XMLHttpRequest()
                    var self = this
                    if ('page' in this.params) {
                        this.params.page++;
                    } else {
                        this.params.page = 1;
                    }
                    xhr.open('GET', 'http://m.delovoibiysk.ru/news?page=' + this.params.page)
                    xhr.onload = function () {
                        var data = JSON.parse(xhr.responseText)
                        self.newsList = self.newsList.concat(data.newsList);
                    }
                    xhr.send()
                    this.busy = false;
                }, 1000);
            }
        },
        watch: {
            'categoryId': function (categoryId) {
                this.$router.push({path: '/news-category/view', query: {id: categoryId}});
            }
        }
    }
</script>

<style>
    .news__h {
        margin-top: 0px; 
        margin-bottom: 8px;
        line-height: normal;
    }
    .category-select {
        margin-bottom: 8px;
    }
    .category-item__name {
        padding: 12px;
        text-transform: uppercase;
        font-weight: bold;
    }
</style>
