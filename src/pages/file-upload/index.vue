<template>
    <!-- <form> -->
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">upload</button>
    <!-- </form> -->
</template>

<script setup lang="ts">
import { checkFileChunk, mergeFileChunk } from '@/api/api'
import axios from 'axios'
import { ref } from 'vue'

defineOptions({ name: 'FileUploadView' })

//#region 文件分片上传
const fileList = ref<File[]>([])

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    console.log('value: ', target.files![0])
    if (target.files && target.files.length > 0) {
        fileList.value = Array.from(target.files)
    }
}

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
 * 生成文件唯一标识
 * @param file
 */
async function generateFileHash(file: File) {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
//#endregion

/**
 * 检查已上传分片
 * @param fileHash
 */
async function checkUploadedChunks(fileHash: string) {
    const res = await checkFileChunk({ fileHash })
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
    file: File,
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

/**
 * 合并分片
 * @param fileHash
 * @param totalChunks
 */
async function mergeChunks(fileHash: string, totalChunks: number) {
    await mergeFileChunk({ fileHash, totalChunks })
}

async function uploadFile(file: File) {
    const chunkSize = 5 * 1024 * 1024 // 5M
    const fileHash = await generateFileHash(file)
    const chunks = sliceFile(file, chunkSize)

    // 检查已上传分片
    const uploadedChunks = await checkUploadedChunks(fileHash)
    // 上传分片
    await uploadChunks(file, chunks, uploadedChunks, fileHash)
    // 合并分片
    await mergeChunks(fileHash, chunks.length)
    console.log('File uploaded successfully!')
}

const handleUpload = () => {
    const file = fileList.value[0]
    uploadFile(file)
}
</script>
