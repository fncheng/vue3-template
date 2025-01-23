<template>
    <!-- <form> -->
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">upload chunk</button>
    <button @click="handleUploadSingle">单文件上传</button>
    <!-- </form> -->
    <button @click="handleUploadWebWorker">web Worker上传</button>
    <div class="max-w-[800px] mt-8">
        <ElProgress
            :percentage="percentage"
            :format="(percentage) => `${percentage}%`"
        ></ElProgress>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElProgress } from 'element-plus'
import { checkFileChunk, mergeFileChunk, uploadFileSingle } from '@/api/api'
import axios from 'axios'
import { ref } from 'vue'

defineOptions({ name: 'FileUploadView' })

//#region 文件分片上传
const fileList = ref<File[]>([])
const percentage = ref<number>(0)

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    console.log('value: ', target.files![0])
    if (target.files && target.files.length > 0) {
        fileList.value = Array.from(target.files)
    }
}

const validateFile = () => {
    if (fileList.value.length > 0) {
        return true
    } else {
        ElMessage.error('请先选择文件')
        return false
    }
}

//#region 文件分片
/**
 * 切片文件
 * @param file
 * @param chunkSize
 */
function sliceFile(file: File, chunkSize = 5 * 1024 * 1024) {
    const chunks = []
    let current = 0
    while (current < file.size) {
        const slice = file.slice(current, current + chunkSize)
        chunks.push(slice)
        current += chunkSize
    }
    return chunks
}

/**
 * 合并分片
 * @param fileHash
 * @param fileName
 * @param totalChunks
 */
async function mergeChunks(fileHash: string, fileName: string, totalChunks: number) {
    const res: any = await mergeFileChunk({ fileHash, fileName, totalChunks })
    console.log('res: ', res)
    ElMessage.success(res?.message || res?.error)
}

/**
 * 生成文件唯一标识
 * @param file
 */
async function generateFileHash(file: File) {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 检查已上传分片
 * @param fileHash
 */
async function checkUploadedChunks(fileHash: string, fileName: string) {
    const res = await checkFileChunk({ fileHash, fileName })
    return res
}

/**
 * 上传分片
 * @param file
 * @param chunks
 * @param uploadedChunks
 * @param fileHash
 */
async function uploadChunks(
    chunks: Blob[],
    uploadedChunks: number[] | undefined,
    fileHash: string
) {
    for (let i = 0; i < chunks.length; i++) {
        if (uploadedChunks && uploadedChunks.includes(i)) {
            console.log(`Chunk ${i} already uploaded, skipping...`)
            continue
        }
        console.log('chunks: ', chunks)
        const formData = new FormData()
        formData.append('chunk', chunks[i])
        formData.append('chunkIndex', String(i))
        formData.append('fileHash', fileHash)

        await axios.post('http://127.0.0.1:3000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    console.log(
                        `Chunk ${i} progress: ${Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        )}%`
                    )
                }
            }
        })
    }
}

async function uploadFile(file: File) {
    const chunkSize = 5 * 1024 * 1024 // 5M
    const fileHash = await generateFileHash(file)
    const chunks = sliceFile(file, chunkSize)
    checkChunkThenUpload(chunks, fileHash)
}

const checkChunkThenUpload = async (chunks: Blob[], hash: string) => {
    // 检查已上传分片
    const uploadedChunks: any = await checkUploadedChunks(hash, fileList.value[0].name)
    console.group('uploadedChunks: ', uploadedChunks)
    if (!Array.isArray(uploadedChunks) && uploadedChunks?.message) {
        ElMessage.success(uploadedChunks?.message)
        return
    } else {
        startChunkUpload(chunks, uploadedChunks, hash)
    }
}

/**
 * 开始切片上传
 */
const startChunkUpload = async (chunks: Blob[], existedChunks: number[], hash: string) => {
    console.group('开始切片上传')
    // 上传分片
    await uploadChunks(chunks, existedChunks, hash)
    // 合并分片
    await mergeChunks(hash, fileList.value[0].name, chunks.length)
    console.log('File uploaded successfully!')
}

const handleUpload = () => {
    if (!validateFile()) return
    const file = fileList.value[0]
    uploadFile(file)
}
//#endregion

/**
 * 单文件上传
 */
const handleUploadSingle = () => {
    if (!validateFile()) return
    const file = fileList.value[0]
    const formData = new FormData()
    formData.append('file', file)
    uploadFileSingle(formData, (progressEvent: ProgressEvent) => {
        if (progressEvent.total) {
            percentage.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            console.log(
                `File Upload progress: ${Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                )}%`
            )
        }
    }).then((res: any) => {
        console.log('res: ', res)
        ElMessage.success(res?.message || res?.error)
    })
}

//#region Web Worker上传
import MyWorker from './worker.ts?worker'
const worker = new MyWorker()
const fileHash = ref('')
const chunks = ref<Blob[]>([])
const uploadedChunks = ref<number[]>([])
worker.onmessage = async (e: MessageEvent) => {
    console.log('e****: ', e)
    const { type, data } = e.data
    if (type === 'slice') {
        console.log('Received slice data:', data)
        chunks.value = data
        startChunkUpload(data, uploadedChunks.value, fileHash.value)
    }
}

const handleUploadWebWorker = async () => {
    if (!validateFile()) return
    const file = fileList.value[0]
    const hash = await generateFileHash(file)
    const uploadedChunks: any = await checkUploadedChunks(hash, file.name)
    console.group('uploadedChunks: ', uploadedChunks)
    if (!Array.isArray(uploadedChunks) && uploadedChunks?.message) {
        ElMessage.success(uploadedChunks?.message)
        return
    } else {
        const file = fileList.value[0]
        fileHash.value = hash
        uploadedChunks.value = uploadedChunks
        worker.postMessage({ type: 'processFile', data: file })
    }
}
//#endregion
</script>
