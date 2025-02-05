<template>
    <div class="flex-1">
        <div>图片1加载完成</div>

        <!-- 使用new Image()预加载 -->
        <button @click="showImage">showImage</button>

        <div class="h-[1000px]">占位</div>

        <NewImage src="https://picsum.photos/1000/2000"></NewImage>
        <img src="https://picsum.photos/1000/2000" loading="lazy" />
        <!-- <div v-lazy-load> -->
        <img data-src="https://picsum.photos/1000/2000" v-lazy-load-img />
        <!-- </div> -->
    </div>
</template>

<script setup lang="ts">
import NewImage from '@/components/NewImage.vue'
import { ref } from 'vue'

defineOptions({ name: 'BigImgPreload' })

const imageLoaded = ref<boolean>(false)

const showImage = () => {
    imageLoaded.value = !imageLoaded.value
}
</script>
