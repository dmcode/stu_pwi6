import { memo } from "react"
import { useExchangeRatesTableAQuery } from "./hooks/query"


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


const ExchangeRatesHeader = memo(({data}) => {
    const { no="brak danych", effectiveDate="brak danych" } = data
    return (
        <header>
            Średnie kursy walut NBP
            <div>
                Tabela nr {no} z dnia {effectiveDate}
            </div>
        </header>
    )
})


function ExchangeRates() {
    const ratesQuery = useExchangeRatesTableAQuery()

    if (ratesQuery.isLoading || ratesQuery.isError)
        return null

    const data = ratesQuery.data[0]

    return (
        <section className="exchange-rates">
            <ExchangeRatesHeader data={data}/>
            <RatesDataTable data={data}/>
        </section>
    )
}

export default ExchangeRates
