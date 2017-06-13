import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './turnover-table.css'
import { bindActionCreators } from 'redux'
import {getAmount, getProfit, createDays} from '../utils'
const {connect} = require('react-redux')

import Input from '../modals/input'
import Money from '../common/money'

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

    onEnterHandler(plan: number) {
        let item: PlanItem
        if(!this.currentDay){
            const days = createDays(this.props.salesplan.period,true,plan)
            item = {...this.currentItem, plan, days}
        } else {
            const days = this.currentItem.days.map(day=> day.day != this.currentDay ? day : ({...day, plan}))
            const qty = days.reduce((acc, day)=> acc + Number(day.plan), 0)
            item = {...this.currentItem, plan: qty, days}
        }
        this.props.actions.planitems.updatePlanItem(item)
        this.setState({showInput: false})
    }

    render(){
        if(!this.props.planitems || !this.props.salesplan) return null
        
        const item = this.props.planitems.find(v=> v.item_id==CONST.SALE_POINT_ID)

        if(!item) return null

        const days = item.days.map(day=> (
            <td key={item.id + day.day}
                ref={td=>this.tableCells[item.id+day.day]=td}
                onClick={()=>this.showInputDialog(item, day.day)}
                className={[styles['plan-item'], styles.hand].join(' ')}>
                <Money>{day.plan}</Money>
            </td>
        ))
        
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
                            {new Array(31).fill(1).map((_,i)=>(<th key={i}>{i+1}</th>))}
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