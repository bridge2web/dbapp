<template>
    <main class="post-view">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title h1="Объявление" slot="center"/>
            <btn-share slot="right" @click="onShareClick"/>
        </app-bar>         
        <div class="post-view__slider" v-if="model.photos.length">
            <div v-for="photo in model.photos" class="slide post-view__slide">
                <div class="post-view__thumbnail-blur-container"><div class="post-view__thumbnail-blur" v-bind:style="{backgroundImage: 'url(' + photo.src + ')'}"></div></div>
                <div v-if="photo.src" class="post-view__thumbnail" v-bind:style="{backgroundImage: 'url(' + photo.src + ')'}"></div>
            </div>
        </div>        
        <div class="wrapper wrapper_x_2">
            <div class="post-view__title" v-html="model.title"></div>
            <div class="clearfix post-view__info-block">
                <span class="post-view__info" v-if="model.infoBlocks.top" v-html="model.infoBlocks.top.right"></span>
                <span class="post-view__info post-view__info_right" v-if="model.infoBlocks.bottom" v-html="model.infoBlocks.bottom.right"></span>
            </div>
        </div>
        <hr style="margin-bottom: 12px;" v-if="hasMeta">
        <div class="wrapper wrapper_x_2" v-if="hasMeta">
            <div class="post-view__param" v-if="'location' in model.meta && model.meta.location">
                <div class="param__key">Местоположение</div>
                <div class="param__val">{{model.meta.location}}</div>
            </div>
            <div class="post-view__param" v-if="'district' in model.meta && model.meta.district">
                <div class="param__key">Район</div>
                <div class="param__val">{{model.meta.district}}</div>
            </div>
            <div class="post-view__param" v-if="'street' in model.meta && model.meta.street">
                <div class="param__key">Улица</div>
                <div class="param__val">{{model.meta.street}}</div>
            </div>
            <div class="post-view__param" v-if="'bldg' in model.meta && model.meta.bldg">
                <div class="param__key">Дом №</div>
                <div class="param__val">{{model.meta.bldg}}</div>
            </div>
            <div class="post-view__param" v-if="'floor' in model.meta && model.meta.floor">
                <div class="param__key">Этаж</div>
                <div class="param__val">{{model.meta.floor}}{{'floors' in model.meta && model.meta.floors ? '/' + model.meta.floors : ''}}</div>
            </div>
            <div class="post-view__param" v-if="'material' in model.meta && model.meta.material">
                <div class="param__key">Тип дома</div>
                <div class="param__val">{{model.lists.materialList[model.meta.material]}}</div>
            </div>
            <div class="post-view__param" v-if="'otoplen' in model.meta && model.meta.otoplen">
                <div class="param__key">Отопление</div>
                <div class="param__val">{{model.lists.otoplenList[model.meta.otoplen]}}</div>
            </div>
            <div class="post-view__param" v-if="'balcon' in model.meta && model.meta.balcon">
                <div class="param__key">Балкон</div>
                <div class="param__val">{{model.lists.balconList[model.meta.balcon]}}</div>
            </div>
            <div class="post-view__param" v-if="'square' in model.meta && model.meta.square">
                <div class="param__key">Площадь</div>
                <div class="param__val">{{model.meta.square}} м²</div>
            </div>
            <div class="post-view__param" v-if="'brandName' in model.meta && model.meta.brandName">
                <div class="param__key">Фирма</div>
                <div class="param__val">{{model.meta.brandName}}</div>
            </div>
            <div class="post-view__param" v-if="'modelName' in model.meta && model.meta.modelName">
                <div class="param__key">Модель</div>
                <div class="param__val">{{model.meta.modelName}}</div>
            </div>
            <div class="post-view__param" v-if="'year' in model.meta && model.meta.year">
                <div class="param__key">Год</div>
                <div class="param__val">{{model.meta.year}}</div>
            </div>
            <div class="post-view__param" v-if="'mileage' in model.meta && model.meta.mileage">
                <div class="param__key">Пробег</div>
                <div class="param__val">{{model.meta.mileage}} км</div>
            </div>
            <div class="post-view__param" v-if="'volume' in model.meta && model.meta.volume">
                <div class="param__key">Объем</div>
                <div class="param__val">{{model.meta.volume}} см³</div>
            </div>
            <div class="post-view__param" v-if="'transmission' in model.meta && model.meta.transmission">
                <div class="param__key">Коробка</div>
                <div class="param__val">{{model.lists.transmissionList[model.meta.transmission]}}</div>
            </div>
            <div class="post-view__param" v-if="'drive' in model.meta && model.meta.drive">
                <div class="param__key">Привод</div>
                <div class="param__val">{{model.lists.driveList[model.meta.drive]}}</div>
            </div>
            <div class="post-view__param" v-if="'fuel' in model.meta && model.meta.fuel">
                <div class="param__key">Топливо</div>
                <div class="param__val">{{model.lists.fuelList[model.meta.fuel]}}</div>
            </div>
            <div class="post-view__param" v-if="'wheel' in model.meta && model.meta.wheel">
                <div class="param__key">Руль</div>
                <div class="param__val">{{model.lists.wheelList[model.meta.wheel]}}</div>
            </div>
            <div class="post-view__param" v-if="'gp' in model.meta && model.meta.gp">
                <div class="param__key">Г/п</div>
                <div class="param__val">{{model.meta.gp}} тонн</div>
            </div>
            <div class="post-view__param" v-if="'kuzov' in model.meta && model.meta.kuzov">
                <div class="param__key">Тип кузова</div>
                <div class="param__val">{{model.lists.kuzovList[model.meta.kuzov]}}</div>
            </div>
            <div class="post-view__param" v-if="'season' in model.meta && model.meta.season">
                <div class="param__key">Сезон</div>
                <div class="param__val">{{model.lists.seasonList[model.meta.season]}}</div>
            </div>
            <div class="post-view__param" v-if="'width' in model.meta && model.meta.width">
                <div class="param__key">Ширина</div>
                <div class="param__val">{{model.meta.width}}</div>
            </div>
            <div class="post-view__param" v-if="'height' in model.meta && model.meta.height">
                <div class="param__key">Высота</div>
                <div class="param__val">{{model.meta.height}}</div>
            </div>
            <div class="post-view__param" v-if="'et' in model.meta && model.meta.et">
                <div class="param__key">Вылет (ET)</div>
                <div class="param__val">{{model.meta.et}}</div>
            </div>
            <div class="post-view__param" v-if="'pcd' in model.meta && model.meta.pcd">
                <div class="param__key">Сверловка (PCD)</div>
                <div class="param__val">{{model.meta.pcd}}</div>
            </div>
            <div class="post-view__param" v-if="'dia' in model.meta && model.meta.dia">
                <div class="param__key">Диаметр</div>
                <div class="param__val">{{model.meta.dia}}″</div>
            </div>
            <div class="post-view__param" v-if="'org' in model.meta && model.meta.org">
                <div class="param__key">Название</div>
                <div class="param__val">{{model.meta.org}}</div>
            </div>
            <div class="post-view__param" v-if="'position' in model.meta && model.meta.position">
                <div class="param__key">Должность</div>
                <div class="param__val">{{model.meta.position}}</div>
            </div>
            <div class="post-view__param" v-if="'size' in model.meta && model.meta.size">
                <div class="param__key">Размер</div>
                <div class="param__val">{{model.meta.size}}</div>
            </div>
        </div>
        <hr style="margin-bottom: 4px;" v-if="hasMeta">
        <div class="wrapper wrapper_x_2">
            <h3 class="h3 post-view__h">Контактное лицо{{ 'isAgent' in model.meta && model.meta.isAgent ? ' (агентство)' : '' }}</h3>
            <template v-if="model.status == 1">
                <div class="post-view__param" v-if="model.name">
                    <div class="param__key">Имя</div>
                    <div class="param__val">{{model.name}}</div>
                </div>
                <div class="post-view__param" v-if="model.phone">
                    <div class="param__key">Телефон</div>
                    <div class="param__val"><a :href="'tel:' + model.phone" target="_system">{{model.phone}}</a></div>
                </div>
                <div class="post-view__param" v-if="model.email">
                    <div class="param__key">Эл. почта</div>
                    <div class="param__val"><a :href="'mailto:' + model.email">{{model.email}}</a></div>
                </div>
            </template>
            <template v-else>
                <div>
                    Объявление в архиве, контактные данные закрыты.
                </div>
            </template>
        </div>
        <hr style="margin-bottom: 4px;">
        <div class="wrapper wrapper_x_2" v-if="model.content">
            <h3 class="h3 post-view__h">Описание</h3>
            <div class="post-view__content" v-html="model.content"></div>                
        </div>
        <hr style="margin-bottom: 12px;">
        <div class="wrapper wrapper_x_2">
            <btn-share type="button" @click="onShareClick"/>
            <hr style="margin-bottom: 12px;">
        </div>
        <div class="post-view__footer">Если вам нужно исправить ошибку в объявлении, свяжитесь с нами по телефону 33-000-4.</div>
    </main>    
