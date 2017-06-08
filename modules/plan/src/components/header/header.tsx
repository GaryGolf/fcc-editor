import * as React from 'react'
import * as CONST from '../../constants'

interface Props {
    salesplan: SalesPlan
    salepointlist: SalePoint[]
    onSubmit(id: string, salesPlan:SalesPlan): void
}
interface State {}

export default class Header extends React.Component <Props, State> {
    private period:HTMLInputElement
    private salesPlan:any 

    constructor(props:Props){
        super(props)
        this.salesPlan = {}
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

    onNameChange(e){
        this.salesPlan.number=e.target.value
    }
    onPeriodChange(e){
        this.salesPlan.period = e.target.value
    }
    onSalePointChange(e){
        const id = e.target.value
        const sp = this.props.salepointlist.find(point=>point.id == e.target.value)
        this.salesPlan.sale_point_id = id
        if (!!sp) this.salesPlan.sale_point_name = sp.name
    }

    handleSubmit() {
        const salesPlan = {...this.props.salesplan, ...this.salesPlan}
        this.props.onSubmit(this.props.salesplan.id, salesPlan)
    }

    render(){
        if(!this.props.salesplan || !this.props.salepointlist) return null
        const {id, period, number, is_register} = this.props.salesplan

        const salePointOptions = this.props.salepointlist.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ))
        const periodOptions = this.getPeriodOptions()

        return (
            <div>
                <div style={{float:'left'}}>
                     <div className="form-group form-inline">
                        <label>Name:&nbsp;</label>
                        <input type="text"
                            className="form-control"
                            onChange={this.onNameChange.bind(this)}
                            defaultValue={number}
                        />
                    </div>
                    <div className="form-group form-inline">
                        <label>Период планирования:&nbsp;</label>
                         <select 
                            className="form-control"
                            onChange={this.onPeriodChange.bind(this)}
                            defaultValue={''+period}>
                            {periodOptions}
                        </select>
                    </div> 
                    <div className="form-group form-inline">
                        <label>торговая точка: &nbsp;</label>
                        <select 
                            className="form-control"
                            onChange={this.onSalePointChange.bind(this)}
                            defaultValue={this.props.salesplan.sale_point_id}>
                            {salePointOptions}
                        </select>
                    </div>
                </div>
                <div style={{float:'left'}}>
                    <div className="form-group">
                        <label>Сотрудник создавший документ:&nbsp;</label>
                        <span>{this.props.salesplan.user_fio}</span>
                    </div>
                    <div className="form-group">
                        <label>Комментарий:&nbsp;</label>
                        <span>{this.props.salesplan.comment}</span>
                    </div>
                    
                    <div className="form">
                        <label>Статус документа:&nbsp;</label>
                        <span>{is_register?'Проведен':'Редактируется'}</span>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                        onClick={this.handleSubmit.bind(this)}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}