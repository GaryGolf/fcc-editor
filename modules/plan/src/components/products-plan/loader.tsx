import * as React from 'react'
import * as styles from './loader.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
const {connect} = require('react-redux')
import {createDays} from '../utils'

import Menu from '../modals/menu'


interface Props {
    // salesplan?: SalesPlan
    salesreport?: Array<SalesReport>
    salesplanlist?: Array<SalesPlan>
    products?: Array<Product> 
    // salepointlist?: Array<SalePoint>
    actions?: Actions.Interface
}
interface State {
    showMenu: boolean
    menu: Array<string>
}

@connect(
    state => ({
        // salesplan: state.salesplan as SalesPlan,
        // planitems: state.planitems as PlanItem[],
        products: state.products as Product[],
        salesreport: state.salesreport as SalesReport[],
        salesplanlist: state.salesplanlist as SalesPlan[],
        // salepointlist: state.salepointlist as SalePoint[]
    }),
    dispatch => ({
        actions: {
            // salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch),
            // products: bindActionCreators(Actions.products as any, dispatch),
            salesreport: bindActionCreators(Actions.salesreport as any, dispatch),
            salesplanlist: bindActionCreators(Actions.salesplanlist as any, dispatch),
            // salepointlist: bindActionCreators(Actions.salepointlist as any, dispatch)
        } 
    })
)
export default class Loader extends React.Component <Props, State> {

    private mainMenu: Array<string> 

    constructor(props:Props){
        super(props)
        this.mainMenu = [CONST.TXT.LOAD_FROM_SAVED,CONST.TXT.LOAD_FROM_PERIOD]
        this.state = {
            showMenu: false,
            menu: this.mainMenu
        }
    }

    importPlanItemsFromReport(){
        this.props.salesreport.forEach(reportItem => {
            const product = this.props.products.find(item => item.id == reportItem.product_id)
            if(!product) return
            const body: PlanItem = {
                item_id: product.id,
                planning_document_id: CONST.PLAN_ID,
                plan: reportItem.quantity,
                type: 'product',
                percent: 0,
                price: product.price,
                cost_price: product.cost_price,
                days: createDays(true, reportItem.quantity)
            }
            this.props.actions.planitems.createPlanItem(body)
        })
    }


    handleOnSelect(menuItem: string){

        switch(menuItem){
            case CONST.TXT.LOAD_FROM_SAVED :
                console.log(' show saved plans')
                console.log(this.props.salesplanlist)
                const menu = this.props.salesplanlist.map(item=> item.number)
                this.setState({menu})
                break
            case CONST.TXT.LOAD_FROM_PERIOD :
                console.log('Load data from las month report')
                console.log(this.props.salesreport)
                this.setState({showMenu:false, menu:this.mainMenu})
                this.importPlanItemsFromReport()
                break
            default :
                if(this.props.salesplanlist.some(item => item.number == menuItem)){
                    console.log('Load: ',menuItem)
                    this.setState({showMenu:false, menu:this.mainMenu})
                }
        }
    }
    render(){
        if(!this.props.salesplanlist) return null
        return (
            <span className={styles.container}>
                <button className="btn btn-default btn-sm"
                    onClick={()=>this.setState({showMenu: true})}>
                    {CONST.TXT.LOAD}&nbsp;
                    <span className="caret"/>
                </button>
                <Menu
                    visible={this.state.showMenu}
                    onClose={()=>this.setState({showMenu:false, menu:this.mainMenu})}
                    onSelect={this.handleOnSelect.bind(this)}
                    menu={this.state.menu}
                />
            </span>
        )
    }
}