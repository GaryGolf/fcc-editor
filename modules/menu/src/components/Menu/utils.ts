const uuid = require('uuid')

export function checkout(props, monitor): void{

    console.log()
    switch(monitor.getItemType()){
        case 'CATEGORY' :
            checkCategory(props, monitor.getItem().category)
            break;
        case 'PRODUCT' :
            checkProduct(props, monitor.getItem().product)

        default :
    }
}
// declare interface Product {
//     id: string
//     product_category_id: string
//     description: string
//     price: number
//     measure: string
// }
// declare interface MenuItem {
//     id: string
//     icon: string
//     name: string
//     color: string
//     cell: number
//     products: Array<Product>
//     product_categories: Array<ProductCategory>
// }

function checkProduct(props, product: Product): void{
    const {cell, menuItem, actions} = props
    if(!menuItem.id){ //create new menuItem from  dropped product
        const item  = { id: uuid(), color: '', icon: '', name: product.description, cell, products: [product], product_categories: [] }
        actions.dropProduct(item)  
    }
}

function checkCategory(props, category: ProductCategory): void {

    
    const {id, color, icon, name, products} = category
    const {cell, menuItem, actions} = props

    if(!menuItem.id){ //create new menuItem from  dropped category
        const product_categories = [{id, color, icon, name, products}]
        const item  = { id: uuid(), color, icon, name, cell, products: [], product_categories }
        actions.dropCategory(item)  
    } else {    // add category to the product_categories array
        if(menuItem.product_categories.some(item => item.id == id)) return // already exist
        const product_categories = [...menuItem.product_categories, {id, color, icon, name, products}]
        actions.dropAdditionalCategory({...menuItem, product_categories})  
    }
}