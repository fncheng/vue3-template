<template>
    <button @click="startWs">start ws</button>
    <MdPreview :content="processMarkdown"></MdPreview>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MdPreview from '@app/components/MdPreview/index.vue'
import { renderBlockMath, renderInlineMath } from '@/app/utils/katex'
import 'katex/dist/katex.min.css'

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

const content = ref('')
const processMarkdown = computed(() => {
    let processed = renderBlockMath(content.value)
    processed = renderInlineMath(processed)
    // Then process markdown
    return processed
})

const startWs = () => {
    const ws = new WebSocket('ws://localhost:8099/agent/skybox/api/v1/chat')
    ws.onopen = () => {
        console.log('start websocket')
        const param = {
            header: { traceId: '6d503147-9872-4fed-943e-f75d7004f9f0', mode: 0 },
            payload: {
                sessionId: '',
                message: { text: [{ content_type: 'text', content: '欧拉公式的推导过程' }] }
            },
            parameter: {
                chat: { domain: 'generalv3.5', temperature: 0.5, top_k: 1, contextEnabled: true }
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
</script>
