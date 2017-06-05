import * as React from 'react'
import * as styles from './products-plan.css'

import NewItemModal from '../modals/new-product-item'
import EditProductItem from '../modals/edit-product-item'
import ProductsTable from '../products-table'

interface Props {}
interface State {
    showNewItemModal: boolean
    showEditItemModal: boolean
}

export default class ProductsPlan extends React.Component<Props, State> {
    private currentItem:PlanItem
    constructor(props:Props){
        super(props)
        this.state={
            showNewItemModal: false,
            showEditItemModal: false
        }
        this.currentItem = null
    }
    addNewItemHandler(){
        this.setState({showNewItemModal: true})
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
                <button className="btn btn-default"
                    onClick={this.addNewItemHandler.bind(this)}>
                    Add
                </button>
                <ProductsTable 
                    onEdit={this.editProductItemHandler.bind(this)}
                />
            </div>
        )
    }
}