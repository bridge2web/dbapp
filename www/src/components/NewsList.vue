<template>
    <div class="news-list home__news-list">
        <template v-for="item in list">
            <router-link v-bind:to="'/news/' + item.id" class="news-list-item card-shadow_1">                            
                <div class="news-list-item__thumbnail">
                    <div class="news-list-item__category" v-bind:style="{color: item.category.color}">{{ item.category.name }}</div>
                    <img class="news-list-item__img" v-bind:src="item.thumbnail" :alt="item.title">
                </div>
                <div class="news-list-item__content">
                    <div class="news-list-item__h">{{ item.title }}</div>
                    <div class="news-list-item__date">{{ item.prettyDatetime }}</div>
                </div>
            </router-link>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'news-list',
        props: {
            newsList: {
                type: Array,
                default: () => []
            }
        },
        data: function () {
            return {
                list: this.newsList
            }
        },
        watch: {
            newsList: function (newsList) {
                this.list = newsList
            }
        }
    }
</script>

<style>
    .news-list-item {
        border-radius: 2px;
        background: #fff;
        display: table;
        height: 168px;
        width: 100%;
        color: #000;
        margin-bottom: 8px;
    }

    .news-list-item__category {
        margin-left: 8px;
        margin-top: 8px;
        z-index: 1;
        position: absolute;
        background: #fff;
        border-radius: 2px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: .050em;
    }

    .news-list-item__thumbnail {
        display: table-cell;
        width: 120px;    
        overflow: hidden;
        position: relative;
        border-radius: 2px 0px 0px 2px;
    }

    .news-list-item__img {
        display: block;
        width: 192px;
        height: 168px;
        position: absolute;
        left: -50%;
    }

    .news-list-item__content {
        font-weight: normal;
        padding-top: 10px;
        padding-left: 16px;
        padding-right: 16px;
        display: table-cell;
        font-size: 13px;
        line-height: 17px;
    }

    .news-list-item__h {
        height: 128px;
        overflow: hidden;
    }

    .news-list-item__date {
        color: #999999;
    }
</style>
