<template>
    <mdl-textfield :floating-label="label" v-model="model" :class="{'is-invalid': 'name' in errors}" :error="'name' in errors ? errors.name.join('<br>') : ''" />
</template>

<script>
    export default {
        name: 'text-input',
        props: ['name', 'model', 'value'],
        mounted: function () {
            $('#' + this.name).upgradeElement();
        }
    }
</script>

<style>

</style>
