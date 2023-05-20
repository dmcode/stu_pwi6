import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ExchangeRates from './ExchangeRates'
import CurrencyRates from './CurrencyRates'
import AppProvider from './AppProvider'
import PageNotFound from './components/PageNotFound'


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
      errorElement: <PageNotFound/>,
    },
])


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 6
    },
  },
})

const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 6,
})


function App() {
    return (
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <RouterProvider router={router}/>
          </AppProvider>
        </QueryClientProvider>
    )
}

export default App
