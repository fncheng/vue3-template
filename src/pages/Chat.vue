<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

defineOptions({ name: 'ChatView' })

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const currentStreamingText = ref('')
const isStreaming = ref(false)

// 模拟获取SSE响应的Promise
const getStreamResponse = (message: string) => {
  return new Promise<string>((resolve) => {
    const sseUrl = 'http://127.0.0.1:3000/events'
    const eventSource = new EventSource(sseUrl)
    let fullText = ''

    eventSource.onmessage = (event) => {
      const chunk = event.data
      console.log('chunk', chunk)
      if (chunk === '[DONE]') {
        eventSource.close()
        resolve(fullText)
        console.log('resolve fullText', fullText)
        isStreaming.value = false
        return
      }
      fullText += chunk
      currentStreamingText.value = fullText
    }

    eventSource.onerror = () => {
      eventSource.close()
      resolve(fullText)
      isStreaming.value = false
    }
  })
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isStreaming.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: inputMessage.value
  })

  // 准备接收助手响应
  messages.value.push({
    role: 'assistant',
    content: ''
  })

  const userMessage = inputMessage.value
  inputMessage.value = ''
  isStreaming.value = true
  currentStreamingText.value = ''

  try {
    const response = await getStreamResponse(userMessage)
    messages.value[messages.value.length - 1].content = response
  } catch (error) {
    console.error('Error:', error)
  }
}

// 清理函数
onUnmounted(() => {
  if (isStreaming.value) {
    // 清理所有活跃的EventSource连接
  }
})
</script>

<template>
  <div class="chat-container">
    <!-- 消息列表 -->
    <div class="messages-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <div class="message-content">
          <!-- 如果是最后一条助手消息且正在流式传输，显示流式文本 -->
          <template v-if="message.role === 'assistant' && index === messages.length - 1 && isStreaming">
            <div class="streaming-text">{{ currentStreamingText }}</div>
          </template>
          <!-- 否则显示普通消息 -->
          <template v-else>
            {{ message.content }}
          </template>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-container">
      <textarea
        v-model="inputMessage"
        @keydown.enter.prevent="sendMessage"
        placeholder="输入消息..."
        :disabled="isStreaming"
      ></textarea>
      <button
        @click="sendMessage"
        :disabled="isStreaming || !inputMessage.trim()"
      >
        发送
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  margin-bottom: 20px;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  white-space: pre-wrap;
  word-break: break-word;
}

.user .message-content {
  background-color: #1a8cff;
  color: white;
}

.assistant .message-content {
  background-color: #f0f0f0;
  color: #333;
}

.typing {
  color: #666;
  font-style: italic;
}

.streaming-text {
  animation: blink 1s infinite;
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-top: 1px solid #eee;
}

textarea {
  flex: 1;
  height: 60px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
}

button {
  padding: 0 20px;
  background-color: #1a8cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style> 