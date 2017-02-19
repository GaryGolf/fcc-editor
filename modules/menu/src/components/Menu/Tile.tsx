import * as React from 'react'
const { DropTarget } = require('react-dnd')
const style = require('./tile.css')

interface Props { 
    onClick: () => void
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: (Element: any) => any
}
interface State {}

const boxTarget = {
  drop() {return { name: 'Dustbin' }}
}

@DropTarget('PRODUCT', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Tile extends React.Component<Props, State>{

    constructor(props: Props){
        super(props)
    }

    render(){

        const { canDrop, isOver, connectDropTarget } = this.props;

        const tileStyle =[
            style.container, 'well',
            canDrop && isOver ? style.active : null
        ].join(' ')


        return connectDropTarget(
            <div className={tileStyle} onClick={this.props.onClick.bind(this)}>
                <div>+</div>
            </div>
        )
    }
}