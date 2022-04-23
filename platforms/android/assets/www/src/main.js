import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import VueMdl from 'vue-mdl'

import App from './App.vue'

import Home from './components/Home.vue'
import NewsIndex from './components/NewsIndex.vue'
import NewsView from './components/NewsView.vue'
import NewsCreate from './components/NewsCreate.vue'
import NewsCreateRules from './components/NewsCreateRules.vue'
import NewsCategoryView from './components/NewsCategoryView.vue'
import JoyIndex from './components/JoyIndex.vue'
import JoyView from './components/JoyView.vue'
import PostView from './components/PostView.vue'
import PostIndex from './components/PostIndex.vue'
import PostFilter from './components/PostFilter.vue'
import PostFilterSelectCategory from './components/PostFilterSelectCategory.vue'
import PostCreateSelectCategory from './components/PostCreateSelectCategory.vue'
import PostCreate from './components/PostCreate.vue'
import CategoryView from './components/CategoryView.vue'
import SubCategoryView from './components/SubCategoryView.vue'
import SubSubCategoryView from './components/SubSubCategoryView.vue'

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function () {
        Vue.use(VueRouter)
        var VueTouch = require('vue-touch')
        Vue.use(VueTouch, {name: 'v-touch'})

        Vue.use(infiniteScroll)
        
        Vue.use(VueMdl)

        const routes = [
            {path: '/', component: Home},
            {path: '/post', component: PostIndex, props: (route) => ({params: route.query})},
            {path: '/post/view', component: PostView, props: (route) => ({params: route.query})},
            {path: '/post/filter', component: PostFilter, props: (route) => ({params: route.query})},
            {path: '/post/filter-select-category', component: PostFilterSelectCategory, props: (route) => ({params: route.query})},
            {path: '/post/create-select-category', component: PostCreateSelectCategory, props: (route) => ({params: route.query})},
            {path: '/post/create', component: PostCreate, props: (route) => ({params: route.query})},
            {path: '/category/view', component: CategoryView, props: (route) => ({params: route.query})},
            {path: '/sub-category/view', component: SubCategoryView, props: (route) => ({params: route.query})},
            {path: '/sub-sub-category/view', component: SubSubCategoryView, props: (route) => ({params: route.query})},  
            {path: '/news/create', component: NewsCreate, props: true},
            {path: '/news/create-rules', component: NewsCreateRules, props: true},
            {path: '/news', component: NewsIndex, props: true},
            {path: '/news/:id', component: NewsView, props: true},
            {path: '/news-category/view', component: NewsCategoryView, props: (route) => ({params: route.query})},  
            
            {path: '/joy', component: JoyIndex, props: (route) => ({params: route.query})},
            {path: '/joy/view', component: JoyView, props: (route) => ({params: route.query})}
        ]

        const router = new VueRouter({
            routes
        })

        new Vue({
            router,
            el: '.app',
            render: h => h(App)
        })
    }
};

app.initialize();
