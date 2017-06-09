import * as React from 'react'
import * as styles from './header.css'
import * as CONST from '../../constants'

interface Props {
    salesplan: SalesPlan
    salepointlist: SalePoint[]
    onSubmit(salesPlan:SalesPlan): void
    onRegister(salesPlan:SalesPlan): void
}
interface State {
    showSaveSpinner: boolean
    showRegisterSpinner: boolean
}

export default class Header extends React.Component <Props, State> {
    private period:HTMLInputElement
    private salesPlan:any 

    constructor(props:Props){
        super(props)
        this.salesPlan = {}
        this.state = { 
            showSaveSpinner: false ,
            showRegisterSpinner: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showSaveSpinner) this.setState({showSaveSpinner:false})
        if(this.state.showRegisterSpinner) this.setState({showRegisterSpinner:false})
    }

    getPeriodOptions(){   
        let month:number = new Date().getMonth(),
            year:number= new Date().getFullYear()
        return new Array(12)
            .fill(' ')
            .map(_=>{
                const name =`${CONST.month[month]} ${year}`
                const option = <option key={name} value={month}>{name}</option>
                if(month == 11) { month = 0; year += 1 }
                else month++
                return option
            })
    }

    onSalePointChange(e){
        const id = e.target.value
        const sp = this.props.salepointlist.find(point=>point.id == e.target.value)
        this.salesPlan.sale_point_id = id
        if (!!sp) this.salesPlan.sale_point_name = sp.name
    }

    handleRegister(){
        this.setState({showRegisterSpinner: true}, ()=>{
            this.props.onRegister(this.props.salesplan)
        })
    }
   
    handleSubmit() {
        this.setState({showSaveSpinner: true}, ()=>{
            const salesPlan = {...this.props.salesplan, ...this.salesPlan}
            this.props.onSubmit(salesPlan)
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
                            onChange={e=>this.salesPlan.number=e.target.value}
                            defaultValue={number}
                        />
                    </div>
                    <div className="form-group form-inline">
                        <label>{CONST.TXT.PLANNING_PERIOD}&nbsp;</label>
                         <select 
                            className="form-control"
                            onChange={e=>this.salesPlan.period=e.target.value}
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
                            onChange={e=>this.salesPlan.comment=e.target.value}
                            defaultValue={comment}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{CONST.TXT.STATUS}:&nbsp;</label>
                        <span>{is_register?'Проведен':'Редактируется'}</span>
                    </div>
                </div>
            </div>
            <div className="form-group">
                
                <button className="btn btn-primary btn-sm"
                    onClick={this.handleSubmit.bind(this)}>
                    {this.state.showSaveSpinner? sprinner:<span className="glyphicon glyphicon-ok"/>}&nbsp;
                    {CONST.TXT.SAVE}
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