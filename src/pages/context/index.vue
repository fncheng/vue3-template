<script setup lang="ts">
import ChildA from './ChildA.vue'
import ChildB from './ChildB.vue'
import { useGlobalContext } from '@/context'

const { state } = useGlobalContext()
</script>

<template>
    <div class="grid grid-cols-2 gap-x-4">
        <ChildA />
        <ChildB v-memo="[state.name]" />
    </div>
</template>
