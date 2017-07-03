import * as React from 'react'
import * as DnD from 'react-dnd'
import DropTarget from 'react-dnd/lib/DropTarget'
import * as Actions from '../../actions'
import * as CONST from '../../constants'
import {checkProduct, checkCategory} from './utils'

import Icon from '../Common/icon'

const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    actions: Actions.Interface
    onClick(menuItem:MenuItem):void
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

        const { menuItem, canDrop, isOver, connectDropTarget, actions, onClick } = this.props
        const isCellOccupied = !!menuItem.id
        const tileStyle = [style.container, 'well', canDrop && isOver ? style.active : null ].join(' ')
        const text = isCellOccupied ? <div className={style.text}>{menuItem.name}</div> : <div className={style.cell}/>

        /*const buttonGroup = isCellOccupied ? (
            <div className={style['button-group']}>
                <button className="btn btn-info btn-sm"
                        onClick={()=>actions.view.showMenuEditModal(menuItem)}>
                    <span className="glyphicon glyphicon-edit"/>
                </button>
                <button className="btn btn-danger btn-sm" 
                        onClick={()=>{
                            if(window.confirm(CONST.R_U_SURE + menuItem.name + '?'))
                            actions.menu.removeMenuItem(menuItem)}}>
                    <span className="glyphicon glyphicon-trash"/>
                </button>
            </div>
        ) : null*/

        return connectDropTarget(
            <div className={tileStyle}
                onClick={()=> {if(isCellOccupied) onClick(menuItem)}}>
                {text}
                <div className={style.icon}>
                    <Icon menuItem={menuItem} />
                </div>
                {/*{buttonGroup}*/}
            </div>
        )
    }
}