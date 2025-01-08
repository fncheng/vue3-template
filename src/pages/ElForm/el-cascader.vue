<template>
    <ElCascader v-model:model-value="selectedValue" :options="options" :props="props"></ElCascader>
</template>

<script setup lang="ts">
import { getNodes } from '@/api/api'
import { ElCascader, type CascaderOption, type CascaderProps } from 'element-plus'
import { ref } from 'vue'

const selectedValue = ref([
    ['zhejiang', 'hangzhou'],
    ['jiangsu', 'xuzhou']
])
const options = ref<CascaderOption[]>([])

const getNodeData = (node?: string | number) =>
    getNodes(node).then((res) => {
        const { nodes } = res
        if (nodes.length > 0) {
            return res
        }
        return { nodes: [] }
    })

getNodeData().then((res) => {
    console.log('res****1', res)
    options.value = res.nodes
})

const props: CascaderProps = {
    lazy: true,
    multiple: true,
    lazyLoad: async (node, resolve) => {
        console.log('node: ', node)
        const { value } = node
        if (value) {
            const res = await getNodeData(value)
            resolve(res.nodes)
        }
        resolve([])
    }
}
</script>
