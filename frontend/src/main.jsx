
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { BrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budgets'
import Transaction from './pages/Transactions'
import Register from './pages/Register'
import Settings from './pages/Setting.jsx'
import Landing from './pages/Landing'
import { AuthProvider } from './auth/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import PublicRoute from './auth/PublicRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthProvider><Layout /></AuthProvider>}>

      <Route element={<PublicRoute />}>
        <Route path="" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="budgets" element={<Budget />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Route>

  )
)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>          
    <GoogleOAuthProvider clientId="885342579850-13pvar6a6aqusl17lid8u0vfcvp0orfq.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
