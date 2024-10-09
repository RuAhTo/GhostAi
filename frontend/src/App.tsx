import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth/AuthProvider"

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
