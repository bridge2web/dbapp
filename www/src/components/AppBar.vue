<template>
    <div>
        <header class="header">
            <div class="header__col header__col_left">
                <slot name="left"></slot>
            </div>
            <div class="header__col header__col_center">
                <slot name="center">
                    &nbsp;
                </slot>
            </div>
            <div class="header__col header__col_right">
                <slot name="right"></slot>
            </div>
        </header>
        <div class="header__spacer"> </div>
    </div>
</template>

<script>
    export default {
        name: 'app-bar'/*,
         props: {
         left: String,
         center: String,
         right: String
         }*/
    }
</script>

<style>
    .header {
        z-index: 1000;
        position: fixed;
        top: 0px;
        background: #F9F162;
        height: 56px;
        display: table;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    }

    .header__spacer {
        height: 56px; 
    }

    .header__col {   
        display: table-cell;
        vertical-align: middle;
    }

    .header__col_left {
        width: 56px;
        padding-left: 16px;
    }

    .header__col_center {

    }

    .header__col_right {
        padding-right: 8px;
    }

    .header__btn {
        cursor: pointer;
    }
</style>
