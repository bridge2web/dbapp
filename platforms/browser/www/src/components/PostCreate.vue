<template>    
    <main class="post-create">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title h1="Новое объявле..." slot="center"/>   
            <btn-submit value="Подать" slot="right" v-on:click="onSubmit"/>
        </app-bar>
        <category-set :list="createParams.lists.categoryList" v-model="model.category_id" name="post-create__category"/>
        <div class="wrapper wrapper_x_2">
            <template v-if="inCategory('realty')">
                <template v-if="inAct(['sell', 'rent'])">
                    <template v-if="inCategory('mezhgorod')">
                        <mdl-textfield floating-label="Местоположение" v-model="model.meta.location" :class="{'is-invalid': 'meta.location' in errors}" />                
                    </template>
                    <template v-else>
                        <select-input v-if="createParams.lists.districtList" name="district" label="Район города" :list="createParams.lists.districtList" v-model="model.meta.district" :has-error="'meta.district' in errors" />            
                        <mdl-textfield floating-label="Улица" v-model="model.meta.street" :class="{'is-invalid': 'meta.street' in errors}" />
                        <mdl-textfield floating-label="Дом №" v-model="model.meta.bldg" :class="{'is-invalid': 'meta.bldg' in errors}" />
                    </template>
                    <template v-if="inCategory('kvartiry')">
                        <mdl-textfield floating-label="Этаж" v-model="model.meta.floor" />
                    </template>
                    <template v-if="inCategory(['kvartiry', 'doma'])">
                        <mdl-textfield floating-label="Этажей в доме" v-model="model.meta.floors" />
                        <select-input v-if="createParams.lists.materialList" name="material" label="Тип дома" :list="createParams.lists.materialList" v-model="model.meta.material" />
                        <select-input v-if="createParams.lists.otoplenList" name="otoplen" label="Отопление" :list="createParams.lists.otoplenList" v-model="model.meta.otoplen" :has-error="'meta.otoplen' in errors" />
                        <select-input v-if="createParams.lists.balconList" name="balcon" label="Балкон" :list="createParams.lists.balconList" v-model="model.meta.balcon" :has-error="'meta.balcon' in errors" />
                    </template>
                    <mdl-textfield floating-label="Площадь, м²" v-model="model.meta.square" />
                </template><!-- sell, rent -->
            </template><!-- realty -->
            <template v-if="inCategory('auto')">
                <template v-if="inAct('sell')">
                    <template v-if="inCategory(['inomarki', 'otechestvennye'])">
                        <select-input v-if="createParams.lists.autoBrandList" name="brandId" label="Марка" :list="createParams.lists.autoBrandList" v-model="model.meta.brandId" :has-error="'meta.brandId' in errors" /> 
                        <select-input v-if="createParams.lists.autoModelList" name="modelId" label="Модель" :list="createParams.lists.autoModelList" v-model="model.meta.modelId" :has-error="'meta.modelId' in errors" />            
                    </template>
                    <template v-if="inCategory('gruzoviki')">
                        <mdl-textfield floating-label="Марка" v-model="model.meta.brandName" :class="{'is-invalid': 'meta.brandName' in errors}" />
                        <mdl-textfield floating-label="Модель" v-model="model.meta.modelName" :class="{'is-invalid': 'meta.modelName' in errors}" />
                    </template>  
                    <template v-if="inCategory(['inomarki', 'otechestvennye', 'gruzoviki', 'motocikly'])">
                        <mdl-textfield floating-label="Год" v-model="model.meta.year" :class="{'is-invalid': 'meta.year' in errors}" />
                        <template v-if="inCategory(['inomarki', 'otechestvennye', 'gruzoviki'])">
                            <mdl-textfield floating-label="Пробег, км" v-model="model.meta.mileage" :class="{'is-invalid': 'meta.mileage' in errors}" />
                            <template v-if="inCategory(['inomarki', 'otechestvennye'])">               
                                <mdl-textfield floating-label="Объем, см³" v-model="model.meta.volume" :class="{'is-invalid': 'meta.volume' in errors}" /> 
                                <select-input v-if="createParams.lists.transmissionList" name="transmission" label="Коробка" :list="createParams.lists.transmissionList" v-model="model.meta.transmission" :has-error="'meta.transmission' in errors" />
                                <select-input v-if="createParams.lists.driveList" name="drive" label="Привод" :list="createParams.lists.driveList" v-model="model.meta.drive" :has-error="'meta.drive' in errors" />
                                <select-input v-if="createParams.lists.fuelList" name="fuel" label="Топливо" :list="createParams.lists.fuelList" v-model="model.meta.fuel" :has-error="'meta.fuel' in errors" />
                                <template v-if="inCategory(['inomarki'])">
                                    <select-input v-if="createParams.lists.wheelList" name="wheel" label="Руль" :list="createParams.lists.wheelList" v-model="model.meta.wheel" :has-error="'meta.wheel' in errors" />              
                                </template>
                            </template> 
                            <template v-if="inCategory('gruzoviki')"> 
                                <mdl-textfield floating-label="Г/п, тонн" v-model="model.meta.gp" :class="{'is-invalid': 'meta.gp' in errors}" />
                                <select-input v-if="createParams.lists.kuzovList" name="kuzov" label="Тип кузова" :list="createParams.lists.kuzovList" v-model="model.meta.kuzov" :has-error="'meta.kuzov' in errors" /> 
                            </template>
                        </template>               
                    </template> 
                    <template v-if="inCategory('shiny-i-diski')">
                        <template v-if="inCategory('shiny')">
                            <select-input v-if="createParams.lists.seasonList" name="season" label="Сезон" :list="createParams.lists.seasonList" v-model="model.meta.season" :has-error="'meta.season' in errors" /> 
                            <select-input v-if="createParams.lists.widthList" name="width" label="Ширина" :list="createParams.lists.widthList" v-model="model.meta.width" :has-error="'meta.width' in errors" />
                            <select-input v-if="createParams.lists.heightList" name="height" label="Высота" :list="createParams.lists.heightList" v-model="model.meta.height" :has-error="'meta.height' in errors" />
                        </template> 
                        <template v-if="inCategory('diski')">
                            <select-input v-if="createParams.lists.etList" name="et" label="Вылет (ET)" :list="createParams.lists.etList" v-model="model.meta.et" :has-error="'meta.et' in errors" /> 
                            <select-input v-if="createParams.lists.pcdList" name="pcd" label="Сверловка (PCD)" :list="createParams.lists.pcdList" v-model="model.meta.pcd" :has-error="'meta.pcd' in errors" />      
                        </template>
                        <select-input v-if="createParams.lists.diaList" name="dia" label="Диаметр" :list="createParams.lists.diaList" v-model="model.meta.dia" :has-error="'meta.dia' in errors" />
                    </template> 
                </template><!-- sell --> 
            </template><!-- auto -->
            <template v-if="inCategory('jobs')">
                <template v-if="inAct('vacancy')">
                    <mdl-textfield floating-label="Название организации" v-model="model.meta.org" :class="{'is-invalid': 'meta.org' in errors}" />
                </template>
                <mdl-textfield floating-label="Должность" v-model="model.meta.position" :class="{'is-invalid': 'meta.position' in errors}" />
                <mdl-textfield floating-label="Зарплата, ₽" v-model="model.price" :class="{'is-invalid': 'meta.price' in errors}" />
            </template><!-- jobs -->  
            <template v-if="inCategory('furnitures')">
                <template v-if="inCategory('clothing')">
                    <select-input v-if="createParams.lists.clothingSizeList" name="size" label="Размер" :list="createParams.lists.clothingSizeList" v-model="model.meta.size" :has-error="'meta.size' in errors" />
                </template>
                <template v-if="inCategory('childrens-odezhda')">
                    <select-input v-if="createParams.lists.childrenSizeList" name="size" label="Размер" :list="createParams.lists.childrenSizeList" v-model="model.meta.size" :has-error="'meta.size' in errors" />
                </template>
            </template><!-- furnitures --> 
            
            <mdl-textfield v-if="model.needSubject" floating-label="Название объявления" v-model="model.subject" :class="{'is-invalid': 'subject' in errors}" />
            
            <mdl-textfield floating-label="Текст объявления" v-model="model.content" textarea rows="7"></mdl-textfield>
            
            <h6 class="h6">Фото</h6>
            <photo-upload :csrf-param="createParams.csrfParam" :csrf-token="createParams.csrfToken" v-model="model.photos" create-url="http://m.delovoibiysk.ru/photo/create" delete-url="http://m.delovoibiysk.ru/photo/delete" />
            
            <template v-if="!inCategory('jobs')">
                <h6 class="h6">О Сделке</h6>
                <mdl-textfield floating-label="Цена, ₽" v-model="model.price" />
            </template>
            <template v-if="inCategory('realty')">
                <mdl-switch v-if="!isNaN(model.meta.isAgent)" v-model="model.meta.isAgent" class="mdl-js-ripple-effect">Агентство</mdl-switch>
            </template><!-- realty -->
            <h6 class="h6">Контактное лицо</h6>
            <mdl-textfield floating-label="Имя" v-model="model.name" :class="{'is-invalid': 'name' in errors}" />
            <mdl-textfield floating-label="Телефон, +7 XXX XXX XX XX" v-model="model.phone" :class="{'is-invalid': 'phone' in errors}" />
            <mdl-textfield floating-label="Эл. почта" v-model="model.email" :class="{'is-invalid': 'email' in errors}" />
            <mdl-switch v-if="!isNaN(model.show_email)" v-model="model.show_email" class="mdl-js-ripple-effect">Эл. почта в объявлении</mdl-switch>
            <mdl-switch v-if="!isNaN(model.comment_status)" v-model="model.comment_status" class="mdl-js-ripple-effect">Вопросы от покупателей</mdl-switch>
        </div><!-- .wrapper -->
    </main>
