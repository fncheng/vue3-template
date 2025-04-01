<template>
    <component :is="KatexComponent" :content="content"></component>
</template>

<script setup lang="ts">
import 'katex/dist/katex.min.css'
import KatexComponent from '../../components/KatexComponent.vue'

const { content } = defineProps<{ content: string }>()
</script>
