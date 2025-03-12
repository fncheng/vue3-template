/**
 * VideoPlayer组件的属性类型定义
 */
export interface VideoPlayerProps {
    /**
     * 视频源URL
     */
    src: string

    /**
     * 视频封面图片URL
     */
    poster?: string

    /**
     * 是否自动播放
     */
    autoplay?: boolean

    /**
     * 是否显示控制栏
     */
    controls?: boolean

    /**
     * 是否静音
     */
    muted?: boolean

    /**
     * 是否循环播放
     */
    loop?: boolean

    /**
     * 播放器宽度
     */
    width?: string | number

    /**
     * 播放器高度
     */
    height?: string | number

    /**
     * 是否自适应容器大小
     */
    fluid?: boolean

    /**
     * video.js的其他配置选项
     */
    options?: Record<string, any>
}

/**
 * VideoPlayer组件实例的方法类型定义
 */
export interface VideoPlayerInstance {
    /**
     * 获取video.js播放器实例
     */
    player: () => any

    /**
     * 播放视频
     */
    play: () => void

    /**
     * 暂停视频
     */
    pause: () => void

    /**
     * 重置视频（回到开始并暂停）
     */
    reset: () => void

    /**
     * 跳转到指定时间（秒）
     */
    seek: (time: number) => void

    /**
     * 设置音量（0-1）
     */
    setVolume: (volume: number) => void

    /**
     * 切换静音状态
     */
    toggleMute: () => void
}

/**
 * VideoPlayer组件事件类型定义
 */
export interface VideoPlayerEvents {
    /**
     * 播放器初始化完成
     */
    ready: (player: any) => void

    /**
     * 视频开始播放
     */
    play: (player: any) => void

    /**
     * 视频暂停
     */
    pause: (player: any) => void

    /**
     * 视频播放结束
     */
    ended: (player: any) => void

    /**
     * 播放时间更新
     */
    timeupdate: (currentTime: number) => void

    /**
     * 音量变化
     */
    volumechange: (volume: number) => void

    /**
     * 发生错误
     */
    error: (error: any) => void
}
