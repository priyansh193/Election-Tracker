import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Footer from './components/Footer'
import States from './pages/States'
import India from './pages/India'
import Internationsl from './pages/Internationsl'
import Upcomming from './pages/Upcomming'
import StateDetails from './pages/StateDetails'
import ElectionResults from './pages/ElectionResults'  // Add this import
import AddElectionData from './pages/AddElectionData'

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/states" element={<States/>}/> 
        <Route path="/india" element={<India/>}/> 
        <Route path="/international" element={<Internationsl/>}/> 
        <Route path="/upcomming" element={<Upcomming/>}/> 
        <Route path='/state-details/:stateName' element={<StateDetails/>}/>
        <Route path='/election-results' element={<ElectionResults/>}/>  {/* Add this route */}
        <Route path='/election-results/:stateName/:year' element={<ElectionResults/>}/>  {/* Add this route */}
        <Route path='/add' element={<AddElectionData/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
