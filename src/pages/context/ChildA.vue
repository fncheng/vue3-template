<template>
    <h3>ChildA</h3>
    <button @click="incrementAge">{{ state.age }}</button>
    <div>
        <button @click="userStore.setName('childA')">childA</button>
        <span @click="userStore.state.name += '1'">{{ userStore.state.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { useGlobalContext } from '@/context'
import { useUserStore } from '@/store'
import { onUpdated } from 'vue'

const { state, incrementAge } = useGlobalContext()

const userStore = useUserStore()

console.log('re-render a')

onUpdated(() => {
    console.log('a update')
})
</script>
