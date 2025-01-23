export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const asyncInterval = (callback: () => Promise<void>, ms: number) => {
    let timeoutId: number
    const executeCallback = async () => {
        try {
            await callback()
        } catch (error) {
            console.error(error)
        } finally {
            timeoutId = setTimeout(executeCallback, ms)
        }
    }
    executeCallback()
    return () => clearTimeout(timeoutId)
}

export const pLimit = (max: number) => {
    const queue: Array<() => Promise<any>> = []
    let currentRequests = 0
    const runTask = async (task: () => Promise<any>) => {
        currentRequests++
        try {
            await task()
        } catch (error) {
            console.log('error: ', error)
        } finally {
            currentRequests--
            if (queue.length > 0) {
                const nextTask = queue.shift()
                nextTask && runTask(nextTask)
            }
        }
    }
    const enqueueTask = async (task: () => Promise<any>) => {
        if (currentRequests < max) {
            return runTask(task)
        } else {
            queue.push(task)
        }
    }
    return enqueueTask
}

/**
 * 创建一个定时器，每隔ms执行一遍cb，不会立即执行cb
 * @param cb - 回调函数
 * @param ms - 每隔多少毫秒执行一次
 * @returns 返回一个取消定时器的函数
 */
export const mySetInterval = (cb: () => void, ms: number) => {
    let timeoutId: number
    const excute = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        try {
            cb()
            timeoutId = setTimeout(excute, ms)
        } catch (e) {
            console.error(e)
        }
    }
    // timeoutId = setTimeout(excute, ms)
    excute()
    return () => clearTimeout(timeoutId)
}
