<template>
    <MdPreview :content="content"></MdPreview>
</template>

<script setup lang="ts">
import MdPreview from '@app/components/MdPreview/index.vue'
import 'katex/dist/katex.min.css'

const props = defineProps<{ content: string }>()
</script>
