import * as React from 'react'
import * as DnD from 'react-dnd'
import DragSource from 'react-dnd/lib/DragSource'
import * as Actions from '../../actions'
import * as CONST from '../../constants'

const style = require('./category-item.css')

interface Props {
    category: ProductCategory
    actions: Actions.Interface
    isDragging?: boolean
    connectDragSource?: DnD.ConnectDragSource
}

interface DragSourceCategory {
    category: ProductCategory
}

const boxSource: DnD.DragSourceSpec<DragSourceCategory> = {
  beginDrag(props: Props): DragSourceCategory {
    return { category: props.category as ProductCategory }
  }
}

const collect: DnD.DragSourceCollector = 
    (connect: DnD.DragSourceConnector, monitor: DnD.DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
})

@DragSource(CONST.CATEGORY, boxSource, collect)
export default class CategoryItem extends React.Component<Props, null>{

    render(){
        const {category, actions, isDragging, connectDragSource} = this.props
        
        return connectDragSource(
            <div className={style.container}
                onClick={()=>actions.category.select(category)}>
                {category.name}
            </div>
        )
    }
}