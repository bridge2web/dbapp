<template> 
    <div class="photo-upload">
        <template v-for="(item, index) in value">
            <photo-upload-item :csrf-param="csrfParam" :csrf-token="csrfToken" v-model="value[index]" @delete="onDeleteItem(item)" :create-url="createUrl" :delete-url="deleteUrl" />
        </template>
        <div class="btn photo-upload__btn btn_photo-upload photo-upload__item border-box">            
            <input type="file" class="photo-upload__input" multiple @change="onChange">
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import PhotoUploadItem from './PhotoUploadItem.vue';
    export default {
        name: 'photo-upload',
        components: {
            PhotoUploadItem
        },
        props: {
            value: {
                type: Array,
                default: () => []
            },
            csrfParam: {
                type: String,
                default: null
            },
            csrfToken: {
                type: String,
                default: null
            },
            createUrl: {
                type: String,
                default: '/photo/create'
            },
            deleteUrl: {
                type: String,
                default: '/photo/delete'
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
    .photo-upload {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .photo-upload__item {
        flex-basis: 48%;
        margin-bottom: 8px;
        height: 120px;
    }

    .photo-upload__btn {       
        background-image: url(../assets/images/btn_photo-upload.svg);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        border: 1px dashed #007AFF;
        border-radius: 4px;
    } 

    .photo-upload__input {
        width: 100%;
        height: 120px;
        opacity: 0;
    } 
</style>
