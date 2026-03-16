import React from 'react'
import {Button} from './components/ui/button'
import Header from './components/shared/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateTrip from './pages/CreateTrip'
import { Toaster } from 'sonner'
import TripDetails from './pages/TripDetails'
import MyTrips from './pages/MyTrips'

const App = () => {
  return (
    <>
    <Toaster/>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-trip' element={<CreateTrip/>}/>
        <Route path='/trips/:tripId' element={<TripDetails/>}/>
        <Route path='my-trips' element={<MyTrips/>}/>
      </Routes>
    </>
  )
}

export default App
