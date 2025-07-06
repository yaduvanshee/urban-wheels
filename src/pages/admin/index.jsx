import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import VehiclePage from './VehiclePage'
import ParkingPlotStats from './ParkingPlotStats'
import PriceDashboard from './PriceDashboard'

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path='/vehicles' element={<VehiclePage/>} />
      <Route path='/parking-plot-stats' element={<ParkingPlotStats/>} />
      <Route path='/edit-pricing' element={<PriceDashboard/>} />
    </Routes>
  )
}

export default AuthRoutes