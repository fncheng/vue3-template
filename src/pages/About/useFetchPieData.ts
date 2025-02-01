export const useFetchPieData = async () => {
    const res = await fetch('/proxyApi/test/getPieData')
    const data = await res.json()
    return data.data
}
