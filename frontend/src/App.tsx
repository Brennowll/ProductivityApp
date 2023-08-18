import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "react-query"
import GlobalStateProvider from "./store/GlobalStateProvider"
import { Layout } from "./pages/(layout)"
import "tailwindcss/tailwind.css"
import "./global.css"
import { queryClient } from "./store/QueryClient"

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </BrowserRouter>
    </GlobalStateProvider>
  )
}

export default App
