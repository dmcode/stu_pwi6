import { useQuery } from "@tanstack/react-query"

const API_URL = process.env.REACT_APP_API_URL
const API_URL_EXCHANGERATES_TABLES = `${API_URL}exchangerates/tables/`

const KEY_EXCHANGERATES = 'exchangerates'


export const useExchangeRatesTablesQuery = (table='a', date=null) => {
    const URL = `${API_URL_EXCHANGERATES_TABLES}${table}/${date?.length > 0 ? `${date}/` : ''}`
    return useQuery([KEY_EXCHANGERATES, table, date], async () => {
        const data = await fetch(URL, {
            headers: {
                "Accept": "application/json",
            },
        }).then(response => response.json())
        return data
    }, {
        retry: false
    })
}


export const useExchangeRatesTableAQuery = (date=null) => {
    return useExchangeRatesTablesQuery('a', date)
}
