import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export function CustomerGuard({children}){const {user}=useAuth();const loc=useLocation()
  return user?.role==='CUSTOMER'?children:<Navigate to="/auth/sign-in" state={{from:loc.pathname,msg:'Please create an account or sign in to continue.'}} replace/>}
export function AdminGuard({children}){const {user}=useAuth()
  return user?.role==='ADMIN'?children:<Navigate to="/admin/sign-in" replace/>}
