import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Footer from './components/Footer'
import States from './pages/States'
import India from './pages/India'
import International from './pages/International'
import Upcomming from './pages/Upcomming'
import StateDetails from './pages/StateDetails'
import ElectionResults from './pages/ElectionResults'
import AddElectionData from './pages/AddElectionData'
import AddUpcommingElection from './pages/AddUpcommingElection'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AddData from './pages/AddData'
import LivePolls from './pages/LivePolls'
import AddPoll from './pages/AddPoll'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<States />} />
          <Route path="/india" element={<India />} />
          <Route path="/international" element={<International />} />
          <Route path="/upcomming" element={<Upcomming />} />
          <Route path='/state-details/:stateName' element={<StateDetails />} />
          <Route path='/election-results' element={<ElectionResults />} />
          <Route path='/election-results/:stateName/:year' element={<ElectionResults />} />
          <Route path='/addElection' element={<AddElectionData />} />
          <Route path='/addUpcommingElection' element={<AddUpcommingElection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/add" element={<AddData/>} />
          <Route path="/live" element={<LivePolls/>} />
          <Route path="/addpoll" element={<AddPoll/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
