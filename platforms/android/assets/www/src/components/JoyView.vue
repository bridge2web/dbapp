<template>
    <main class="joy joy_view">
        <app-bar>
            <btn-back slot="left"/>
            <btn-share slot="right" @click="onShareClick"/>
        </app-bar>
        <calendar-bar v-if="model.category && model.category.id == 2" :calendarList="calendar" :initialSelected="date" v-model="date"/>
        <div class="joy__thumbnail-blur-container" v-if="model.thumbnail"><div class="joy__thumbnail-blur" v-bind:style="{backgroundImage: 'url(' + model.thumbnail + ')'}"></div></div>
        <div v-if="model.thumbnail" class="joy__thumbnail" v-bind:style="{backgroundImage: 'url(' + model.thumbnail + ')'}"></div>        
        <div class="joy__header">
            <div class="joy__top">
                <div class="clearfix">
                    <div v-if="model.category" v-bind:style="{backgroundColor: model.category.color}" class="joy__category">{{ model.category.name }}</div>
                    <div v-if="model.deti" v-bind:style="{backgroundColor: '#25A857'}" class="joy__category">Детям</div>
                    <span class="joy__date">{{ model.date }}</span>                
                </div>
                <h1 class="h1 joy__title">{{ model.title }}</h1>
                <div class="joy__info" v-if="model.info">{{ model.info }}</div>
                <div class="joy__genre" v-if="model.genre">{{ model.genre }}</div>
                <div class="clearfix">
                    <span class="joy__vozrast" v-if="model.vozrast">{{ model.vozrast }}+</span>
                    <span class="joy__price" v-if="model.price">{{ model.price }}</span>
                    <span class="joy__duration" v-if="model.duration">{{ model.duration }}</span>
                    <div v-if="model.kinopoisk" class="joy__kinopoisk"><a :href="model.kinopoisk" target="_blank">КиноПоиск</a> <span class="joy__rating">{{ model.rating }}</span></div>
                </div>
            </div>
            <div class="clearfix joy__place" v-if="model.place && model.category.id != 2">
                {{ model.place }}
            </div>
        </div>  
        <div class="wrapper white-box" style="padding: 16px;">
            <div class="seans" v-if="model.category && model.category.id == 2">
                <div class="h3" style="margin-bottom: 0px;">Сеансы</div>
                <div :class="{'seans__cinema': true, 'seans__cinema_hide': cinemaHide[0]}" v-on:click="cinemaHide.splice(0, 1, !cinemaHide[0])"><strong>Киномир</strong>, Ильи Мухачёва, 200 — 3 этаж</div>
                <template v-for="(times, date) in model.seansList">
                    <div :class="{seans__day:true,
                        'seans__day_today': Object.keys(model.seansList).indexOf(date) === 0,
                        'seans__day_future': Object.keys(model.seansList).indexOf(date) !== 0,
                        'seans__day_hide': cinemaHide[0]}">
                        <div class="seans__date">{{ date }}</div>
                        <div class="seans__group">
                            <div class="seans__list">
                                <div class="seans__type">2D</div>
                                <div class="seans__schedules clearfix" v-if="times && times[2][2].length">
                                    <div class="seans__schedule" v-for="item in times[2][2]">{{item}}</div>
                                </div>
                                <div v-else class="seans__schedules">Нет сеансов</div>
                            </div>
                            <div class="seans__list">
                                <div class="seans__type"><span style="color: #007AFF">3</span><span style="color: #D435C6">D</span></div>
                                <div class="seans__schedules clearfix" v-if="times && times[2][3].length">
                                    <div class="seans__schedule" v-for="times in times[2][3]">{{item}}</div>
                                </div>
                                <div v-else class="seans__schedules">Нет сеансов</div>
                            </div>
                        </div><!-- .seans__group -->
                    </div><!-- .seans__day -->
                </template>
                <div :class="{'seans__cinema': true, 'seans__cinema_hide': cinemaHide[1]}" v-on:click="cinemaHide.splice(1, 1, !cinemaHide[1])"><strong>Планета кино</strong>, Советская, 205/2 — 2 этаж</div>
                <template v-for="(times, date) in model.seansList">
                    <div :class="{seans__day:true,
                        'seans__day_today': Object.keys(model.seansList).indexOf(date) === 0,
                        'seans__day_future': Object.keys(model.seansList).indexOf(date) !== 0,
                        'seans__day_hide': cinemaHide[1]}">
                        <div class="seans__date">{{ date }}</div>
                        <div class="seans__group">
                            <div class="seans__list">
                                <div class="seans__type">2D</div>
                                <div class="seans__schedules clearfix" v-if="times && times[1][2].length">
                                    <div class="seans__schedule" v-for="item in times[1][2]">{{item}}</div>
                                </div>
                                <div v-else class="seans__schedules">Нет сеансов</div>
                            </div>
                            <div class="seans__list">
                                <div class="seans__type"><span style="color: #007AFF">3</span><span style="color: #D435C6">D</span></div>
                                <div class="seans__schedules clearfix" v-if="times && times[1][3].length">
                                    <div class="seans__schedule" v-for="times in times[1][3]">{{item}}</div>
                                </div>
                                <div v-else class="seans__schedules">Нет сеансов</div>
                            </div>
                        </div><!-- .seans__group -->
                    </div><!-- .seans__day -->
                </template>
            </div>
            <div class="h3" style="margin-bottom: 8px;">Описание</div>
            <div class="joy__content" v-html="model.content"></div>
            <hr>
            <btn-share type="button" @click="onShareClick"/>
        </div>
    </main>
