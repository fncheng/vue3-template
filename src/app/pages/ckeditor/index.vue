<template>
    <div class="min-h-[322px] min-w-[800px]">
        <Ckeditor v-model="data" :editor="Editor" :config="editorConfig"></Ckeditor>
    </div>
</template>

<script setup lang="ts">
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
// import { Bold, Essentials, Italic, Paragraph, type EditorConfig } from 'ckeditor5'
import Editor from '@ckeditor/ckeditor5-build-classic'
import { computed, ref } from 'vue'

const data = ref('<p>Hello world!</p>')
const config = computed(() => {
    return {
        licenseKey: 'GPL',
        // plugins: [Essentials, Paragraph, Bold, Italic],
        toolbar: ['undo', 'redo']
    }
})

const editorConfig = ref({
    // plugins: [Text],
    licenseKey: 'GPL',
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            // 'link',
            // 'bulletedList',
            // 'numberedList',
            // '|',
            // 'outdent',
            // 'indent',
            // '|',
            'imageUpload',
            // 'blockQuote',
            'insertTable',
            // 'mediaEmbed',
            'undo',
            'redo'
        ]
    },
    heading: {
        options: [
            { model: 'paragraph', title: '正文', class: 'ck-heading_paragraph' },
            {
                model: 'heading1',
                view: 'h1',
                title: 'H1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'H2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'H3',
                class: 'ck-heading_heading3'
            }
        ]
    }
})
</script>

<style lang="css">
.ck.ck-powered-by {
    display: none;
}
</style>