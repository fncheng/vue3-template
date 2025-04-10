<template>
    <div :class="$style['markdown-body']" v-html="renderMarkdown"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import markdownItKatex from '@vscode/markdown-it-katex'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'
import { computed } from 'vue'
const props = defineProps<{ source: string }>()
const md = new MarkdownIt({
    highlight: (code) => `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`
}).use(markdownItKatex)
const renderMarkdown = computed(() => {
    const content = props.source
        .replace(/\\\[(.+?)\\\]/gs, `\n$$$$$1$$$$\n`) // 处理 `\[...\]`
        .replace(/\\\((.+?)\\\)/gs, `$$$1$$`) // 处理 `\(...\)`
    return md.render(content || '')
})
</script>

<style lang="css" module>
.markdown-body {
    color: #2c3e50;
    font-size: 16px;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        Fira Sans,
        Droid Sans,
        Helvetica Neue,
        sans-serif;
}
</style>
