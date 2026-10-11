import { createContext, useContext, useState } from 'react'
import { useData } from './DataContext'
import { admin, demoPasswords } from '../data/seed'
const Ctx=createContext(); export const useAuth=()=>useContext(Ctx)
export function AuthProvider({children}){
  const {db,update}=useData()
  const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('kh_session')||'null'))
  const start=u=>{const s={id:u.id,role:u.role};localStorage.setItem('kh_session',JSON.stringify(s));setUser(s);return s}
  const signIn=(email,pw,wantAdmin)=>{ if(wantAdmin){ if(email===admin.email&&pw===demoPasswords[email]) return start(admin); throw new Error('Invalid admin credentials') }
    const c=db.customers.find(c=>c.email===email); if(!c||(demoPasswords[email]&&demoPasswords[email]!==pw)||pw.length<8) throw new Error('Invalid email or password'); return start(c)}
  const signUp=({name,email,phone})=>{ if(db.customers.some(c=>c.email===email)) throw new Error('Email already registered')
    const c={id:`C-${Date.now()}`,name,email,phone,role:'CUSTOMER',status:'Active',createdAt:new Date().toISOString().slice(0,10)}
    update('customers',l=>[...l,c]); return start(c)}
  const signOut=()=>{localStorage.removeItem('kh_session');setUser(null)}
  return <Ctx.Provider value={{user,signIn,signUp,signOut}}>{children}</Ctx.Provider>}
