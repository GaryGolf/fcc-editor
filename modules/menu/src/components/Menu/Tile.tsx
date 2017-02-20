import * as React from 'react'
import DropTarget from 'react-dnd/lib/DropTarget'
const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    onClick: () => void
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: (Element: any) => any
}

const boxTarget = {
  drop(props) {return { cell: props.cell }}
}

@DropTarget('PRODUCT', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Tile extends React.Component<Props, null>{

    constructor(props: Props){
        super(props)
    }

    render(){

        const { menuItem, canDrop, isOver, connectDropTarget } = this.props
        const isBusy = !!menuItem.id

        const tileStyle =[
            style.container, 'well',
            canDrop && isOver ? style.active : null
        ].join(' ')

        const text = isBusy ? menuItem.name : '+'

        const textStyle = [
            isBusy ? style.category : style.plus
        ].join(' ')

        return connectDropTarget(
            <div className={tileStyle} onClick={this.props.onClick.bind(this)}>
                <div className={textStyle}>{text}</div>
            </div>
        )
    }
}