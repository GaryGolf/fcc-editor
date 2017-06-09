import * as React from 'react'
import * as styles from './products-plan.css'
import * as CONST from '../../constants'

import NewItemModal from '../modals/new-product-item'
import EditProductItem from '../modals/edit-product-item'
import ProductsTable from '../products-table'
import Menu from '../modals/menu'

interface Props {}
interface State {
    showNewItemModal: boolean
    showEditItemModal: boolean
    showLoadMenu: boolean
}

export default class ProductsPlan extends React.Component<Props, State> {
    private currentItem:PlanItem
    constructor(props:Props){
        super(props)
        this.state={
            showNewItemModal: false,
            showEditItemModal: false,
            showLoadMenu: false
        }
        this.currentItem = null
    }
    editProductItemHandler(item:PlanItem){
        this.currentItem = item
        this.setState({showEditItemModal: true})
    }
    render(){
        return (
            <div className={styles.container}>
                <NewItemModal
                    onClose={()=>this.setState({showNewItemModal: false})}
                    visible={this.state.showNewItemModal}
                />
                <EditProductItem
                    planItem={this.currentItem}
                    onClose={()=>this.setState({showEditItemModal: false})}
                    visible={this.state.showEditItemModal}
                />
               
                <div className="form-group">
                    <button className="btn btn-primary btn-sm"
                        onClick={()=>this.setState({showNewItemModal: true})}>
                        <span className="glyphicon glyphicon-plus"/>&nbsp;
                        {CONST.TXT.ADD_PRODUCT}
                    </button>&nbsp;
                    <span>
                    <button className="btn btn-default btn-sm"
                        onClick={()=>this.setState({showLoadMenu: true})}>
                       {CONST.TXT.LOAD}&nbsp;
                        <span className="caret"/>
                    </button>
                         <Menu
                            visible={this.state.showLoadMenu}
                            onClose={()=>this.setState({showLoadMenu:false})}
                            menu={[CONST.TXT.LOAD_FROM_SAVED,CONST.TXT.LOAD_FROM_PERIOD]}
                        />
                    </span>
                </div>
                <ProductsTable 
                    onEdit={this.editProductItemHandler.bind(this)}
                />
            </div>
        )
    }
}