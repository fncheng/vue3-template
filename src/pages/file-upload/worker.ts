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

self.addEventListener('message', async (e) => {
    console.log('im worker', e)
    const { type, data: file } = e.data
    if (type === 'processFile') {
        const chunks = sliceFile(file)
        self.postMessage({ type: 'slice', data: chunks })
    }
})
