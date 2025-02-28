<template>
    <div ref="mathContainer" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'
import { marked } from 'marked'

const props = defineProps<{
    content: string
}>()

// Function to render display math mode formulas
// 渲染块级数学公式
const renderDisplayMath = (content: string) => {
    return content.replace(/\\\[((.|\n)+?)\\\]/g, (match, formula) => {
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: true
            })
        } catch (e) {
            console.error('KaTeX display math error:', e)
            return match
        }
    })
}

// Function to render inline math mode formulas
// 渲染行内数学公式
const renderInlineMath = (content: string) => {
    return content.replace(/\\\((.+?)\\\)/g, (match, formula) => {
        try {
            const str = katex.renderToString(formula, {
                displayMode: false,
                throwOnError: true
            })
            return str
        } catch (e) {
            console.error('KaTeX inline math error:', e)
            return match
        }
    })
}

const renderedContent = computed(() => {
    let processed = renderDisplayMath(props.content)
    processed = renderInlineMath(processed)
    // Then process markdown
    processed = marked(processed)
    return processed
})
</script>
