<template>
    <ElCascader v-model:model-value="selectedValue" :options="options" :props="props"></ElCascader>
    <div>
        <p>接口并发控制</p>
        <ElButton @click="handleClick">按钮</ElButton>
    </div>
    <div v-html="replaceHtml" v-lazy-load></div>
</template>

<script setup lang="ts">
import { getNodes, getNumber } from '@/api/api'
import { pLimit } from '@/utils'
import { ElButton, ElCascader, type CascaderOption, type CascaderProps } from 'element-plus'
import { debounce } from 'lodash-es'
// import pLimit from 'p-limit'
import { ref } from 'vue'

const selectedValue = ref([['zhejiang', 'hangzhou']])
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

const handleClick = debounce(() => handleRequest(), 1000)

const handleRequest = async () => {
    console.log(`开始 ${taskCount.value} 个任务`)
    for (let i = 0; i < taskCount.value; i++) {
        let res = limit(() => getNumber({ id: i }))
        console.log(`任务 ${i} 完成`, res)
    }
}
//#endregion

const html = ref(`<h1 data-v-md-heading="模型仓库" data-v-md-line="1">模型仓库</h1>
<p data-v-md-line="3">使用super账户</p>
<p data-v-md-line="5">功能管理-新建</p>
<p data-v-md-line="7"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/1c00b8c9-25db-47db-b918-2752022f01a6/image1.png.png" alt="Image"></p>
<p data-v-md-line="9">切换admin账户</p>
<p data-v-md-line="11">角色管理中对应角色-菜单功能权限</p>
<p data-v-md-line="13">找到模型仓库将模型仓库版本详情功能勾选至右边</p>
<p data-v-md-line="15"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/b2d1b926-6daa-441c-b4a9-c1402ff4ad35/image2.png.png" alt="Image"></p>
<h1 data-v-md-heading="模型压缩" data-v-md-line="17"><strong>模型压缩</strong></h1>
<p data-v-md-line="19">使用super账户</p>
<p data-v-md-line="21">应用管理-新建应用</p>
<p data-v-md-line="23">大模型训练下新建应用“模型工具”：</p>
<p data-v-md-line="25"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/17226a38-39a0-493e-87df-046d55bf0950/image3.png.png" alt="Image"></p>
<p data-v-md-line="27">模型工具下新建子应用“模型压缩”：</p>
<p data-v-md-line="29"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/78cecde3-959f-41ab-b6cd-6d4687f38d92/image4.png.png" alt="Image"></p>
<p data-v-md-line="31">功能管理-新建</p>
<p data-v-md-line="33"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/9bdb685f-1149-4ec1-86f8-20eda304fefc/image5.png.png" alt="Image"></p>
<p data-v-md-line="35">切换admin账户</p>
<p data-v-md-line="37">角色管理中对应角色-菜单功能权限</p>
<p data-v-md-line="39">找到模型压缩将三个功能勾选至右边</p>
<p data-v-md-line="41"><img src="http://localhost:8100/proxyApi/skybox-doc-center/api/minio/download?filePath=s3://acf876c3-62e9-4ab1-9aab-e2eea5953462/admin/system/aicc-doc/assets/37/383fa7a8-3822-4d0f-a3d8-cda2a8020ff9/image6.png.png" alt="Image"></p>
`)

const replaceHtml = html.value.replace(/src/g, 'data-src')
</script>
