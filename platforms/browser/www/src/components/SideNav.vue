<template>
    <transition name="modal">
        <v-touch class="side-nav" v-on:swipeleft="$emit('close')">
            <div class="side-nav__mask">
                <div class="side-nav__wrapper" v-on:click.self="$emit('close')">
                    <div class="side-nav__container">
                        <slot name="content">
                            <section class="side-nav__section">
                                <router-link :to="{path: '/post', query: {reset: true}}" class="side-nav__link">Объявления</router-link>
                                <router-link to="/news" class="side-nav__link">Новости</router-link>
                                <router-link to="/joy" class="side-nav__link">Афиши</router-link>
                            </section>
                            <section class="side-nav__section">
                                <router-link to="/post/create-select-category" class="side-nav__link"><span class="side-nav__icon-box"><img class="side-nav__icon" src="../assets/images/icon_post-create.svg" alt="Подать объявление" style="margin-left: 1px;"></span>Подать объявление</router-link>
                                <router-link to="/news/create" class="side-nav__link"><span class="side-nav__icon-box"><img class="side-nav__icon" src="../assets/images/icon_news-create.svg" alt="Сообщить новость"></span>Сообщить новость</router-link>
                            </section>
                            <section class="side-nav__section">
                                <a href="https://new.vk.com/dbsk22" target="_system" class="side-nav__link"><span class="side-nav__icon-box"><img class="side-nav__icon" src="../assets/images/icon_vk.svg" alt="Вконтакте"></span>Вконтакте</a>
                                <a href="https://ok.ru/delovoybiy" target="_system" class="side-nav__link"><span class="side-nav__icon-box"><img class="side-nav__icon" src="../assets/images/icon_ok.svg" alt="Одноклассники"></span>Одноклассники</a>
                            </section>
                        </slot>
                    </div>
                </div>
            </div>
        </v-touch>
    </transition>
</template>

<script>
    export default {
        name: 'side-nav'
    }
</script>

<style>
    .side-nav__mask {
        position: fixed;
        z-index: 1004;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .side-nav__wrapper {
        display: table-cell;
    }

    .side-nav__container {
        width: 260px;
        background-color: #F8F8F9;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all 1s ease;
        height: 100%;
    }

    .side-nav__link {
        display: block;
        color: #000;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        padding-left: 18px;
    }
    
    .side-nav__icon-box {
        width: 54px;
        display: inline-block;
    }
    
    .side-nav__section {
        border-bottom: 1px solid #D3D3D4;   
        padding-top: 5px;
        padding-bottom: 5px;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .side-nav__container,
    .modal-leave-active .side-nav__container {
        transform: translate(-260px,0);
    }
</style>
