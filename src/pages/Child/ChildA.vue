<template>
    <div :class="[$style['box-wrapper']]">Pack: 123</div>
    <button @click="count++">{{ count }}</button>
    <p @click="globalContext.incrementAge">{{ globalContext.state.age }}</p>

    <my-pack>
        <template #header>header</template>
        <template #footer>footer</template>
    </my-pack>

    <button @click="handleStartTimeout(count++)">发起一个setTimeout</button>
    <button @click="handleStopTimeout">停止setTimeout</button>
</template>

<script setup lang="ts">
import { useContext } from '@/context'
import { asyncInterval } from '@/utils'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

const count = ref<number>(1)

const globalContext = useContext()
console.log('globalContext: ', globalContext)

watch(
    () => count.value,
    (val) => {
        if (val > 5) {
            ElMessage.success({
                message: '123',
                duration: 2000
            })
        }
    }
)

const clearFunc = ref(() => {})
const intervalNum = ref<number>()
const handleStartTimeout = (id: number) => {
    // setTimeout(() => {
    //     console.log('timeout:', id)
    // }, 2000)
    const interval = setInterval(() => {
        console.log('timeout:', id)
    }, 1000)
    // const clear = asyncInterval(async () => {
    //     console.log('timeout:', id)
    // }, 1000)

    // clearFunc.value = clear
    intervalNum.value = interval
}
const handleStopTimeout = () => {
    // clearFunc.value()
    clearInterval(intervalNum.value)
}
</script>

<style lang="scss" module>
.box-wrapper {
    border: 1px solid #ccc;
    &:hover {
        background-color: pink;
        color: blue;
    }
}
.box-wrapper:active {
    background-color: bisque;
}
</style>
