<template>
    <section>
        <div :style="{ color: 'red' }">About: {{ 123 }}</div>
        <p>id <input type="text" v-model="id" /></p>
        age: <span @click="model.age++">{{ model.age }}</span> number:
        <span @click="model.nest.number++">{{ model.nest.number }}</span>
    </section>
</template>

<script setup lang="ts">
type ObjectModel = {
    age: number
    nest: {
        number: number
    }
}
const model = defineModel<ObjectModel>('object', {
    required: true
})
const id = defineModel<string>('id', {
    required: true,
    set(v) {
        return v
    }
})
</script>
