<script setup lang="ts">
import { ElTabPane, ElTabs, type TabPaneName, type TabPaneProps } from 'element-plus'
import { onUpdated, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import katexStr from '../utils/katexStr'
import katexStr1 from '../utils/katexStr1'

const router = useRouter()
const route = useRoute()
console.log('route: ', route.path)

const activeName = ref<TabPaneName>(route.path.split('/').pop() || 'a')
const tabs: Partial<TabPaneProps>[] = [
    {
        name: 'a',
        label: '标签a'
    },
    {
        name: 'b',
        label: '标签b'
    },
    {
        name: 'c',
        label: '正则replace'
    },
    {
        name: 'd',
        label: '@vscode/markdown-it-katex'
    },
    {
        name: 'e',
        label: '标签e'
    }
]

const handleTabChange = (tab: TabPaneName) => {
    activeName.value = tab
    router.push(`/katex/${tab}`)
}

const content = katexStr1

watch(
    () => activeName.value,
    (newVal) => {
        console.log('newVal: ', newVal)
    }
)

onUpdated(() => {
    console.log('update')
})
</script>

<template>
    <ElTabs :model-value="activeName" @tab-change="handleTabChange">
        <ElTabPane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
            <RouterView v-slot="{ Component }">
                <component :is="Component" :content="content"></component>
            </RouterView>
        </ElTabPane>
    </ElTabs>
</template>
