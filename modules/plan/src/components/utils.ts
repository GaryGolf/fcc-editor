
export function getAmount(qty:number, price:number):string{
    return Math.floor(qty*price)+'.00'
}
export function getProfit(qty:number, price:number, cost:number):string {
    return Math.floor(qty*price-qty*cost)+'.00'
}