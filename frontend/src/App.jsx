import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AllUsers from './components/AllUsers'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/all-users" element={<AllUsers />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App