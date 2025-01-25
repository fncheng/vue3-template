<template>
    <div :class="[$style['box-wrapper']]">Pack: 123</div>
    <button @click="count++">{{ count }}</button>
    <p @click="globalContext.incrementAge">{{ globalContext.state.age }}</p>

    <button @click="handleStartTimeout()">发起一个setTimeout</button>
    <button @click="handleStopTimeout">停止setTimeout</button>
    <button @click="handleStartRedirect">Redirect</button>
    <button ref="buttonRef" @click="getRef">getRef</button>
</template>

<script setup lang="ts">
import { getRedirect } from '@/api/api'
import { useGlobalContext } from '@/context'
import { mySetInterval } from '@/utils'
import { ElMessage } from 'element-plus'
import { ref, useTemplateRef, watch } from 'vue'

const count = ref<number>(1)

const globalContext = useGlobalContext()
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

const stopFunc = ref()
const handleStartTimeout = () => {
    const stop = mySetInterval(() => {
        console.log('timeout: ', count.value++)
    }, 2000)

    stopFunc.value = stop
}
const handleStopTimeout = () => {
    typeof stopFunc.value === 'function' && stopFunc.value()
}
const handleStartRedirect = async () => {
    let res = await getRedirect()
    if (res) {
        console.log('res: ', res)
    }
}
const templateRef = useTemplateRef('buttonRef')
const getRef = () => {
    console.log(templateRef.value)
}
</script>

<style lang="scss" module>
.box-wrapper {
    border: 1px solid #ccc;
    transition:
        background-color 0.5s ease,
        color 0.5s ease;
    &:hover {
        background-color: pink;
        color: blue;
    }
}
.box-wrapper:active {
    background-color: bisque;
}
</style>
