<template>
    <div>
        <h3>server sent events</h3>
        <div id="sse">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onUpdated, ref } from 'vue'

defineOptions({ name: 'SSEView' })

const content = ref<string>('')

const source = new EventSource('http://127.0.0.1:3000/events')
source.addEventListener('message', (e) => {
    console.log('Message from server:', e.data)
    // content.value += `${e.data}\n\n`
    const message = e.data
    displayMessageWithEffect(message)
})

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

console.log('re-render')

onUpdated(() => {
    console.log('update')
})

onBeforeUnmount(()=> {
    source.close()
})
</script>
