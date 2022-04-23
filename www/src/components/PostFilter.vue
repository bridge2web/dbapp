<template>
    <main class="post-filter">
        <app-bar>
            <btn-back slot="left"/>
            <app-bar-title h1="Фильтры" slot="center"/>
            <btn-submit value="Применить" slot="right" v-on:click="onSubmit"/>        
        </app-bar>
        <category-set 
            v-if="filterParams.lists.categoryList" 
            :list="filterParams.lists.categoryList" 
            v-model="model.category_id" 
            name="post-filter__category" 
            :with-root="filterParams.lists.categoryList.length == 1" 
            @click.native="changeCategory"/>
        <div class="wrapper wrapper_x_2">
            <h6 class="h6">Цена</h6>
            <mdl-textfield floating-label="От, ₽" v-model="model.priceFrom"/>
            <mdl-textfield floating-label="До, ₽" v-model="model.priceTo"/>

            <template v-if="inCategory('realty')">
                <template v-if="inAct(['sell', 'rent'])">
                    <template v-if="inCategory('kvartiry')">
                        <h6 class="h6">О квартире</h6>
                    </template>
                    <template v-if="inCategory('doma')">
                        <h6 class="h6">О доме</h6>
                    </template>
                    <template v-if="inCategory('mezhgorod')">

                    </template>
                    <template v-else>
                        <select-input v-if="filterParams.lists.districtList" name="district" label="Район" :list="filterParams.lists.districtList" v-model="model.meta.district" />            
                    </template>
                    <template v-if="inCategory('kvartiry')">
                        <mdl-switch v-if="!isNaN(model.noFirstFloor)" v-model="model.noFirstFloor" class="mdl-js-ripple-effect">Не первый этаж</mdl-switch>
                        <mdl-switch v-if="!isNaN(model.noLastFloor)" v-model="model.noLastFloor" class="mdl-js-ripple-effect">Не последний этаж</mdl-switch>
                    </template>
                    <template v-if="inCategory(['kvartiry', 'doma'])">
                        <select-input v-if="filterParams.lists.materialList" name="material" label="Тип дома" :list="filterParams.lists.materialList" v-model="model.meta.material" />
                        <select-input v-if="filterParams.lists.otoplenList" name="otoplen" label="Отопление" :list="filterParams.lists.otoplenList" v-model="model.meta.otoplen" />
                        <select-input v-if="filterParams.lists.balconList" name="balcon" label="Балкон" :list="filterParams.lists.balconList" v-model="model.meta.balcon" />
                    </template>
                </template><!-- sell, rent -->
            </template><!-- realty -->
            <template v-if="inCategory('auto')">
                <template v-if="inAct('sell')">
                    <template v-if="inCategory(['inomarki', 'otechestvennye'])">
                        <select-input v-if="filterParams.lists.autoBrandList" name="brandId" label="Марка" :list="filterParams.lists.autoBrandList" v-model="model.meta.brandId"/> 
                        <select-input v-if="filterParams.lists.autoModelList" name="modelId" label="Модель" :list="filterParams.lists.autoModelList" v-model="model.meta.modelId"/>            
                    </template>
                    <template v-if="inCategory(['inomarki', 'otechestvennye', 'gruzoviki', 'motocikly'])">
                        <mdl-textfield floating-label="Год, от" v-model="model.yearFrom"/>
                        <mdl-textfield floating-label="Год, до" v-model="model.yearTo"/>           
                        <template v-if="inCategory(['inomarki', 'otechestvennye', 'gruzoviki'])">
                            <template v-if="inCategory(['inomarki', 'otechestvennye'])">               
                                <select-input v-if="filterParams.lists.transmissionList" name="transmission" label="Коробка" :list="filterParams.lists.transmissionList" v-model="model.meta.transmission"/>
                                <select-input v-if="filterParams.lists.driveList" name="drive" label="Привод" :list="filterParams.lists.driveList" v-model="model.meta.drive"/>
                                <select-input v-if="filterParams.lists.fuelList" name="fuel" label="Топливо" :list="filterParams.lists.fuelList" v-model="model.meta.fuel"/>
                                <template v-if="inCategory(['inomarki'])">
                                    <select-input v-if="filterParams.lists.wheelList" name="wheel" label="Руль" :list="filterParams.lists.wheelList" v-model="model.meta.wheel" />              
                                </template>
                            </template> 
                            <template v-if="inCategory('gruzoviki')"> 
                                <mdl-textfield floating-label="Г/п (тонн), от" v-model="model.gpFrom" />
                                <mdl-textfield floating-label="Г/п (тонн), до" v-model="model.gpTo" />
                                <select-input v-if="filterParams.lists.kuzovList" name="kuzov" label="Тип кузова" :list="filterParams.lists.kuzovList" v-model="model.meta.kuzov" /> 
                            </template>
                        </template>               
                    </template> 
                    <template v-if="inCategory('shiny-i-diski')">
                        <template v-if="inCategory('shiny')">
                            <select-input v-if="filterParams.lists.seasonList" name="season" label="Сезон" :list="filterParams.lists.seasonList" v-model="model.meta.season" /> 
                            <select-input v-if="filterParams.lists.widthList" name="width" label="Ширина" :list="filterParams.lists.widthList" v-model="model.meta.width" />
                            <select-input v-if="filterParams.lists.heightList" name="height" label="Высота" :list="filterParams.lists.heightList" v-model="model.meta.height" />
                        </template> 
                        <template v-if="inCategory('diski')">
                            <select-input v-if="filterParams.lists.etList" name="et" label="Вылет (ET)" :list="filterParams.lists.etList" v-model="model.meta.et" :has-error="'meta.et' in errors" /> 
                            <select-input v-if="filterParams.lists.pcdList" name="pcd" label="Сверловка (PCD)" :list="filterParams.lists.pcdList" v-model="model.meta.pcd" :has-error="'meta.pcd' in errors" />      
                        </template>
                        <select-input v-if="filterParams.lists.diaList" name="dia" label="Тип дома" :list="filterParams.lists.diaList" v-model="model.meta.dia" :has-error="'meta.dia' in errors" />
                    </template> 
                </template><!-- sell --> 
            </template><!-- auto -->

            <mdl-switch v-if="!isNaN(model.withPhoto)" v-model="model.withPhoto" class="mdl-js-ripple-effect">Только с фото</mdl-switch>
            <template v-if="inCategory('realty')">
                <mdl-switch v-if="!isNaN(model.noAgent)" v-model="model.noAgent" class="mdl-js-ripple-effect">Не агентство</mdl-switch>
            </template>
        </div>
    </main>
