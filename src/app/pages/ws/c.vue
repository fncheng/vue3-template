<template>
    <MarkdownPreview :source="content"></MarkdownPreview>
</template>

<script setup lang="ts">
import MarkdownPreview from '@/components/MarkdownPreview/index.vue'
import 'katex/dist/katex.min.css'

defineProps<{ content: string }>()
</script>
