const uuid = require('uuid')
import {Interface as MenuActionsInterface} from '../../actions/menu'

export function checkProduct(
    cell: number, 
    menuItem: MenuItem, 
    product: Product, 
    actions: MenuActionsInterface): void{

    if(!menuItem.id){ //create new menuItem from  dropped product
        const item  = { id: uuid(), color: '', icon: '', name: product.name, cell, products: [product], product_categories: [] }
        actions.dropProduct(item)  
    } else if(menuItem.product_categories.length > 0) { // its not single product
        if(menuItem.products.some(item => item.id == product.id)) return // already exist
        if(menuItem.product_categories.some(item => (
            item.id == product.product_category_id))) return  //parent category is in the list already
        const products = [...menuItem.products, product]
        actions.dropAdditionalProduct({...menuItem, products})  
    }
}

export function checkCategory(
    cell: number, 
    menuItem: MenuItem,
    category: ProductCategory,
    actions: MenuActionsInterface ): void {

    const {id, color, icon, name, products} = category

    if(!menuItem.id){ //create new menuItem from  dropped category
        const product_categories = [{id, color, icon, name, products}]
        const item  = { id: uuid(), color, icon, name, cell, products: [], product_categories }
        actions.dropCategory(item)  
    } else if(menuItem.product_categories.length > 0){    // add category to the product_categories array 
        if(menuItem.product_categories.some(item => item.id == id)) return // already exist
        const product_categories = [...menuItem.product_categories, {id, color, icon, name, products}]
        actions.dropAdditionalCategory({...menuItem, product_categories})  
    }
}