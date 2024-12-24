<template>
    <div :class="$style.flex">
        <span>{{ props.info.name }}</span>
        <span>{{ props.info.age }}</span>
        <span>{{ props.info.address }}</span>
        <span>cpu: {{ props.info.cpu }}</span>
        <span>gpu: {{ props.info.gpu }}</span>
        <span>mem: {{ props.info.memory }}</span>
        <span>number: {{ props.info.nest?.number }}</span>
        <button @click="handleClick">click</button>
        <div>
            <default />
            <component :is="default" v-if="info.age > 25" />
        </div>
        <div>
            <slot name="default" :message="'dsada'"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AddFormType } from '@/pages/Test.vue'
import { useAttrs, type Component } from 'vue'
const attr = useAttrs()

console.log('attr', attr)

type TestProps = {
    info: AddFormType
    default: Component
    name: string
    age: number
}
type TestEvent = {
    'update:info': [val?: any]
    getData: []
}
type TestSlots = {
    default: (props: { message: string }) => any
}
const props = defineProps<TestProps>()
const emit = defineEmits<TestEvent>()
defineSlots<TestSlots>()

console.log('default', props.default)

const handleClick = () => {
    emit('update:info')
}

// watch(props.info, (val) => {
//     console.log('info变化了', val)
// })
</script>

<style lang="css" module>
.flex {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    row-gap: 8px;
}
</style>
