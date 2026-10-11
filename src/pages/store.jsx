import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useData } from '../context/DataContext'; import { useAuth } from '../context/AuthContext'
import { naira, calcTotals } from '../utils/format'
import heroImg from '../assets/kh-editorial-1.jpg'

export function Home(){const {db}=useData();const feat=db.products.filter(p=>p.featured&&p.status==='Active').slice(0,4)
 return(<><section className="bg-obsidian text-ivory"><div className="max-w-7xl mx-auto px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
  <div><p className="text-gold tracking-[0.4em] text-xs mb-4">AFRICAN LUXURY</p><h1 className="font-display text-5xl md:text-7xl leading-tight">Worn with quiet confidence.</h1>
  <div className="mt-8 flex gap-3"><Link className="btn bg-gold" to="/shop">Shop Collection</Link><Link className="btn-outline border-ivory text-ivory" to="/shop">Explore</Link></div></div>
  <img alt="" className="w-full aspect-[4/5] object-cover" src={heroImg}/></div></section>
  <section className="max-w-7xl mx-auto px-4 py-16"><h2 className="font-display text-3xl mb-6">Featured</h2><Grid items={feat}/></section></>)}

function Grid({items}){return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map(p=>(
 <Link key={p.id} to={`/product/${p.slug}`} className="group"><img alt={p.name} src={p.images[0]} className="aspect-[4/5] w-full object-cover"/>
 <p className="mt-2 text-sm">{p.name}</p><p className="text-xs text-espresso">{naira(p.price)}{p.stock===0&&' · Sold out'}</p></Link>))}</div>}

export function Shop(){const {db}=useData();const {slug}=useParams();const [q,setQ]=useState('');const [sort,setSort]=useState('featured');const [max,setMax]=useState(100000);const [page,setPage]=useState(1)
 const cat=slug&&db.categories.find(c=>c.slug===slug)
 const list=useMemo(()=>{let r=db.products.filter(p=>p.status==='Active'&&(!cat||p.categoryId===cat.id)&&p.name.toLowerCase().includes(q.toLowerCase())&&p.price<=max)
  const s={newest:(a,b)=>b.createdAt.localeCompare(a.createdAt),asc:(a,b)=>a.price-b.price,desc:(a,b)=>b.price-a.price,popular:(a,b)=>b.popularity-a.popularity,featured:(a,b)=>b.featured-a.featured}
  return r.sort(s[sort])},[db.products,cat,q,max,sort])
 const reset=()=>{setQ('');setMax(100000);setSort('featured')}
 return(<div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display text-4xl mb-6">{cat?cat.name:'Shop All'}</h1>
  <div className="flex flex-wrap gap-3 mb-6"><input aria-label="Search" className="input max-w-xs" placeholder="Search" value={q} onChange={e=>{setQ(e.target.value);setPage(1)}}/>
   <select aria-label="Sort" className="input max-w-[180px]" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="asc">Price ↑</option><option value="desc">Price ↓</option><option value="popular">Popular</option></select>
   <label className="text-sm flex items-center gap-2">Max {naira(max)}<input type="range" min="10000" max="100000" step="2000" value={max} onChange={e=>setMax(+e.target.value)}/></label>
   <button className="btn-outline" onClick={reset}>Clear</button></div>
  <p className="text-sm mb-4">{list.length} results</p>
  {list.length?<><Grid items={list.slice(0,page*8)}/>{list.length>page*8&&<div className="text-center mt-8"><button className="btn-outline" onClick={()=>setPage(page+1)}>Load more</button></div>}</>:<p className="py-20 text-center">No products found.</p>}</div>)}

export function Product(){const {slug}=useParams();const {db,update}=useData();const {user}=useAuth();const nav=useNavigate()
 const p=db.products.find(x=>x.slug===slug);const [size,setSize]=useState('');const [color,setColor]=useState('');const [qty,setQty]=useState(1);const [img,setImg]=useState(0)
 if(!p) return <NotFound/>
 const reviews=db.reviews.filter(r=>r.productId===p.id&&r.status==='Approved')
 const add=()=>{ if(!user) return nav('/auth/sign-in',{state:{from:`/product/${slug}`,msg:'Please create an account or sign in to continue.'}})
  if(!size||!color) return toast.error('Select size and colour')
  if(qty<1||qty>p.stock) return toast.error(`Only ${p.stock} in stock`)
  update('cart',c=>[...c,{key:Date.now(),productId:p.id,name:p.name,image:p.images[0],price:p.price,qty,size,color}]);toast.success('Added to cart')}
 return(<div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10"><div><img alt={p.name} src={p.images[img]} className="w-full aspect-[4/5] object-cover"/>
  <div className="flex gap-2 mt-2">{p.images.map((s,i)=><button key={i} aria-label={`Image ${i+1}`} onClick={()=>setImg(i)} className={`w-16 border ${i===img?'border-gold':'border-sand'}`}><img alt="" src={s}/></button>)}</div></div>
  <div><h1 className="font-display text-4xl">{p.name}</h1><p className="my-2">{naira(p.price)}</p><p className="text-sm mb-4">{p.description}</p>
   <div className="flex gap-2 mb-3">{p.sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={`px-3 py-1 border ${size===s?'border-gold bg-gold/10':'border-sand'}`}>{s}</button>)}</div>
   <div className="flex gap-2 mb-3">{p.colors.map(c=><button key={c} onClick={()=>setColor(c)} className={`px-3 py-1 border text-sm ${color===c?'border-gold bg-gold/10':'border-sand'}`}>{c}</button>)}</div>
   <input type="number" aria-label="Quantity" className="input w-24 mb-4" min="1" value={qty} onChange={e=>setQty(+e.target.value)}/>
   <p className="text-xs mb-3">{p.stock?`${p.stock} in stock`:'Out of stock'}</p>
   <button className="btn" disabled={!p.stock} onClick={add}>Add to cart</button>
   <h2 className="font-display text-2xl mt-10 mb-2">Reviews</h2>{reviews.length?reviews.map(r=><p key={r.id} className="text-sm">{'★'.repeat(r.rating)} {r.text} <i>— {r.name}</i></p>):<p className="text-sm">No reviews yet.</p>}</div></div>)}

