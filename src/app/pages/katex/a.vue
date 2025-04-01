<template>
    <MdPreview :content="renderContent"></MdPreview>
</template>

<script setup lang="ts">
import MdPreview from '@/app/components/MdPreview/index.vue'
import { renderBlockMath, renderInlineMath } from '@/app/utils/katex'
import { computed } from 'vue'
const { content } = defineProps<{ content: string }>()

const renderContent = computed(() => {
    let processed = renderBlockMath(content)
    processed = renderInlineMath(processed)
    // Then process markdown
    return processed
})
</script>