</template>

<script>
    import $ from 'jquery'
    import 'slick-carousel'
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    import AppBar from './AppBar.vue'
    import BtnBack from './BtnBack.vue'
    import AppBarTitle from './AppBarTitle.vue'
    import BtnShare from './BtnShare.vue'
    export default {
        name: 'post-view',
        props: {
            params: {
                type: Object
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            BtnShare
        },
        data: function () {
            return {
                model: {
                    title: '',
                    content: '',
                    name: '',
                    phone: '',
                    email: '',                    
                    infoBlocks: {
                        top: {
                            left: '',
                            right: ''
                        },
                        bottom: {
                            left: '',
                            right: ''
                        }
                    },
                    meta: {},
                    photos: [],
                    lists: []
                }
            }
        },
        created: function () {
            this.fetch()
        },
        updated: function () {
            this.slick()
        },
        mounted: function () {
            this.slick()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/post/view?' + $.param(this.$props.params))
                xhr.onload = function () {
                    self.$set(self, 'model', JSON.parse(xhr.responseText))
                }
                xhr.send()
            },
            slick: function () {
                if (this.model.photos.length) {
                    $('.post-view__slider').slick({
                        dots: true,
                        autoplay: true,
                        rows: 0
                    })
                }
            },
            onShareClick: function () {
                var options = {
                    message: this.model.title,
                    subject: this.model.title,
                    files: [this.model.thumbnail],
                    url: this.model.url,
                    chooserTitle: 'Поделиться'
                }
                var onSuccess = function (result) {
                }

                var onError = function (msg) {
                }

                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError)
            }
        },
        computed: {
            hasMeta: function () {
                return Object.keys(this.model.meta).length
            } 
        }
    }
