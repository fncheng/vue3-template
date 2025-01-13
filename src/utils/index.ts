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
