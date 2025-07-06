import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
// import NotFound from '../NotFound'

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Signup />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default AuthRoutes