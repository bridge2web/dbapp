<template> 
    <div class="image-upload-item">
        <button class="btn btn-default btn-xs image-upload-item__btn_delete" v-if="status == 'success'" @click="onDeleteClick"><span class="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span></button>
        <div :class="['image-upload-item__status', 'image-upload-item__status_' + status]" v-if="status != 'success'" v-html="message"></div>
        <img v-if="value.src && status != 'error'" :src="value.src" class="image-upload-item__img" alt="" />
    </div>
</template>

<script>
    export default {
        name: 'image-upload-item',
        props: {
            value: {
                type: Object,
                default: {
                    isNewRecord: true,
                    id: null,
                    name: null,
                    uid: null,
                    src: null,
                    file: null
                }
            },
            minSize: {
                type: Number,
                default: 1024
            },
            maxSize: {
                type: Number,
                default: 1024 * 1024 * 2
            },
            minWidth: {
                type: Number,
                default: 128
            },
            maxWidth: {
                type: Number,
                default: 1280
            },
            minHeight: {
                type: Number,
                default: 720
            },
            maxHeight: {
                type: Number,
                default: 720
            }
        },
        data: function () {
            return {
                status: 'init',
                message: ''
            }
        },
        created: function () {
            this.status = 'loading'
            /*if (this.value.file.size > this.maxSize) {
             this.setError('Файл слишком большой')
             return
             }*/
            if (this.value.file.size < this.minSize) {
                this.setError('Файл слишком маленький')
                return
            }
            var imageType = /^image\//
            if (!imageType.test(this.value.file.type)) {
                this.setError('Неизвестный формат изображения')
                return
            }
            var reader = new FileReader()
            reader.onload = (function (self) {
                return function (e) {
                    self.value.src = e.target.result
                    self.resize()
                }
            })(this)
            reader.readAsDataURL(this.value.file)
        },
        methods: {
            resize: function () {
                var img = document.createElement('img')
                img.onload = (function (self) {
                    return function (e) {
                        var canvas = document.createElement('canvas')

                        var ctx = canvas.getContext('2d')
                        ctx.drawImage(img, 0, 0)

                        var width = img.width
                        var height = img.height

                        if (width < this.minWidth) {
                            return false
                            this.setError('Ширина изображения слишком маленькая, нужно ' + this.minWidth + ' пикселей')
                        }
                        
                        if (height < this.minHeight) {
                            return false
                            this.setError('Высота изображения слишком маленькая, нужно ' + this.minHeight + ' пикселей')
                        }

                        if (width > height) {
                            if (width > self.maxWidth) {
                                height *= self.maxWidth / width
                                width = self.maxWidth
                            }
                        } else {
                            if (height > self.maxHeight) {
                                width *= self.maxHeight / height
                                height = self.maxHeight
                            }
                        }

                        canvas.width = width
                        canvas.height = height

                        var ctx = canvas.getContext('2d')
                        ctx.drawImage(img, 0, 0, width, height)

                        self.value.src = canvas.toDataURL('image/jpeg'/*self.file.type*/)

                        self.upload()
                    }
                })(this)

                img.src = this.value.src
            },
            upload: function () {
                var fd = new FormData()
                var data = atob(this.value.src.split(',')[1])
                var array = []
                for (var i = 0; i < data.length; i++) {
                    array.push(data.charCodeAt(i))
                }
                var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'/*this.value.file.type*/, name: this.value.file.name + '.jpg'})
                fd.append('file', blob, this.value.file.name)
                fd.append('extension', 'exe')
                var self = this
                $.ajax({
                    url: '/photo/create',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        self.status = 'success'
                        self.value.id = data.id
                        self.value.name = data.name
                        self.value.uid = data.uid                        
                        self.$emit('input', self.value)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON) {
                            self.setError(jqXHR.responseJSON[Object.keys(jqXHR.responseJSON)[0]][0])
                        } else {
                            self.setError(errorThrown)
                        }
                    }
                })
            },
            setError: function (message) {
                this.status = 'error'
                this.message = message
                setTimeout(() => {
                    this.delete()
                }, 7000)
            },
            delete: function (message) {
                this.$emit('delete')
            },
            onDeleteClick: function (e) {
                var self = this
                this.status = 'process'
                $.ajax({
                    url: '/photo/delete',
                    data: this.model,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        self.delete()
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON) {
                            self.setError(jqXHR.responseJSON.error)
                        } else {
                            self.setError(errorThrown)
                        }
                    }
                })
            }
        },
        computed: {
            model: function () {
                var model = {}
                for (var prop in this.value) {
                    if (this.value.hasOwnProperty(prop)) {
                        if (typeof this.value[prop] !== 'object' && prop != 'src')
                            model[prop] = this.value[prop]
                    }
                }
                return model
            }
        }
    }
</script>

<style>
    .image-upload-item {
        display: block;
        height: 96px;
        overflow: hidden;
        text-align: center;
        border-radius: 4px;
        background-color: #F3F3F3;
        border: 1px solid #ccc;
        position: relative;
    } 

    .image-upload-item__btn_delete {
        position: absolute;
        right: 8px;
        top: 8px;
        z-index: 2;
    }

    .image-upload-item__status {
        position: absolute;
        width: 100%;
        height: 96px;
        z-index: 1;
    }

    .image-upload-item__status_loading, .image-upload-item__status_process {
        background-color: rgba(255, 255, 255, .75);
        background-repeat: no-repeat;
        background-image: url(../assets/images/image-upload-item__spinner.svg);
        background-position: 50% 50%;
    }

    .image-upload-item__status_error {
        padding: 15px;
        font-size: 11px;
        color: #fff;
        background-color: #d9534f;
        border-color: #d43f3a;
    }

    .image-upload-item__img {
        width: auto;
        height: 96px;
    }
</style>
