<template>
    <MdPreview :content="processMarkdown"></MdPreview>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MdPreview from '@app/components/MdPreview/index.vue'
import { renderBlockMath, renderInlineMath } from '@/app/utils/katex'
import 'katex/dist/katex.min.css'

const props = defineProps<{ content: string }>()

const processMarkdown = computed(() => {
    let processed = renderBlockMath(props.content)
    processed = renderInlineMath(processed)
    // Then process markdown
    return processed
})
</script>
