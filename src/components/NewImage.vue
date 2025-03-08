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
        :width="isImageLoadingOrError ? 0 : width"
        :height="isImageLoadingOrError ? 0 : height"
        :data-src="src"
        :src="src"
        :alt="alt"
        :class="[objectFit ? `object-fit-${objectFit}` : '', imgClass]"
        loading="lazy"
        @load="onLoad"
        @error="onError"
    />
    <template v-else-if="mode === 'preload'">
        <img
            v-if="showImage"
            :width="width"
            :height="height"
            ref="imgRef"
            :src="imgSrc"
            :alt="alt"
            :class="[objectFit ? `object-fit-${objectFit}` : '', imgClass]"
            @load="onLoad"
            @error="onError"
        />
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
import { computed, ref } from 'vue'

interface ImageProps {
    src: string
    mode?: 'lazy' | 'preload'
    width?: number | string
    height?: number | string
    alt?: string
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    imgClass?: string
}

defineOptions({ name: 'NewImage', inheritAttrs: false })
const { src, mode = 'lazy', width, height, alt, imgClass } = defineProps<ImageProps>()

const error = ref<boolean>(false)
const loading = ref<boolean>(true)

const imgSrc = ref('')
const imgRef = ref<HTMLImageElement>()
const showImage = ref<boolean>(false)

const isImageLoadingOrError = computed(() => {
    return error.value || loading.value
})

const onLoad = () => {
    loading.value = false
    error.value = false
    console.log(`图片加载成功: ${src}`)
}

const onError = () => {
    loading.value = false
    error.value = true
    console.error(`图片加载失败: ${src}`)
}

const preload = () => {
    const img = new Image()
    img.src = src
    img.onload = () => {
        imgSrc.value = img.src
        console.log('图片预加载完成')
        showImage.value = true
    }
    img.onerror = () => {
        loading.value = false
        error.value = true
        console.error('图片预加载失败')
    }
}

mode === 'preload' && preload()

const retry = () => {
    error.value = false
    showImage.value = false
    loading.value = true
    preload()
}
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
    cursor: pointer;
}

.loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* 对象适应模式类 */
.object-fit-cover {
    object-fit: cover;
}

.object-fit-contain {
    object-fit: contain;
}

.object-fit-fill {
    object-fit: fill;
}

.object-fit-none {
    object-fit: none;
}

.object-fit-scale-down {
    object-fit: scale-down;
}
</style>
