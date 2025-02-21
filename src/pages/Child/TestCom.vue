<template>
    <div>
        <button @click="onAddCount(3)">onAddCount: {{ count }}</button>
        <button @click="addCount">addCount: {{ count }}</button>
        <div>{{ total }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { count, onAddCount } = defineProps<{ count: number; onAddCount: (step: number) => void }>()

const total = ref<number>(0)

const emit = defineEmits(['update:count'])

const addCount = () => {
    emit('update:count', 10)
}
</script>