</script>

<style>
    .post-view {
        background: #fff;
    }    

    .post-view__title {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 30px;
    } 

    .slick-dotted.slick-slider.post-view__slider {
        margin-bottom: 0px;
    }
    
    .post-view__slider .slick-dots {
        bottom: 8px;
    }
    
    .post-view__slider .slick-dots li {
        width: 10px;
        margin: 0px;
        color: #F9F162;
    }
    
    .post-view__slider .slick-dots li button:before {
        color: #F9F162;
        opacity: .5;
    }
    
    .post-view__slider .slick-dots li.slick-active button:before  {
        opacity: 1;
    }

    .post-view__thumbnail-blur-container {    
        position: absolute;
        width: 100%;
        height: 240px;
        overflow: hidden;
    }

    .post-view__thumbnail-blur {        
        height: 240px;
        background-size: 100% 100%; 
        background-position: 50% 50%;
        background-repeat: no-repeat;
        filter: blur(7px);
        opacity: .9;
    }

    .post-view__thumbnail {
        position: relative;
        height: 240px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
    }   

    .post-view__info-block {

    }

    .post-view__info {
        display: inline-block;
        font-size: 17px;
    }

    .post-view__info_right {
        float: right;
    }

    .post-view__h {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .post-view__param {
        display: table;
        width: 100%;
        margin-bottom: 10px;
    }

    .post-view__param .param__key {
        display: table-cell;
        width: 30%;
        font-weight: 500;
    }

    .post-view__param .param__val {
        display: table-cell;
    }

    .post-view__content {
        font-size: 17px;
        line-height: 24px;
        padding-bottom: 18px;
    }
    
    .post-view__footer {
        color: #8F8E94;    
        font-size: 13px;
        text-align: center;
        padding-bottom: 17px;
    }
</style>
