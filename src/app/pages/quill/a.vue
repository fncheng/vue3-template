<script setup lang="ts">
import QuillTextEditor from '@/components/QuillTextEditor/index.vue'
import { computed } from 'vue'

const { content } = defineProps<{ content: string }>()

const source = computed(() => content)
</script>

<template>
    <QuillTextEditor v-model:model-value="source"></QuillTextEditor>
</template>
