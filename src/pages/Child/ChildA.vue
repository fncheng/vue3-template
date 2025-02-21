<template>
    <div :class="[$style['box-wrapper']]">Pack: 123</div>
    <div>
        <button @click="count++">{{ count }}</button>
        <p @click="globalContext.incrementAge">{{ globalContext.state.age }}</p>
    </div>
    <div>
        <button @click="handleStartTimeout()">发起一个setTimeout</button>
        <button @click="handleStopTimeout">停止setTimeout</button>
        <button @click="handleStartRedirect">Redirect</button>
    </div>
    <div>
        <button @click="buttonStartEvent">发起一个事件</button>
        <button @click="buttonStopEvent">停止事件</button>
    </div>
    <div>
        <SvgIcon name="deepseek" />
        <SvgIcon name="male" />
        <svg-icon :name="'female'" />
    </div>
</template>

<script setup lang="ts">
import { getNumber, getRedirect } from '@/api/api'
import { useGlobalContext } from '@/context'
import { mySetInterval } from '@/utils'
import { ElMessage } from 'element-plus'
import { onUnmounted, ref, watch } from 'vue'

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
    const stop = mySetInterval(async () => {
        // console.log('timeout: ', count.value++)
        let res = await getNumber({})
        if (res.number) {
            console.log('res: ', res.number)
        }
    }, 3000)

    stopFunc.value = stop
}

onUnmounted(() => {
    stopFunc.value && stopFunc.value()
})
const handleStopTimeout = () => {
    typeof stopFunc.value === 'function' && stopFunc.value()
}
const handleStartRedirect = async () => {
    let res = await getRedirect()
    if (res) {
        console.log('res: ', res)
    }
}

//#region AbortController取消事件处理函数
const listener = () => {
    console.log('click')
}
let abortController: AbortController

const buttonStartEvent = () => {
    if (abortController) {
        abortController.abort('重复点击，取消事件')
    }
    abortController = new AbortController()
    const signal = abortController.signal
    signal.addEventListener('abort', () => {
        if (signal.reason instanceof Error) {
            console.error('Aborted with error:', signal.reason.message)
        } else {
            console.log('Aborted:', signal.reason)
        }
    })
    window.addEventListener('click', listener, { signal })
}
const buttonStopEvent = () => {
    abortController.abort('取消事件')
    // window.removeEventListener('click', listener)
}
//#endregion
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
