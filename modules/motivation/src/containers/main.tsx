import * as React from 'react'
import * as styles from './main.css'
import * as Actions from '../actions'
import * as CONST from '../constants'
import { bindActionCreators } from 'redux'

const {connect} = require('react-redux')

interface Props {
    salesplan?: {SalesPlan}
    actions?: Actions.Interface
}

@connect(
    state => ({
        salesplan: state.planning as {SalesPlan},
    }),
    dispatch => ({
        actions: {
            planning: bindActionCreators(Actions.Planning as any, dispatch)
        } 
    })
)
export default class MainScreen extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)
    }

    componentDidMount(){
        this.props.actions.planning.fetchSalesPlan(CONST.PLAN_ID)
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