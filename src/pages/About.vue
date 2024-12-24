<template>
    <h3>about</h3>
    <p>
        <button @click="showAsyncComponent = !showAsyncComponent">showAsyncComponent</button>
        <Suspense @resolve="isLoaded = true" v-if="isLoaded || showAsyncComponent">
            <template #fallback>Loading number...</template>
            <async-component v-show="showAsyncComponent" :number="number"> </async-component>
        </Suspense>
    </p>
</template>

<script setup lang="ts" async>
import { defineAsyncComponent, onUpdated, ref, type DefineSetupFnComponent } from 'vue'
import { loadWithDelay } from '@/router'
import type { AsyncComponentEmits, AsyncComponentProps } from '@/components/AsyncComponent.vue'

defineOptions({ name: 'AboutView' })
// @ts-ignore
const AsyncComponent: DefineSetupFnComponent<AsyncComponentProps, AsyncComponentEmits> =
    defineAsyncComponent(() =>
        loadWithDelay(import('../components/AsyncComponent.vue'), 2000, 'AsyncComponent')
    )

const number = ref(100)

const showAsyncComponent = ref<boolean>(false)
const isLoaded = ref<boolean>(false)

onUpdated(() => {
    console.log('father update')
})
</script>
