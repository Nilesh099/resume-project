import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to dashboard since we're using a simplified approach
    navigate('/dashboard')
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to AI Resume Builder</h1>
        <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}

export default Home