</template>

<script>
import $ from 'jquery'
import AppBar from './AppBar.vue'
import BtnBack from './BtnBack.vue'
import AppBarTitle from './AppBarTitle.vue'
import BtnSubmit from './BtnSubmit.vue'
import CategorySet from './CategorySet.vue'
//import TextInput from './TextInput.vue'
import SelectInput from './SelectInput.vue'
import PhotoUpload from './PhotoUpload.vue'
export default {
    props: {
        params: {
            type: Object,
            default: function () {
                return {category_id: 0}
            }
        }
    },
    data: function () {
        return {
            createParams: {
                csrfParam: '',
                csrfToken: '',
                lists: [],
            },
            model: {
                category_id: this.params.category_id,
                content: '',
                show_email: 1,
                comment_status: 1,
                name: '',
                phone: '',
                email: '',
                meta: [],
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
        CategorySet,
        SelectInput,
        PhotoUpload
    },
    created: function () {
        this.fetch()
    },
    methods: {
        fetch: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.open('GET', 'http://m.delovoibiysk.ru/post/get-create-params?' + $.param(this.model))
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText)
                self.$set(self, 'createParams', data.createParams)
        
                for (var prop in self.model) {
                    if (data.model.hasOwnProperty(prop) && prop != 'photos') {
                        self.$set(self.model, prop, data.model[prop])
                    }
                }
            }
            xhr.send()
        },
        onSubmit: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            xhr.open('POST', 'http://m.delovoibiysk.ru/post/create')
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText)                                                      
                    if (!localStorage.getItem('dialogs'))
                        localStorage.setItem('dialogs', JSON.stringify([]))
                    var dialogs = JSON.parse(localStorage.getItem('dialogs'))
                    dialogs.push({
                        title: 'Объявление подано',
                        content: 'Ваше объявление было опубликовано',
                        actionUrl: response.url,
                        actionText: 'Посмотреть',
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
        },
        inCategory: function (category) {
            if (!this.createParams.lists.categoryList)
                return false
            return this.createParams.lists.categoryList.some(function (itemCategory) {
                if (Array.isArray(this)) {
                    return this.some(function (item) {
                        return item == this
                    }, itemCategory.slug_unique)
                }
                return itemCategory.slug_unique == this
            }, category)
        },
        inAct: function (act) {
            if (!this.createParams.lists.categoryList)
                return false
            return this.createParams.lists.categoryList.some(function (itemCategory) {
                if (Array.isArray(this)) {
                    return this.some(function (item) {

                        return item == this
                    }, itemCategory.slug)
                }
                return itemCategory.slug == this
            }, act)
        }
    },
    watch: {
        'model.category_id': function (category_id) {
            if (this.params.category_id != category_id)
                this.$router.push({path: '/post/create-select-category', query: {category_id: category_id}})
        },
        'model.meta.brandId': function (val, oldVal) {
            if (val && val != oldVal) {
                this.fetch()
            }
        }
    },
    computed: {
        formData: function () {
            var formData = new FormData()
            formData.append(this.createParams.csrfParam, this.createParams.csrfToken)
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
    .post-create__category {
        margin-bottom: 12px;
    }

    .mdl-switch {
        margin-top: 12px;
        margin-bottom: 12px;
    }
</style>