<template>
    <div class="video-player-page">
        <div class="player-container">
            <VideoPlayer
                ref="videoPlayerRef"
                :src="currentVideo.src"
                :poster="currentVideo.poster"
                :options="{
                    /* controlBar: {
                        playToggle: true,
                        volumePanel: true,
                        fullscreenToggle: true,
                        progressControl: true,
                        remainingTimeDisplay: false
                    } */
                }"
                :autoplay="false"
                :controls="true"
                :muted="false"
                @ready="onPlayerReady"
                @play="onPlay"
                @pause="onPause"
                @ended="onEnded"
                @timeupdate="onTimeUpdate"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import VideoPlayer from '@/components/VideoPlayer/index.vue'
import type { VideoPlayerInstance } from '@/components/VideoPlayer/types'

defineOptions({
    name: 'VideoPlayerPage'
})

// 视频播放器引用
const videoPlayerRef = ref<VideoPlayerInstance | null>(null)

// 视频列表
const videoList = ref([
    {
        title: '示例视频 1',
        description: '这是第一个示例视频',
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        poster: 'https://vjs.zencdn.net/v/oceans.png'
    }
])

// 当前选中的视频索引
const selectedVideoIndex = ref(0)

// 当前视频
const currentVideo = computed(() => videoList.value[selectedVideoIndex.value])

// 播放器状态
const isPlaying = ref(false)
const currentTime = ref(0)

// 播放器就绪事件
const onPlayerReady = (player: any) => {
    console.log('播放器已就绪', player)
}

// 播放事件
const onPlay = (player: any) => {
    isPlaying.value = true
    console.log('视频开始播放', player)
}

// 暂停事件
const onPause = (player: any) => {
    isPlaying.value = false
    console.log('视频已暂停', player)
}

// 结束事件
const onEnded = (player: any) => {
    isPlaying.value = false
    console.log('视频播放结束', player)
}

// 时间更新事件
const onTimeUpdate = (time: number) => {
    currentTime.value = time
}

onMounted(() => {
    // 组件挂载后的初始化操作
})
</script>

<style scoped>
.video-player-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

.player-container {
    width: 100%;
    max-width: 800px;
    height: auto;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.controls-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.video-info {
    margin-bottom: 20px;
}

.video-info h3 {
    margin-bottom: 10px;
}

.custom-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 10px;
}

.video-selector {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
}

select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
</style>
