<template>
    <svg v-if="iconName" :class="['icon', className]" :style="svgStyle" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
    <span v-else class="icon-error">{{ name }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    // 图标名称
    name: string
    // 自定义类名
    className?: string
    // 图标大小，支持数字或带单位的字符串
    size?: number | string
    // 图标颜色
    color?: string
    // 旋转角度
    rotate?: number
}

defineOptions({
    name: 'SvgIcon'
})

const props = withDefaults(defineProps<Props>(), {
    className: '',
    size: 16,
    color: '',
    rotate: 0
})

const iconName = computed(() => {
    return `#icon-${props.name}`
})

const svgStyle = computed(() => {
    const style: Record<string, string> = {}

    // 处理尺寸
    if (typeof props.size === 'number') {
        style.fontSize = `${props.size}px`
    } else {
        style.fontSize = props.size
    }

    // 处理颜色
    if (props.color) {
        style.color = props.color
    }

    // 处理旋转
    if (props.rotate) {
        style.transform = `rotate(${props.rotate}deg)`
    }

    return style
})
</script>

<style lang="css">
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    display: inline-block;
    transition: transform 0.3s ease;
}

.icon-error {
    font-size: 12px;
    color: #999;
}
</style>
