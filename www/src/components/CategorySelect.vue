<template>
    <div class="category-select radio-list">
        <div v-for="item in list" :class="{'radio-list__item category-item': true, 'radio-list__item_has-count': showCount}">
             <input type="radio" v-model="selected" v-bind:value="item.id" v-bind:id="'category-' + item.id" class="radio-list__input">
            <label v-bind:style="{color: 'color' in item && selected != item.id ? item.color : null}" v-bind:for="'category-' + item.id" :class="{'radio-list__label category-item__name card-shadow_1': true, 'radio-list__label_active': selected == item.id}">{{ item.name }}<span v-if="showCount" class="radio-list__count">{{ item.post_count }}</span></label>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import 'slick-carousel'
    import 'slick-carousel/slick/slick.css'
    import 'slick-carousel/slick/slick-theme.css'
    export default {
        name: 'category-select',
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: {
            showCount: {
                type: Boolean,
                default: false
            },
            categoryList: {
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
                list: this.categoryList
            }
        },
        updated: function () {
            if (this.list.length) {
                this.slick()
            }
        },
        mounted: function () {
            if (this.list.length) {
                this.slick()
            }
        },
        methods: {
            slick: function () {
                //$('.category-select').slick('unslick');
                if (!$('.category-select').hasClass('slick-initialized')) {
                    $('.category-select').slick({
                        variableWidth: true,
                        arrows: false,
                        infinite: false,
                        slidesToShow: 2,
                        rows: 0
                    })
                }
            }
        },
        watch: {
            categoryList: function (categoryList) {
                this.list = categoryList
            },
            selected: function (selected) {
                this.$emit('change', Number(selected))
            }
        }
    }
</script>

<style>
    .category-select {
        margin-top: 8px;
        margin-left: 8px;
    }
</style>
