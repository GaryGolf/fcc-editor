import * as React from 'react'
import * as styles from './footer.css'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {createDays} from '../utils'

import Loader from './loader'

interface Props {
    salesplan: SalesPlan
    planitems: Array<PlanItem>
    actions: Actions.Interface
}
interface State {
    showSaveSpinner: boolean
}

export default class Footer extends React.Component<Props, State> {

    constructor(props:Props){
        super(props)

        this.state = {
            showSaveSpinner: false
        }
    }
    
     componentWillReceiveProps(nextProps){
        if(this.state.showSaveSpinner) this.setState({showSaveSpinner:false})
    }
   
    handleSubmit() {
        
        this.setState({showSaveSpinner: true}, ()=>{
            const {actions, salesplan, planitems} = this.props
            const newPlan = {
                item_id: salesplan.sale_point_id,
                planning_document_id: this.props.salesplan.id,
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

        <div className="content-footer" style={{width: '1200px', left:'40px'}}>
                <div className="row">
                  <div className="col-xs-6">
                    <Loader/>&nbsp;
                    <button 
                        className="btn btn-danger"
                        onClick={this.props.actions.planitems.cleanPlanItems}>
                        <span className="glyphicon glyphicon-trash"/>&nbsp;
                        {CONST.TXT.CLEAN}
                    </button>
                  </div>
                  <div className="col-xs-6">
                    <button className="btn btn-primary pull-right"
                        onClick={this.handleSubmit.bind(this)}>
                        {this.state.showSaveSpinner? sprinner:<span className="glyphicon glyphicon-ok"/>}&nbsp;
                        {CONST.TXT.SAVE}
                    </button>
                    <button className="btn btn-default sprite_delete pull-right m-r-sm">{CONST.TXT.CANCEL}</button>
                  </div>
                </div>
              </div>
        )
    }

}