import * as CONST from '../constants'

export function createDays(period:number, arrange:boolean, qty:number): Array<Days>{
    const y = new Date().getFullYear()
    const month = new Date().getMonth()+1
    const year = month>9 && period< 2? y+1:y
    const daysCount = new Date(year, period+1, 0).getDate()
    const rem = qty%daysCount
    const div = Math.floor(qty/daysCount)
    const days = new Array(daysCount).fill({})
    
     if (arrange) return  days.map((item, idx) => {
            const plan = idx < rem ? div + 1 : div
            const day = new Date(year, month, idx).getTime()
            return {day,plan}
        })
    return  days.map((item, idx) => {
            const plan = idx == 0  ? qty : 0
            const day = new Date(year, month, idx).getTime()
            return {day,plan}
        })
}

export function getAmount(qty:number, price:number):string{
    return Math.floor(qty*price)+'.00'
}

export function getProfit(qty:number, price:number, cost:number):string {
    return Math.floor(qty*price-qty*cost)+'.00'
}

export function getPeriods(date:Date,count=6):Array<Date>{

    const year = date.getFullYear()
    const month = date.getMonth()
    return new Array(Math.abs(count))
        .fill(new Date())
        .map((_,idx)=>new Date(year,count<0?month-idx:month+idx,1))
}

export function getMonth(date:Date): string{
    const year = date.getFullYear()
    const month = date.getMonth()

    return `${CONST.month[month]} ${year}`
}

export function getDaysCount(period:number) {
    const today = new Date()
    const y = today.getFullYear()
    const month = today.getMonth()
    const year = month>9 && period< 2? y+1:y
    return new Date(year, period+1, 0).getDate()
}
