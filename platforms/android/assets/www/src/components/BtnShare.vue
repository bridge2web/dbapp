<template>
    <div>
        <div v-if="type == 'icon'" class="header__btn header__btn_share btn_share" @click="onClick"></div>
        <div v-if="type == 'button'" class="btn_block btn_share" @click="onClick"><span class="icon icon_share"> </span> Поделиться</div>
    </div>
</template>

<script>
    export default {
        name: 'btn-share',
        props: {
            type: {
                type: String,
                default: 'icon'
            }
        },
        methods: {
            onClick: function () {
                this.$emit('click')
            }
        }
    }
</script>

<style>
    .header__btn_share {
        float: right;
        background: url('../assets/android/images/btn_share.svg') no-repeat;
        width: 24px;
        height: 24px;
    }

    .btn_block.btn_share {
        margin-bottom: 16px;
    }
    
    .icon_share {
        display: inline-block;
        background: url('../assets/android/images/btn_share.svg') no-repeat;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 8px;
    }
</style>
