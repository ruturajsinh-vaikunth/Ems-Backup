// import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Unauthorized from '../components/Unauthorized'
const ProtectedRoute = () => {
  // const { userInfo } = useSelector((state) => state.auth)
  const token = localStorage.getItem('userToken')

  // show unauthorized screen if no user is found in redux store
  if (!token) {
    return (
        <Unauthorized/>
    )
  }

  return <Outlet />
}

export default ProtectedRoute