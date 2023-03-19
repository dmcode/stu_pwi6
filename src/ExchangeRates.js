import { memo, useCallback, useState } from "react"
import DatePicker from 'react-date-picker'
import { useExchangeRatesTableAQuery } from "./hooks/query"
import { format_date_iso, str_to_date } from "./utils"


const CurrencyRateRow = memo(({data}) => {
    return (
        <tr>
            <td>{data?.currency}</td>
            <td>{data?.code}</td>
            <td>{data?.mid}</td>
        </tr>
    )
})


const RatesDataTable = memo(({data}) => {
    return (
        <table className="rates-datatable">
            <thead>
                <tr>
                    <th>Waluta</th><th>Symbol</th><th>Kurs średni</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.rates?.map((currency, idx) => <CurrencyRateRow key={idx} data={currency}/>)
                }
            </tbody>
        </table>
    )
})


const ExchangeRatesHeader = memo(({data, onDateChange}) => {
    const { no="brak danych", effectiveDate=null } = data
    const date = str_to_date(effectiveDate)
    return (
        <header>
            Średnie kursy walut NBP
            <div>
                <span>Tabela nr {no} z dnia</span> 
                <DatePicker onChange={onDateChange} value={date} maxDate={new Date()}/>
            </div>
        </header>
    )
})


function ExchangeRates() {
    const [ratesDate, setRatesDate] = useState(null)
    const ratesQuery = useExchangeRatesTableAQuery(ratesDate)

    const onDateChange = useCallback((value) => {
        setRatesDate(format_date_iso(value))
    }, [setRatesDate])

    if (ratesQuery.isError)
        return "brak danych"
    
    if (ratesQuery.isLoading)
        return "ładowanie"

    const data = ratesQuery.data[0]

    return (
        <section className="exchange-rates">
            <ExchangeRatesHeader data={data} onDateChange={onDateChange}/>
            <RatesDataTable data={data}/>
        </section>
    )
}

export default ExchangeRates
