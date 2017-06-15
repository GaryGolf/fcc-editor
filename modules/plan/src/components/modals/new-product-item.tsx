import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './new-product-item.css'
import { bindActionCreators } from 'redux'
import {createDays} from '../utils'
const {connect} = require('react-redux')
const uuid = require('uuid')


interface Props {
    onClose():void
    visible: boolean
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}

interface State {
    arrange: boolean
    showSpinner: boolean
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
export default class NewItemModal extends React.Component <Props, State> {

    private id: string
    private amount: number

    constructor(props:Props){
        super(props)
        this.state = {
            arrange: true,
            showSpinner: false
        }
        this.id = null
        this.amount = 100
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showSpinner) this.props.onClose()
        this.setState({showSpinner: false})
        if(nextProps.products.length) this.id = nextProps.products[0].id
    }

     handleKeyPress(e){
        switch(e.key){
            case 'Enter' :
                this.submitHandler()
                break
            case 'Escape' :
                this.props.onClose()
                break
        }
   }
    
    submitHandler(){
        this.setState({showSpinner: true},
            () => {
                const product = this.props.products.find(item => item.id == this.id)
                const item: PlanItem = {
                    id: uuid(),
                    item_id: this.id,
                    planning_document_id: this.props.salesplan.id,
                    plan: Number(this.amount),
                    type: 'product',
                    percent: 0,
                    days: createDays(this.props.salesplan.period,this.state.arrange, this.amount)
                }
               this.props.actions.planitems.createPlanItem(item)
        })
    }
    render(){

        const {visible, planitems} = this.props
        const {showSpinner} = this.state
        const products = this.props.products.filter(p=>!planitems.some(v=>v.item_id==p.id))
        if(!visible || !products.length || !planitems) return null
        this.id = products[0].id
        const options = products.map((item,idx)=><option key={item.id} value={item.id}>{item.name}</option>)
        const spinner = !showSpinner ? <span className="glyphicon glyphicon-ok"/> 
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
                        <h2 className="modal-title">{CONST.TXT.ADD_PRODUCT}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox"
                                    checked={this.state.arrange}
                                    onChange={e=>this.setState(state=>({arrange:!state.arrange}))}
                                />
                                {CONST.TXT.ARRANGE_PRODUCTS}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.PRODUCT}</label>
                            <select className="form-control"
                                defaultValue={this.id}
                                onChange={e=>this.id=e.target.value}>
                                {options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.AMOUNT}</label>
                            <input className="form-control"
                                type="number"
                                autoFocus
                                defaultValue={this.amount.toString()}
                                onKeyUp={this.handleKeyPress.bind(this)}
                                onChange={e=>this.amount=Number(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-default" 
                            onClick={this.props.onClose}
                            data-dismiss="modal">
                            {CONST.TXT.CANCEL}
                        </button>
                        <button type="button" 
                            className="btn btn-primary"
                            onClick={this.submitHandler.bind(this)}>
                            {spinner}&nbsp;{CONST.TXT.SAVE}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}