import { BrowserRouter } from "react-router-dom"
import GlobalStateProvider from "./store/GlobalStateProvider"
import { Layout } from "./pages/(layout)"
import "tailwindcss/tailwind.css"
import "./global.css"

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </GlobalStateProvider>
  )
}

export default App
