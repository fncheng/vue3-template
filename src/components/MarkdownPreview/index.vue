<template>
    <v-md-preview :text="renderMarkdown"></v-md-preview>
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import MarkdownIt from 'markdown-it'
import markdownItKatex from '@vscode/markdown-it-katex'
import hljs from 'highlight.js'
// import 'katex/dist/katex.min.css'
import { computed } from 'vue'

interface MdPreviewProps {
    source: string
}

/**
 * @todo 这个组件会有两次解析markdown的行为，第一次是MarkdownIt的解析，第二次是VMdPreview的解析
 * 后续考虑该如何优化
 */
const props = defineProps<MdPreviewProps>()

const md = new MarkdownIt({
    highlight: (code) => `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`
}).use(markdownItKatex)
const renderMarkdown = computed(() => {
    const content = props.source
        .replace(/\\\[(.+?)\\\]/gs, `\n$$$$$1$$$$\n`) // 处理 `\[...\]`
        .replace(/\\\((.+?)\\\)/gs, `$$$1$$`) // 处理 `\(...\)`
    return md.render(content || '')
})

VMdPreview.use(githubTheme, {})
</script>
