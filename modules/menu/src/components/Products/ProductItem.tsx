import * as React from 'react'
const { DragSource } = require('react-dnd')

const style = require('./product-item.css')

interface Props {
    connectDragSource?: (Element: any) => any
    isDragging?: boolean
    name: string
}
interface State {}

const boxSource = {
  beginDrag(props) {
    return {name: props.name}
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) console.log(`You dropped ${item.name} into ${dropResult.name}!`)
    
  }
}
@DragSource('PRODUCT', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class ProductItem extends React.Component<Props,State>{

    render(){
        console.log('============')
        const { name, isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return (
            <div className={style.container} style={{opacity}}>
                {name}
            </div>
        )
    }
}