<template>
    <div :class="[{'joy-list': true, clearfix: true}, id + '__joy-list']">
        <template v-for="item in list">
            <router-link v-bind:to="'/joy/view?id=' + item.id" class="joy-list-item card-shadow_1">
                <div v-if="showCategory" v-bind:class="'joy-list-item__category joy-list-item__category_' + item.category.id" v-bind:style="{backgroundColor: item.category.color}">{{ item.category.name }}</div>
                <img class="joy-list-item__img" v-bind:src="item.thumbnail" alt="">
                <div class="joy-list-item__end">{{ item.dateEndAt }}</div>
                <div class="joy-list-item__h">{{ item.title }}</div>
                <div class="joy-list-item__genre">{{ item.genre }}</div>
                <div class="joy-list-item__cinema">{{ item.cinema }}</div>
            </router-link>
        </template>
    </div>
</template>
<script>
    import $ from 'jquery'
    import 'slick-carousel'
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    export default {
        name: 'joy-list',
        props: {
            id: {
                type: String,
                default: () => Math.random().toString(36).slice(2)
            },
            showCategory: {
                type: Boolean,
                default: false
            },
            joyList: {
                type: Array,
                default: () => []
            }
        },
        data: function () {
            return {
                list: this.joyList
            }
        },
        updated: function () {
            this.slick()
        },
        mounted: function () {
            this.slick()
        },
        methods: {
            slick: function () {
                //$('.' + this.id + '__joy-list').slick('unslick');
                if (this.joyList.length) {
                    $('.' + this.id + '__joy-list').slick({
                        infinite: false,
                        variableWidth: true,
                        arrows: false,
                        rows: 0,
                        waitForAnimate: false,
                        swipeToSlide: true
                    })
                }
            }
        },
        watch: {
            joyList: function (joyList) {
                this.list = joyList
            }
        }
    }
</script>

<style>
    .joy-list {
        margin-left: 8px;
    }

    .joy-list-item {
        display: block;
        width: 204px;
        margin-right: 8px;
        background: #fff;
        border-radius: 2px;
        color: #000;
        font-size: 13px;
        line-height: 17px;
        font-weight: normal;
        padding-bottom: 4px;
        margin-bottom: 16px;
    }

    .joy-list-item__category {
        margin-left: 8px;
        margin-top: 8px;
        z-index: 1;
        position: absolute;
        background: #000;
        color: #fff;
        border-radius: 2px;
        padding: 2px 8px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .joy-list-item__img {
        display: block;
        width: 100%;
        height: 304px;
        margin-bottom: 6px;
    }

    .joy-list-item__end {
        padding-left: 8px;
        padding-right: 8px;
        margin-bottom: 4px;
    }

    .joy-list-item__h {
        font-size: 16px;
        font-weight: bold;
        padding-left: 8px;
        padding-right: 8px;
        margin-bottom: 4px;
        line-height: 125%;
    }

    .joy-list-item__genre {
        padding-left: 8px;
        padding-right: 8px;
        margin-bottom: 4px;
    }
</style>
