import { useQuery } from "@tanstack/react-query"

const API_URL = process.env.REACT_APP_API_URL
const API_URL_EXCHANGERATES_TABLE_A = `${API_URL}exchangerates/tables/a/`

const KEY_EXCHANGERATES = 'exchangerates'


export const useExchangeRatesTableAQuery = () => {
    return useQuery([KEY_EXCHANGERATES, 'a'], async () => {
        const data = await fetch(API_URL_EXCHANGERATES_TABLE_A, {
            headers: {
                "Accept": "application/json",
            },
        }).then(response => response.json())
        return data
    })
}
