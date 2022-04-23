<template>
    <div class="banner banner_news-send border-box">
        <router-link to="/news/send" class="btn banner_news-send__btn"><img class="icon banner_news-send__icon" src="../assets/images/banner_news-send__btn.svg" alt="Прислать новость"> Прислать новость</router-link>
        <div class="banner_news-send__info">Платим за актуальные фото и видео.<br>
            Например, материалы с видеорегистратора</div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .banner_news-send {
        background: url(../assets/images/banner_news-send.jpg) no-repeat 50% 100%;
        height: 150px;
        padding-top: 32px;
        margin-bottom: 16px;
    }

    .banner_news-send__btn {
        display: block;
        color: #000;/**/
        background: #F9F162;
        border-radius: 4px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 17px;
        margin-left: 16px;
        margin-right: 16px;
        margin-bottom: 10px;
    }

    .banner_news-send__icon {
        margin-right: 3px;
    }
    
    .banner_news-send__info {
         font-size: 13px;
         color: #fff;
         text-align: center;
         line-height: 17px;
    }
</style>
