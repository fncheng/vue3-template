<template>
    <div class="flex-1">
        <div>图片1加载完成</div>

        <!-- 使用new Image()预加载 -->
        <button @click="showImage">showImage</button>

        <div class="h-[1000px]">占位</div>

        <ImageLoad src="https://picsum.photos/1000/2000"></ImageLoad>
        <img src="https://picsum.photos/1000/2000" loading="lazy" />
        <!-- <div v-lazy-load> -->
        <img data-src="https://picsum.photos/1000/2000" v-lazy-load-img />
        <!-- </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageLoad from './ImageLoad.vue'

defineOptions({ name: 'BigImgPreload' })

const imgSrc = ref('')
const imgRef = ref<HTMLImageElement>()
const imageLoaded = ref<boolean>(false)

// const preloadImage = () => {
//     const img = new Image()
//     img.src = 'https://picsum.photos/2000/3000'
//     img.onload = () => {
//         imgSrc.value = img.src
//         console.log('图片2预加载完成')
//         imageLoaded.value = true
//     }
// }

const showImage = () => {
    imageLoaded.value = !imageLoaded.value
}

// preloadImage()

const handleImageLoad = () => {
    console.log('图片加载成功')
}

const handleImageError = () => {
    console.error('图片加载失败')
}
</script>
