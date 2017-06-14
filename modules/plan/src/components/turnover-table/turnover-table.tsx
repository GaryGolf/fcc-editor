import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './turnover-table.css'
import { bindActionCreators } from 'redux'
import {getDaysCount, createDays} from '../utils'
const {connect} = require('react-redux')
const uuid = require('uuid')

import Input from '../modals/input'
import Money from '../common/money'
import DayHead from '../common/dayhead'

interface Props {
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    actions?: Actions.Interface
}
interface State {
    showInput: boolean
}

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
    private inputValue: number
    private inputTop: number
    private inputLeft: number 
    private tableCells: any
    private currentItem: PlanItem
    private currentDay: number

    constructor(props:Props){
        super(props)
        this.state = {
            showInput: false,
        }
        this.inputValue = 0
        this.inputTop = 0
        this.inputLeft = 0
        this.tableCells = {}
        this.currentItem = null
        this.currentDay = null
    }

    componentDidUpdate(){
        const {planitems, salesplan} = this.props
        if(!planitems || !salesplan) return
        const item = this.props.planitems.find(item=>item.type=='sale-point')
        if(!item){
            // this.props.actions.planitems.updatePlanItem(this.createPlanItem())
        }
    }

    showInputDialog(item:PlanItem, day?: number){
        this.currentItem = item
        this.currentDay = day
        const cell = !day ? this.tableCells[item.id] : this.tableCells[item.id+day] as HTMLTableDataCellElement
        this.inputValue = !day ? item.plan : item.days.find(v=> v.day == day).plan
        const cellRect = cell.getBoundingClientRect()
        this.inputTop = cellRect.bottom + + window.pageYOffset
        this.inputLeft = cellRect.right - 97 + + window.pageXOffset
        this.setState({showInput: true})
    }

    createPlanItem(): PlanItem{
       
        const amount = 0
        const newPlan = {
            id: uuid(),
            item_id: this.props.salesplan.sale_point_id,
            planning_document_id: CONST.PLAN_ID,
            plan: amount,
            type: 'sale-point',
            percent: 0,
            days: createDays(this.props.salesplan.period,true, amount)
        } as PlanItem


        const turnoverItem = this.props.planitems
            // .find(v=> v.item_id==this.props.salesplan.sale_point_id) || newPlan
            .find(item=>item.type=='sale-point') || newPlan
            
        const productItems = this.props.planitems.filter(item=>item.type=='product')

        if(productItems.length){
            const days = productItems
                .map(item=> item.days)
                .reduce((acc,item) => acc.map((ac,i)=>({...ac, plan:Number(ac.plan)+Number(item[i].plan)})))
            const plan = productItems.reduce((acc,item)=>acc+=Number(item.plan),0)
            return {...turnoverItem, days, plan}
        } 
        return turnoverItem
    }

    onEnterHandler(plan: number) {
        let item: PlanItem
        if(!this.currentDay){
            const days = createDays(this.props.salesplan.period,true,plan)
            item = {...this.currentItem, plan, days}
        } else {
            const days = this.currentItem.days.map(day=> day.day != this.currentDay ? day : ({...day, plan}))
            const plan = days.reduce((acc, day)=> acc + Number(day.plan), 0)
            item = {...this.currentItem, plan, days}
        }
        this.props.actions.planitems.updatePlanItem(item)
        this.setState({showInput: false})
    }

    render(){
        if(!this.props.planitems || !this.props.salesplan) return null

        const item = this.createPlanItem()

        const days = item.days.map(day=> (
            <td key={item.id + day.day}
                ref={td=>this.tableCells[item.id+day.day]=td}
                onClick={()=>this.showInputDialog(item, day.day)}
                className={[styles['plan-item'], styles.hand].join(' ')}>
                <Money>{day.plan}</Money>
            </td>
        ))

        const dayHeaders = item.days.map(d=><th key={d.day}><DayHead value={d.day}/></th>) 
        
        return (
            <div className={styles.container}>
                <Input
                    defaultValue={this.inputValue}
                    onEnter={this.onEnterHandler.bind(this)}
                    onClose={()=>this.setState({showInput:false})}
                    visible={this.state.showInput}
                    top={this.inputTop}
                    left={this.inputLeft}
                />
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
                            <td className={[styles.number,styles.hand,styles.amount].join(' ')} 
                                onClick={()=>this.showInputDialog(item)}
                                ref={td=>this.tableCells[item.id]=td}>
                                <Money>{item.plan}</Money>
                            </td>
                            {days}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}