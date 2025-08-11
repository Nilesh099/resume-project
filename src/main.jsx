import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import Dashboard from './dashboard/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dashboard/resume/:resumeId/edit', element: <EditResume /> },
    ],
  },

  { path: '/my-resume/:resumeId/view', element: <ViewResume /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
)
