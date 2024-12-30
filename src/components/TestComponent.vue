<template>
    <div :class="$style.flex">
        <span>{{ name }}</span>
        <span>{{ age }}</span>
        <span>cpu: {{ props.info.cpu }}</span>
        <span>number: {{ props.info.nest?.number }}</span>
        <button @click="handleClick">click</button>
        <section>
            <slot name="default" :message="'dsada'"></slot>
        </section>
        <section>
            <ElInput v-model:model-value="modelName" />
            <ElButton :type="type" v-bind="fprops">click</ElButton>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { AddFormType } from '@/pages/Test.vue'
import { ElButton, ElInput, type ButtonProps } from 'element-plus'
import { useAttrs } from 'vue'
const attr = useAttrs()

console.log('attr', attr)

type TestProps = {
    info: AddFormType
    name: string
    age: number
    fieldProps: Partial<ButtonProps>
}
type TestEvent = {
    'update:info': [val?: any]
    getData: []
}
type TestSlots = {
    default: (props: { message: string }) => any
}
const { name, age, fieldProps, ...props } = defineProps<TestProps>()
const { type, ...fprops } = fieldProps
const emit = defineEmits<TestEvent>()
defineSlots<TestSlots>()

const modelName = defineModel<string>('name', {
    required: true
})

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
