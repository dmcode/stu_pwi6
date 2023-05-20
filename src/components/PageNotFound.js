import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h2>Strona nie istnieje</h2>
            <p><Link to={"/"}>Wróć na stronę główną.</Link></p>
        </div>
    )
}

export default PageNotFound
