import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ExchangeRates from './ExchangeRates'
import CurrencyRates from './CurrencyRates'


const router = createBrowserRouter([
    {
      path: "/",
      element: <ExchangeRates/>,
      children: [
        {
          path: "/:code",
          element: <CurrencyRates/>,
        },
      ],
    },
])


const queryClient = new QueryClient()


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
