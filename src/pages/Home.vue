<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import { defineAsyncComponent, ref } from 'vue'

defineOptions({ name: 'HomeView' })

const visible = ref(false)
const id = ref<number>(100)

const obj = ref({
    name: 'zs',
    age: 20,
    nest: {
        number: 100
    }
})

const AsyncComponent1 = defineAsyncComponent(() => import('@/components/AsyncComponent1.vue'))
const AsyncComponent2 = defineAsyncComponent(() => import('@/components/AsyncComponent2.vue'))
const AsyncComponent3 = defineAsyncComponent(() => import('@/components/AsyncComponent3.vue'))

const handleChange = (val: string) => {
    console.log('father change', val)
}
</script>

<template>
    <main>
        <h1>Home</h1>
        <button @click="visible = !visible">show drawer</button>
        <button @click="id++">set id</button>
        <button @click="obj.age = 30">set obj age</button>
        <ElDrawer
            :model-value="visible"
            @update:model-value="visible = $event"
            title="I'm the title"
            :with-header="false"
            :append-to-body="true"
        >
            <span>I'm the content</span>
        </ElDrawer>
        <div>
            Home age: <span>{{ obj.age }}</span> Home number:
            <span>{{ obj.nest.number }}</span> Home id: <span>{{ id }}</span>
        </div>
        <div>
            Component2
            <AsyncComponent2 v-model:obj="obj" v-model:id="id" />
        </div>
        <div>
            Component3
            <AsyncComponent3 v-model:obj="obj" v-model:id="id" />
        </div>
    </main>
</template>
