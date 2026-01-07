

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripID]/index.jsx'
import MyTrips from './my-tips'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
    {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
     path:'/view-trip/:tripID',
    element:<Viewtrip/>
  },
   {
     path:'/my-trips',
    element:<MyTrips/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <react.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </react.StrictMode>,
)
