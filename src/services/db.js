// Mock service layer. Swap for API/Supabase calls later.
import { initialDb } from '../data/seed'
const KEY='kh_db_v1'
export const loadDb=()=>{try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(initialDb)}catch{return structuredClone(initialDb)}}
export const saveDb=db=>localStorage.setItem(KEY,JSON.stringify(db))
export const resetDb=()=>{localStorage.removeItem(KEY);return structuredClone(initialDb)}
