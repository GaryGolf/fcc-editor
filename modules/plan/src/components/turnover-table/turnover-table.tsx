import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './turnover-table.css'
import { bindActionCreators } from 'redux'
import {getDaysCount, createDays} from '../utils'
const {connect} = require('react-redux')
const uuid = require('uuid')

import DayHead from '../common/dayhead'
import Cell from '../common/cell'

interface Props {
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    actions?: Actions.Interface
}
interface State {}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[]
    }),
    dispatch => ({
        actions: {
            planitems: bindActionCreators(Actions.planitems as any, dispatch)
        } 
    })
)
export default class ProductsTable extends React.Component <Props, State> {

    createPlanItem(): PlanItem{
       
        const amount = 0
        const newPlan = {
            id: uuid(),
            item_id: this.props.salesplan.sale_point_id,
            planning_document_id: this.props.salesplan.id,
            plan: amount,
            type: 'sale-point',
            percent: 0,
            days: createDays(this.props.salesplan.period,true, amount)
        } as PlanItem


        const turnoverItem = this.props.planitems
            .find(item=>item.type=='sale-point') || newPlan
            
        const productItems = this.props.planitems.filter(item=>item.type!='sale-point')

        if(productItems.length){
            const days = productItems
                .map(item=> item.days)
                .reduce((acc,item) => acc.map((ac,i)=>({...ac, plan:Number(ac.plan)+Number(item[i].plan)})))
            const plan = productItems.reduce((acc,item)=>acc+=Number(item.plan),0)
            return {...turnoverItem, days, plan}
        } 
        return turnoverItem
    }

    render(){
        if(!this.props.planitems || !this.props.salesplan) return null

        const item = this.createPlanItem()

        const days = item.days.map(day=> (
            <td key={item.id + day.day}>
                <Cell planItem={item}
                    date={day.day}
                    onSubmit={this.props.actions.planitems.updatePlanItem}
                />
            </td>
        ))

        const dayHeaders = item.days.map(d=><th key={d.day}><DayHead value={d.day}/></th>) 
        
        return (
            <div className={styles.container}>
                <table className="table table-hover table-bordered table-condensed">
                    <colgroup span={2} className={styles.main}/>
                    <colgroup span={31} className={styles.days}/>
                    <thead>
                        <tr>
                            <th>{CONST.TXT.SALE_POINT}</th>
                            <th>{CONST.TXT.AMOUNT}</th>
                            {dayHeaders}
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td className={[styles['product-name'], styles.hand].join(' ')}>
                                {this.props.salesplan.sale_point_name}
                            </td>
                            <td className={[styles.number,styles.hand,styles.amount].join(' ')} >
                                <Cell planItem={item}
                                    onSubmit={this.props.actions.planitems.updatePlanItem}
                                />
                            </td>
                            {days}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}