<template>
    <h3>about</h3>
    <p>
        <button @click="showAsyncComponent = !showAsyncComponent">showAsyncComponent</button>
        <Suspense v-if="showAsyncComponent">
            <template #fallback>Loading number...</template>
            <async-component :number="number"></async-component>
        </Suspense>
    </p>
</template>

<script setup lang="ts" async>
import { defineAsyncComponent, onUpdated, ref, type DefineSetupFnComponent } from 'vue'
import type { AsyncComponentEmits, AsyncComponentProps } from '@/components/AsyncComponent.vue'

const loadWithDelayWithoutCache = (promise: Promise<any>, time: number) => {
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)

    return Promise.all([promise, delayPromise]).then(() => promise)
}

// @ts-ignore
const AsyncComponent: DefineSetupFnComponent<AsyncComponentProps, AsyncComponentEmits> =
    defineAsyncComponent(() =>
        loadWithDelayWithoutCache(import('@/components/AsyncComponent.vue'), 2000)
    )

const number = ref(100)

const showAsyncComponent = ref<boolean>(false)

onUpdated(() => {
    console.log('father update')
})
</script>
