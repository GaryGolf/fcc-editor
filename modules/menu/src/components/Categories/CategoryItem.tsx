import * as React from 'react'
import  DragSource  from 'react-dnd/lib/DragSource'

const style = require('./category-item.css')

interface Props {
    category: ProductCategory
    actions: any
    isDragging?: boolean
    connectDragSource?: (element: any) => any
}

const boxSource = {
  beginDrag(props) {
    return {
        type: 'CATEGORY',
        category: props.category as ProductCategory
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (!dropResult) return

    console.log(`dropped ${item.category.name} into cell # ${dropResult.cell}`)
    
    

    // const {cell, menuItem } = dropResult
    // console.log(menuItem)
    // const {id, color, icon, name, products} = item.category
    // if(!!menuItem.id){
    //     console.log(menuItem.name)
    //     const { product_categories }  = menuItem 
    //     if(product_categories.indexOf(id) >= 0) return // already exist
    //     const category = {...menuItem, product_categories: [...product_categories, id] }
    //     props.actions.dropCategory(category)
    //     return
    // } 

    // const product_categories = [item.category.id]
    // const category: MenuItem = { id, color, icon, name, cell, products, product_categories }
    // props.actions.dropCategory(category)

  }
}

@DragSource('PRODUCT', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class CategoryItem extends React.Component<Props, null>{

    render(){
        const {category, actions, isDragging, connectDragSource} = this.props
        
        return connectDragSource(
            <div className={style.container}
                onClick={()=>actions.select(category)}>
                {category.name}
            </div>
        )
    }
}