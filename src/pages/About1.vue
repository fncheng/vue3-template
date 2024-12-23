<template>
    <main class="flex flex-1 flex-col">
        <h3>Let's loading some data</h3>
        <section class="grid grid-cols-4">
            <div :style="{ color: 'red' }">Number: {{ number }}</div>
            <div :style="{ color: 'red' }">Name: {{ name }}</div>
            <div>
                <button @click="isShowAge = !isShowAge">isShowAge</button>
            </div>

            <ElTable :data="data">
                <ElTableColumn
                    v-for="item in columns"
                    :key="item.name"
                    v-bind:prop="item.name"
                    v-bind:label="item.label"
                >
                </ElTableColumn>
            </ElTable>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onUpdated, ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { useRoute } from 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        number: Promise<number>
        name: Promise<string>
        abortController: AbortController
    }
}

defineOptions({ name: 'About1View' })

const number = ref()
const name = ref()

const route = useRoute()
const abortController = route.meta.abortController

const getLoader = async () => {
    const numberVal = route.meta.number
    const nameVal = route.meta.name
    numberVal.then((n) => {
        number.value = n
    })
    nameVal.then((n) => {
        name.value = n
    })
    // number.value = await numberVal
    // name.value = await nameVal

    // const [numberVal2, nameVal2] = await Promise.all([route.meta.number, route.meta.name])
    // number.value = numberVal2
    // name.value = nameVal2
}

getLoader()

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
