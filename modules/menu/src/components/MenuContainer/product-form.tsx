import * as React from 'react'
import * as styles from './product-form.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'

import IconPicker from '../Common/icon-picker'
import Selectize from '../Common/selectize'
import ConfirmDelete from '../Modals/confirm-delete'
import ParentSelector from '../Common/parent-selector'

interface Props {
    menu: Menu
    menuItemID: string
    productID: string
    actions: Actions.Interface
    onClose():void
}
interface State {
    menuItem:MenuItem
    showIconMenu: boolean
    showDeleteConfirm: boolean
}

export default class ProductForm extends React.Component <Props, State> {
    private nameInput: HTMLInputElement
    private parentID: string

     constructor(props: Props){
        super(props)

        
        this.state = {
            menuItem: this.findMenuItem(props.menuItemID, props.menu),
            showIconMenu: false,
            showDeleteConfirm: false
        }
        this.parentID = this.state.menuItem.id
    }

     componentWillReceiveProps(nextProps) {
        const menuItem = this.findMenuItem(nextProps.menuItemID, nextProps.menu)
        this.setState({menuItem})
    }

    findMenuItem(id:string, menu:Menu ): MenuItem {
        return menu.child_menus.find(item=> item.id == id)
    }

    selectParent(parent_id:string){
        this.parentID = parent_id
    }

    saveMenuItem() {
        if(this.parentID != this.state.menuItem.id) {
           this.addProduct()
           this.removeProduct()
        }
    }

    addProduct(){
        const parentID = this.parentID
        const menuItem = this.findMenuItem(this.parentID, this.props.menu)
        const {productID, actions} = this.props
        const {products, product_categories, excluded_products, products_total} = menuItem

        if(excluded_products.some(item=>item.id==parentID)){ // is it in excluded
            actions.menu.updateMenuItem({...menuItem,
                excluded_products: excluded_products.filter(item=>item.id!=productID)
            })
        } else if(products_total.some(item=>item.id==parentID)) { // is it in prosucts_total
            //ok
        } else { // add to products
            const product = this.state.menuItem.products_total.find(item=> item.id == productID)
            actions.menu.updateMenuItem({
                ...menuItem, 
                products: [...products, product]
            })
        }
    }

    removeProduct() {

        const {productID, actions} = this.props
        const {products, product_categories, excluded_products, products_total} = this.state.menuItem
        
        this.setState({showDeleteConfirm:false})

        if(products.some(item => item.id == productID)){
            if(product_categories.length == 0 && products.length == 1){ // it's single product, kill it
                actions.menu.removeMenuItem(this.state.menuItem)
            } else { // remove from products
                const menuItem = {
                    ...this.state.menuItem, 
                    products: products.filter(item=>item.id!=productID)
                }
                actions.menu.updateMenuItem(menuItem)
            }
        } else if(excluded_products.some(item=> item.id == productID)){ // remove from excluded
            const menuItem = {
                ...this.state.menuItem, 
                excluded_products: excluded_products.filter(item=>item.id!=productID)
            }
            actions.menu.updateMenuItem(menuItem)
        } else { // add to excluded_products
            const product = products_total.find(item=> item.id == productID)
            const menuItem = {
                ...this.state.menuItem, 
                excluded_products: [...excluded_products, product]
            }
            actions.menu.updateMenuItem(menuItem)
        }   
    }

  
  
    render(){
        if(!this.state.menuItem) return null
        const product = this.state.menuItem.products_total.find(item=> item.id == this.props.productID)

        if(!product) return null

        return (
            <div className={styles.form}>
                  <ConfirmDelete
                    visible={this.state.showDeleteConfirm}
                    name={product.name}
                    onClose={()=>this.setState({showDeleteConfirm: false})}
                    onDelete={this.removeProduct.bind(this)}
                />
                 <div className="form-group">
                    <label className="control-label">
                        {CONST.NAME}
                    </label>
                    <input  key={product.name}
                        type="text"
                        ref={element=>this.nameInput=element}
                        className="form-control"
                        placeholder = {CONST.ENTER_CATEGORY_NAME}
                        defaultValue={product.name}
                        disabled
                    />
                </div>
                 <div className="form-group">
                    <label className="control-label">
                        {CONST.PARENT}
                    </label>
                    <ParentSelector
                        key={this.props.menuItemID}
                        menu={this.props.menu}
                        defaultValue={this.props.menuItemID}
                        onSelect={this.selectParent.bind(this)}
                    />
                </div>
                <div className="form-group" style={{float: 'right'}}>
                    <button className="btn btn-danger" 
                        onClick={()=>this.setState({showDeleteConfirm:true})}>
                        <span className="glyphicon glyphicon-trash"/>&nbsp;
                        {CONST.DELETE}
                    </button> 
                    <button className="btn btn-primary"
                        onClick={this.saveMenuItem.bind(this)}>
                        {CONST.SAVE}
                    </button> 
                </div>
            </div>
        )

    }
}
