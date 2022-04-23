<template>
    <div>
        <side-nav v-if="showModal" @close="showModal = false">
            First Text
        </side-nav>
        <div class="header__btn menu-main__toggle btn_hamburger" @click="showModal = true"></div>
    </div>
</template>

<script>
    import SideNav from './SideNav.vue';
    export default {
        name: 'btn-hamburger',
        components: {
            SideNav
        },
        data: function () {
            return {
                showModal: false
            }
        },
        methods: {
            toggle: function () {
                opened = !opened;
            }
        }
    }
</script>

<style>
    .btn_hamburger {
        background: url('../assets/android/images/btn_hamburger.svg') no-repeat;
        width: 18px;
        height: 12px;
    }
</style>
