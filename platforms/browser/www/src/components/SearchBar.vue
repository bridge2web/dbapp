<template>
    <form class="search-bar clearfix">
        <div class="search-bar__col search-bar__col_q">
            <div class="search-bar__button search-bar__button_clear" v-on:click="onClear"> </div>
            <input class="search-bar__q border-box" name="q" placeholder="Поиск по объявлениям" v-model="val">
        </div>
        <div class="search-bar__col search-bar__col_cancel">
            <button class="mdl-button mdl-js-button search-bar__button_cancel" v-on:click="onCancel">
                Отменить
            </button>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'search-bar',
        props: ['value'],
        methods: {
            onCancel: function (event) {
                this.$router.push({path: '/post'})
                window.location.reload()
            },
            onClear: function (event) {
                this.val = ''
            }
        },
        data: function () {
            return {
                val: this.value
            }
        },
        watch: {
            val: function (val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<style>
    .search-bar {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 56px;
        background: #F9F162;
        display: table;
        padding-left: 8px;
        z-index: 1003;
    }

    .search-bar__q {
        border: none;
        height: 28px;
        border-radius: 4px;
        background: #fff url('../assets/images/search-bar__q.svg') no-repeat 8px 50%;
        padding-left: 28px;
        padding-right: 30px;
        width: 100%;
    }

    .search-bar__button_clear {
        width: 14px;
        height: 14px;
        position: absolute;
        background: url('../assets/images/search-bar__button_clear.svg');
        right: 8px;
        margin-top: 7px;
    }

    .search-bar__col {
        display: table-cell;
        vertical-align: middle;
    }

    .search-bar__col_q {
        position: relative;
        width: 63%;
    }

    .search-bar__col_cancel {
        width: 37%;
    }

    .search-bar__button_cancel {
        padding: 0 12px;
    }
</style>
