<template>
    <div class="mdl-select">
        <div :class="{'mdl-textfield': true, 'mdl-js-textfield': true, 'mdl-textfield--floating-label': true, 'is-invalid': isInvalid, 'is-dirty': isDirty}" :id="name + '-field'" v-on-clickaway="onAway">
            <select class="mdl-select__input" v-model="model" v-on:click.prevent="onClick" :id="name" :name="name">
                <option class="option" v-for="item in normalizedList" v-bind:value="item.value">{{ item.name }}</option>
            </select>
            <input class="mdl-textfield__input" type="text" :value="displayVal">
            <label class="mdl-textfield__label" :for="name">{{ label }}</label>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { mixin as clickaway } from 'vue-clickaway'
    export default {
        mixins: [clickaway],
        name: 'select-input',
        props: ['name', 'label', 'value', 'list', 'hasError'],
        data: function () {
            return {
                model: null,
                val: this.value,
                isInvalid: this.hasError,
                isDirty: false
            }
        },
        created: function () {
            if (this.val) {
                this.isDirty = true
            } else {
                this.isDirty = false
            }
        },
        watch: {
            model: function (value) {
                this.val = $('#' + this.name).children(':selected').text()
                if (this.val) {
                    this.isDirty = true
                } else {
                    this.isDirty = false
                }
                this.isInvalid = false
                this.$emit('input', value)
                //this.$emit('change', value);
            },
            value: function (value) {
                if (!value)
                    this.val = ''
            },
            hasError: function (hasError) {
                this.isInvalid = hasError
            }
        },
        methods: {
            onClick: function (event) {
                $(event.target).parent().addClass('is-focused')
            },
            onAway: function (event) {
                $('.mdl-textfield').removeClass('is-focused')
            }
        },
        computed: {
            normalizedList: function () {
                if (Array.isArray(this.list)) {
                    return this.list.map(function (currentValue, index, array) {
                        var item = {}
                        item.value = index
                        item.name = currentValue
                        return item
                    }).filter(function (item) {
                        if (item.value)
                            return true
                    })
                } else {
                    var list = []
                    for (var key in this.list) {
                        if (this.list.hasOwnProperty(key)) {
                            if (!this.list[key])
                                continue
                            var item = {}
                            item.value = key
                            item.name = this.list[key]
                            list.push(item)
                        }
                    }
                    return list
                }
            },
            displayVal: function () {
                if (!this.normalizedList) return ''
                var valItem = this.normalizedList.find(function (item) {
                        if (item.value == this || item.name == this)
                            return item
                }, this.val)
                if (valItem) return valItem.name
                return ''
            }
        }
    }
</script>

<style>
    .mdl-select {
        background: url('../assets/android/images/select-input__arrow.svg') no-repeat 100% 50%;
    }    

    .mdl-select__input {
        width: 100%;
        height: 30px;
        position: absolute;
        z-index: 777;
        opacity: 0;
    }
    .mdl-select__input .option {
        opacity: 0;
    }
</style>
