import "./CurrencyRates.css"
import { memo } from "react"
import { useParams } from 'react-router-dom'
import { useExchangeRatesTableACurrencyTopCountQuery } from "./hooks/query"


const CurrencyRateRow = memo(({data}) => {
    return (
        <tr>
            <td>{data?.effectiveDate}</td>
            <td>{data?.no}</td>
            <td>{data?.mid}</td>
        </tr>
    )
})


const RatesDataTable = memo(({data}) => {
    const rates = data?.rates
    return (
        <table className="rates-datatable">
            <thead>
                <tr>
                    <th>Data</th><th>Nr notowania</th><th>Kurs średni</th>
                </tr>
            </thead>
            <tbody>
                {
                    rates?.map((currency, idx) => <CurrencyRateRow key={idx} data={currency}/>)
                }
            </tbody>
        </table>
    )
})


function CurrencyRates() {
    const { code } = useParams()
    const ratesTopCountQuery = useExchangeRatesTableACurrencyTopCountQuery(code)

    if (ratesTopCountQuery.isError)
        return "brak danych"
    
    if (ratesTopCountQuery.isLoading)
        return "ładowanie"

    const data = ratesTopCountQuery.data

    return (
        <div className="currency-rates">
            <RatesDataTable data={data}/>
        </div>
    )
}

export default CurrencyRates
