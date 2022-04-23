<template>    
    <div>
        <select-input v-model="selectedIds[1]" name="category-1" label="Раздел" :list="list[1]"/>
        <select-input v-if="visible[2]" v-model="selectedIds[2]" name="category-2" label="Подраздел" :list="list[2]"/>
        <select-input v-if="visible[3]" v-model="selectedIds[3]" name="category-3" label="Тип объявления" :list="list[3]"/>
    </div>
</template>

<script>
    import SelectInput from './SelectInput.vue';
    export default {
        name: 'category-dropdown',
        components: {
            SelectInput
        },
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: {
            tree: {
                type: Array,
                default: []
            }
        },
        data: function () {
            return {
                selectedIds: [0, 0, 0, 0],
                visible: [true, true, false, false],
            }
        },
        computed: {
            list: function () {
                var list = [[], [], [], []];
                var parent = null;
                list[1] = this.tree.filter(function (node) {
                    return node.depth == 1;
                });
                if (!this.selectedIds[1]) {
                    return list;
                }
                parent = this.tree.find(function (node) {
                    return node.id == this;
                }, this.selectedIds[1]);
                list[2] = this.tree.filter(function (node) {
                    return node.depth == 2 && (node.lft > parent.lft && node.rgt < parent.rgt);
                }, parent);
                if (!this.selectedIds[2]) {
                    return list;
                }
                parent = this.tree.find(function (node) {
                    return node.id == this;
                }, this.selectedIds[2]);
                list[3] = this.tree.filter(function (node) {
                    return node.depth == 3 && (node.lft > parent.lft && node.rgt < parent.rgt);
                }, parent);
                return list;
            }
        },
        watch: {
            selectedIds: function (selectedIds) {
                var selectedIds = selectedIds.slice(0).reverse();
                var list = this.list.slice(0).reverse();
                var selectedItem = null;
                var selected = selectedIds.find(function (lastSelectedId, index, array) {
                    if (lastSelectedId != 0) {
                        return this[index].some(function (item) {
                            if (item.id == this) {
                                selectedItem = item
                                return true
                            } else {
                                return false
                            }
                        }, lastSelectedId);
                    }
                    return false;
                }, list);
                if (!selected)
                    selected = 0;

                this.visible.forEach(function (item, index, array) {
                    array[index] = (selectedItem.depth + 1) >= index;
                }, selectedItem);

                this.$emit('change', Number(selected));
            }
        }
    }
</script>

<style>

</style>
