<template>
    <div :class="['list', 'border-box', name]">
        <div v-for="(item, index) in list" v-if="!(hideFirst && index == 0)" class="list__item" @click="onClick(item.id)"><div class="item__content" :style="{backgroundImage: 'url(' + iconSrc + ')'}">{{ item.name }}</div></div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import IconDefault from '../assets/images/list__item.png';
    export default {
        name: 'list',
        model: {
            prop: 'selected',
            event: 'change'
        },
        data: function () {
            return {
                selected: 0
            }
        },
        props: {
            list: {
                type: Array,
                default: () => []
            },            
            name: {
                type: String,
                default: () => Math.random().toString(36).slice(2)
            },            
            icon: {
                type: String,
                default: ''
            },            
            hideFirst: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onClick: function (val) {
                this.selected = val
            }
        },
        watch: {
            selected: function (selected) {
                this.$emit('change', selected)
            }
        },
        computed: {
            iconSrc: function () {
                return this.icon ? this.icon : IconDefault
            }
        }
    }
</script>

<style>
    .list {
        background: #fff;
        width: 100%;
        margin-left: 0px;
        padding-left: 16px;
    }

    .list__item {
        display: block;
        border-bottom: 1px solid #C8C7CC;
    }

    .list__item .item__content {
        color: #000;
        display: block;
        padding-top: 14px;
        padding-bottom: 14px;    
        background-repeat: no-repeat;
        background-position: 100% 50%;
        margin-right: 16px;
    }

    .list__muted {
        color: #B8B9BD;
    }

    .list .list__item:last-child {
        border-bottom: none;
    }
</style>
