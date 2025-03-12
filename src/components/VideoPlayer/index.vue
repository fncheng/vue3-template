<template>
    <div class="video-player-container">
        <video ref="videoContainer" class="video-js" :poster="poster">
            <source :src="src" :type="getSourceType(src)" />
            <p class="vjs-no-js">要查看此视频，请启用JavaScript并考虑升级到支持HTML5视频的浏览器</p>
        </video>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import type { VideoPlayerProps } from './types'
import type Player from 'video.js/dist/types/player';

const props = withDefaults(defineProps<VideoPlayerProps>(), {
    src: '',
    poster: '',
    autoplay: false,
    controls: true,
    muted: false,
    loop: false,
    width: '100%',
    height: 'auto',
    fluid: true,
    options: () => ({})
})

const emit = defineEmits(['ready', 'play', 'pause', 'ended', 'timeupdate', 'volumechange', 'error'])

const videoContainer = ref(null)
let player: Player | null = null

// 初始化播放器
const initializePlayer = () => {
    if (!videoContainer.value) return

    // 合并默认选项和传入的选项
    const videoOptions = {
        controls: props.controls,
        autoplay: props.autoplay,
        muted: props.muted,
        loop: props.loop,
        fluid: props.fluid,
        width: props.width,
        height: props.height,
        poster: props.poster,
        sources: [
            {
                src: props.src,
                type: getSourceType(props.src)
            }
        ],
        ...props.options
    }

    // 创建播放器实例
    player = videojs(videoContainer.value, videoOptions, function onPlayerReady() {
        emit('ready', player)
    })
    console.log('player: ', player);

    // 添加事件监听
    player.on('play', () => emit('play', player))
    player.on('pause', () => emit('pause', player))
    player.on('ended', () => emit('ended', player))
    player.on('timeupdate', () => emit('timeupdate', player?.currentTime()))
    player.on('volumechange', () => emit('volumechange', player?.volume()))
    player.on('error', (error: any) => emit('error', error))
}

/**
 * 根据文件扩展名获取媒体类型
 * @param src - 视频源URL
 * @returns 媒体类型
 */
const getSourceType = (src: string) => {
    if (!src) return ''

    const extension = src.split('.').pop()?.toLowerCase()

    switch (extension) {
        case 'mp4':
            return 'video/mp4'
        case 'webm':
            return 'video/webm'
        case 'ogg':
            return 'video/ogg'
        case 'hls':
        case 'm3u8':
            return 'application/x-mpegURL'
        case 'dash':
        case 'mpd':
            return 'application/dash+xml'
        default:
            return 'video/mp4'
    }
}

// 监听src变化，更新视频源
watch(
    () => props.src,
    (newSrc) => {
        if (player && newSrc) {
            player.src({
                src: newSrc,
                type: getSourceType(newSrc)
            })
        }
    }
)

// 组件挂载时初始化播放器
onMounted(() => {
    initializePlayer()
})

// 组件卸载前销毁播放器
onBeforeUnmount(() => {
    if (player) {
        player.dispose()
        player = null
    }
})

// 暴露播放器方法
defineExpose({
    player: () => player,
    play: () => player?.play(),
    pause: () => player?.pause(),
    reset: () => {
        if (player) {
            player.currentTime(0)
            player.pause()
        }
    },
    seek: (time: number) => {
        if (player) {
            player.currentTime(time)
        }
    },
    setVolume: (volume: number) => {
        if (player) {
            player.volume(volume)
        }
    },
    toggleMute: () => {
        if (player) {
            player.muted(!player.muted())
        }
    }
})
</script>

<style scoped>
.video-player-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.video-js-container {
    width: 100%;
    height: 100%;
}

:deep(.video-js) {
    width: 100%;
    height: 100%;
    min-height: 300px;
}

:deep(.vjs-big-play-button) {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
}

/* 确保控制栏样式正确 */
:deep(.vjs-control-bar) {
    display: flex;
    visibility: visible;
    opacity: 1;
    transition:
        visibility 0.1s,
        opacity 0.1s;
}

:deep(.video-js:hover .vjs-control-bar) {
    visibility: visible;
    opacity: 1;
}

/* 自定义控制栏颜色 */
:deep(.video-js .vjs-control-bar) {
    background-color: rgba(43, 51, 63, 0.7);
}

:deep(.video-js .vjs-play-progress) {
    background-color: #3498db;
}

:deep(.video-js .vjs-volume-level) {
    background-color: #3498db;
}
</style>
