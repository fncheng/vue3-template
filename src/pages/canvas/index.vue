<template>
    <div>
        <canvas ref="canvasRef" id="canvasContainer" @mousemove="handleMouseMove"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = 'https://statics.moonshot.cn/kimi-web-seo/assets/bot-uOBMXfKW.png'
    img.onload = () => {
        ctx?.drawImage(img, 0, 0)
    }
})

const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.offsetX
    const mouseY = e.offsetY
    console.log(mouseX, mouseY)
    const img = new Image()
    img.src = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
    img.onload = () => {
        canvasRef.value?.getContext('2d')?.drawImage(img, 0, 0)
    }
}
</script>
