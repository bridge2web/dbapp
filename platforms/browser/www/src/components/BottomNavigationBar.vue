<template>
    <div>
        <footer class="bottom-navigation-bar">
            <div class="bottom-navigation-bar__col">
                <router-link to="/news" :class="{'bottom-navigation-bar__button': true, 'bottom-navigation-bar__button_active': news}">
                             <div class="bottom-navigation-bar__icon bottom-navigation-bar__icon_news"> </div>
                    Новости
                </router-link>
            </div>
            <div class="bottom-navigation-bar__col">
                <router-link to="/joy" :class="{'bottom-navigation-bar__button': true, 'bottom-navigation-bar__button_active': joy}">
                             <div class="bottom-navigation-bar__icon bottom-navigation-bar__icon_joy"> </div>
                    Афиши
                </router-link>
            </div>
            <div class="bottom-navigation-bar__col">
                <router-link :to="{path: '/post', query: {reset: true}}" :class="{'bottom-navigation-bar__button': true, 'bottom-navigation-bar__button_active': post}">
                             <div class="bottom-navigation-bar__icon bottom-navigation-bar__icon_post"> </div>
                    Объявления
                </router-link>
            </div>                      
            <div class="bottom-navigation-bar__col">
                <router-link to="/post/create-select-category" :class="{'bottom-navigation-bar__button': true, 'bottom-navigation-bar__button_active': postCreate}">
                             <div class="bottom-navigation-bar__icon bottom-navigation-bar__icon_post-create"> </div>
                    Подать
                </router-link>
            </div>                              
            <div class="bottom-navigation-bar__col">
                <router-link to="/news/create" :class="{'bottom-navigation-bar__button': true, 'bottom-navigation-bar__button_active': newsCreate}">
                             <div class="bottom-navigation-bar__icon bottom-navigation-bar__icon_news-create"> </div>
                    Сообщить
                </router-link>
            </div>                      
        </footer>
        <div class="bottom-navigation-bar__spacer"> </div>
    </div>
</template>

<script>
    export default {
        name: 'bottom-navigation-bar',
        data: function () {
            return {
                news: false,
                joy: false,
                post: false,
                postCreate: false,
                newsCreate: false
            }
        },
        watch: {
            '$route'(to, from) {
                for (var prop in this.$data) {
                    if (this.hasOwnProperty(prop)) {
                        this.$set(this, prop, false)
                    }
                }
                if (to.path.substring(0, 12) == '/post/create') {
                    this.postCreate = true
                } else if (to.path.substring(0, 12) == '/news/create') {
                    this.newsCreate = true
                } else if (to.path.substring(0, 5) == '/news') {
                    this.news = true
                } else if (to.path.substring(0, 4) == '/joy') {
                    this.joy = true
                } else if (to.path.substring(0, 5) == '/post') {
                    this.post = true
                }

            }
        },
    }
</script>

<style>
    .bottom-navigation-bar {
        z-index: 1001;
        position: fixed;
        bottom: 0px;
        background: #F8F8F8;
        height: 50px;
        display: table;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, .30);
        box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.35);
    }

    .bottom-navigation-bar__spacer {
        height: 50px;    
    }

    .bottom-navigation-bar__col {
        display: table-cell;
    }

    .bottom-navigation-bar__icon {
        height: 36px;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }

    .bottom-navigation-bar__icon_news {
        background-image: url('../assets/images/bottom-navigation-bar__icon_news.svg');
    }

    .bottom-navigation-bar__button_active .bottom-navigation-bar__icon_news, .bottom-navigation-bar__button:hover .bottom-navigation-bar__icon_news {
        background-image: url('../assets/images/bottom-navigation-bar__icon_news_active.svg');
    }

    .bottom-navigation-bar__icon_joy {
        background-image: url('../assets/images/bottom-navigation-bar__icon_joy.svg');
    }

    .bottom-navigation-bar__button_active .bottom-navigation-bar__icon_joy, .bottom-navigation-bar__button:hover .bottom-navigation-bar__icon_joy {
        background-image: url('../assets/images/bottom-navigation-bar__icon_joy_active.svg');
    }

    .bottom-navigation-bar__icon_post {
        background-image: url('../assets/images/bottom-navigation-bar__icon_post.svg');
    }

    .bottom-navigation-bar__button_active .bottom-navigation-bar__icon_post, .bottom-navigation-bar__button:hover .bottom-navigation-bar__icon_post {
        background-image: url('../assets/images/bottom-navigation-bar__icon_post_active.svg');
    }

    .bottom-navigation-bar__icon_post-create {
        background-image: url('../assets/images/bottom-navigation-bar__icon_post-create.svg');
    }

    .bottom-navigation-bar__button_active .bottom-navigation-bar__icon_post-create, .bottom-navigation-bar__button:hover .bottom-navigation-bar__icon_post-create {
        background-image: url('../assets/images/bottom-navigation-bar__icon_post-create_active.svg');
    }

    .bottom-navigation-bar__icon_news-create {
        background-position-y: 65%;
        background-image: url('../assets/images/bottom-navigation-bar__icon_news-create.svg');
    }

    .bottom-navigation-bar__button_active .bottom-navigation-bar__icon_news-create, .bottom-navigation-bar__button:hover .bottom-navigation-bar__icon_news-create {
        background-image: url('../assets/images/bottom-navigation-bar__icon_news-create_active.svg');
    }

    .bottom-navigation-bar__button {
        display: block;
        font-size: 10px;
        text-align: center;
        color: #89898E;
        line-height: 100%;
    }

    .bottom-navigation-bar__button:hover, .bottom-navigation-bar__button_active {
        color: #007AFF;
    }
</style>
