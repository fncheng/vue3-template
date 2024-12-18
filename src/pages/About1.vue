<template>
    <div :style="{ color: 'red' }">Here is the number: {{ name }} : {{ number }}</div>
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
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { useNumber } from '../pages/useNumber'
import { useName } from './useName'
import { ElTable, ElTableColumn } from 'element-plus'

const number = ref()
const name = ref()
const getNumber = async () => {
    const value = await useNumber()
    number.value = value
}
const getName = async () => {
    const value = await useName()
    name.value = value
}

getNumber()
getName()

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
    console.log('render')
})
</script>

<style></style>
