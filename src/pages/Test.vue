<template>
    <div :class="$style.container" class="grid grid-cols-3">
        <h3 v-color="'red'">Test</h3>
        <div>
            <button @click="age++">{{ age }}</button>
        </div>
        <TestComponent
            ref="testRef"
            v-model:name="addForm.name"
            :info="addForm"
            :age="33"
            :field-props="{ type: 'danger', round: true }"
            @update:info="updateInfo"
        >
            <template v-slot:default="slotProps">
                <p>Here is a message from parent: {{ slotProps.message }}</p>
                <AsyncComponent :number="199" />
            </template>
        </TestComponent>
    </div>
</template>

<script setup lang="ts">
import AsyncComponent from '@/components/AsyncComponent.vue'
import TestComponent from '@/components/TestComponent.vue'
import { useMyPlugin, useOurPlugin } from '@/plugins'
import {
    getCurrentInstance,
    onMounted,
    reactive,
    ref,
    toRefs,
    type ComponentInternalInstance
} from 'vue'

defineOptions({ name: 'TestView' })

export type AddFormType = {
    name: string
    age: number
    address: string
    cpu?: number
    gpu?: number
    memory?: number
    nest?: {
        number?: number
    }
}
const tableData = ref([
    {
        name: 'zs',
        age: 20,
        address: 'shanghai',
        cpu: 10,
        gpu: 5,
        memory: 100,
        nest: {
            number: 999
        }
    },
    {
        name: 'ls',
        age: 20,
        address: 'shanghai',
        cpu: 10,
        gpu: 5,
        memory: 100,
        nest: {
            number: 999
        }
    }
])
const testRef = ref()
let addForm = reactive<AddFormType>({
    name: 'zs',
    age: 0,
    address: '',
    nest: {
        number: 100
    }
})

const { age } = toRefs(addForm)

const fetchData = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'zs',
                age: 20,
                address: 'shanghai',
                cpu: 10,
                gpu: 5,
                memory: 100,
                nest: {
                    number: 999
                }
            })
        }, 2000)
    })

const getData = async () => {
    const res = await fetchData()
    console.log('res: ', res)
    // addForm = {...res}
    Object.assign(addForm, res)
}
const updateInfo = (val?: AddFormType) => {
    if (addForm.nest?.number) {
        addForm.nest.number++
    }
}

console.log('re-render')

getData()

const { appContext } = getCurrentInstance() as ComponentInternalInstance

const { myPluginMethod } = useMyPlugin()
const { ourPluginMethod } = useOurPlugin()

onMounted(() => {
    console.log('this: ', appContext)
    console.log('myPluginMethod: ', myPluginMethod)
    myPluginMethod()
    ourPluginMethod()
})
</script>

<style lang="css" module>
.container {
    /* display: flex;
    flex: 1; */
}
</style>
