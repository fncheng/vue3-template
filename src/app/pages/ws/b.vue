<template>
  <MarkdownRender :source="content"></MarkdownRender>
</template>

<script setup lang="ts">
import MarkdownRender from '@/app/components/MarkdownRender.vue';

const props = defineProps<{ content: string }>()
</script>