<template>
    <MarkdownPreview :source="content"></MarkdownPreview>
</template>

<script setup lang="ts">
import MarkdownPreview from '@/components/MarkdownPreview/index.vue'

const { content } = defineProps<{ content: string }>()
</script>
