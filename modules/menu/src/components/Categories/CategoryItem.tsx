import * as React from 'react'
import  DragSource  from 'react-dnd/lib/DragSource'

const style = require('./category-item.css')

interface Props {
    name: string
    onClick: any
    isDragging?: boolean
    connectDragSource?: (Element: any) => any
}

const boxSource = {
  beginDrag(props) {
    return {name: props.name}
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
        console.log(`You dropped ${item.name} into cell #${dropResult.cell}!`)
    }  
  }
}

@DragSource('PRODUCT', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class CategoryItem extends React.Component<Props, null>{

    render(){
        const {name, onClick, isDragging, connectDragSource} = this.props
        
        return connectDragSource(
            <div className={style.container}
                onClick={onClick}>
                {name}
            </div>
        )
    }
}