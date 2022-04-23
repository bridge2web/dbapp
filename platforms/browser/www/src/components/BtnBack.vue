<template>
    <div class="header__btn header__btn_back btn_back" v-on:click="back"></div>
</template>

<script>
    export default {
        name: 'btn-back',
        props: ['to', 'force'],
        methods: {
            back: function (event) {
                if (this.to) {
                    this.$router.push({path: this.to})
                    if (this.force) window.location.reload()
                } else {
                    this.$router.go(-1)
                    if (this.force) window.location.reload()
                }
            }
        }
    }
</script>

<style>
    .btn_back {
        background: url('../assets/android/images/btn_back.svg') no-repeat;
        width: 24px;
        height: 24px;
    }
</style>
