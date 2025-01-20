/**
 * 切片文件
 * @param file
 * @param chunkSize
 */
export function sliceFile(file: File, chunkSize = 5 * 1024 * 1024) {
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
export const generateFileHash = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 检查已上传分片
 * @param fileHash
 */
/* export async function checkUploadedChunks(fileHash: string) {
    const res = await checkFileChunk({ fileHash })
    return res
} */

/**
 * 合并分片
 * @param fileHash
 * @param totalChunks
 */
/* export async function mergeChunks(fileHash: string, totalChunks: number) {
    const res: any = await mergeFileChunk({ fileHash, totalChunks })
    console.log('res: ', res)
    ElMessage.success(res?.message || res?.error)
} */
