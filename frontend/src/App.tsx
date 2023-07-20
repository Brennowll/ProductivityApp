import StateGlobalProvider from "./components/StateGlobalProvider"
import Home from "./components/Home"
import "tailwindcss/tailwind.css"
import "./global.css"

function App() {
  return (
    <StateGlobalProvider>
      <Home />
    </StateGlobalProvider>
  )
}

export default App
