import "./ExchangeRates.css"
import { memo, useCallback, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import DatePicker from 'react-date-picker'
import { useExchangeRatesTableAQuery } from "./hooks/query"
import { format_date_iso, str_to_date } from "./utils"
import SuspenseContent from "./components/SuspenseContent"


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


const ExchangeRatesPicker = memo(({data, onDateChange}) => {
    const { no="brak danych", effectiveDate=null } = data
    const date = str_to_date(effectiveDate)
    return (
        <div className="rates-picker">
            <span>Tabela nr {no} z dnia</span> 
            <DatePicker onChange={onDateChange} value={date} maxDate={new Date()}/>
        </div>
    )
})


const CurrencyListHeader = memo(() => <header><Link to={"/"}>Średnie kursy walut NBP</Link></header>) 

const RatesQueryError = ({isError, ratesDate, onDateChange, children}) => {
    if (!isError)
        return children
        const date = str_to_date(ratesDate)
    return (
        <div className="rates-query-error">
            <p>Brak notowania dla wybranego dnia.</p>
            <div>
                <span>Spróbuj wybrać inny dzień </span>
                <DatePicker onChange={onDateChange} value={date} maxDate={new Date()}/>
            </div>
        </div>
    )
}


function CurrencyList() {
    const [ratesDate, setRatesDate] = useState(null)
    const ratesQuery = useExchangeRatesTableAQuery(ratesDate)

    const onDateChange = useCallback((value) => {
        setRatesDate(format_date_iso(value))
    }, [setRatesDate])

    const data = !ratesQuery.isLoading && !ratesQuery.isError ? ratesQuery.data[0] : null

    return (
        <div className="currency-list">
            <CurrencyListHeader/>
            <SuspenseContent isLoading={ratesQuery.isLoading}>
                <RatesQueryError isError={ratesQuery.isError} ratesDate={ratesDate} onDateChange={onDateChange}>
                <div className="currency-list-body">
                    <ExchangeRatesPicker data={data} onDateChange={onDateChange}/>
                    <RatesDataTable data={data}/>
                </div>
                </RatesQueryError>
            </SuspenseContent>
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
