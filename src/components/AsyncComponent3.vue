<template>
    <section>
        <div :style="{ color: 'red' }">About: {{ 123 }}</div>
        <p>id <input type="text" v-model="id" /></p>
        age: <span @click="model.age++">{{ model.age }}</span> number:
        <span @click="model.nest.number++">{{ model.nest.number }}</span>
    </section>
</template>

<script setup lang="ts">
const model = defineModel<{ age: number; nest: { number: number } }>('obj', {
    required: true
})
const id = defineModel('id', {
    type: String,
    default: '100',
    required: true,
    set(v) {
        return v
    }
})
</script>
