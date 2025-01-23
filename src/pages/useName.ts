export const useName = async (signal?: AbortSignal): Promise<string> => {
    const response = await fetch('/proxyApi/test/getName', { signal })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.name
}
