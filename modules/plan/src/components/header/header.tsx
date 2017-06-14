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
    showSaveSpinner: boolean
    showRegisterSpinner: boolean
    showCleanSpinner: boolean
    showTurnoverSpinner: boolean
}

export default class Header extends React.Component <Props, State> {
    private period:HTMLInputElement
    private salesPlan:any 

    constructor(props:Props){
        super(props)
        this.salesPlan = {}
        this.state = { 
            showSaveSpinner: false ,
            showRegisterSpinner: false,
            showCleanSpinner: false,
            showTurnoverSpinner: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showSaveSpinner) this.setState({showSaveSpinner:false})
        if(this.state.showRegisterSpinner) this.setState({showRegisterSpinner:false})
        if(this.state.showCleanSpinner) this.setState({showCleanSpinner:false})
        if(this.state.showTurnoverSpinner) this.setState({showTurnoverSpinner:false})
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

    handleRegister(){
        this.setState({showRegisterSpinner: true}, ()=>{
            if(this.props.salesplan.is_register) {
                this.props.actions.salesplan.unregisterSalesPlan(this.props.salesplan)
            } else {
                this.props.actions.salesplan.registerSalesPlan(this.props.salesplan)
            }
        })
    }
   
    handleSubmit() {
        this.setState({showSaveSpinner: true}, ()=>{
            this.props.actions.salesplan.saveSalesPlan(this.props.salesplan)
        })
    }

    handleAddTurnoverItem(){
        this.setState({showTurnoverSpinner: true}, ()=>{
            const item: PlanItem = {
                item_id: CONST.SALE_POINT_ID,
                planning_document_id: CONST.PLAN_ID,
                plan: 0,
                type: 'sale-point',
                percent: 0,
                price: 0,
                cost_price: 0,
                days: createDays(this.props.salesplan.period,true, 0)
            }
            this.props.actions.planitems.createPlanItem(item)
        })
    }

    render(){
        if(!this.props.salesplan || !this.props.salepointlist) return null
        const {id, period, number, comment, is_register} = this.props.salesplan

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
                            defaultValue={this.props.salesplan.sale_point_id}>
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
            <div className="form-group" style={{display:'none'}}>
                
                <button className="btn btn-primary btn-sm"
                    onClick={this.handleSubmit.bind(this)}>
                    {this.state.showSaveSpinner? sprinner:<span className="glyphicon glyphicon-ok"/>}&nbsp;
                    {CONST.TXT.SAVE}
                </button>&nbsp;
                <button className="btn btn-default btn-sm"
                    onClick={this.handleAddTurnoverItem.bind(this)}>
                    {this.state.showTurnoverSpinner? sprinner:<span className="glyphicon glyphicon-plus"/>}&nbsp;
                    {CONST.TXT.ADD_TURNOVER_ITEM}
                </button>&nbsp;
                <button className="btn btn-primary btn-sm"
                    onClick={this.handleRegister.bind(this)}>
                    {this.state.showRegisterSpinner? sprinner:<span className="glyphicon glyphicon-check"/>}&nbsp;
                    {is_register?CONST.TXT.RESTORE:CONST.TXT.REGISTER}
                </button>
            </div>
        </div>
        )
    }
}