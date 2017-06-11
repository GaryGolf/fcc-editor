import * as React from 'react'
import * as styles from './loader.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'

import * as API from '../../api'
import { bindActionCreators } from 'redux'
const {connect} = require('react-redux')
import {createDays, getPeriodPoints, getPeriods, getMonth} from '../utils'

import Menu from '../modals/menu'


interface Props {
    planitems?: Array<PlanItem>
    salesplan?: SalesPlan
    salesreport?: Array<SalesReport>
    salesplanlist?: Array<SalesPlan>
    products?: Array<Product> 
    // salepointlist?: Array<SalePoint>
    actions?: Actions.Interface
}
interface State {
    showMenu: boolean
    showSpinner: boolean
    menu: Array<string>
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[],
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
            showSpinner: false,
            menu: this.mainMenu
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.showSpinner) this.setState({showSpinner: false})
    }

    handleMenuSelect(menuItem: string){
        const periods = this.props.salesreport
            .reduce((acc,item) => {
                if(acc.includes(item.date)) return acc
                return [...acc,item.date]
            },[])
        const monthMenu = periods.map(date=>getMonth(new Date(date)))
        const documentMenu = this.props.salesplanlist
                    .filter(item=>item.number!=this.props.salesplan.number)
                    .map(item=> item.number)

        switch(menuItem){
            case CONST.TXT.LOAD_FROM_SAVED : {
                this.setState({menu: documentMenu})
                break
            }
            case CONST.TXT.LOAD_FROM_PERIOD : {
                console.log('Load data from las month report')
                this.setState({menu: monthMenu})
                break
            }
            default :
                if(documentMenu.includes(menuItem)){
                    const plan = this.props.salesplanlist.find(item=>item.number==menuItem) as SalesPlan
                    this.setState({showMenu:false, menu:this.mainMenu, showSpinner: true}, ()=>{
                        console.log('---------', plan)
                        if(!plan) return
                        const id = plan.id
                        console.log(id)
                        this.props.actions.planitems.loadFromDocument(id,'product')
                    })
                } else if (monthMenu.includes(menuItem)){
                    const idx = monthMenu.findIndex(item=>item==menuItem)
                    const month = periods[idx]
                    const report = this.props.salesreport
                        .filter(item=>item.date==month)
                        .map(item => {
                            const product = this.props.products.find(prod => prod.id == item.product_id)
                            if(!product) return null
                            return  {
                                item_id: product.id,
                                planning_document_id: CONST.PLAN_ID,
                                plan: item.quantity,
                                type: 'product',
                                percent: 0,
                                price: product.price,
                                cost_price: product.cost_price,
                                days: createDays(true, item.quantity)
                            } as PlanItem })
                        .filter(item=>!!item)
                    this.setState({showMenu:false,menu:this.mainMenu,showSpinner:true},()=>{
                        this.props.actions.planitems.loadFromReport(report.slice(1,3)) // ToDo !!hard
                    })

                } else this.setState({showMenu:false, menu:this.mainMenu})
        }
    }
    render(){
        if(!this.props.salesplanlist || !this.props.salesreport.length) return null
        const spinner = !this.state.showSpinner ? <span className="glyphicon glyphicon-cloud-download"/> 
            : <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> 
        return (
            <span className={styles.container}>
                <button className="btn btn-default btn-sm"
                    onClick={()=>this.setState({showMenu: true})}>
                    {spinner}&nbsp;{CONST.TXT.LOAD}&nbsp; 
                    <span className="caret"/>
                </button>
                <Menu
                    visible={this.state.showMenu}
                    onClose={()=>this.setState({showMenu:false, menu:this.mainMenu})}
                    onSelect={this.handleMenuSelect.bind(this)}
                    menu={this.state.menu}
                />
            </span>
        )
    }
}