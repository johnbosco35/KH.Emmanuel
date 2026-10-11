export const naira = n => '₦' + Number(n).toLocaleString('en-NG')
export const calcTotals = (items, s) => { const subtotal = items.reduce((a,i)=>a+i.price*i.qty,0)
  const vat = Math.round(subtotal*s.vatRate/100); const delivery = items.length ? s.deliveryFee : 0
  return { subtotal, vat, delivery, total: subtotal+vat+delivery } } // MOCK: must be server-side in production
