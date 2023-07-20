import GlobalStateProvider from "./store/GlobalStateProvider"
import { Layout } from "./pages/(layout)"
import "tailwindcss/tailwind.css"
import "./global.css"

function App() {
  return (
    <GlobalStateProvider>
      <Layout />
    </GlobalStateProvider>
  )
}

export default App
