<template>
    <div
        :style="{ width: `${width}px`, height: `${height}px` }"
        v-if="error"
        @click="retry"
        class="error-placeholder"
    >
        <slot name="error">图片加载失败，点击重试</slot>
    </div>
    <img
        v-if="mode === 'lazy'"
        ref="imgRef"
        :width="width"
        :height="height"
        :data-src="src"
        v-lazy-load-img
        @load="loading = false"
    />
    <template v-else-if="mode === 'preload' && showImage">
        <img :width="width" :height="height" ref="imgRef" :src="imgSrc" />
    </template>
    <div
        v-if="loading"
        class="loading-placeholder"
        :style="{
            width: `${width}px`,
            height: `${height}px`
        }"
    >
        <slot name="loading">图片加载中...</slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface ImageProps {
    src: string
    mode?: 'lazy' | 'preload'
    width?: number | string
    height?: number | string
}

defineOptions({ name: 'NewImage' })
const { src, mode = 'lazy', width, height } = defineProps<ImageProps>()

const error = ref<boolean>(false)
const loading = ref<boolean>(true)

const imgSrc = ref('')
const imgRef = ref<HTMLImageElement>()
const showImage = ref<boolean>(false)

const preload = () => {
    const img = new Image()
    img.src = src
    img.onload = () => {
        imgSrc.value = img.src
        console.log('图片预加载完成')
        showImage.value = true
    }
    img.onerror = () => {
        error.value = true
        console.error('图片加载失败')
    }
}
mode === 'preload' && preload()

const retry = () => {
    error.value = false
    showImage.value = false
    preload()
}

onMounted(() => {
    if (mode === 'preload') {
        preload()
    }
})
</script>

<style lang="css" scoped>
.loading-placeholder {
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
}

.error-placeholder {
    width: 100%;
    height: 200px;
    background-color: #ffe5e5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #e53935;
}
</style>
