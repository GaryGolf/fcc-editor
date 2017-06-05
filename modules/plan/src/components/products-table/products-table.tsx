import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './products-table.css'
import { bindActionCreators } from 'redux'
import {getAmount, getProfit, createDays} from '../utils'
const {connect} = require('react-redux')

import Input from '../modals/input'

interface Props {
    onEdit(item:PlanItem):void
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {
    showInput: boolean
}

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
        this.inputTop = cellRect.bottom
        this.inputLeft = cellRect.right - 97
        this.setState({showInput: true})
    }

    onEnterHandler(plan: number) {
        let item: PlanItem
        if(!this.currentDay){
            const days = createDays(true,plan)
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
        const {planitems, products} =this.props
        if(!planitems || !products) return null
        const rows = planitems.map((item, idx) => {
            const product = products.find(v=>v.id == item.item_id)
            if(!product) return null
            const days = item.days.map(day=> (
                <td key={item.id + day.day}
                    ref={td=>this.tableCells[item.id+day.day]=td}
                    onClick={()=>this.showInputDialog(item, day.day)}
                    className={styles['plan-item']}>
                    {day.plan}
                </td>
            ))
            return (
                <tr key={item.id}>
                    <td className={styles.number}>{idx+1}</td>
                    <td className={styles['product-name']}
                        onDoubleClick={()=>this.props.onEdit(item)}>
                        {product.name}
                    </td>
                    <td className={styles.number} 
                        ref={td=>this.tableCells[item.id]=td}
                        onClick={()=>this.showInputDialog(item)}>
                        {item.plan}
                    </td>
                    <td className={styles.number}>{item.price}</td>
                    <td className={styles.number}>{item.cost_price}</td>
                    <td className={styles.number}>{getAmount(item.plan,item.price)}</td>
                    <td className={styles.number}>{getProfit(item.plan, item.price,item.cost_price)}</td>
                    
                    {days}
                    
                </tr>
            )
        })
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
            </div>
        )
    }
}