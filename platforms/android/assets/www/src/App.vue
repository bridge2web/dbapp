<template>
    <div class="app">
        <transition name="fade" mode="out-in">
            <router-view class="view"/>
        </transition>
        <bottom-navigation-bar/>
    </div>
</template>

<script>    
    import BottomNavigationBar from './components/BottomNavigationBar.vue'

    export default {
        name: 'app',
        components: {
            BottomNavigationBar
        }/*,
        watch: {
            '$route'(to, from) {

            }
        }*/
    }
</script>

<style>
    /*
    * Font
    */

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: normal;
        src: url('./assets/android/fonts/Roboto-Regular.ttf');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: url('./assets/android/fonts/Roboto-Medium.ttf');
    }

    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: bold;
        src: url('./assets/android/fonts/Roboto-Bold.ttf');
    }

    /*
    * Global
    */

    * {
        -webkit-tap-highlight-color: rgba(0,0,0,0); /* make transparent link selection, adjust last value opacity 0 to 1.0 */
    }

    body {
        -webkit-touch-callout: none;                /* prevent callout to copy image, etc when tap to hold */
        -webkit-text-size-adjust: none;             /* prevent webkit from resizing text to fit */
        -webkit-user-select: none;                  /* prevent copy paste, to allow, change 'none' to 'text' */
        background: #F0F0F0;
        font-family: 'Roboto', sans-serif;
        color: #000;
        height: auto;
    }

    .h1 {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 24px;
        margin-bottom: 15px;
        position: relative;
    }

    .h3 {
        font-size: 13px;
        text-transform: uppercase;
        opacity: .5;
    }

    .h6 {
        font-weight: 500;
        font-size: 14px;  
        color: #999999;
        margin-bottom: 8px;
    }

    a {
        color: #007AFF;
        text-decoration: none;
    }

    /* Portrait layout (default) */
    .app {

    }

    /*
    * Helper
    */

    .border-box {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .wrapper {
        padding-left: 8px;
        padding-right: 8px;
    }

    .wrapper_x_2  {
        padding-left: 16px;
        padding-right: 16px;     
    }

    .card-shadow {

    }

    .card-shadow_1 {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .card-shadow_1:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .b-right {
        position: absolute;
        right: 0px;
    }

    .b-right.mdl-button {
        margin-top: -3px;
    }

    .white-box {
        background: #fff;
    }
    
    .yellow {
        background: #F9F162;
    }

    /*
    * MDL fix
    */

    .mdl-button--primary.mdl-button--primary {
        color: #007AFF;
    }

    .mdl-dialog__title {
        font-size: 20px;
        color: #4D4D4D;
    }

    /*
    * UI
    */

    .radio-list {

    }

    .radio-list__item {
        font-size: 13px;
        line-height: 16px;
        display: block;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .radio-list__item_has-count {
        text-transform: uppercase;
        line-height: 100%;
    }

    .radio-list__input {
        position: absolute;
        opacity: 0;
    }

    .radio-list__label {
        cursor: pointer;
        display: block;
        background: #fff;
        border-radius: 2px;
        padding: 8px;
    }

    .radio-list__item_has-count .radio-list__label {
        font-weight: bold;
        padding: 12px;
    }

    .radio-list__count {
        font-weight: normal;
        color: #999999;
        margin-left: 8px;
    }

    .radio-list__label_active {
        background: #F9F162;
        color: #000;
    }    
    
    .btn_block {
        background: #fff;
        font-size: 14px;
        text-transform: uppercase;
        text-align: center;
        border: 1px solid #D2D2D2;
        padding: 8px;
        border-radius: 4px;
        display: block;
        font-weight: 500;
        letter-spacing: .025em;
        vertical-align: middle;
    }
    
    /*
    * Misc
    */
    
    .hint {
        color: #8F8E94;
        font-size: 13px;
    }

    /* Landscape layout (with min-width) */
    @media screen and (min-aspect-ratio: 1/1) and (min-width:400px) {
        .app {

        }
    }

</style>
