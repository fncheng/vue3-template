<template>
    <div>
        <h3>pdf预览</h3>
        <canvas ref="canvasRef"></canvas>
        <div style="margin-top: 10px">
            <ElButton @click="handlePreviousPage" :disabled="currentPage <= 1">上一页</ElButton>
            <span style="margin: 0 10px"> 第{{ currentPage }}页/共{{ numPages }}页 </span>
            <ElButton @click="handleNextPage" :disabled="currentPage >= numPages">下一页</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ref, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString()

type PDFViewerProps = {
    fileUrl: string
}

const props = defineProps<PDFViewerProps>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let pdfDoc: pdfjsLib.PDFDocumentProxy // 不能使用响应式变量
const currentPage = ref<number>(1)
const numPages = ref<number>(0)

watch(
    () => props.fileUrl,
    (val) => {
        const loadingTask: pdfjsLib.PDFDocumentLoadingTask = pdfjsLib.getDocument(val)
        loadingTask.promise
            .then((pdf) => {
                console.log('PDF 加载成功:', pdf)

                pdfDoc = pdf
                numPages.value = pdf.numPages
                currentPage.value = 1
                renderPage(currentPage.value).catch((err: any) => {
                    console.log('PDF 渲染失败:', err)
                })
            })
            .catch((err: any) => {
                console.log('PDF 加载失败:', err)
            })
    },
    { immediate: true }
)

const renderPage = async (pageNumber: number) => {
    if (!pdfDoc) return
    const page = await pdfDoc.getPage(pageNumber)
    if (page) {
        const viewport = page.getViewport({ scale: 1 })
        const canvas = canvasRef.value
        if (canvas) {
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            if (context) {
                page.render({
                    canvasContext: context,
                    viewport
                })
            }
        }
    }
}

const handlePreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1
        renderPage(currentPage.value)
    }
}
const handleNextPage = () => {
    if (currentPage.value < numPages.value) {
        currentPage.value += 1
        renderPage(currentPage.value)
    }
}
</script>
