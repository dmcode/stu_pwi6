import "./CurrencyRates.css"
import { memo } from "react"
import { Link, useParams } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useExchangeRatesTableACurrencyTopCountQuery } from "./hooks/query"
import SuspenseContent from "./components/SuspenseContent"
import useTopCount from "./hooks/useTopCount"
import useCodeNavigation from "./hooks/useCodeNavigation"
import CurrencyNotFound from "./components/CurrencyNotFound"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const TOPCOUNT_OPTIONS = ['10', '20', '40', '60', '120']

const SelectTopCount = memo(() => {
    const { code } = useParams()
    const { count, setTopCount } = useTopCount(code)
    return (
        <label className="topcount-selector">
            <span>Pokaz ostatnie</span>
            <select value={count} onChange={(e) => setTopCount(e.target.value)}>
                {
                    TOPCOUNT_OPTIONS.map((value, idx) => <option key={idx} value={value}>{value}</option>)
                }
            </select>
            notowań
        </label>
    )
})


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
        <div className="rates-datatable-container">
            <SelectTopCount/>
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
        </div>
    )
})


const RatesChart = ({data}) => {
    const rates = data?.rates
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Średni kurs ${data?.code} z ostatnich ${rates.length} notowań`,
            },
        },
    }
    const datasets = {
        labels: rates?.map(rate => rate?.effectiveDate),
        datasets: [{
            label: `Średni kurs ${data?.code}`,
            data: rates?.map(rate => rate?.mid),
            borderColor: 'rgb(53, 162, 235)',
            tension: 0.05
        }]
    }
    return (
        <div className="rates-chart">
            <Line options={options} data={datasets}/>
        </div>
    )
}


const LinkNextPrevCode = memo(({code}) => {
    if (!code)
        return <span className="empty-code"></span>
    return <Link to={'/' + code} title={"Przejdź do waluty " + code} className="nav-code">{code}</Link>
})


const CurrencyName = memo(({data}) => {
    const {prev, next} = useCodeNavigation(data?.code)
    return (
        <div className="currency-name">
            <LinkNextPrevCode code={prev}/>
            <span>{data?.code} - {data?.currency}</span>
            <LinkNextPrevCode code={next}/>
        </div>
    )
})


function CurrencyRates() {
    const { code } = useParams()
    const { count } = useTopCount(code)
    const ratesTopCountQuery = useExchangeRatesTableACurrencyTopCountQuery(code, count)

    if (ratesTopCountQuery.isError)
        return <CurrencyNotFound code={code}/>
    
    const data = ratesTopCountQuery.data
    
    return (
        <div className="currency-rates">
            <CurrencyName data={data}/>
            <SuspenseContent isLoading={ratesTopCountQuery.isLoading}>
                <div className="rates-data">
                    <RatesDataTable data={data}/>
                    <RatesChart data={data}/>    
                </div>
            </SuspenseContent>
        </div>
    )
}

export default CurrencyRates
