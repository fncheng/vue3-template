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

        <div class="controls-container">
            <div class="video-info">
                <h3>{{ currentVideo.title }}</h3>
                <p>{{ currentVideo.description }}</p>
            </div>

            <div class="custom-controls">
                <button @click="playVideo">播放</button>
                <button @click="pauseVideo">暂停</button>
                <button @click="resetVideo">重置</button>
                <button @click="toggleMute">{{ isMuted ? '取消静音' : '静音' }}</button>

                <div class="volume-control">
                    <span>音量:</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        v-model="volume"
                        @input="changeVolume"
                    />
                </div>

                <div class="video-selector">
                    <span>选择视频:</span>
                    <select v-model="selectedVideoIndex" @change="changeVideo">
                        <option v-for="(video, index) in videoList" :key="index" :value="index">
                            {{ video.title }}
                        </option>
                    </select>
                </div>
            </div>
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

// 定义VideoPlayer组件实例的类型
// interface VideoPlayerInstance {
//   player: () => any;
//   play: () => void;
//   pause: () => void;
//   reset: () => void;
//   seek: (time: number) => void;
//   setVolume: (volume: number) => void;
//   toggleMute: () => void;
// }

// 视频播放器引用
const videoPlayerRef = ref<VideoPlayerInstance | null>(null)

// 视频列表
const videoList = ref([
    {
        title: '示例视频 1',
        description: '这是第一个示例视频',
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        poster: 'https://vjs.zencdn.net/v/oceans.png'
    },
    {
        title: '示例视频 2',
        description: '这是第二个示例视频',
        src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        poster: 'https://media.w3.org/2010/05/sintel/poster.png'
    },
    {
        title: '示例视频 3',
        description: '这是第三个示例视频',
        src: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
        poster: 'https://media.w3.org/2010/05/bunny/poster.png'
    }
])

// 当前选中的视频索引
const selectedVideoIndex = ref(0)

// 当前视频
const currentVideo = computed(() => videoList.value[selectedVideoIndex.value])

// 播放器状态
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(1)
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

// 播放视频
const playVideo = () => {
    videoPlayerRef.value?.play()
}

// 暂停视频
const pauseVideo = () => {
    videoPlayerRef.value?.pause()
}

// 重置视频
const resetVideo = () => {
    videoPlayerRef.value?.reset()
}

// 切换静音
const toggleMute = () => {
    videoPlayerRef.value?.toggleMute()
    isMuted.value = !isMuted.value
}

// 改变音量
const changeVolume = () => {
    videoPlayerRef.value?.setVolume(volume.value)
}

// 切换视频
const changeVideo = () => {
    // 视频切换后自动播放
    setTimeout(() => {
        playVideo()
    }, 100)
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
