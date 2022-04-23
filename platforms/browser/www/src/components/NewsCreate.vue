<template>    
    <main class="news-create">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title h1="Отправка ново…" slot="center"/>   
            <btn-submit value="Отправить" slot="right" v-on:click="onSubmit"/>
        </app-bar>
        <list :list="[{id: 1, name: 'Правила'}]" v-model="rules"/>
        <div class="wrapper wrapper_x_2">
            <mdl-textfield floating-label="Текст новости" v-model="model.content" textarea rows="7"></mdl-textfield>
            <h6 class="h6">Фото</h6>
            <photo-upload :csrf-param="csrfParam" :csrf-token="csrfToken" v-model="model.photos" create-url="http://m.delovoibiysk.ru/news-photo/create" delete-url="http://m.delovoibiysk.ru/news-photo/delete" />
            <mdl-textfield floating-label="Ссылка, Youtube или video.mail.ru" v-model="model.url" :class="{'is-invalid': 'url' in errors}" />
            <div class="hint">Например, материал с видеорегистратора</div>           
            <h6 class="h6">Контактное лицо</h6>
            <mdl-textfield floating-label="Телефон, +7 XXX XXX XX XX" v-model="model.phone" :class="{'is-invalid': 'phone' in errors}" />
            <mdl-textfield floating-label="Эл. почта" v-model="model.email" :class="{'is-invalid': 'email' in errors}" />
            <div class="hint">Эл. почта и телефон не публикуются</div>
        </div><!-- .wrapper -->
    </main>
</template>

<script>
    import $ from 'jquery'
    import AppBar from './AppBar.vue'
    import BtnBack from './BtnBack.vue'
    import AppBarTitle from './AppBarTitle.vue'
    import BtnSubmit from './BtnSubmit.vue'
    import PhotoUpload from './PhotoUpload.vue'
    import List from './List.vue'
    export default {
        props: {
            params: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data: function () {
            return {
                rules: false,
                csrfParam: '',
                csrfToken: '',
                model: {
                    content: '',
                    url: '',
                    phone: '',
                    email: '',
                    photos: []
                },
                errors: []
            }
        },
        components: {
            AppBar,
            BtnBack,
            AppBarTitle,
            BtnSubmit,
            PhotoUpload,
            List
        },
        created: function () {
            this.fetch()
        },
        methods: {
            fetch: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('GET', 'http://m.delovoibiysk.ru/site/get-csrf')
                xhr.onload = function () {
                    var data = JSON.parse(xhr.responseText)
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            self.$set(self, prop, data[prop])
                        }
                    }
                }
                xhr.send()
            },
            onSubmit: function () {
                var xhr = new XMLHttpRequest()
                var self = this
                xhr.open('POST', 'http://m.delovoibiysk.ru/news/create')
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText)
                        if (!localStorage.getItem('dialogs'))
                            localStorage.setItem('dialogs', JSON.stringify([]))
                        var dialogs = JSON.parse(localStorage.getItem('dialogs'))
                        dialogs.push({
                            title: 'Спасибо',
                            content: 'Ваша новость была отправлена',
                            actionUrl: false,
                            actionText: null,
                            close: 'Ok'
                        });
                        localStorage.setItem('dialogs', JSON.stringify(dialogs))
                        self.$router.push({path: '/'})
                    } else {
                        self.errors = JSON.parse(xhr.responseText)
                        alert('Пожалуйста, заполните все поля корректно')
                    }
                }
                xhr.send(this.formData)
            }
        },
        watch: {
            rules: function (rules) {
                if (rules)
                    this.$router.push({path: '/news/create-rules'})
            }
        },
        computed: {
            formData: function () {
                var formData = new FormData()
                formData.append(this.csrfParam, this.csrfToken)
                var model = {}
                for (var prop in this.model) {
                    if (this.model.hasOwnProperty(prop)) {
                        this.$set(model, prop, this.model[prop])
                    }
                }
                model.photos = model.photos.map(function(item) {
                    return item.uid
                })                
                formData.append('model', JSON.stringify(model))
                return formData
            }
        }
    }
</script>

<style>

</style>