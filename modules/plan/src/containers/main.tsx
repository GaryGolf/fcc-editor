import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'
import {createDays, toSeconds} from '../components/utils'
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

    private id: string = null

    componentDidMount(){

        this.id = document.querySelector("#planning-document-wrapper").getAttribute('data-id')
        
        this.props.actions.products.fetchProducts()
        this.props.actions.salesplanlist.fetchSalesPlanList()
        this.props.actions.salepointlist.fetchSalesPointList()

        // this.props.actions.planitems.fetchPlanItems(this.id)

        if(!this.id) return
        this.props.actions.planitems.fetchTurnoverItem(this.id)
        this.props.actions.salesplan.fetchSalesPlan(this.id)
        this.props.actions.planitems.fetchTagItems(this.id)
        this.props.actions.planitems.fetchProductItems(this.id)
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.salepointlist && !this.props.salepointlist.length && !this.id){
            const sale_point = nextProps.salepointlist[0]
            if(!sale_point) return
            const plan = this.createSalesPlan(sale_point.id)
            this.props.actions.salesplan.createSalesPlan(plan)
        }
        if(!!nextProps.salesplan && !this.props.salesplan) {
            const plan = nextProps.salesplan
            this.props.actions.salesreport.fetchSalesReport(plan.sale_point_id)
            if(!this.id){
                const item = this.createPlanItem(plan)
                this.props.actions.planitems.createTurnoverItem(item)
                this.props.actions.salesplan.fetchSalesPlan(plan.id)
                this.props.actions.planitems.fetchTagItems(plan.id)
                this.props.actions.planitems.fetchProductItems(plan.id)
            }
        }
    }

    createSalesPlan(sale_point_id): SalesPlan{
        return {
            id:'',
            number: '00000',
            sale_point_id,
            period: toSeconds(Date.now()),
            comment: ''
        }
    }

    createPlanItem(plan:SalesPlan): PlanItem{
        return {
            item_id: plan.sale_point_id,
            planning_document_id: plan.id,
            plan: 0,
            type: 'sale-point',
            percent:0,
            days: createDays(plan.period,false,0)
        }
    }

    render(){    
        const {salesplan, salepointlist} = this.props
        if(!salesplan || !salepointlist) return null
        return (
            <div className="main-content">
                <div className="main-content__center">
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
            </div>
        )
    }
}