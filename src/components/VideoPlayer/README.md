# VideoPlayer 组件

基于 video.js 的 Vue 3 视频播放器组件，提供了简单易用的接口和丰富的功能。

## 安装依赖

确保已安装 video.js：

```bash
npm install video.js
# 或
yarn add video.js
```

## 基本用法

```vue
<template>
  <VideoPlayer
    :src="videoSrc"
    :poster="posterUrl"
    :autoplay="false"
    :controls="true"
    @ready="onPlayerReady"
    @play="onPlay"
    @pause="onPause"
  />
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer'

const videoSrc = ref('https://example.com/video.mp4')
const posterUrl = ref('https://example.com/poster.jpg')

const onPlayerReady = (player) => {
  console.log('播放器已就绪', player)
}

const onPlay = () => {
  console.log('视频开始播放')
}

const onPause = () => {
  console.log('视频已暂停')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | String | '' | 视频源URL |
| poster | String | '' | 视频封面图片URL |
| autoplay | Boolean | false | 是否自动播放 |
| controls | Boolean | true | 是否显示控制栏 |
| muted | Boolean | false | 是否静音 |
| loop | Boolean | false | 是否循环播放 |
| width | String/Number | '100%' | 播放器宽度 |
| height | String/Number | 'auto' | 播放器高度 |
| fluid | Boolean | true | 是否自适应容器大小 |
| options | Object | {} | video.js 的其他配置选项 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| ready | player | 播放器初始化完成 |
| play | player | 视频开始播放 |
| pause | player | 视频暂停 |
| ended | player | 视频播放结束 |
| timeupdate | currentTime | 播放时间更新 |
| volumechange | volume | 音量变化 |
| error | error | 发生错误 |

## 方法

通过 ref 可以访问组件实例并调用以下方法：

```vue
<template>
  <VideoPlayer ref="videoPlayerRef" :src="videoSrc" />
  <button @click="playVideo">播放</button>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer'

const videoPlayerRef = ref(null)
const videoSrc = ref('https://example.com/video.mp4')

const playVideo = () => {
  videoPlayerRef.value?.play()
}
</script>
```

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| player | - | videojs实例 | 获取video.js播放器实例 |
| play | - | - | 播放视频 |
| pause | - | - | 暂停视频 |
| reset | - | - | 重置视频（回到开始并暂停） |
| seek | time: number | - | 跳转到指定时间（秒） |
| setVolume | volume: number | - | 设置音量（0-1） |
| toggleMute | - | - | 切换静音状态 |

## 高级用法

### 自定义控制栏

可以通过 options 属性传递 video.js 的配置选项，实现自定义控制栏：

```vue
<template>
  <VideoPlayer
    :src="videoSrc"
    :options="{
      controlBar: {
        playToggle: true,
        volumePanel: true,
        fullscreenToggle: true,
        progressControl: true,
        remainingTimeDisplay: false
      }
    }"
  />
</template>
```

### 支持HLS和DASH流媒体

VideoPlayer组件已内置支持常见的视频格式识别，包括HLS和DASH流媒体：

```vue
<template>
  <VideoPlayer src="https://example.com/playlist.m3u8" />
</template>
```

## 注意事项

1. 确保在组件卸载时正确销毁播放器实例，VideoPlayer组件已自动处理
2. 对于大型应用，建议按需导入video.js以减小打包体积
3. 如需更多自定义功能，可以通过options属性传递video.js配置 