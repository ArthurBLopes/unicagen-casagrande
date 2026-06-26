import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login replace />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
