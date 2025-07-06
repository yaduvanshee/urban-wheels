import { Routes, Route } from 'react-router-dom'
import UserDashboard from './UserDashboard'

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  )
}

export default AuthRoutes