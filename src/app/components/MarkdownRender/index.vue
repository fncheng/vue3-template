<template>
    <div class="markdown-body" v-html="renderMarkdown"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { computed } from 'vue'
import renderMathInElement from '@/app/pages/math/auto-render'
const props = defineProps<{ source: string }>()
const md = new MarkdownIt({
    highlight: (code) => `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`
})
const renderMarkdown = computed(() => {
    const markdown = md.render(props.source)
    return markdown
        .replace(/\$\$(.*?)\$\$/gs, (_, math) => katex.renderToString(math, { displayMode: true }))
        .replace(/\$(.*?)\$/g, (_, math) =>
            katex.renderToString(math, {
                displayMode: false
            })
        )
    // return renderMathInElement(markdown, {
    //     delimiters: [
    //         { left: '$$', right: '$$', display: true },
    //         { left: '$', right: '$', display: false },
    //         { left: '\\begin{equation}', right: '\\end{equation}', display: true },
    //         { left: '\\begin{align}', right: '\\end{align}', display: true },
    //         { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
    //         { left: '\\begin{gather}', right: '\\end{gather}', display: true },
    //         { left: '\\(', right: '\\)', display: false },
    //         { left: '\\[', right: '\\]', display: true }
    //     ],
    //     throwOnError: false
    // })

    // katex.renderToString(md.render(props.source || ''), {
    //     throwOnError: false,
    //     displayMode: true
    // })
})
</script>
