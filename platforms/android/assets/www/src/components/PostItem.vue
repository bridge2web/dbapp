<template>
    <router-link :to="{path: '/post/view', query: {id: model.id}}" :class="{'post-item': true, 'card-shadow_1': true, 'post-item_has-thumbnail': model.thumbnail, 'post-item_has-info': model.infoBlocks}">
        <div class="post-item__header clearfix" v-if="act || subcategory">
            <div :style="{color: actColor}" class="post-item__act" v-html="act.name" v-if="act"></div>
            <div class="post-item__subcategory" v-html="subcategory.name" v-if="subcategory"></div>
        </div>
        <div class="post-item__body">
            <div class="post-item__col post-item__col_thumbnail" v-if="model.thumbnail">
                <img :src="model.thumbnail" :alt="model.subject" class="post-item__thumbnail">
            </div>
            <div class="post-item__col post-item__col_content">
                <div v-if="model.infoBlocks.top" class="post-item__info post-item__info_top clearfix">
                    <span v-html="model.infoBlocks.top.left" class="post-item__info post-item__info_top-left"></span>
                    <span v-html="model.infoBlocks.top.right" class="post-item__info post-item__info_top-right"></span>
                </div>
                <div class="post-item__subject" v-html="highlightedSubject"></div>
                <div v-if="model.infoBlocks.bottom" class="post-item__info post-item__info_bottom clearfix">
                    <span v-html="model.infoBlocks.bottom.left" class="post-item__info post-item__info_bottom-left"></span>
                    <span v-html="model.infoBlocks.bottom.right" class="post-item__info post-item__info_bottom-right"></span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'post-item',
        props: {
            q: {
                type: String,
                default: ''
            },
            model: {
                type: Object
            },
            subcategoryDepth: {
                type: Number,
                default: 1
            }
        },
        computed: {
            actColor: function () {
                var colors = {
                    'sell': '00B6D6',
                    'buy': 'FF0F0F',
                    'change': '25A857',
                    'rent': '1850A4',
                    'renting': '1850A4',
                    'vacancy': 'FF0F0F',
                    'looking': '00B6D6'
                };
                return '#' + colors[this.act.slug]
            },
            act: function () {
                if (!this.model.categories)
                    return null
                return this.model.categories.find(function (category) {
                    return category.is_act
                });
            },
            subcategory: function () {
                if (!this.model.categories)
                    return null
                var self = this
                return this.model.categories.find(function (category) {
                    return category.depth == self.subcategoryDepth
                });
            },
            highlightedSubject: function () {
                if (this.q.length < 3) return this.model.subject
                var highlightedSubject = this.model.subject
                var term = this.q
                term = term.replace(/(\s+)/, '(<[^>]+>)*$1(<[^>]+>)*')
                var pattern = new RegExp('(' + term + ')', 'gi')
                highlightedSubject = highlightedSubject.replace(pattern, '<mark>$1</mark>')
                return highlightedSubject.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4")
            }
        },
        watch: {
            q: function (val) {

            }
        }
    }
</script>

<style>
    .post-item {
        display: block;
        background: #fff;
        margin-bottom: 8px;
        border-radius: 4px;
        color: #000;
    }
    .post-item__header {
        height: 24px;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        padding-left: 8px;
        padding-right: 8px;
    }
    .post-item__act {
        display: inline-block;
        font-size: 13px;
        font-weight: 500;
    }
    .post-item__subcategory {
        display: inline-block;
        float: right;
        font-size: 13px;
        font-weight: 500;
        opacity: .5;
    }
    .post-item__body {
        display: table;
        width: 100%;
    }
    .post-item__col {
        display: table-cell;
        vertical-align: middle;
    }

    .post-item__col_thumbnail {
        width: 128px;
        padding-right: 8px;
    }

    .post-item__thumbnail {
        width: 128px;
        height: auto;
    }

    .post-item__col_content {

    }

    .post-item__subject {
        font-size: 16px;
        font-weight: bold;
        padding: 8px 8px;
        overflow: hidden;
    }

    .post-item_has-thumbnail .post-item__subject {
        padding: 8px 0px;
        max-width: 168px;
    }

    .post-item__info {
        font-size: 13px;
    }

    .post-item__info_top, .post-item__info_bottom {
        padding: 4px 8px;
    }

    .post-item_has-thumbnail .post-item__info_top, .post-item_has-thumbnail .post-item__info_bottom {
        padding: 4px 0px;
        padding-right: 8px;
    }

    .post-item__info_bottom-right, .post-item__info_top-right {
        float: right;
    }
</style>