export function Cart(){const {db,update}=useData();const t=calcTotals(db.cart,db.settings)
 if(!db.cart.length) return <div className="py-24 text-center"><p className="font-display text-3xl mb-4">Your cart is empty</p><Link to="/shop" className="btn">Continue shopping</Link></div>
 return(<div className="max-w-4xl mx-auto px-4 py-10"><h1 className="font-display text-4xl mb-6">Cart</h1>
  {db.cart.map(i=><div key={i.key} className="flex gap-4 py-3 border-b border-sand items-center"><img alt="" src={i.image} className="w-16"/><div className="flex-1 text-sm">{i.name}<br/><span className="text-xs">{i.size} · {i.color}</span></div>
   <input aria-label="Quantity" type="number" min="1" className="input w-20" value={i.qty} onChange={e=>{const v=+e.target.value;if(v>=1)update('cart',c=>c.map(x=>x.key===i.key?{...x,qty:v}:x))}}/>
   <span className="w-24 text-right text-sm">{naira(i.price*i.qty)}</span><button className="text-xs underline" onClick={()=>update('cart',c=>c.filter(x=>x.key!==i.key))}>Remove</button></div>)}
  <dl className="mt-6 ml-auto max-w-xs text-sm space-y-1"><div className="flex justify-between"><dt>Subtotal</dt><dd>{naira(t.subtotal)}</dd></div><div className="flex justify-between"><dt>VAT ({db.settings.vatRate}%)</dt><dd>{naira(t.vat)}</dd></div><div className="flex justify-between"><dt>Delivery</dt><dd>{naira(t.delivery)}</dd></div><div className="flex justify-between font-medium"><dt>Total</dt><dd>{naira(t.total)}</dd></div></dl></div>)}

function AuthForm({admin,signup}){const {signIn,signUp}=useAuth();const nav=useNavigate();const {state}=useLocation();const [err,setErr]=useState('')
 const submit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));setErr('')
  try{ if(signup){ if(f.password.length<8||f.password!==f.confirm) throw new Error('Password must be 8+ characters and match'); signUp(f);nav(state?.from||'/') }
   else{const u=signIn(f.email,f.password,admin);nav(u.role==='ADMIN'?'/admin/dashboard':state?.from||'/')}}catch(x){setErr(x.message)}}
 return(<form onSubmit={submit} className="max-w-sm mx-auto py-20 px-4 space-y-3"><h1 className="font-display text-4xl">{admin?'Admin sign in':signup?'Create account':'Sign in'}</h1>
  {state?.msg&&<p className="text-sm text-espresso">{state.msg}</p>}
  {signup&&<><input name="name" required className="input" placeholder="Full name"/><input name="phone" required className="input" placeholder="Phone"/></>}
  <input name="email" type="email" required className="input" placeholder="Email"/><input name="password" type="password" required className="input" placeholder="Password"/>
  {signup&&<input name="confirm" type="password" required className="input" placeholder="Confirm password"/>}
  {err&&<p role="alert" className="text-sm text-red-700">{err}</p>}<button className="btn w-full">Continue</button>
  <p className="text-xs">Demo only: {admin?'admin@khluxury.demo / Admin123!':'amara@demo.test / Customer123! (or sign up)'}</p>
  {!admin&&<Link className="text-xs underline" to={signup?'/auth/sign-in':'/auth/sign-up'}>{signup?'Have an account? Sign in':'New here? Create account'}</Link>}</form>)}
export const SignIn=()=><AuthForm/>; export const SignUp=()=><AuthForm signup/>; export const AdminSignIn=()=><AuthForm admin/>
export const NotFound=()=><div className="py-32 text-center"><h1 className="font-display text-5xl mb-4">Page not found</h1><Link to="/" className="btn">Home</Link></div>