</template>

<script>
    import AppBar from './AppBar.vue'
            import BtnBack from './BtnBack.vue'
            import BtnShare from './BtnShare.vue'
            import CalendarBar from './CalendarBar.vue'
            export default {
                props: {
                    params: {
                        type: Object,
                        default: function () {
                            return {
                                id: 0,
                                date: this.now()
                            }
                        }
                    }
                },
                components: {
                    AppBar,
                    BtnBack,
                    BtnShare,
                    CalendarBar
                },
                data: function () {
                    return {
                        date: this.params.date ? this.params.date : this.now(),
                        model: fetch,
                        cinemaHide: [true, true],
                        calendar: []
                    }
                },
                created: function () {
                    this.fetch()
                },
                methods: {
                    fetch: function () {
                        var xhr = new XMLHttpRequest()
                        var self = this
                        xhr.open('GET', 'http://m.delovoibiysk.ru/joy/view?id=' + this.params.id + '&date=' + this.date)
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
                    now: function () {
                        return new Date().toISOString().slice(0, 10)
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
                watch: {
                    date: function (date) {
                        this.$router.push({path: '/joy/view', query: {id: this.params.id, date: date}});
                        window.location.reload()
                    },
                    params: {
                        handler: function (val, oldVal) {
                            window.location.reload()
                        },
                        deep: true
                    }
                }
            }
</script>

<style>
    .joy__header {
        background: #F9F162;
        padding-top: 16px;
    }

    .joy__top {
        padding: 0px 16px;
        padding-bottom: 8px;
    }

    .joy__thumbnail-blur-container {    
        position: absolute;
        width: 100%;
        height: 310px;
        overflow: hidden;
    }

    .joy__thumbnail-blur {        
        height: 310px;
        background-size: 100% 100%; 
        background-position: 50% 50%;
        background-repeat: no-repeat;
        filter: blur(7px);
        opacity: .9;
    }

    .joy__thumbnail {
        position: relative;
        height: 310px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
    }   

    .joy__title {
        font-size: 24px;
        font-weight: bold;
        line-height: 28px;
        margin-top: 0px;
        margin-bottom: 14px;
    }

    .joy__date {
        font-size: 13px;
        float: right;
    }

    .joy__author {
        font-size: 13px;
        float: right;
    }

    .joy__content {
        font-size: 14px;
        line-height: 22px;
    }

    .joy__content iframe {
        width: 100%;
    }

    .joy__category {
        display: inline-block;
        color: #fff;
        border-radius: 2px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 16px;
    }

    .joy__info {
        font-size: 13px;
    }

    .joy__genre {
        font-size: 17px;
        margin-bottom: 16px;
    }

    .joy__vozrast {
        margin-right: 16px;
    }

    .joy__kinopoisk {
        float: right;
    }

    .joy__rating {
        background: #fff;
        font-size: 17px;
        display: inline-block;
        width: 38px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
        vertical-align: top;
        margin-left: 4px;
    }

    .joy__place {
        font-size: 13px; 
        font-weight: 500;
        padding: 16px;
        border-top: 1px solid rgba(0, 0, 0, .3);
        padding-top: 8px;
        padding-bottom: 16px;
    }

    .seans {
        font-size: 13px;
        margin-bottom: 16px;
    }

    .seans__date {
        font-style: italic;
        opacity: 0.5;
    }

    .seans__cinema {
        border-bottom: 1px solid rgba(0, 0, 0, .3);
        margin-bottom: 8px;
        background-repeat: no-repeat;
        background-position: 100% 50%;
        background-image: url(../assets/images/icon_arrow-up.svg);
        height: 48px;
        line-height: 48px;
        cursor: pointer;
    }

    .seans__cinema_hide {
        background-image: url(../assets/images/icon_arrow-down.svg);
    }

    .seans__list {
        display: table;
        width: 100%;
        margin-bottom: 4px;
    }

    .seans__type {
        display: table-cell;
        width: 48px;
        font-weight: bold;
        vertical-align: top;
    }

    .seans__schedules {
        display: table-cell;
        vertical-align: top;
    }

    .seans__schedule {
        float: left;
        width: 20%;
        margin-bottom: 2px;
    }
    
    .seans__day_today {
        display: block;
    }
    
    .seans__day_future.seans__day_hide {
        display: none;
    }
</style>
