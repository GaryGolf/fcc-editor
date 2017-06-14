import * as React from 'react'
import * as styles from './footer.css'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {createDays} from '../utils'

interface Props {
    salesplan: SalesPlan
    planitems: Array<PlanItem>
    actions: Actions.Interface
}
interface State {
    showSaveSpinner: boolean
    showRegisterSpinner: boolean
}

export default class Footer extends React.Component<Props, State> {

    constructor(props:Props){
        super(props)

        this.state = {
            showSaveSpinner: false,
            showRegisterSpinner: false
        }
    }
    
     componentWillReceiveProps(nextProps){
        if(this.state.showSaveSpinner) this.setState({showSaveSpinner:false})
        if(this.state.showRegisterSpinner) this.setState({showRegisterSpinner:false})
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
            const {actions, salesplan, planitems} = this.props
            const newPlan = {
                item_id: salesplan.sale_point_id,
                planning_document_id: CONST.PLAN_ID,
                plan: 0, type: 'sale-point', percent: 0,
                days: createDays(this.props.salesplan.period,false, 0)
            } as PlanItem
            const turnover = planitems.find(item=>item.type=='sale-point')
            const items = !turnover ? [...planitems, newPlan]:planitems
            actions.planitems.saveDocument(salesplan,items)
        })
    }

    render(){
        if(!this.props.salesplan || !this.props.planitems) return null
        const{is_register} = this.props.salesplan
        const sprinner = <span className={"glyphicon glyphicon-refresh "+styles.spinner}/>
        return (
            <div className={styles.container}>
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-danger btn-sm"
                            onClick={this.props.actions.planitems.cleanPlanItems}>
                            <span className="glyphicon glyphicon-remove"/>&nbsp;
                            {CONST.TXT.CLEAN}
                        </button>
                    </div>
                    <div className="col-md-6" />
                    <div className="col-md-4">
                         <div className="form-group">
                              <button className="btn btn-primary btn-sm"
                                onClick={this.handleRegister.bind(this)}>
                                {this.state.showRegisterSpinner? sprinner:<span className="glyphicon glyphicon-check"/>}&nbsp;
                                {is_register?CONST.TXT.RESTORE:CONST.TXT.REGISTER}
                            </button>
                            &nbsp;
                            <button className="btn btn-primary btn-sm"
                                onClick={this.handleSubmit.bind(this)}>
                                {this.state.showSaveSpinner? sprinner:<span className="glyphicon glyphicon-ok"/>}&nbsp;
                                {CONST.TXT.SAVE}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}