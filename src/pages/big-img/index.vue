<template>
    <div class="flex-1">
        <div>图片1加载完成</div>

        <!-- 使用new Image()预加载 -->
        <button @click="showImage">showImage</button>

        <div class="h-[1000px]">占位</div>

        <img
            data-src="https://picsum.photos/200/200"
            @load="console.log('图片加载完成')"
            v-lazy-load-img
        />

        <NewImage src="https://picsum.photos/800/600" width="500" height="400"></NewImage>
        <NewImage src="https://picsum.photos/500/400" width="500" height="400"></NewImage>
        <NewImage src="https://picsum.photos/500/500" width="500" height="400"></NewImage>
        <NewImage src="https://picsum.photos/1000/2000" width="1000" height="1000"></NewImage>
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
