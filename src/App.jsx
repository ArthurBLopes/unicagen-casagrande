import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import AuthCallback from "./pages/authCallback/AuthCallback";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from './components/shared/Layout';

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
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
