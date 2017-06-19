import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './products-table.css'
import { bindActionCreators } from 'redux'
import {createDays, getDaysCount} from '../utils'
const {connect} = require('react-redux')

import Loader from '../products-plan/loader'
import ProductRow from './product-row'
import Cell from '../common/cell'

interface Props {
    onEdit(item:PlanItem):void
    onAddNew():void
    salesplan?: SalesPlan
    planitems?: PlanItem[]
    products?: Product[]
    actions?: Actions.Interface
}
interface State {}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[]
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

export default class LeftTable extends React.Component <Props, State> {
    render(){
        const {planitems, products, salesplan, actions} =this.props
        if(!planitems || !products.length || !salesplan) return null
        const plangoods = planitems.filter(v=>v.type!='sale-point')
       
        const rows = !plangoods.length ? null : plangoods.map((item, idx) => {
            const product = products.find(v=>v.id == item.item_id)
            if(!product) return null
             return (
                <ProductRow key={idx}
                    num={idx+1}
                    name={product.name}
                    planItem={item}
                    onEdit={this.props.onEdit}
                    onSubmit={this.props.actions.planitems.updatePlanItem}
                />
            )
         })
        return (
            <table className="table table-transparent">
                <tbody>
                    <tr className="vertical-middle">
                        <th className="col-xs-10" colSpan={2}>
                            <h2>{CONST.TXT.PRODUCT_PLAN}</h2>
                        </th>
                        <th className="col-xs-2">
                            <button className="btn btn-primary btn-sm"
                                onClick={this.props.onAddNew}>
                                <span className="glyphicon glyphicon-plus"/>&nbsp;
                                {CONST.TXT.ADD_PRODUCT}
                            </button>&nbsp;
                            {/*<Loader/>*/}
                        </th>
                    </tr>
                    <tr>
                        <th className="col-xs-1">{CONST.TXT.NUMBER}</th>
                        <th className="col-xs-9">
                            <div className="text-default text-uppercase">{CONST.TXT.PRODUCT}</div>
                        </th>
                        <th className="col-xs-2">
                            <div className="text-default text-uppercase">{CONST.TXT.QUANTITY}</div>
                        </th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        )
    }

}
