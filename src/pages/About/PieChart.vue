<template>
    <div style="width: 100%; height: 100%" ref="node"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
interface PieChartProps {
    data: any[] | undefined
}
var chart: echarts.ECharts
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'

const { data } = defineProps<PieChartProps>()

const node = useTemplateRef('node')
const option: echarts.EChartsOption = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data
        }
    ]
}

let listener = () => {
    chart.resize()
}

onMounted(() => {
    chart = echarts.init(node.value)
    chart.setOption(option)

    window.addEventListener('resize', listener)
})
onUnmounted(() => {
    console.log('清理')
    window.removeEventListener('resize', listener)
    chart.dispose()
})

watch(
    () => data,
    (newVal) => {
        if (newVal) {
            console.log('执行一次')
            chart.setOption(option)
        }
    }
)
</script>
