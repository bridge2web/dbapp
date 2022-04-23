<template>    
    <div class="calendar-bar">
        <div class="calendar-bar__inner">
            <div :class="{'calendar-bar__item': true, 'calendar-bar__item_all': true, 'calendar-bar__item_active': selected == 'all'}" @click="onClick('all')">Все дни</div>
            <div class="calendar-bar__slick">
                <div v-for="item in list" :class="{'calendar-bar__item': true, 'calendar-bar__item_active': selected == item.date}" @click="onClick(item.date)">
                     <div class="calendar-bar__label">{{item.label}}</div>
                    <div class="calendar-bar__day">{{item.day}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import 'slick-carousel'
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    export default {
        name: 'calendar-bar',
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: {
            calendarList: {
                type: Array,
                default: () => []
            },
            initialSelected: {
                default: 0
            }
        },
        data: function () {
            return {
                selected: this.initialSelected,
                list: this.calendarList
            }
        },
        updated: function () {
            //this.slick()
        },
        mounted: function () {
            this.slick()
        },
        methods: {
            slick: function () {
                if (this.calendarList.length && !$('.calendar-bar__slick').hasClass('slick-initialized')) {
                    $('.calendar-bar__slick').slick({
                        arrows: false,
                        variableWidth: true,
                        slidesToScroll: 5,
                        infinite: false,
                        rows: 0
                    })
                }
            },
            onClick: function (val) {
                this.selected = val
            }
        },
        watch: {
            calendarList: function (calendarList) {
                if (calendarList && calendarList.length)
                    this.list = calendarList
            },
            selected: function (selected) {
                this.$emit('change', selected)
            }
        }
    }
</script>

<style>
    .calendar-bar {
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .calendar-bar__inner {

    }

    .calendar-bar__item {
        width: 42px;
        height: 38px;
        text-align: center;
        line-height: 100%;
        padding-top: 5px;
    }

    .calendar-bar__item_active {
        background: #F9F162;
        border-radius: 50%;
    }

    .calendar-bar__item_all {
        position: absolute;
        font-size: 14px;
        line-height: 16px;
    }

    .calendar-bar__label {
        font-size: 11px;    
        margin-bottom: 3px;
    }

    .calendar-bar__day {
        font-size: 17px;      
    }

    .calendar-bar__slick {
        margin-left: 46px;
    }
</style>
