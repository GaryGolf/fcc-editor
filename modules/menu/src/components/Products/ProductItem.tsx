import * as React from 'react'
import  DragSource  from 'react-dnd/lib/DragSource'

const style = require('./product-item.css')

interface Props {
    product: Product
    connectDragSource?: (Element: any) => any
    isDragging?: boolean
}

const boxSource = {
  beginDrag(props) {
    return { 
        product: props.product
    }
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
export default class ProductItem extends React.Component<Props, null>{

    render(){
        const { product, isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return connectDragSource(
            <div className={style.container} style={{opacity}}>
                {product.description}
            </div>
        )
    }
}