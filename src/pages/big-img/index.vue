<template>
    <div>
        <div>图片1加载完成</div>

        <!-- 使用new Image()预加载 -->
        <button @click="showImage">showImage</button>
        <img
            v-if="imageLoaded"
            ref="imgRef"
            :src="imgSrc"
            alt="大图2"
            @load="handleImageLoad"
            @error="handleImageError"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'BigImgPreload' })

const imgSrc = ref('')
const imgRef = ref<HTMLImageElement>()
const imageLoaded = ref<boolean>(false)

const preloadImage = () => {
    const img = new Image()
    img.src = 'https://picsum.photos/2000/3000'
    img.onload = () => {
        imgSrc.value = img.src
        console.log('图片2预加载完成')
        imageLoaded.value = true
    }
}

const showImage = () => {
    imageLoaded.value = !imageLoaded.value
}

preloadImage()

const handleImageLoad = () => {
    console.log('图片加载成功')
}

const handleImageError = () => {
    console.error('图片加载失败')
}
</script>
