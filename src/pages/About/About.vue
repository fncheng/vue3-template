<template>
    <main class="flex flex-1 flex-col">
        <h3>Let's loading some data</h3>
        <section class="grid grid-cols-4">
            <Suspense>
                <template #fallback>Please wait...</template>
                <Await :resolve="number">
                    <template #default="slotProps">
                        <div :style="{ color: 'red' }">Number: {{ slotProps.data }}</div>
                    </template>
                    <template #error>
                        <div>Error</div>
                    </template>
                </Await>
            </Suspense>
            <Suspense>
                <template #fallback>Please wait...</template>
                <Await :resolve="name">
                    <template #default="slotProps">
                        <div :style="{ color: 'red' }">Name: {{ slotProps.data }}</div>
                    </template>
                    <template #error>
                        <div>Error</div>
                    </template>
                </Await>
            </Suspense>
            <div>
                <button @click="isShowAge = !isShowAge">isShowAge</button>
            </div>

            <ElTable :data="data">
                <ElTableColumn
                    v-for="item in columns"
                    :key="item.name"
                    v-bind:prop="item.name"
                    v-bind:label="item.label"
                ></ElTableColumn>
            </ElTable>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onUpdated, ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { useRoute } from 'vue-router'

const Await: (typeof import('@/components/Await.vue'))['default'] = defineAsyncComponent(
    () => import('@/components/Await.vue')
)

declare module 'vue-router' {
    interface RouteMeta {
        number: Promise<number>
        name: Promise<string>
        abortController: AbortController
    }
}

defineOptions({ name: 'About1View' })
const route = useRoute()

const number = ref(route.meta.number)
const name = ref(route.meta.name)

const abortController = route.meta.abortController

onBeforeUnmount(() => {
    abortController.abort('请求取消')
})

const isShowAge = ref(false)

const columns = computed(() => [
    { name: 'name', label: 'Name' },
    isShowAge.value ? { name: 'age', label: 'Age' } : {}
])
console.log('columns: ', columns)

const data = [
    { name: 'name', age: 20 },
    { name: 'age', age: 30 }
]
console.log('re-render')
onUpdated(() => {
    console.log('updated')
})
</script>

<style></style>
