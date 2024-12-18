<template>
    <section>
        <div :style="{ color: 'red' }">About: {{ 123 }}</div>
        <p>id <input type="text" v-model="localeId" /></p>
        <p>
            <span>{{ localeId }}</span>
            <input
                type="text"
                :value="localeId"
                @input="
                    localeId = $event.target.value;
                    emit('update:id', $event.target.value)
                "
            />
        </p>
        <p>
            id
            <input type="text" :value="props.id" @input="emit('update:id', $event.target.value)" />
        </p>
        age: <span @click="searchParams.age++">{{ searchParams.age }}</span>
        number:
        <span @click="searchParams.nest.number++">{{ searchParams.nest.number }}</span>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    obj: {
        name: string
        age: number
        nest: {
            number: number
        }
    }
    id: string
}>()
const emit = defineEmits(['update:obj', 'update:id'])
const searchParams = ref({ ...props.obj })

const localeId = computed({
    get() {
        return props.id
    },
    set(val) {
        emit('update:id', val)
    }
})

// watch(localeId, (val) => {
//     console.log('new id: ', val)
//     emit('update:id', val)
// })

// watch(
//     () => props.id,
//     (val) => {
//         localeId.value = val
//     }
// )

watch(
    () => searchParams.value,
    (val) => {
        console.log('new obj: ', val)
        emit('update:obj', val)
    },
    { deep: true }
)
</script>

<style lang="css" module>
section {
    border: 1px dashed red;
}
</style>
