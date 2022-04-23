<template>
    <div class="image-upload row">
        <template v-for="(item, index) in value">
            <div class="col-sm-2 image-upload__item">
                <image-upload-item v-model="value[index]" @delete="onDeleteItem(item)" />
            </div>
        </template>
        <div class="col-sm-2 image-upload__item">
            <div class="btn btn-default image-upload__btn btn_image-upload">            
                <input type="file" class="image-upload__input" multiple @change="onChange">
            </div>
        </div>
    </div>
</template>

<script>
    import ImageUploadItem from './ImageUploadItem.vue'
    export default {
        name: 'image-upload',
        components: {
            ImageUploadItem
        },
        props: {
            value: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            onChange: function (e) {
                var files = e.target.files
                var numFiles = files.length
                for (var i = 0, numFiles = files.length;
                i < numFiles; i++) {
                    var file = files[i]
                    this.value.push({file: file, isNewRecord: true})
                }
            },
            onDeleteItem: function (item) {
                this.value.splice(this.value.indexOf(item), 1)
            }
        }
    }
</script>

<style>
    .image-upload {
        margin-bottom: 30px;
    }

    .image-upload__item {

    }

    .image-upload__btn, .image-upload__btn.active, .image-upload__btn:active {
        background-repeat: no-repeat;
        background-image: url(../assets/images/image-upload__btn.svg);
        background-position: 50% 50%;
        padding: 0px;
    } 

    .image-upload__input {
        cursor: pointer;
        width: 100%;
        height: 96px;
        opacity: 0;
    } 
</style>
