<template>
    <slot v-if="error" name="error"></slot>
    <slot v-else name="default" :data="data"></slot>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'

defineOptions({ name: 'AwaitComponent' })

const props = defineProps<{ resolve: Promise<any> }>()
defineSlots<{ default: (props: { data: any }) => any; error: () => any }>()

const data = ref(null)
const error = ref<boolean>(false)

const init = async () => {
    try {
        data.value = await props.resolve
    } catch (e) {
        console.error(e)
        error.value = true
    }
}

init()
</script>
