<template>
    <div>
        <h3>PDF.js 示例</h3>
        <ElButton @click="handleClick">打开 PDF</ElButton>
        <Suspense>
            <template #fallback>
                <div>pdf加载中...</div>
            </template>
            <!-- <Transition name="fade"> -->
            <PDFViewer :fileUrl="pdfUrl" />
            <!-- </Transition> -->
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { defineAsyncComponent, ref, type DefineComponent } from 'vue'
import pdf from './example.pdf'
// import PDFViewer from './PDFViewer.vue'
import { loadWithDelay } from '@/router'

const PDFViewer: DefineComponent<{ fileUrl: string }> = defineAsyncComponent(() =>
    loadWithDelay(import('./PDFViewer.vue'), 2000, 'PDFViewer')
)

defineOptions({ name: 'PDFExample' })

const pdfUrl = ref(pdf)

const handleClick = () => {
    window.open(pdfUrl.value)
}
</script>

<style lang="css">
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
