import { useName } from './useName'
import { useNumber } from './useNumber'

export const useFetchData = () => {
    const abortController = new AbortController()
    const { signal } = abortController
    const number = useNumber(signal)
    const name = useName(signal)
    return { number, name, abortController }
}
