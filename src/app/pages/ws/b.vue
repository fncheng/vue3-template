<template>
  <MarkdownRender :source="content"></MarkdownRender>
</template>

<script setup lang="ts">
import MarkdownRender from '@/components/MarkdownRender/index.vue';

defineProps<{ content: string }>()
</script>