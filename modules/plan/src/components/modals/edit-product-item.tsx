import * as React from 'react'
import * as styles from './edit-product-item.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import {createDays} from '../utils'
const {connect} = require('react-redux')

interface Props {
    planItem: PlanItem
    visible: boolean
    onClose():void
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {
    id: string
    amount: number
    arrange: boolean
    showSaveSpinner: boolean
    showRemoveSpinner: boolean
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[]
        // salesreport: state.salesreport as SalesReport[]
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
export default class EditProductItem extends React.Component <Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            id: '',
            amount: 0,
            arrange: true,
            showSaveSpinner: false,
            showRemoveSpinner: false
        }
    }
    componentWillReceiveProps(nextProps:Props){
        if(this.state.showSaveSpinner || this.state.showRemoveSpinner) this.props.onClose()
        if(!!nextProps.planItem) this.setState({id:nextProps.planItem.item_id, amount: nextProps.planItem.plan})
        this.setState({showSaveSpinner: false, showRemoveSpinner: false})
    }
    productChangeHandler(e){
        this.setState({id: e.target.value})
    }
    
   
    submitHandler(){
        this.setState({showSaveSpinner: true},
            () => {
                const {amount, arrange} = this.state
                const plan = amount
                const days = arrange || amount != this.props.planItem.plan ? 
                    createDays(this.props.salesplan.period,arrange, amount) :
                    this.props.planItem.days
                const item = {...this.props.planItem, plan, days}
                this.props.actions.planitems.updatePlanItem(item)
        })
    }
    removeHandler(){
        this.setState({showRemoveSpinner: true}, ()=>{
            this.props.actions.planitems.removePlanItem(this.props.planItem)
        })
    }

    render(){
        const {planItem, products, visible} = this.props
        if(!visible || !planItem) return null
        const {id, amount, arrange, showSaveSpinner, showRemoveSpinner} = this.state
        const options = products.map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))
        
        const saveSpinner = !showSaveSpinner ? <span className="glyphicon glyphicon-ok"/> 
            : <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> 
        const removeSpinner = !showRemoveSpinner ? <span className="glyphicon glyphicon-trash"/> 
            : <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> 
        return (
            <div className={styles.overlay} onClick={this.props.onClose}>
             <div className="modal-dialog" 
                onClick={e=>e.stopPropagation()}
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            onClick={this.props.onClose}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h2 className="modal-title">{CONST.TXT.EDIT_PRODUCT}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox"
                                    checked={arrange}
                                    onChange={e=>this.setState({arrange: e.target.checked})}
                                />
                                {CONST.TXT.ARRANGE_PRODUCTS}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.PRODUCT}</label>
                            <select className="form-control"
                                defaultValue={id}
                                onChange={e=>this.setState({id: e.target.value})}>
                                {options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.AMOUNT}</label>
                            <input className="form-control"
                                type="number"
                                defaultValue={''+amount}
                                onChange={e=>this.setState({amount: Number(e.target.value)})}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-danger" 
                            onClick={this.removeHandler.bind(this)}
                            style={{float:'left'}}
                            data-dismiss="modal">
                            {removeSpinner}&nbsp;{CONST.TXT.REMOVE}
                        </button>
                        <button type="button" 
                            className="btn btn-default" 
                            onClick={this.props.onClose}
                            data-dismiss="modal">
                            {CONST.TXT.CANCEL}
                        </button>
                        <button type="button" 
                            className="btn btn-primary"
                            onClick={this.submitHandler.bind(this)}>
                            {saveSpinner}&nbsp;{CONST.TXT.SAVE}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}