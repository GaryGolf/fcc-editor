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
import Footer from '../components/footer'

interface Props {
    salesplan?: SalesPlan
    planitems?: Array<PlanItem>
    salesreport?: Array<SalesReport>
    salesplanlist?: Array<SalesPlan>
    salepointlist?: Array<SalePoint>
    actions?: Actions.Interface
}

interface State {}

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
export default class MainScreen extends React.Component<Props, State> {

    constructor(props: Props){
        super(props)
     }

    componentDidMount(){
        this.props.actions.salesplanlist.fetchSalesPlanList()
        this.props.actions.salesplan.fetchSalesPlan(CONST.PLAN_ID)
        this.props.actions.planitems.fetchTurnoverItem(CONST.PLAN_ID)
        this.props.actions.planitems.fetchPlanItems(CONST.PLAN_ID)
        this.props.actions.products.fetchProducts()
        
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.salesplan && !this.props.salesplan) {
            this.props.actions.salesreport.fetchSalesReport(nextProps.salesplan.sale_point_id)
            this.props.actions.salepointlist.fetchSalesPointList()
        }
    }


    render(){    
        const {salesplan, salepointlist} = this.props
        if(!salesplan || !salepointlist) return null
        return (
            <div className={styles.container}>
                <Header 
                    salesplan={this.props.salesplan}
                    salepointlist={this.props.salepointlist}
                    planitems={this.props.planitems}
                    actions={this.props.actions}
                />
                <TurnoverPlan/>
                <ProductsPlan/>
                <Footer
                    salesplan={this.props.salesplan}
                    planitems={this.props.planitems}
                    actions={this.props.actions}
                />
            </div>
        )
    }
}