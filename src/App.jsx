import { useState } from 'react'
import './App.css'
import { Route } from 'react-router'
import { BrowserRouter as Router, Routes } from 'react-router'
import Login from './pages/Login/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
