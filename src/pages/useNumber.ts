export const useNumber = async (signal?: AbortSignal): Promise<number> => {
    const response = await fetch('http://127.0.0.1:3000/test/getNumber', { signal })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.number
}
