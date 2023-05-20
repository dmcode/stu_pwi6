import { Link } from 'react-router-dom'

const CurrencyNotFound = ({code}) => {
    return (
        <div className="currency-not-found">
            <h2>Nie mozna pobrać danych</h2>
            <p>Brak danych dla waluty <strong>{code}</strong>. <Link to={"/"}>Wróć na stronę główną</Link></p>
        </div>
    )
}

export default CurrencyNotFound
