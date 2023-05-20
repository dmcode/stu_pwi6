import { useExchangeRatesTableAQuery } from "./query"


const useCodeNavigation = (code) => {
    const ratesQuery = useExchangeRatesTableAQuery()
    const data = !ratesQuery.isLoading && !ratesQuery.isError ? ratesQuery.data[0] : null
    const index = data?.rates?.findIndex((el) => el.code === code)
    let prev = false
    let next = false
    if (data && index >= 0) {
        prev = index > 0 ? data?.rates[index-1]?.code : false
        next = index < data?.rates?.length - 1 ? data?.rates[index+1]?.code : false
    }
    return {prev, next}
}

export default useCodeNavigation
