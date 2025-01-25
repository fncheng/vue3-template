<script setup lang="ts">
import ChildA from './ChildA.vue'
import ChildB from './ChildB.vue'
import { useGlobalContext } from '@/context'

const { state } = useGlobalContext()
</script>

<template>
    <ChildA />
    <ChildB v-memo="[state.name]" />
</template>
