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
        category: props.category as ProductCategory
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (!dropResult) return

    console.log(`dropped ${item.category.name} into cell # ${dropResult.cell}`)

  }
}

@DragSource('CATEGORY', boxSource, (connect, monitor) => ({
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