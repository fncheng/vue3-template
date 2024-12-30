<template>
    <div :class="blue" :style="{ color: 'red' }">About: {{ props.number || number }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNumber } from '@/pages/useNumber'
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
const emit = defineEmits<AsyncComponentEmits>()
const number = ref(props.number || 100)
const getNumber = async () => {
    const value = await useNumber()
    number.value = value
}
console.log('async component render')
getNumber()

const handleClick = () => {
    // props.onLoaded()
    // emit('onLoaded')
}

onMounted(() => {
    // emit('onloaded')
    // props.onLoaded()
})
</script>
