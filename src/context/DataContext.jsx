import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loadDb, saveDb, resetDb } from '../services/db'
const Ctx=createContext()
export const useData=()=>useContext(Ctx)
export function DataProvider({children}){
  const [db,setDb]=useState(loadDb); useEffect(()=>saveDb(db),[db])
  const update=useCallback((key,fn)=>setDb(d=>({...d,[key]:fn(d[key])})),[])
  const reset=()=>setDb(resetDb())
  return <Ctx.Provider value={{db,update,reset}}>{children}</Ctx.Provider>}
