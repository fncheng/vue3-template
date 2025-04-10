<script setup lang="ts">
import { ElTabPane, ElTabs, type TabPaneProps, type TabsPaneContext } from 'element-plus'
import { defineAsyncComponent, ref, watch, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import katexStr from '../utils/katexStr'

const AComponent = defineAsyncComponent(() => import('./ws/a.vue'))
const BComponent = defineAsyncComponent(() => import('./ws/b.vue'))
const CComponent = defineAsyncComponent(() => import('./ws/c.vue'))

interface MessageParameter {
    chat: {
        domain: string
        contextEnabled: boolean
        temperature: number
        top_k: number
    }
}
interface SendMessagePayload {
    message: {
        text: { content_type: string; content: string }[]
    }
    sessionId: string
}
interface ReceiveMessagePayload {
    choices: {
        seq: number
        status: number
        text: {
            content: string
            content_meta: {}
            content_type: string
            reasoning_content: string
            role: 'assistant' | 'user'
        }[]
    }
    context: {
        code: number
        domain: string
        interrupt: boolean
    }
    messageId: string
    sessionId: string
}
interface MessageType {
    header: any
    parameter: MessageParameter
    payload: SendMessagePayload | ReceiveMessagePayload
}

const router = useRouter()
const route = useRoute()

const activeName = ref(route.path.split('/')[2] || 'a')
const tabs: Partial<TabPaneProps & { component: Component }>[] = [
    {
        name: 'a',
        label: 'a',
        component: AComponent
    },
    {
        name: 'b',
        label: 'b',
        component: BComponent
    },
    {
        name: 'c',
        label: 'c',
        component: CComponent
    }
]

const handleTabClick = (tab: TabsPaneContext) => {
    // router.push(`/ws/${tab.paneName}`)
}

const content = ref('')

const startWs = () => {
    const ws = new WebSocket('/ws/agent/skybox/api/v1/chat')
    ws.onopen = () => {
        console.log('start websocket')
        const param = {
            header: { traceId: 'd9c9f993-9a0f-42c4-8eaf-3a9188500061', mode: 0 },
            payload: {
                sessionId: 'xzsspark4pzhhgrnz1io0ydgcd5cd9ca',
                message: {
                    text: [
                        {
                            content_type: 'text',
                            content: '请给出一些有机化合物的化学反应方程式，并尽量用苯环来表示'
                        }
                    ]
                }
            },
            parameter: {
                chat: { domain: '128K13B-1', temperature: 0.5, top_k: 1, contextEnabled: true }
            }
        }
        console.log('param: ', param)
        ws.send(JSON.stringify(param))
    }
    ws.onmessage = (ev: MessageEvent<string>) => {
        const jsonResponse: MessageType = JSON.parse(ev.data)
        if ('choices' in jsonResponse.payload) {
            const textRes = jsonResponse.payload.choices.text[0]
            if (textRes.role === 'assistant') {
                content.value += textRes.content
            }
        }
    }
}

const handleRouter = () => {
    router.push({
        path: '/abc',
        query: {
            name: 'zs',
            age: 20
        }
    })
}

watch(
    () => activeName.value,
    (newVal) => {
        console.log('newVal: ', newVal)
    }
)
</script>

<template>
    <div>
        <button @click="startWs">start ws</button>
        <button @click="handleRouter">handleRouter</button>
    </div>
    <ElTabs v-model:model-value="activeName" @tab-click="handleTabClick">
        <ElTabPane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
            <component :is="item.component" :content="content"></component>
        </ElTabPane>
    </ElTabs>
</template>
