<template>
    <div ref="box" v-html="html"></div>
</template>

<script setup lang="ts">
import katexStr from '@/app/utils/katexStr'
import { onMounted, useTemplateRef } from 'vue'
import renderMathInElement from './auto-render'
import { marked } from 'marked'

const textBox = useTemplateRef('box')

const content = katexStr
    .replace(/\\\[((.|\n)+?)\\\]/g, '$$$1$$$')
    .replace(/\\\((.+?)\\\)/g, '$$$1$$$')
const html = marked(content)

onMounted(() => {
    if (textBox.value) {
        renderMathInElement(textBox.value, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\begin{equation}', right: '\\end{equation}', display: true },
                { left: '\\begin{align}', right: '\\end{align}', display: true },
                { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
                { left: '\\begin{gather}', right: '\\end{gather}', display: true },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        })
        // textBox.value.innerHTML = marked(textBox.value.innerHTML)
    }
})
</script>
