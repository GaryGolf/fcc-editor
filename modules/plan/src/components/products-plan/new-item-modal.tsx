import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './new-item-modal.css'
import { bindActionCreators } from 'redux'
const {connect} = require('react-redux')

interface Props {
    onClose():void
    visible: boolean
    products?: Product[]
}

interface State {
    id: string
    qty: number
}

@connect(
    state => ({
        // salesplan: state.salesplan as SalesPlan,
        // planitems: state.planitems as PlanItem[],
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
            qty: 0
        }
    }

    componentWillReceiveProps(nextProps){
        if(!this.state.id && nextProps.products.length) this.setState({id: nextProps.products[0].id})
    }
    productChangeHandler(e){
        this.setState({id: e.target.value})
    }
    quantityChangeHandler(e){
        // check input here
        this.setState({qty: e.target.value})
    }
    render(){
        const {visible, products} = this.props
        const {id, qty} = this.state
        if(!visible || !products) return null
        // console.log(products[0])
        const options = products.map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))
        const prod = products.find(item => item.id == id)
        console.log(prod)
        const price = !prod ? '' : prod.price.toString()
        const cost_price = !prod ? '' : prod.cost_price.toString()
        const amount = !qty ? '' : (prod.price*qty).toString()
        const profit = !qty ? '' : (prod.price*qty - prod.cost_price*qty).toString()

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
                        <h2 className="modal-title">Add new product</h2>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Product</label>
                            <select className="form-control"
                                onChange={this.productChangeHandler.bind(this)}>
                                {options}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Qty</label>
                            <input className="form-control"
                                type="number"
                                onChange={this.quantityChangeHandler.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>price</label>
                            <input className="form-control"
                                value={price}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>cost</label>
                            <input className="form-control"
                                value={cost_price}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>amount</label>
                            <input className="form-control"
                                value={amount}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Profit</label>
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
                            Cancel
                        </button>
                        <button type="button" 
                            className="btn btn-default">
                            <span className="glyphicon glyphicon-trash"/>&nbsp;
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}