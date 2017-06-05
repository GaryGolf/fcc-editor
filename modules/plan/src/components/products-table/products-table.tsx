import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './products-table.css'
import { bindActionCreators } from 'redux'
import {getAmount, getProfit} from '../utils'
const {connect} = require('react-redux')

interface Props {
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {}

@connect(
    state => ({
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[]
    }),
    dispatch => ({
        actions: {
            salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch),
            products: bindActionCreators(Actions.products as any, dispatch),
            salesreport: bindActionCreators(Actions.salesreport as any, dispatch)
        } 
    })
)
export default class ProductsTable extends React.Component <Props, State> {
    render(){
        const {planitems, products} =this.props
        if(!planitems) return null
        const rows = planitems.map((item, idx) => {
            const product = products.find(v=>v.id == item.item_id)
            if(!product) return null
            const days = item.days.map(day=> (
                <td key={item.id + day.day}
                    className={styles['plan-item']}>
                    {day.plan}
                </td>
            ))
            return (
                <tr key={item.id}>
                    <td className={styles.number}>{idx+1}</td>
                    <td className={styles['product-name']}>{product.name}</td>
                    <td className={styles.number}>{item.plan}</td>
                    <td className={styles.number}>{item.price}</td>
                    <td className={styles.number}>{item.cost_price}</td>
                    <td className={styles.number}>{getAmount(item.plan,item.price)}</td>
                    <td className={styles.number}>{getProfit(item.plan, item.price,item.cost_price)}</td>
                    
                    {days}
                    
                </tr>
            )
        })
        return (
            <table className="table table-hover table-bordered table-condensed">
                <colgroup span={7} className={styles.main}/>
                <colgroup span={31} className={styles.days}/>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th>Amount</th>
                        <th>Profit</th>
                        {new Array(31).fill(1).map((_,i)=>(<th key={i}>{i+1}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}