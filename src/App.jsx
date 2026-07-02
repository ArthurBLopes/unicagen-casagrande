import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import AuthCallback from "./pages/authCallback/AuthCallback";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from './components/shared/Layout';
import Contact from "./pages/contact/Contact";
import TrailsPage from './pages/trails/TrailsPage';
import Profile from './pages/profile/Profile';
import DetailsCourse from './pages/detailsCourse/detailsCourse';

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
            <Route path="/inicio" element={<Home />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/trilhas" element={<TrailsPage />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/curso/:id" element={<DetailsCourse />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
