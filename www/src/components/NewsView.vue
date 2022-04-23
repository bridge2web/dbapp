<template>
    <main class="news">
        <app-bar>
            <btn-back slot="left"/>
            <btn-share slot="right" @click="onShareClick"/>
        </app-bar>
        <div v-if="model.thumbnail" class="news__thumbnail-blur-container"><div class="news__thumbnail-blur" v-bind:style="{backgroundImage: 'url(' + model.thumbnail + ')'}"></div></div>
        <div v-if="model.thumbnail" class="news__thumbnail" v-bind:style="{backgroundImage: 'url(' + model.thumbnail + ')'}"></div>    
        <div class="news__header">
            <div v-if="model.category" v-bind:style="{color: model.category.color}" class="news__category">{{ model.category.name }}</div>
            <h1 class="h1 news__title">{{ model.title }}</h1>
            <div class="clearfix">
                <span class="news__date">{{ model.prettyDatetime }}</span>
                <span class="news__author">{{ model.author }}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="news__content" v-html="model.content"></div>
            <btn-share type="button" @click="onShareClick"/>
        </div>
        <div class="wrapper" style="margin-bottom: 24px;">
            <h2 class="h1 news__h">Другие новости</h2>
            <news-list :news-list="newsList" v-if="newsList.length"/>
        </div>
        <banner-news-send/>
    </main>
</template>

<script>
    import AppBar from './AppBar.vue'
    import BtnBack from './BtnBack.vue'
    import BtnShare from './BtnShare.vue'
    import NewsList from './NewsList.vue'
    import BannerNewsSend from './BannerNewsSend.vue'
    export default {
        props: ['id'],
        components: {
            AppBar,
            BtnBack,
            BtnShare,
            NewsList,
            BannerNewsSend
        },
        data: function () {
            return {
                model: {},
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
                xhr.open('GET', 'http://m.delovoibiysk.ru/news/view?id=' + this.id)
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
            onShareClick: function () {
                var options = {
                    message: this.model.title,
                    subject: this.model.title,
                    files: [this.model.thumbnail],
                    url: this.model.url,
                    chooserTitle: 'Поделиться новостью'
                }
                var onSuccess = function (result) {
                    alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                }

                var onError = function (msg) {
                    alert("Sharing failed with message: " + msg);
                }

                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError)
            }
        },
        watch: {
            id: function (id) {
                window.location.reload()
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

    .news__header {
        background: #F9F162;
        padding: 16px;
        margin-bottom: 16px;
    }

    .news__thumbnail-blur-container {    
        position: absolute;
        width: 100%;
        height: 250px;
        overflow: hidden;
    }

    .news__thumbnail-blur {        
        height: 250px;
        background-size: 100% 100%; 
        background-position: 50% 50%;
        background-repeat: no-repeat;
        filter: blur(7px);
        opacity: .9;
    }

    .news__thumbnail {
        position: relative;
        height: 250px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
    }   

    .news__title {
        font-size: 24px;
        font-weight: bold;
        line-height: 28px;
        margin-top: 0px;
    }

    .news__date {
        font-size: 13px;
    }

    .news__author {
        font-size: 13px;
        float: right;
    }

    .news__content {
        font-size: 14px;
    }
    
    .news__content img, .news__content iframe {
        display: block;
        width: 100%;
        height: auto;
    }

    .news__category {
        display: inline-block;
        background: #fff;
        border-radius: 2px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 16px;
    }
</style>
