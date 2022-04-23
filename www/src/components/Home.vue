<template>    
    <main class="home">
        <app-bar>
            <btn-hamburger slot="left"/>
            <logo slot="center"/> 
            <btn-search slot="right"/>
        </app-bar>
        <div class="wrapper">
            <h2 class="h1 home__h1">Объявления <router-link :to="{path: '/post', query: {reset: true}}" class="b-right home__btn_more mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">Больше</router-link></h2>
            <router-link :to="{path: '/post', query: {category_id: 4, reset: true}}" class="home-block home-block_job card-shadow card-shadow_1 border-box">
                <div class="home-block__h">Работа</div>
                <div class="home-block__bar"><img src="../assets/images/job.svg" class="home-block__icon home-block__icon_job"> <span class="home-block__count">{{ jobsCount }}</span></div>
            </router-link>
            <router-link :to="{path: '/post', query: {category_id: 2, reset: true}}" class="home-block home-block_realty card-shadow card-shadow_1 border-box">
                <div class="home-block__h">Недвижимость</div>
                <div class="home-block__bar"><img src="../assets/images/realty.svg" class="home-block__icon home-block__icon_realty"> <span class="home-block__count">{{ realtyCount }}</span></div>
            </router-link>
        </div>
        <category-select :category-list="categoryList" v-model="categoryId" :show-count="true" />        
        <div class="wrapper">
            <router-link to="/post/create-select-category" class="btn btn_post-create card-shadow_1"><img src="../assets/images/btn_post-create.svg"> Подать объявление</router-link>
            <h2 class="h1 home__h1">Новости <router-link to="/news" class="b-right home__btn_more mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">Больше</router-link></h2>
            <news-list :news-list="newsList" v-if="newsList.length"/>
        </div>
        <div class="wrapper">
            <h2 class="h1 home__h1">Афиши <router-link to="/joy" class="b-right home__btn_more mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">Больше</router-link></h2>
        </div>
        <joy-list :joy-list="joyList" v-if="joyList.length"/>
        <active-dialog/>
    </main>
</template>

<script>
    import AppBar from './AppBar.vue'
    import BtnHamburger from './BtnHamburger.vue'
    import Logo from './Logo.vue'
    import BtnSearch from './BtnSearch.vue'
    import CategorySelect from './CategorySelect.vue'
    import NewsList from './NewsList.vue'
    import JoyList from './JoyList.vue'
    import ActiveDialog from './ActiveDialog.vue'
    export default {
        name: 'home',
        components: {
            AppBar,
            BtnHamburger,
            Logo,
            BtnSearch,
            CategorySelect,
            NewsList,
            JoyList,
            ActiveDialog
        },
        data: function () {
            return {
                jobsCount: 0,
                realtyCount: 0,
                categoryId: 1,
                categoryList: [],
                newsList: [],
                joyList: []
            }
        },
        watch: {
            categoryId: function (categoryId) {
                this.$router.push({path: '/post', query: {category_id: categoryId, reset: true}})
            }
        },
        created: function () {
            this.fetch()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/site/home')
                xhr.onload = function () {
                    var data = JSON.parse(xhr.responseText)
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            self.$set(self, prop, data[prop])
                        }
                    }
                }
                xhr.send()
            }
        }
    }
</script>

<style>
    .home__h1 {
        line-height: 100%;
        margin-top: 20px;
        margin-left: 8px;
        margin-bottom: 12px;
    }

    .home-block {
        display: block;
        height: 128px;
        background-size: 100% 128px;
        background-repeat: no-repeat;
        color: #fff;
        padding-left: 16px;
        padding-top: 21px;
        text-decoration: none;
        margin-bottom: 8px;
    }

    .home-block__h {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 22px;
        line-height: 100%;
    }

    .home-block__icon {
        margin-right: 10px;
    }

    .home-block__count {
        font-size: 58px;
        font-weight: bold;
        vertical-align: middle;
    }

    .home-block_job {
        background-image: url('../assets/images/job.png');
    }

    .home-block__icon_job {
        height: 48px;
        width: auto;
    }

    .home-block_realty {
        background-image: url('../assets/images/realty.png');
    }

    .home-block__icon_realty {
        height: 58px;
        width: auto;
    }

    /* home-more */

    .home-more {
        background: #fff;
        display: block;
        color: #000;
        border-radius: 2px;
        padding: 16px;
        padding-right: 8px;
        margin-bottom: 20px;
    }

    .home-more__h {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        vertical-align: middle;
    }

    .home-more__count {
        font-size: 14px;
        color: #B8B9BD;
        font-weight: normal;
        margin-left: 3px;
        vertical-align: middle;
    }

    .home-more__arrow {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url('../assets/android/images/home-more__arrow.svg');
        float: right;
    }

    .btn_post-create {
        margin-top: 8px;
        background: #007AFF;
        cursor: pointer;
        display: block;
        color: #fff;
        border-radius: 4px;
        padding: 12px;
        font-size: 14px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 500;
    }

    .btn_post-create img {
        margin-right: 8px;
    }
</style>
