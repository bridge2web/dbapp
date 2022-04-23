<template>
    <mdl-dialog v-if="activeDialog" ref="dialog" :title="'title' in activeDialog ? activeDialog.title : ''" @click.native="$refs.dialog.close">
        <div v-if="'content' in activeDialog" v-html="activeDialog.content"></div>
        <template slot="actions">
            <mdl-button @click.native="$refs.dialog.close">{{ activeDialog.close }}</mdl-button>
            <mdl-button v-if="'actionText' in activeDialog" primary @click.native="onDialogActionClick">{{ activeDialog.actionText }}</mdl-button>                
        </template>
    </mdl-dialog>
</template>

<script>
    export default {
        name: 'active-dialog',
        data: function () {
            return {
                activeDialog: {
                    title: '',
                    content: '',
                    close: 'Ok'
                }
            }
        },
        mounted: function () { 
            this.checkDialogQueue()
        },
        methods: {
            checkDialogQueue: function () { 
                if (!localStorage.getItem('dialogs'))
                    localStorage.setItem('dialogs', JSON.stringify([]))
                var dialogs = JSON.parse(localStorage.getItem('dialogs'))
                this.activeDialog = dialogs.shift()
                if (this.activeDialog) {
                    if (this.$refs.dialog) {
                        this.$refs.dialog.open()
                    } else {
                        alert(this.activeDialog.content)
                    }
                }
                localStorage.setItem('dialogs', JSON.stringify(dialogs))
            },
            onDialogActionClick: function (event) {
                if (this.activeDialog) {
                    if ('actionUrl' in this.activeDialog) {
                        window.open(this.activeDialog.actionUrl, '_system')
                    }
                }
            }
        }
    }
</script>

<style>
    .btn_back {
        background: url('../assets/android/images/btn_back.svg') no-repeat;
        width: 24px;
        height: 24px;
    }
</style>
