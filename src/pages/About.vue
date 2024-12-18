<template>
    <h3>about</h3>
    <button @click="showAsyncComponent = !showAsyncComponent">showAsyncComponent</button>
    <Suspense timeout="2000">
        <template #fallback> Loading number...</template>
        <async-component
            :id="123"
            v-if="showAsyncComponent"
            :key="new Date().getTime()"
        ></async-component>
    </Suspense>
    <AsyncComponent1 :obj="{ arr: [1, 2, 3] }" :id="id" :api="fn" :a="a" />
    <button @click="id++"></button>
</template>

<script setup lang="ts" async>
import { defineAsyncComponent, onUpdated, ref } from 'vue'
import { loadWithDelay } from '@/router'
import AsyncComponent1 from '@/components/AsyncComponent1.vue'
import { fn, a } from './useId'

defineOptions({ name: 'AboutView' })

const AsyncComponent = defineAsyncComponent({
    loader: () => loadWithDelay(import('@/components/AsyncComponent.vue'), 100),
    loadingComponent: () => import('./Loading.vue'),
    delay: 200
})

const showAsyncComponent = ref<boolean>(false)
const id = ref(100)
const obj = ref({
    arr: [1, 2, 3]
})

onUpdated(() => {
    console.log('father update')
})
</script>
