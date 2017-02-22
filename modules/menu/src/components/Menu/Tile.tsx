import * as React from 'react'
import * as DnD from 'react-dnd'
import DropTarget from 'react-dnd/lib/DropTarget'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {checkProduct, checkCategory} from './utils'

const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    // menu: MenuState
    actions: Actions.Interface
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: DnD.ConnectDropTarget
}

const boxTarget:DnD.DropTargetSpec<any> = {

    drop(props: Props, monitor:DnD.DropTargetMonitor): void {

        const {cell, menuItem, actions } = props
        switch(monitor.getItemType()){
            case CONST.CATEGORY :
                const category = monitor.getItem()['category'] as ProductCategory
                checkCategory(cell, menuItem, category, actions.menu)
                break;
            case CONST.PRODUCT :
                const product =  monitor.getItem()['product'] as Product
                checkProduct(cell, menuItem, product, actions.menu)
            default :
        }
    }
}
const collect: DnD.DropTargetCollector = 
    (connect: DnD.DropTargetConnector, monitor:DnD.DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
})

@DropTarget([CONST.PRODUCT, CONST.CATEGORY], boxTarget, collect)
export default class Tile extends React.Component<Props, null>{


    render(){

        const { menuItem, canDrop, isOver, connectDropTarget, actions } = this.props
        const isBusy = !!menuItem.id
        const tileStyle = [style.container, 'well', canDrop && isOver ? style.active : null ].join(' ')
        const text = isBusy ? menuItem.name : '+'
        const textStyle = [ isBusy ? style.category : style.plus ].join(' ')
        const btnGrpStyle = [ isBusy ? style['button-group'] : style.none ].join(' ')

        return connectDropTarget(
            <div className={tileStyle}>
                <div className={textStyle}>{text}</div>
                <div className={btnGrpStyle}>
                     <button className="btn btn-info btn-sm"
                            onClick={()=>actions.view.showMenuEditModal(menuItem)}>
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                    <button className="btn btn-danger btn-sm" 
                            onClick={()=>actions.menu.removeMenuItem(menuItem)}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>
        )
    }
}