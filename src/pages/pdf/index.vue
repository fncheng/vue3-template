<template>
    <div>
        <h3>PDF.js 示例</h3>
        <ElButton @click="handleClick">打开 PDF</ElButton>
        <Suspense>
            <template #fallback>
                <div>pdf加载中...</div>
            </template>
            <template #default>
                <PDFViewer :fileUrl="pdfUrl" />
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { defineAsyncComponent, ref } from 'vue'
import pdf from './example.pdf'
// import PDFViewer from './PDFViewer.vue'
import { loadWithDelay } from '@/router'

const PDFViewer = defineAsyncComponent(() =>
    loadWithDelay(import('./PDFViewer.vue'), 2000, 'PDFViewer')
)

defineOptions({ name: 'PDFExample' })

const pdfUrl = ref(pdf)

const handleClick = () => {
    window.open(pdfUrl.value)
}
</script>
