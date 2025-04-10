<template>
    <MdPreview :content="renderContent"></MdPreview>
</template>

<script setup lang="ts">
import MdPreview from '@/components/MdPreview/index.vue'
import { computed } from 'vue';
const { content } = defineProps<{ content: string }>()

const renderContent = computed(
    () =>
        content
            .replace(/\\\((.+?)\\\)/g, '$$$1$$') // \(...\) -> $...$
            .replace(/\\\[((.|\n)+?)\\\]/g, `\n$$$$$1$$$$\n`) // \[...\] -> $$...$$
)
</script>
