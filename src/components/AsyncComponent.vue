<template>
    <div :class="blue" :style="{ color: 'red' }">About: {{ props.number || number }}</div>
    <button @click="handleClick">click</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNumber } from '@/pages/useNumber'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
const blue = css`
    color: blue;
`

export type AsyncComponentProps = {
    number: number
    onLoaded?: () => void
}

export type AsyncComponentEmits = {
    loaded: []
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
    emit('loaded')
}

onMounted(() => {
    // emit('onloaded')
    // props.onLoaded()
})
</script>
