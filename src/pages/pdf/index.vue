<template>
    <div>
        <!-- <iframe :src="pdfUrl" frameborder="0" style="width: 100%; height: 800px"></iframe> -->
        <h3>PDF.js 示例</h3>
        <ElButton @click="handleClick">打开 PDF</ElButton>
        <button @click="getIframeDoc">getIframeDoc</button>
        <ElTabs v-model:modelValue="activeName">
            <ElTabPane label="pdf示例1" name="1">
                <Suspense>
                    <template #fallback>
                        <div>pdf加载中...</div>
                    </template>
                    <!-- <Transition name="fade"> -->
                    <PDFViewer :fileUrl="pdfUrl" />
                    <!-- </Transition> -->
                </Suspense>
            </ElTabPane>
            <ElTabPane label="iframe" name="2">
                <!-- <iframe
                    :src="iframeUrl"
                    frameborder="0"
                    style="width: 800px; height: 800px"
                ></iframe> -->
            </ElTabPane>
            <ElTabPane label="iframe with pdfjs" name="3">
                <iframe
                    :src="pdfViewerUrl"
                    ref="iframeRef"
                    frameborder="0"
                    style="width: 800px; height: 800px"
                ></iframe>
            </ElTabPane>
        </ElTabs>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElTabs, ElTabPane } from 'element-plus'
import { defineAsyncComponent, onMounted, ref, useTemplateRef, type DefineComponent } from 'vue'
import pdf from './example.pdf'
// import pdf2 from '/vue-app/pdfjs/web/example2.pdf'
// import PDFViewer from './PDFViewer.vue'
import { loadWithDelay } from '@/router'

const PDFViewer: DefineComponent<{ fileUrl: string }> = defineAsyncComponent(() =>
    loadWithDelay(import('./PDFViewer.vue'), 2000, 'PDFViewer')
)

defineOptions({ name: 'PDFExample' })

const activeName = ref('3')

const pdfUrl = ref(pdf)
// const iframeUrl = `http://172.30.94.56:30880/agent/micro-docqa/pdfjs/web/viewer.html?file=blob%3Ahttp%3A%2F%2F172.30.94.56%3A30880%2F1e25f4d4-105a-4c1e-b865-d8dca6d18413`

const pdf2 = new URL('/pdfjs/web/example2.pdf', import.meta.url).href
const pdfUrl2 = ref(pdf2)
const pdfViewerUrl = ref(`/vue-app/pdfjs/web/viewer.html?file=${pdfUrl2.value}`)

const handleClick = () => {
    window.open(pdfUrl.value)
}

const iframeRef = useTemplateRef('iframeRef')

const getIframeDoc = () => {
    if (iframeRef.value) {
        const iframeDoc = iframeRef.value.contentDocument
        console.group(iframeDoc)
        if (iframeDoc) {
            const textLayer = iframeDoc.querySelector('.textLayer')
            console.log(textLayer)
        }
        console.groupEnd()
    }
}

onMounted(() => {})
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
