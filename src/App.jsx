import { useState } from 'react'
import './App.css'
import { Route } from 'react-router'
import { BrowserRouter as Router, Routes } from 'react-router'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import AuthCallback from "./pages/AuthCallback/AuthCallback";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App
