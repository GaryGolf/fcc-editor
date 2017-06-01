import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'

const {connect} = require('react-redux')

interface Props {
    salesplan?: SalesPlan
    actions?: Actions.Interface
}

@connect(
    state => ({
        salesplan: state.salesplan as SalesPlan,
        planitems: state.planitems as PlanItem[]
    }),
    dispatch => ({
        actions: {
            salesplan: bindActionCreators(Actions.salesplan as any, dispatch),
            planitems: bindActionCreators(Actions.planitems as any, dispatch)
        } 
    })
)
export default class MainScreen extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)
    }

    componentDidMount(){
        this.props.actions.salesplan.fetchSalesPlan(CONST.PLAN_ID)
        this.props.actions.planitems.fetchPlanItems(CONST.PLAN_ID, 'products')

    }

    render(){    
        console.log(this.props.salesplan)
        return (
            <div className={styles.container}>
              Hello world
            </div>
        )
    }
}