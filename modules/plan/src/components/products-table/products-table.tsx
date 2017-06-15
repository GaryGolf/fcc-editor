import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './products-table.css'
import { bindActionCreators } from 'redux'
import {createDays, getDaysCount} from '../utils'
const {connect} = require('react-redux')

import DayHead from '../common/dayhead'
import Cell from '../common/cell'

interface Props {
    onEdit(item:PlanItem):void
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
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

        const {planitems, products, salesplan, actions} =this.props
        if(!planitems.length || !products.length || !salesplan) return null
        const plangoods = planitems.filter(v=>v.type!='sale-point')
        if(!plangoods.length) return null
        const daysCount = getDaysCount(salesplan.period)

        const dayHeaders= plangoods[0].days
            .map(d=><th key={d.day}><DayHead value={d.day}/></th>)

        const rows = plangoods.map((item, idx) => {
            const product = products.find(v=>v.id == item.item_id)
            if(!product) return null
            const days = item.days.map(day=> (
                <td key={item.id+day.day}>
                    <Cell planItem={item}
                        date={day.day}
                        onSubmit={actions.planitems.updatePlanItem}
                    />
                </td>
            ))
            return (
                <tr key={item.id}>
                    <td className={[styles.number, styles.serial].join(' ')}>{idx+1}</td>
                    <td className={[styles['product-name'], styles.hand].join(' ')}
                        onClick={()=>this.props.onEdit(item)}>
                        {product.name}
                    </td>
                    <td className={[styles.number,styles.hand,styles.amount].join(' ')} >
                        <Cell planItem={item}
                            onSubmit={actions.planitems.updatePlanItem}
                        />
                    </td>
                    {days}
                </tr>
            )
        })
        return (
            <div className={styles.container}>
                <table className="table table-hover table-bordered table-condensed">
                    <colgroup span={7} className={styles.main}/>
                    <colgroup span={31} className={styles.days}/>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{CONST.TXT.PRODUCT}</th>
                            <th>{CONST.TXT.AMOUNT}</th>
                            {dayHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}