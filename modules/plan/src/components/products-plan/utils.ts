import * as CONST from '../../constants'

export function createDays(arrange: boolean, qty: number): Array<Days>{
    const year = new Date(CONST.PERIOD).getFullYear()
    const month = new Date(CONST.PERIOD).getMonth()
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