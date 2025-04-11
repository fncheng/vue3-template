import { useName } from './useName'
import { useNumber } from './useNumber'
import { queryClient } from '@/main'

export const useFetchData = () => {
    const abortController = new AbortController()
    const { signal } = abortController
    const number = useNumber(signal)
    const name = useName(signal)
    return { number, name, abortController }
}

/**
 * queryClient.fetchQuery 返回promise
 * @returns
 */
export const useFetchDataQueryClient = () => {
    const abortController = new AbortController()
    const { signal } = abortController
    const number = queryClient.fetchQuery({
        queryKey: ['number', new Date()],
        queryFn: () => useNumber(signal),
        staleTime: 3 * 60 * 1000
    })

    const name = queryClient.fetchQuery({
        queryKey: ['name'],
        queryFn: () => useName(signal),
        staleTime: 3 * 60 * 1000
    })

    return { number, name, abortController }
}
