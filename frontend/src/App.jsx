import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Events from './components/Events.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </Router>
    </>
  )
}


export default App
