<template>
    <!-- <div ref="mathContainer" v-html="renderContent"></div> -->
    <!-- <div class="markdown__container" v-html="markdownContent"></div> -->
    <component :is="KatexComponent" :content="content"></component>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import KatexComponent from './KatexComponent.vue'
import { marked } from 'marked'
import { katexStr } from './katex'

const mathContainer = useTemplateRef('mathContainer')

const content = ref(katexStr)

const markdownContent = computed(() => {
    return marked(content.value)
})

const transformedContent = computed(() => {
    return content.value
        .replace(/\\\[((.|\n)+?)\\\]/g, '$$$1$$$')
        .replace(/\\\((.+?)\\\)/g, '$$$1$$$')
})

const renderContent = computed(() => {
    if (mathContainer.value) {
        // console.log('transformedContent.value: ', transformedContent.value)
        const katexStr = katex.renderToString(transformedContent.value, {
            displayMode: true,
            throwOnError: true,
            trust: true
        })
        return marked(katexStr)
    }
    return content.value
})

onMounted(() => {
    // if (mathContainer.value) {
    //     katex.render(content.value, mathContainer.value)
    // }
})
</script>
