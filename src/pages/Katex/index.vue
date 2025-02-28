<template>
    <!-- <div ref="mathContainer" v-html="renderContent"></div> -->
    <!-- <div class="markdown__container" v-html="markdownContent"></div> -->
    <component :is="KatexComponent" :content="content"></component>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import KatexComponent from './KatexComponent.vue'
import { marked } from 'marked'

const mathContainer = useTemplateRef('mathContainer')

const content = ref(
    `**欧拉公式**（Euler's Formula）是复分析和复数理论中的一个基础公式，它将复指数函数与三角函数之间建立了联系。其形式为：\n\n\\[\ne^{ix} = \\cos(x) + i \\sin(x)\n\\]\n\n其中：\n- \\( e \\) 是自然对数的底数，约等于 2.71828。\n- \\( i \\) 是虚数单位，满足 \\( i^2 = -1 \\)。\n- \\( x \\) 是实数。\n\n### 欧拉公式的含义\n欧拉公式揭示了复数指数形式和三角函数的关系。特别地：\n- \\( \\cos(x) \\) 是复指数函数的**实部**。\n- \\( \\sin(x) \\) 是复指数函数的**虚部**。\n\n### 欧拉公式的推导\n\n欧拉公式的推导通常是通过级数展开。首先，考虑自然指数函数、余弦函数和正弦函数的泰勒级数展开：\n\n- **自然指数函数** \\( e^x \\) 的泰勒级数：\n  \\[\n  e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots\n  \\]\n\n- **余弦函数** \\( \\cos(x) \\) 的泰勒级数...`
)

const markdownContent = computed(() => {
    return marked(content.value)
})

const transformedContent = computed(() => {
    return content.value
        .replace(/\\\[((.|\n)+?)\\\]/g, '$$$1$$$')
        .replace(/\\\((.+?)\\\)/g, '$$$1$$$')
})

const renderContent = computed(() => {
    if (mathContainer.value) {
        // console.log('transformedContent.value: ', transformedContent.value)
        const katexStr = katex.renderToString(transformedContent.value, {
            displayMode: true,
            throwOnError: true,
            trust: true
        })
        return marked(katexStr)
    }
    return content.value
})

onMounted(() => {
    // if (mathContainer.value) {
    //     katex.render(content.value, mathContainer.value)
    // }
})
</script>
