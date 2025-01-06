<template>
    <section style="width: 100%">
        <h3>editor</h3>
        <audio
            @timeupdate="handleTimeUpdate"
            @play="handleAudioPlay"
            @pause="handleAudioPause"
            controls
            src="https://www.iflyrec.com/MediaStreamService/v1/files/HyjyPHJ-mz316425221292290048/data?token=3f417f133927480b805609a8524a3218"
        ></audio>
        <div class="paragraph" :contenteditable="true" @click="handleActive">
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
import { ref, useCssModule } from 'vue'

defineOptions({ name: 'EditorView' })

type ContentType = {
    text: string
    time: [number, number]
}

const content = ref<ContentType[]>([])
const audioCurrentTime = ref<number | null>(null)

getContent().then((res) => {
    const { transcriptResult } = res
    const data = JSON.parse(transcriptResult)
    const { words } = data.ps[0]
    console.log('res: ', words)
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
}
const handleTimeUpdate = (e: Event) => {
    const target = e.target as HTMLAudioElement
    const currentTime = Math.floor(target.currentTime * 1000)
    updateAudioTime(currentTime)
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

<style lang="css">
[contenteditable='true']:focus {
    outline: none;
    border: none;
}
</style>
