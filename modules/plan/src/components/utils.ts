import * as CONST from '../constants'

export function createDays(arrange: boolean, qty: number): Array<Days>{
    const year = new Date(CONST.PERIOD).getFullYear()
    const month = new Date(CONST.PERIOD).getMonth()+1
    const daysCount = new Date(year, month, 0).getDate()
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

export function getPeriodPoints(date: Date){

    const year = date.getFullYear()
    const m = date.getMonth()+1
    const daysCount = new Date(year, m, 0).getDate()
    const month = m<10?`0${m}`:`${m}`

     const dateFrom = `${year}-${month}-01`
    const dateTo = `${year}-${month}-${daysCount}`
    return {dateFrom, dateTo}
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

