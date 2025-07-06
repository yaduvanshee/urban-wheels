import { Routes, Route } from 'react-router-dom'
import ListParking from './ListParking'
import VehiclePage from './VehiclePage'
// import NotFound from '../NotFound'

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListParking />} />
      <Route path="/:parking_id/vehicle" element={<VehiclePage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default AuthRoutes