<script setup lang="ts">
import { ElTabPane, ElTabs, type TabPaneProps, type TabsPaneContext } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import katexStr from '../utils/katexStr'

const router = useRouter()
const route = useRoute()

const activeName = ref(route.path.split('/')[2] || 'a')
const tabs: Partial<TabPaneProps>[] = [
    {
        name: 'a',
        label: 'a'
    },
    {
        name: 'b',
        label: 'b'
    },
    {
        name: 'c',
        label: 'c'
    }
]

const handleTabClick = (tab: TabsPaneContext) => {
    router.push(`/ws/${tab.paneName}`)
}

const content = katexStr

watch(
    () => activeName.value,
    (newVal) => {
        console.log('newVal: ', newVal)
    }
)
</script>

<template>
    <ElTabs v-model:model-value="activeName" @tab-click="handleTabClick">
        <ElTabPane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
            <RouterView v-slot="{ Component }">
                <component :is="Component" :content="content"></component>
            </RouterView>
        </ElTabPane>
    </ElTabs>
</template>
