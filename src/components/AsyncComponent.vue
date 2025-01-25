<template>
    <div :class="blue" :style="{ color: 'red' }">About: {{ props.number || number }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNumber } from '@/pages/About/useNumber'
import { css } from '@emotion/css'
const blue = css`
    color: blue;
`

export type AsyncComponentProps = {
    number: number
    onLoaded?: () => void
}

export type AsyncComponentEmits = {
    onLoaded: []
}
const props = defineProps<AsyncComponentProps>()
defineEmits<AsyncComponentEmits>()
const number = ref(props.number || 100)
const getNumber = async () => {
    const value = await useNumber()
    number.value = value
}
console.log('async component render')
getNumber()
</script>
