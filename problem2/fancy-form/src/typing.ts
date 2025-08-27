export interface CurrencyItem { 
    "currency": string, 
    "date": Date,
    "price": number
}

export type Currency = CurrencyItem['currency']; 
export type ItemDate = CurrencyItem['date'];
export type Price = CurrencyItem['price'];

export type CurrencyData = CurrencyItem[]