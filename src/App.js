import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExchangeRates from './ExchangeRates'


const queryClient = new QueryClient()


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ExchangeRates/>
        </QueryClientProvider>
    )
}

export default App
