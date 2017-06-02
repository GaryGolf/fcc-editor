import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './new-item-modal.css'
import { bindActionCreators } from 'redux'
import {createDays} from './utils'
const {connect} = require('react-redux')


interface Props {
    onClose():void
    visible: boolean
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}

interface State {
    id: string
    qty: number
    arrange: boolean
    showSpinner: boolean
}

@connect(
    state => ({
        // salesplan: state.salesplan as SalesPlan,
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

    constructor(props:Props){
        super(props)
        this.state={
            id: null,
            qty: 1,
            arrange: false,
            showSpinner: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showSpinner) this.props.onClose()
        this.setState({showSpinner: false})
        if(!this.state.id && nextProps.products.length) this.setState({id: nextProps.products[0].id})
    }
    productChangeHandler(e){
        this.setState({id: e.target.value})
    }
    quantityChangeHandler(e){
        this.setState({qty: e.target.value})
    }
    arrangeChangeHandler(e) {
        this.setState({arrange: e.target.checked})
    }
    submitHandler(){
        this.setState({showSpinner: true},
            () => {
                const product = this.props.products.find(item => item.id == this.state.id)
                const body: PlanItem = {
                    item_id: this.state.id,
                    planning_document_id: CONST.PLAN_ID,
                    plan: this.state.qty,
                    type: 'product',
                    percent: 0,
                    price: product.price,
                    cost_price: product.cost_price,
                    days: createDays(this.state.arrange, this.state.qty)
                }
                this.props.actions.planitems.createPlanItem(body)
        })
    }
    render(){

        const {visible, products} = this.props
        const {id, qty, showSpinner} = this.state
        if(!visible || !products) return null
        const options = products.map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))
        const prod = products.find(item => item.id == id)
        const price = !prod ? '' : prod.price.toString()
        const cost_price = !prod ? '' : prod.cost_price.toString()
        const amount = !qty ? '' : (prod.price*qty).toString()
        const profit = !qty ? '' : (prod.price*qty - prod.cost_price*qty).toString()
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
                                    onChange={this.arrangeChangeHandler.bind(this)}
                                />
                                {CONST.TXT.ARRANGE_PRODUCTS}
                            </label>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.PRODUCT}</label>
                            <select className="form-control"
                                onChange={this.productChangeHandler.bind(this)}>
                                {options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.QUANTITY}</label>
                            <input className="form-control"
                                type="number"
                                defaultValue={qty.toString()}
                                onChange={this.quantityChangeHandler.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.PRICE}</label>
                            <input className="form-control"
                                value={price}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.COST}</label>
                            <input className="form-control"
                                value={cost_price}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.AMOUNT}</label>
                            <input className="form-control"
                                value={amount}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>{CONST.TXT.PROFIT}</label>
                            <input className="form-control"
                                value={profit}
                                disabled
                            />
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