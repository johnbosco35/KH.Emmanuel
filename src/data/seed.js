// Initial mock data. Never mutated: the live copy is in localStorage (see services/db.js).
const ph = (t,c='#E9E1D5') => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750'><rect width='100%' height='100%' fill='${c}'/><text x='50%' y='50%' text-anchor='middle' font-family='serif' font-size='28' fill='#2A211B'>${t}</text></svg>`)}`
export const categories = ['Tees','Polos','Joggers','Jackets','Shorts','Blank Tees'].map((name,i)=>({id:`cat-${i+1}`,name,slug:name.toLowerCase().replace(' ','-'),description:`${name} by KH Luxury`,active:true}))
const colors=['Black','Ivory','Espresso','Sand']; const base=[['Heritage Tee',0],['Atelier Polo',1],['Lagos Jogger',2],['Noir Bomber',3],['Savannah Short',4],['Essential Blank Tee',5]]
export const products = Array.from({length:24},(_,i)=>{const [n,c]=base[i%6]; const name=`${n}${i>=6?' '+(Math.floor(i/6)+1):''}`
 return {id:`P-${1001+i}`,slug:name.toLowerCase().replace(/\s+/g,'-'),name,sku:`KH-${1001+i}`,categoryId:`cat-${c+1}`,price:(12+(i%7)*4)*1000,
 description:'Premium cotton, tailored cut, finished in Lagos.',specs:['100% cotton','Made in Nigeria'],images:[ph(name),ph(name+' II','#D9CDB8')],
 sizes:['S','M','L','XL'],colors,stock:i%9===0?0:10+i,status:'Active',featured:i%4===0,isNew:i%3===0,customizable:c===5,popularity:100-i,createdAt:`2026-0${1+(i%9)}-10`}})
export const deliveryLocations=[{id:'loc-1',name:'Lagos Island',address:'Victoria Island, Lagos',fee:3000,eta:'1–2 days',active:true},{id:'loc-2',name:'Lagos Mainland',address:'Yaba, Lagos',fee:2500,eta:'1–2 days',active:true},{id:'loc-3',name:'Abuja',address:'Wuse II, Abuja',fee:6000,eta:'3–5 days',active:false}]
export const customers=[{id:'C-1',name:'Amara Okafor',email:'amara@demo.test',phone:'08011111111',role:'CUSTOMER',status:'Active',createdAt:'2026-01-12'},{id:'C-2',name:'Tunde Bello',email:'tunde@demo.test',phone:'08022222222',role:'CUSTOMER',status:'Active',createdAt:'2026-02-03'}]
export const admin={id:'A-1',name:'KH Admin',email:'admin@khluxury.demo',role:'ADMIN'}
export const demoPasswords={'amara@demo.test':'Customer123!','admin@khluxury.demo':'Admin123!'} // DEMO ONLY, never written to localStorage
export const orders=[{id:'KH-2001',customerId:'C-1',date:'2026-09-20',status:'Processing',paymentId:'PAY-3001',items:[{productId:'P-1002',name:'Atelier Polo',price:16000,qty:2,size:'M',color:'Black'}],locationId:'loc-2',address:'12 Allen Ave, Ikeja'}]
export const payments=[{id:'PAY-3001',orderId:'KH-2001',customerId:'C-1',amount:37200,date:'2026-09-20',status:'Pending Verification',receipt:{name:'receipt.png',preview:ph('Demo receipt')},note:''}]
export const reviews=[{id:'R-1',productId:'P-1002',customerId:'C-1',name:'Amara Okafor',rating:5,text:'Superb quality.',date:'2026-09-25',status:'Approved'},{id:'R-2',productId:'P-1001',customerId:'C-2',name:'Tunde Bello',rating:4,text:'Great fit.',date:'2026-09-26',status:'Pending'}]
export const settings={brandName:'KH LUXURY',vatRate:7.5,deliveryFee:3000,whatsapp:'2348000000000',bank:{accountName:'KH LUXURY DEMO',bankName:'Demo Bank',accountNumber:'0000000000'}}
export const initialDb={categories,products,deliveryLocations,customers,orders,payments,reviews,settings,cart:[],wishlist:[]}
