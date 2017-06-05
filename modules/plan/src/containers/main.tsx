import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'
import * as API from '../api'
const {connect} = require('react-redux')

import ProductsPlan from '../components/products-plan'

interface Props {
    salesplan?: SalesPlan
    salesreport?: Array<SalesReport>
    actions?: Actions.Interface
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[],
        salesreport: state.salesreport as SalesReport[]
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
export default class MainScreen extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)
    }

    componentDidMount(){
        this.props.actions.salesplan.fetchSalesPlan(CONST.PLAN_ID)
        this.props.actions.planitems.fetchPlanItems(CONST.PLAN_ID, 'product')
        this.props.actions.products.fetchProducts()
        this.props.actions.salesreport.fetchSalesReport()



    }

    render(){    
        // console.log(this.props.salesplan)
        // console.log(this.props.salesreport)
        return (
            <div className={styles.container}>
              <ProductsPlan/>
            </div>
        )
    }
}