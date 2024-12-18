<template>
    <h3>PDF.js 示例</h3>
    <ElButton @click="handleClick">打开 PDF</ElButton>
    <PDFViewer :fileUrl="pdfUrl" />
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { onMounted, ref } from 'vue'
import pdf from './example.pdf'
import PDFViewer from './PDFViewer.vue'

defineOptions({ name: 'PDFExample' })

const pdfUrl = ref()

onMounted(() => {
    pdfUrl.value = pdf
})
const handleClick = () => {
    window.open(pdfUrl.value)
}
</script>
