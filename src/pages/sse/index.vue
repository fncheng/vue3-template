<template>
    <div>
        <h3>server sent events</h3>
        <button @click="handleStart">start SSE</button>
        <button @click="handleStop">stop SSE</button>
        <div id="sse">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
import { startPostSSE } from '@/utils/ssePost'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { onBeforeUnmount, onUpdated, ref } from 'vue'
import Typewriter from './typewriter'

defineOptions({ name: 'SSEView' })

const content = ref<string>('')
const stopSSE = ref<() => void>()

const start = () => {
    const source = new EventSource('/proxyApi/events')
    source.addEventListener('message', async (e) => {
        console.log('Message from server:', e.data)
        const container = document.getElementById('sse')
        if (container) {
            const writer = new Typewriter(container, {
                chunkSize: 4,
                delay: 40
            })
            writer.addText(e.data)
        }
        const message = e.data
        if (message === '[DONE]') {
            source.close()
        }
    })
    return () => source.close()
}

const startSSE = async () => {
    const dispose = await startPostSSE()
    return dispose
}

const startFse = () => {
    const ctrl = new AbortController()
    const signal = ctrl.signal
    fetchEventSource('/proxyApi/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foo: 'bar'
        }),
        signal,
        onmessage: (e) => {
            console.log('Message from server:', e.data)
            // content.value += `${e.data}\n\n`
            const message = e.data
            if (message === '[DONE]') {
                ctrl.abort()
            }
            displayMessageWithEffect(message)
        }
    })
    const dispose = () => ctrl.abort()
    return dispose
}

function displayMessageWithEffect(message: string) {
    let index = 0
    const container = document.getElementById('sse')
    if (container) {
        const newMessageElement = document.createElement('p')
        container.appendChild(newMessageElement)

        const updateText = () => {
            if (index < message.length) {
                newMessageElement.textContent += message[index]
                index++
                requestAnimationFrame(updateText)
            }
        }
        updateText()
    }
}

const handleStart = async () => {
    // const dispose = await startSSE()
    const dispose = start()
    stopSSE.value = dispose
}

const handleStop = () => {
    stopSSE.value && stopSSE.value()
}

console.log('re-render')

onUpdated(() => {
    console.log('update')
})

onBeforeUnmount(() => {})
</script>

<style lang="css" scoped>
#sse {
    will-change: contents;
    contain: content;
    white-space: pre-wrap;
}
</style>
