import { useQuery } from "@tanstack/react-query"

const API_URL = process.env.REACT_APP_API_URL
const API_URL_EXCHANGERATES_TABLES = `${API_URL}exchangerates/tables/`
const API_URL_EXCHANGERATES_RATES = `${API_URL}exchangerates/rates/`

const KEY_TABLES = 'tables'
const KEY_RATES = 'rates'


export const useExchangeRatesTablesQuery = (table='a', date=null) => {
    const URL = `${API_URL_EXCHANGERATES_TABLES}${table}/${date?.length > 0 ? `${date}/` : ''}`
    return useQuery([KEY_TABLES, table, date], async () => {
        const data = await fetch(URL, {
            headers: {
                "Accept": "application/json",
            },
        }).then(response => response.json())
        return data
    }, {
        retry: false,
        staleTime: 10 * 60 * 1000,
    })
}


export const useExchangeRatesTableAQuery = (date=null) => {
    return useExchangeRatesTablesQuery('a', date)
}


export const useExchangeRatesCurrencyTopCountQuery = (table='a', code, topCount=10) => {
    const URL = `${API_URL_EXCHANGERATES_RATES}${table}/${code}/last/${topCount}/`
    return useQuery([KEY_RATES, table, code, topCount], async () => {
        const data = await fetch(URL, {
            headers: {
                "Accept": "application/json",
            },
        }).then(response => response.json())
        return data
    }, {
        retry: false,
        staleTime: 10 * 60 * 1000,
    })
}


export const useExchangeRatesTableACurrencyTopCountQuery = (code, topCount=10) => {
    return useExchangeRatesCurrencyTopCountQuery('a', code, topCount)
}
