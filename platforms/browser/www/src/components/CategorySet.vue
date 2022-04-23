<template>
    <list :list="list" v-model="selected" :icon="icon" :name="name" :hide-first="!withRoot" />
</template>

<script>
import List from './List.vue'
import IconUpdate from '../assets/images/icon_update.svg'
export default {
    name: 'category-set',
    components: {
        List
    },
    model: {
        prop: 'selected',
        event: 'change'
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
        withRoot: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            selected: 0
        }
    },
    watch: {
        selected: function (selected) {
            this.$emit('change', selected == 1 ? 1 : this.parent.id)
        }
    },
    computed: {
        parent: function () {
            if (!this.active)
                return 1
            var parent = this.list.find(function (node) {
                return node.depth == (this.depth - 1) && (node.lft < this.lft && node.rgt > this.rgt);
            }, this.active)
            return parent ? parent : 1
        },
        active: function () {
            if (!this.selected)
                return null
            return this.list.find(function (node) {
                return node.id == this;
            }, this.selected)
        },
        icon: function () {
            return IconUpdate
        }
    }
}
</script>
