<template>
    <div ref="mathContainer" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import { renderBlockMath, renderInlineMath } from './katex';

const props = defineProps<{
    content: string
}>()

const mathContainer = ref<HTMLElement | null>(null)


const renderedContent = computed(() => {
    let processed = renderBlockMath(props.content)
    processed = renderInlineMath(processed)
    // Then process markdown
    processed = marked(processed)
    return processed
})
</script>
