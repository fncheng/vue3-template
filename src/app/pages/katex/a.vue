<template>
    <MdPreview :content="renderContent"></MdPreview>
</template>

<script setup lang="ts">
import MdPreview from '@/components/MdPreview/index.vue'
import { renderBlockMath, renderInlineMath } from '@/app/utils/katex'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { computed } from 'vue'
const { content } = defineProps<{ content: string }>()

const renderContent = computed(() => {
    let processed = katex.renderToString(content, {
        throwOnError: false
    })
    processed = renderBlockMath(content)
    processed = renderInlineMath(processed)
    // Then process markdown
    return processed
})
</script>
