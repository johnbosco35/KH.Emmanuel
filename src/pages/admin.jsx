import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import { useData } from '../context/DataContext'; import { useAuth } from '../context/AuthContext'; import { naira } from '../utils/format'
export function AdminLayout(){const {signOut}=useAuth();const nav=useNavigate()
 const l=['dashboard','products','settings/brand']
 return(<div className="min-h-screen md:flex"><aside className="md:w-56 bg-obsidian text-ivory p-4"><p className="font-display tracking-[0.3em] mb-4">KH ADMIN</p>
  <nav className="flex md:flex-col gap-3 text-sm">{l.map(x=><NavLink key={x} to={`/admin/${x}`} className={({isActive})=>isActive?'text-gold':''}>{x}</NavLink>)}<button className="text-left" onClick={()=>{signOut();nav('/admin/sign-in')}}>Sign out</button></nav></aside>
  <main className="flex-1 p-6"><Outlet/></main></div>)}
export function Dashboard(){const {db}=useData();const paid=db.payments.filter(p=>p.status==='Paid')
 const cards=[['Products',db.products.length],['Customers',db.customers.length],['Orders',db.orders.length],['Pending payments',db.payments.filter(p=>p.status==='Pending Verification').length],['Revenue',naira(paid.reduce((a,p)=>a+p.amount,0))]]
 const by=Object.entries(db.orders.reduce((a,o)=>({...a,[o.status]:(a[o.status]||0)+1}),{})).map(([name,count])=>({name,count}))
 return(<div><h1 className="font-display text-3xl mb-4">Dashboard <span className="text-xs">(demonstration data)</span></h1>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">{cards.map(([k,v])=><div key={k} className="bg-white border border-sand p-4"><p className="text-xs">{k}</p><p className="text-xl">{v}</p></div>)}</div>
  <div className="h-64 bg-white border border-sand p-2"><ResponsiveContainer><BarChart data={by}><XAxis dataKey="name"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" fill="#B89B5E"/></BarChart></ResponsiveContainer></div></div>)}
export function AdminProducts(){const {db,update}=useData()
 const del=p=>{if(window.confirm(`Delete ${p.name}?`)){update('products',l=>l.filter(x=>x.id!==p.id));toast.success('Product deleted')}}
 return(<div><h1 className="font-display text-3xl mb-4">Products ({db.products.length})</h1><div className="overflow-x-auto"><table className="w-full text-sm bg-white"><tbody>
  {db.products.map(p=><tr key={p.id} className="border-b border-sand"><td className="p-2">{p.id}</td><td>{p.name}</td><td>{naira(p.price)}</td><td>{p.stock}</td><td><button className="underline" onClick={()=>del(p)}>Delete</button></td></tr>)}</tbody></table></div></div>)}
export function AdminSettings(){const {reset}=useData()
 return(<div><h1 className="font-display text-3xl mb-4">Settings</h1><button className="btn" onClick={()=>{reset();toast.success('Demo data reset')}}>Reset demo data</button></div>)}
