import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'
import * as API from '../api'
const {connect} = require('react-redux')

import TurnoverPlan from '../components/turnover-plan'
import ProductsPlan from '../components/products-plan'
import Header from '../components/header'

interface Props {
    salesplan?: SalesPlan
    salesreport?: Array<SalesReport>
    salesplanlist?: Array<SalesPlan>
    salepointlist?: Array<SalePoint>
    actions?: Actions.Interface
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
        products: state.products as Product[],
        salesreport: state.salesreport as SalesReport[],
        salesplanlist: state.salesplanlist as SalesPlan[],
        salepointlist: state.salepointlist as SalePoint[]
    }),
    dispatch => ({
        actions: {
            salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch),
            products: bindActionCreators(Actions.products as any, dispatch),
            salesreport: bindActionCreators(Actions.salesreport as any, dispatch),
            salesplanlist: bindActionCreators(Actions.salesplanlist as any, dispatch),
            salepointlist: bindActionCreators(Actions.salepointlist as any, dispatch)
        } 
    })
)
export default class MainScreen extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)
    }

    componentDidMount(){
        this.props.actions.salesplanlist.fetchSalesPlanList()
        this.props.actions.salesplan.fetchSalesPlan(CONST.PLAN_ID)
        this.props.actions.planitems.fetchPlanItems(CONST.PLAN_ID, 'product')
        this.props.actions.products.fetchProducts()
        this.props.actions.salesreport.fetchSalesReport()
        this.props.actions.salepointlist.fetchSalesPointList()
    }

    getDocumentNumber(){
        const {salesplanlist} = this.props
        if(!salesplanlist) return 0
        return salesplanlist.findIndex(plan => plan.id == CONST.PLAN_ID) + 1000
    }

    render(){    
        // console.log(this.props.salesplan)
        // console.log(this.props.salesreport)
        // console.log(this.props.salesplanlist)
        // console.log(this.props.salepointlist)
        return (
            <div className={styles.container}>
                <Header 
                    salesplan={this.props.salesplan}
                    salepointlist={this.props.salepointlist}
                    onSubmit={this.props.actions.salesplan.updateSalesPlan}
                />
                <TurnoverPlan/>
                <ProductsPlan/>
            </div>
        )
    }
}