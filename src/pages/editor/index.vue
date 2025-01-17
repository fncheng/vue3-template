<template>
    <section style="width: 100%">
        <h3>editor</h3>
        <div>
            <audio
                ref="audioRef"
                @timeupdate="handleTimeUpdate"
                @play="handleAudioPlay"
                @pause="handleAudioPause"
                controls
                :src="audioSrc"
                preload="auto"
            ></audio>
            <div class="controls">
                <button id="playPauseBtn" class="play-pause" @click="playAudio">Play</button>
                <span id="currentTime">0:00</span> /
                <span id="duration">{{ audioTotalTime }}</span>
                <input type="range" class="progress" id="progress" value="0" max="100" />
                <input type="range" class="progress" id="volume" value="100" max="100" />
                <button @click="handleSetCurrentTime">set currentTime</button>
            </div>
        </div>
        <div class="paragraph" :contenteditable="true" @click="handleActive" ref="paragraphRef">
            <span
                v-for="(item, index) in content"
                :class="{
                    [$style.active]:
                        audioCurrentTime &&
                        audioCurrentTime >= item.time[0] &&
                        audioCurrentTime <= item.time[1],
                    [$style.vad]: true
                }"
                :key="index"
                :data-wb="item.time[0]"
                :data-we="item.time[1]"
                >{{ item.text }}
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { getContent } from '@/api/api'
import { computed, onMounted, ref, useCssModule, watch } from 'vue'

defineOptions({ name: 'EditorView' })

type ContentType = {
    text: string
    time: [number, number]
}

const audioRef = ref<HTMLAudioElement>()
const content = ref<ContentType[]>([])
const audioCurrentTime = ref<number | null>(null)
const audioSrc = ref<string>(
    // 'https://www.iflyrec.com/MediaStreamService/v1/files/HyjyPHJ-mz316425221292290048/data?token=3f417f133927480b805609a8524a3218'
    // 'http://172.29.226.35:30038/doc/semantic-doc/document/download?filePath=open/temp5242994811979466555.mp3'
    '/proxyApi/audio/get/a'
    // '/audio/downloadFile'
)

// const getAudioFn = async () => {
//     let res = await getAudio()
//     if (res) {
//         console.log('res: ', res)
//         audioSrc.value = res
//     }
// }

// getAudioFn()

getContent().then((res) => {
    const { transcriptResult } = res
    const data = JSON.parse(transcriptResult)
    const { words } = data.ps[0]
    content.value = words
})
const $style = useCssModule()

/**
 * 清除高亮
 */
const clearHighlight = () => {
    audioCurrentTime.value = null
}

const handleActive = (e: MouseEvent) => {
    clearHighlight()

    const target = e.target as HTMLElement
    audioCurrentTime.value = target.dataset.wb ? Number(target.dataset.wb) : null
    if (audioRef.value) {
        audioRef.value.currentTime = target.dataset.wb ? Number(target.dataset.wb) / 1000 : 0
    }
}
const handleTimeUpdate = (e: Event) => {
    const target = e.target as HTMLAudioElement
    const currentTime = target.currentTime * 1000
    updateAudioTime(currentTime)

    console.log(target.currentTime * 1000)
}

let rafId: any
const updateAudioTime = (time: number) => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
        audioCurrentTime.value = time
    })
}
const handleAudioPlay = () => {
    if (!rafId) requestAnimationFrame(updateAudioTime)
}
const handleAudioPause = () => {
    if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
    }
}

//#region 监听文本修改
const paragraphRef = ref<HTMLDivElement>()

onMounted(() => {
    const observer = new MutationObserver((ms) =>
        ms.forEach((m) => {
            if (m.type === 'characterData') {
                console.log(m)
                const target = m.target as HTMLSpanElement
                console.log('Text changed:', target.parentElement?.getAttribute('data-wb'))
            }
        })
    )
    paragraphRef.value &&
        observer.observe(paragraphRef.value, { characterData: true, subtree: true })
})
//#endregion

//#region 自定义播放组件
const audioDuration = ref<number>()

const audioTotalTime = computed(() => formatTime(audioDuration.value || 0))

watch(
    () => audioRef.value,
    (newVal) => {
        if (newVal) {
            newVal.onloadedmetadata = () => {
                audioDuration.value = newVal.duration
            }
        }
    }
)
const showAudioToalTime = () => {
    if (audioRef.value) {
        return formatTime(audioRef.value.duration)
    }
    return '00:00'
}
const playAudio = () => {
    if (audioRef.value) {
        audioRef.value.play()
        audioRef.value.currentTime = 2000
    }
}
const handleSetCurrentTime = () => {
    if (audioRef.value) {
        audioRef.value.currentTime = 6
    }
}

const formatTime = (seconds: number) => {
    console.log('seconds: ', seconds)
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`
}
//#endregion
</script>

<style lang="scss" module>
.active {
    color: #fff;
    background-color: #4499ff;
}
.vad {
    transition:
        background-color 0.05s ease,
        color 0.05s ease;
}
</style>

<style lang="css" scoped>
[contenteditable='true']:focus {
    outline: none;
    border: none;
}
/* styles.css */
/* body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
} */

.audio-player {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.play-pause,
.mute {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}

.play-pause:hover,
.mute:hover {
    background-color: #45a049;
}
.progress {
    width: 100%;
    margin: 10px 0;
}
</style>
