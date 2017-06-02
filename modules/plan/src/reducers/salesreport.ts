import * as Actions from '../constants/actions'
import * as CONST from '../constants'

const initialState: Array<SalesReport> = []

export default function salesreport (state = initialState, action: Action): Array<SalesReport>{

    switch(action.type){
        case Actions.FETCH_SALES_REPORT : {
            const report = action.payload //[CONST.SALE_POINT_ID]
            return Object.keys(report)
                .reduce((acc, item) => [...acc,...report[item]],[])
                .map(item => ({...item, total_cost: Number(item.total_cost)}))
                .reduce((acc, item) => {
                    const product = acc.find(v => v.product_id == item.product_id)
                    if(!product) return [...acc, ...item]
                    product.quantity += item.quantity
                    product.total_cost += item.total_cost 
                    return acc
                },[])
        }
    }
    return state
}