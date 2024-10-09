import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth/AuthProvider"
import Game from "./pages/Game"
import './SCSS/index.scss'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Game/>}/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
