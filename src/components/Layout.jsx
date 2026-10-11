import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, User } from 'lucide-react'
import { useData } from '../context/DataContext'; import { useAuth } from '../context/AuthContext'
export default function Layout(){const {db}=useData();const {user,signOut}=useAuth();const nav=useNavigate()
 return(<div className="min-h-screen flex flex-col">
 <header className="sticky top-0 z-30 bg-ivory/95 backdrop-blur border-b border-sand"><nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
  <Link to="/" className="font-display text-2xl tracking-[0.3em]">KH LUXURY</Link>{/* TODO: official logo in src/assets */}
  <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest"><Link to="/shop">Shop</Link><Link to="/category/blank-tees">Customize</Link></div>
  <div className="flex gap-4 items-center"><span className="relative"><Heart size={20} aria-label="Wishlist"/>{db.wishlist.length>0&&<b className="absolute -top-2 -right-2 text-[10px] bg-gold text-white rounded-full px-1">{db.wishlist.length}</b>}</span>
   <Link to="/cart" aria-label="Cart" className="relative"><ShoppingBag size={20}/>{db.cart.length>0&&<b className="absolute -top-2 -right-2 text-[10px] bg-gold text-white rounded-full px-1">{db.cart.length}</b>}</Link>
   {user?<button onClick={()=>{signOut();nav('/')}} className="text-xs uppercase">Sign out</button>:<Link to="/auth/sign-in" aria-label="Account"><User size={20}/></Link>}</div></nav></header>
 <main className="flex-1"><Outlet/></main>
 <footer className="bg-obsidian text-ivory text-center text-xs py-10 tracking-widest">© KH LUXURY · Demo storefront, mock data only</footer></div>)}