</template>

<script>
    import $ from 'jquery'
            import AppBar from './AppBar.vue'
            import BtnBack from './BtnBack.vue'
            import AppBarTitle from './AppBarTitle.vue'
            import BtnSubmit from './BtnSubmit.vue'
            import CategorySet from './CategorySet.vue'
            import SelectInput from './SelectInput.vue'
            export default {
                name: 'post-filter',
                components: {
                    AppBar,
                    BtnBack,
                    AppBarTitle,
                    BtnSubmit,
                    CategorySet,
                    SelectInput
                },
                props: {
                    params: {
                        type: Object,
                        default: function () {
                            return {category_id: 1}
                        }
                    }
                },
                data: function () {
                    return {
                        state: '',
                        filterParams: {
                            lists: []
                        },
                        model: {
                            category_id: this.params.category_id,
                            meta: []
                        },
                        errors: []
                    }
                },
                created: function () {
                    this.state = 'load'
                    this.load()
                    this.fetch()
                },
                methods: {
                    fetch: function () {
                        var xhr = new XMLHttpRequest()
                        var self = this
                        xhr.open('GET', 'http://m.delovoibiysk.ru/post/get-filter-params?' + this.modelParam)
                        xhr.onload = function () {
                            var data = JSON.parse(xhr.responseText)
                            for (var prop in data) {
                                if (data.hasOwnProperty(prop)) {
                                    self.$set(self, prop, data[prop])
                                }
                            }
                            self.state = 'loaded'
                        }
                        xhr.send()
                    },
                    onSubmit: function () {
                        this.save()
                        this.$router.push({path: '/post'})
                    },
                    load: function () {
                        var searchModel = JSON.parse(localStorage.getItem('postFilter'))
                        if (!searchModel) {
                            localStorage.setItem('postFilter', JSON.stringify({}))
                        } else {
                            for (var prop in searchModel) {
                                if (searchModel.hasOwnProperty(prop)) {
                                    this.$set(this.model, prop, searchModel[prop])
                                }
                            }
                        }
                    },
                    save: function () {
                        this.model.page = 1
                        localStorage.setItem('postFilter', JSON.stringify(this.model))
                    },
                    inCategory: function (category) {
                        if (!this.filterParams.lists.categoryList)
                            return false
                        return this.filterParams.lists.categoryList.some(function (itemCategory) {
                            if (Array.isArray(this)) {
                                return this.some(function (item) {
                                    return item == this
                                }, itemCategory.slug_unique)
                            }
                            return itemCategory.slug_unique == this
                        }, category)
                    },
                    inAct: function (act) {
                        if (!this.filterParams.lists.categoryList)
                            return false
                        return this.filterParams.lists.categoryList.some(function (itemCategory) {
                            if (Array.isArray(this)) {
                                return this.some(function (item) {

                                    return item == this
                                }, itemCategory.slug)
                            }
                            return itemCategory.slug == this
                        }, act)
                    },
                    changeCategory: function () {
                        this.save()
                        this.$router.push({path: '/post/filter-select-category'})
                    }
                },
                computed: {                   
                    modelParam: function () {
                        var modelParam = {}
                        for (var prop in this.model) {
                            if (this.model.hasOwnProperty(prop)) {
                                if (!this.model[prop]) continue
                                if (prop == 'meta') {
                                    var meta = {}
                                    for (var metaKey in this.model['meta']) {
                                        if (this.model['meta'][metaKey]) this.$set(meta, metaKey, this.model['meta'][metaKey])
                                    }
                                    this.$set(modelParam, prop, meta)
                                    continue
                                }
                                this.$set(modelParam, prop, this.model[prop])
                            }
                        }
                        return $.param(modelParam)
                    }
                }
            }
</script>

<style>

</style>
