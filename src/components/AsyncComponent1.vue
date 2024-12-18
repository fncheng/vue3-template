<template>
    <div :style="{ color: 'red' }">About: 123</div>
    <span>{{ obj.arr }}</span>
    <span>{{ id }}</span>
</template>

<script setup lang="ts">
import { onUpdated, watch } from 'vue'

interface PropsType {
    obj: {
        arr: number[]
    }
    id: number
    api: Function
    a: number
}

const props = defineProps<PropsType>()

const init = async () => {
    const fn = props.api
    const params = 789
    try {
        let res = await fn(params)
        console.log('res: ', res)
    } catch (error) {
        console.log('error: ', error)
    }
}
init()

watch(
    () => props.obj,
    (newVal, oldVal) => {
        console.log('obj变化了', newVal, oldVal)
    }
)

onUpdated(() => {
    console.log('child update')
})
</script>
