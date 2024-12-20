<template>
    <h3>about</h3>
    <p>
        <button @click="showAsyncComponent = !showAsyncComponent">showAsyncComponent</button>
        <Suspense v-if="showAsyncComponent">
            <template #fallback>Loading number...</template>
            <async-component :number="199"></async-component>
        </Suspense>
    </p>
</template>

<script setup lang="ts" async>
import { defineAsyncComponent, onUpdated, ref, type DefineComponent } from 'vue'
import { loadWithDelay } from '@/router'

defineOptions({ name: 'AboutView' })

const AsyncComponent: DefineComponent<{ number: number }> = defineAsyncComponent(() =>
    loadWithDelay(import('@/components/AsyncComponent.vue'), 2000, 'AsyncComponent')
)

const showAsyncComponent = ref<boolean>(false)

onUpdated(() => {
    console.log('father update')
})
</script>
