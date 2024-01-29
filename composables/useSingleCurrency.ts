interface Currency {
    symbol: string;
    flag: string;
    countryName: string;
    currency: string;
    code: string;
    rate: number;
}


export default async (name:string) => {
    const currency = await useAsyncData<Currency>(`currency-${name}`,() => $fetch(`/api/${name}`),{
        
    })
    return currency
}