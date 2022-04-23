<template>
    <main class="joy joy_index">
        <app-bar>
            <btn-back slot="left" to="/"/>
            <app-bar-title h1="Афиши" slot="center"/>
        </app-bar>
        <calendar-bar :calendarList="calendar" :initialSelected="date" v-model="date" v-if="calendar && calendar.length"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[2] && joyList[2].length">
            <h2 class="h1 joy__h">Кино <span class="joy__count">{{joyList[2].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[2]" v-if="joyList[2]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[1] && joyList[1].length">
            <h2 class="h1 joy__h">Вечеринки <span class="joy__count">{{joyList[1].length}}</span></h2>
        </div>        
        <joy-list :joy-list="joyList[1]" v-if="joyList[1]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[3] && joyList[3].length">
            <h2 class="h1 joy__h">Спорт <span class="joy__count">{{joyList[3].length}}</span></h2>
        </div>        
        <joy-list :joy-list="joyList[3]" v-if="joyList[3]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[4] && joyList[4].length">
            <h2 class="h1 joy__h">Спектакли <span class="joy__count">{{joyList[4].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[4]" v-if="joyList[4]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[6] && joyList[6].length">
            <h2 class="h1 joy__h">Концерты <span class="joy__count">{{joyList[6].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[6]" v-if="joyList[6]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[5] && joyList[5].length">
            <h2 class="h1 joy__h">Выставки <span class="joy__count">{{joyList[5].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[5]" v-if="joyList[5]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[7] && joyList[7].length">
            <h2 class="h1 joy__h">Детям <span class="joy__count">{{joyList[7].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[7]" v-if="joyList[7]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[8] && joyList[8].length">
            <h2 class="h1 joy__h">Телепрограмма <span class="joy__count">{{joyList[8].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[8]" v-if="joyList[8]"/>
        <!-- -->
        <div class="wrapper" v-if="joyList[9] && joyList[9].length">
            <h2 class="h1 joy__h">Конкурсы <span class="joy__count">{{joyList[9].length}}</span></h2>
        </div>
        <joy-list :joy-list="joyList[9]" v-if="joyList[9]"/>
    </main>
</template>
<script>
    import AppBar from './AppBar.vue'
    import BtnBack from './BtnBack.vue'
    import AppBarTitle from './AppBarTitle.vue'
    import CalendarBar from './CalendarBar.vue'
    import JoyList from './JoyList.vue'
    export default {
        props: {
            params: {
                type: Object,
                default: function () {
                    return {
                        date: this.now(),
                        page: 1
                    }
                }
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            CalendarBar,
            JoyList
        },
        data: function () {
            return {
                state: '',
                date: this.params.date ? this.params.date : this.now(),
                joyList: [],
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
                xhr.open('GET', 'http://m.delovoibiysk.ru/joy?date=' + this.date)
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
            }
        },
        watch: {
            date: function (date) {
                this.$router.push({path: '/joy', query: {date: date}});
                window.location.reload()
            }/*,
            params: {
                handler: function (val, oldVal) {
                    window.location.reload()
                },
                deep: true
            }*/
        }
    }
</script>

<style>
    .joy_index {
        margin-bottom: 50px;
    }

    .joy__h {
        margin-top: 0px; 
        margin-bottom: 16px;
        line-height: normal;
    }

    .joy__count {
        font-size: 13px;
        display: inline-block;
    }
</style>
