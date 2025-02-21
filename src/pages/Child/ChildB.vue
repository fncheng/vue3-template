<template>
    <div>
        <button @click="handleRender">render</button>
        <button @click="handleDestory">destory</button>
        <TestCom
            v-if="render"
            :count="count"
            :onAddCount="increment"
            @update:count="updateCount"
        ></TestCom>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TestCom from './TestCom.vue'

const count = ref(1000)

const increment = (val: number) => {
    count.value += val
}

const updateCount = (val: number) => {
    count.value += val
}

const render = ref<boolean>(false)

const handleRender = () => {
    render.value = true
}
const handleDestory = () => {
    render.value = false
}
</script>
