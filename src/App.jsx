import { Routes, Route } from 'react-router-dom'
import Auth from './pages/auth'
import Parking from './pages/parkings'
import NavBar from './components/layout/Navbar'
import UserDashboard from './pages/userdashboard'
import Admin from './pages/admin'
// import Signup from './pages/auth/Signup'
// import Home from './pages/Home'
// import Parking from './pages/Parking'
// import Ride from './pages/Ride'
// import History from './pages/History'
// import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="auth/*" element={<Auth />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="parkings/*" element={<Parking />} />
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  </>
  )
}

export default App