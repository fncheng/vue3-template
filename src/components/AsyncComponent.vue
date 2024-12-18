<template>
    <div :style="{ color: 'red' }">About: {{ props.number || number }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNumber } from '@/pages/useNumber'
import { css } from '@emotion/css';
import styled from '@emotion/styled';

type AsyncComponentProps = {
    number: number
}

const props = defineProps<AsyncComponentProps>()
const number = ref(props.number || 100)
const getNumber = async () => {
    const value = await useNumber()
    number.value = value
}
getNumber()
</script>
