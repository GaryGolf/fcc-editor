import * as React from 'react'
import * as styles from './products-table.css'

import Money from '../common/money'
import {createDays} from '../utils'

interface Props{
    planItem: PlanItem
    date?: number
    onSubmit(planItem:PlanItem): void
}
interface State{
    showInput: boolean
}

export default class ProductTableCell extends React.Component <Props, State> {
    private input:HTMLInputElement
    private value:number
    constructor(props:Props){
        super(props)
        this.state = {
            showInput: false
        }
        this.value = this.getValue(props.planItem, props.date)
    }
    componentWillReceiveProps(nextProps){
        this.value = this.getValue(nextProps.planItem, nextProps.date)
    }

    getValue(planItem:PlanItem,date?:number): number{
        return !date ? Number(planItem.plan) : Number(planItem.days.find(d=>d.day==date).plan)
    }

    setValue(value:number):PlanItem{
        const item = {...this.props.planItem}
        const period =Math.floor(item.days[0].day/1000)
        if(!this.props.date) {
            item.plan = value
            item.days = createDays(period,true,value)
        } else {
            item.days = item.days.map(d=>d.day!=this.props.date? d : {day:d.day,plan:value})
            item.plan = item.days.reduce((acc,d)=>acc+=Number(d.plan),0)
        }
        return item
    }

    handleInput(e){
        this.value = Number(this.input.value)
        switch(e.key){
            case 'Enter' :
                this.props.onSubmit(this.setValue(this.value))
            case 'Escape' :
                this.setState({showInput:false})
            break
        }
    }

    render(){
        const {planItem} = this.props
        if(this.state.showInput) return (
            <input type="number"
                className={styles.input}
                ref={element=>this.input=element}
                onBlur={()=>this.setState({showInput:false})}
                onKeyUp={this.handleInput.bind(this)}
                defaultValue={this.value.toFixed(2)}
                autoFocus
            />
        )
       
        return (
            <div className={[styles['plan-item'], styles.hand].join(' ')}
                onClick={()=>this.setState({showInput:true})}>
                <Money>{this.value}</Money>
            </div>
        )
    }
}