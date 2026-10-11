import { Routes, Route } from 'react-router-dom'
import { CustomerGuard, AdminGuard } from './routes/Guards'
import Layout from './components/Layout'
import { Home, Shop, Product, Cart, SignIn, SignUp, AdminSignIn, NotFound } from './pages/store'
import { AdminLayout, Dashboard, AdminProducts, AdminSettings } from './pages/admin'
export default function App(){return(<Routes>
 <Route element={<Layout/>}>
  <Route index element={<Home/>}/><Route path="shop" element={<Shop/>}/><Route path="category/:slug" element={<Shop/>}/>
  <Route path="product/:slug" element={<Product/>}/><Route path="cart" element={<CustomerGuard><Cart/></CustomerGuard>}/>
  <Route path="auth/sign-in" element={<SignIn/>}/><Route path="auth/sign-up" element={<SignUp/>}/><Route path="admin/sign-in" element={<AdminSignIn/>}/>
 </Route>
 <Route path="admin" element={<AdminGuard><AdminLayout/></AdminGuard>}>
  <Route path="dashboard" element={<Dashboard/>}/><Route path="products" element={<AdminProducts/>}/><Route path="settings/brand" element={<AdminSettings/>}/>
 </Route>
 <Route path="*" element={<NotFound/>}/></Routes>)}
