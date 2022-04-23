<template>
    <list :list="list" v-model="selected"/>
</template>

<script>
    import List from './List.vue';
    export default {
        name: 'category-list',
        components: {
            List
        },
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: {
            tree: {
                type: Array,
                default: () => []
            },
            initialSelected: {
                default: 0
            },
            needLeaf: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                selected: this.initialSelected
            }
        },
        watch: {
            selected: function (selected) {
                if (this.isLeaf) {
                    this.$emit('change', selected)
                    this.$emit('leaf', selected)                    
                }
                if (!this.needLeaf || this.isLeaf) {
                    this.$emit('change', selected)
                }
            }
        },
        computed: {
            list: function () {
                if (!this.active)
                    return this.tree.filter(function (node) {
                        return node.depth == 1
                    })
                return this.tree.filter(function (node) {
                    return node.depth == (this.depth + 1) && (node.lft > this.lft && node.rgt < this.rgt)
                }, this.active)
            },
            active: function () {
                if (!this.selected)
                    return null
                return this.tree.find(function (node) {
                    return node.id == this;
                }, this.selected)
            },
            isLeaf: function () {
                if (!this.active)
                    return false
                return this.active.rgt - this.active.lft == 1
            }
        }
    }
</script>
