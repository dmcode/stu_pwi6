import "./ExchangeRates.css"
import { memo, useCallback, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import DatePicker from 'react-date-picker'
import { useExchangeRatesTableAQuery } from "./hooks/query"
import { format_date_iso, str_to_date } from "./utils"


const CurrencyRateRow = memo(({data}) => {
    return (
        <tr>
            <td><Link to={data?.code}>{data?.currency}</Link></td>
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


function CurrencyList() {
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
        <div className="currency-list">
            <ExchangeRatesHeader data={data} onDateChange={onDateChange}/>
            <RatesDataTable data={data}/>
        </div>
    )
}


function ExchangeRates() {
    return (
        <div className="exchange-rates">
            <CurrencyList/>
            <Outlet/>
        </div>
    )
}

export default ExchangeRates
