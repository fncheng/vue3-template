<template>
    <v-md-preview :text="content"></v-md-preview>
</template>

<script setup lang="ts">
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'
import { computed } from 'vue'

interface MdPreviewProps {
    content: string
}

const { content } = defineProps<MdPreviewProps>()

const renderContent = computed(
    () =>
        content
            .replace(/\\\((.+?)\\\)/g, '$$$1$$') // \(...\) -> $...$
            .replace(/\\\[((.|\n)+?)\\\]/g, `\n$$$$$1$$$$\n`) // \[...\] -> $$...$$
)

VMdPreview.use(githubTheme, {})
// VMdPreview.use(createKatexPlugin())
</script>
