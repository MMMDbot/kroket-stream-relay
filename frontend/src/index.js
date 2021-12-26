import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/context/UserState'
import 'bootstrap-dark-5/dist/css/bootstrap-night.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </QueryClientProvider>,
    document.getElementById('root')
)
