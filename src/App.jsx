import { Outlet } from 'react-router-dom'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}

export default App
