<template>
    <ElCascader v-model:model-value="selectedValue" :options="options" :props="props"></ElCascader>
    <div>
        <p>接口并发控制</p>
        <ElButton @click="handleRequest">按钮</ElButton>
    </div>
</template>

<script setup lang="ts">
import { getNodes, getNumber } from '@/api/api'
import { pLimit } from '@/utils'
import { ElButton, ElCascader, type CascaderOption, type CascaderProps } from 'element-plus'
// import pLimit from 'p-limit'
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

//#region
const taskCount = ref(10)
/** 最大并发数 */
const MAX_CONCURRENT_REQUESTS = 3
/** 当前请求数 */
const limit = pLimit(MAX_CONCURRENT_REQUESTS)

const handleRequest = async () => {
    console.log(`开始 ${taskCount.value} 个任务`)
    for (let i = 0; i < taskCount.value; i++) {
        let res = limit(() => getNumber({ id: i }))
        console.log(`任务 ${i} 完成`, res)
    }
}
//#endregion
</script>
