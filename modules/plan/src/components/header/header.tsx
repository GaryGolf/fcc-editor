import * as React from 'react'
import * as styles from './header.css'
import * as Actions from '../../actions'
import * as CONST from '../../constants'

import {createDays} from '../utils'

interface Props {
    salesplan: SalesPlan
    salepointlist: SalePoint[]
    planitems: PlanItem[]
    actions?: Actions.Interface
}
interface State {
   
}

export default class Header extends React.Component <Props, State> {
    private period:HTMLInputElement
    private salesPlan:any 

    constructor(props:Props){
        super(props)
        this.salesPlan = {}
    }

    getPeriodOptions(){
        const date = new Date()   
        let month:number = date.getMonth(),
            year:number= date.getFullYear()
        return new Array(12)
            .fill(' ')
            .map(_=>{
                const name =`${CONST.month[month]} ${year}`
                const period = Math.floor(new Date(year,month,1).getTime()/1000)
                const option = <option key={period} value={period}>{name}</option>
                if(month == 11) { month = 0; year += 1 }
                else month++
                return option
            })
    }

    onSalePointChange(e){
        const sale_point_id = e.target.value
        const sp = this.props.salepointlist.find(point=>point.id == e.target.value)
        const sale_point_name = !sp ? '' : sp.name
        const plan = {...this.props.salesplan, sale_point_id, sale_point_name}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }
    onPeriodChange(e){
        const period = e.target.value
        const plan = {...this.props.salesplan, period}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    onPlanNumberChange(e){
        const number = e.target.value
        const plan = {...this.props.salesplan, number}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    onCommentChange(e){
        const comment = e.target.value
        const plan = {...this.props.salesplan, comment}
        this.props.actions.salesplan.updateSalesPlan(plan)
    }

    // handleAddTurnoverItem(){
    //     this.setState({showTurnoverSpinner: true}, ()=>{
    //         const item: PlanItem = {
    //             item_id: this.props.salesplan.sale_point_id,
    //             planning_document_id: CONST.PLAN_ID,
    //             plan: 0,
    //             type: 'sale-point',
    //             percent: 0,
    //             price: 0,
    //             cost_price: 0,
    //             days: createDays(this.props.salesplan.period,true, 0)
    //         }
    //         this.props.actions.planitems.createPlanItem(item)
    //     })
    // }

    render(){
        if(!this.props.salesplan || !this.props.salepointlist) return null
        const {id, period, sale_point_id, number, comment, is_register} = this.props.salesplan
        
        const salePointOptions = this.props.salepointlist.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ))
        const periodOptions = this.getPeriodOptions()

        const sprinner = <span className={"glyphicon glyphicon-refresh "+styles.spinner}/>

        return (
        <div>
            <div className="row">
                <div className="col-md-5">
                     <div className="form-group form-inline">
                        <label>{CONST.TXT.NAME}:&nbsp;</label>
                        <input type="text"
                            className="form-control"
                            onChange={this.onPlanNumberChange.bind(this)}
                            defaultValue={number}
                        />
                    </div>
                    <div className="form-group form-inline">
                        <label>{CONST.TXT.PLANNING_PERIOD}&nbsp;</label>
                         <select 
                            className="form-control"
                            onChange={this.onPeriodChange.bind(this)}
                            defaultValue={''+period}>
                            {periodOptions}
                        </select>
                    </div> 
                    <div className="form-group form-inline">
                        <label>{CONST.TXT.SALE_POINT}: &nbsp;</label>
                        <select 
                            className="form-control"
                            onChange={this.onSalePointChange.bind(this)}
                            value={sale_point_id}>
                            {salePointOptions}
                        </select>
                    </div>
                </div>
                <div  className="col-md-5">
                    <div className="form-group">
                        <label>{CONST.TXT.EMPLOYEE}:&nbsp;</label>
                        <span>{this.props.salesplan.user_fio}</span>
                    </div>
                    <div className="form-group form-inline">
                        <label>{CONST.TXT.COMMENT}:&nbsp;</label>
                         <input type="text"
                            className="form-control"
                            onChange={this.onCommentChange.bind(this)}
                            defaultValue={comment}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{CONST.TXT.STATUS}:&nbsp;</label>
                        <span>{is_register?'Проведен':'Редактируется'}</span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}