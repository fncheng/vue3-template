<template>
    <h3>ChildB</h3>
    <button @click="updateName">{{ state.name }}</button>
    <span>age: {{ state.age }}</span>
    <div>
        <span @click="userStore.state.age++">{{ userStore.state.age }}</span>
    </div>
</template>

<script setup lang="ts">
import { useGlobalContext } from '@/context'
import { useUserStore } from '@/store'
import { onUpdated } from 'vue'

const { state, updateName } = useGlobalContext()

const userStore = useUserStore()

console.log('re-render b')

onUpdated(() => {
    console.log('b update')
})
</script>
