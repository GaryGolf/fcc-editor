import * as React from 'react'
import DropTarget from 'react-dnd/lib/DropTarget'
import { bindActionCreators } from 'redux'
import { RootState } from '../../reducers'
import ActionCreator from '../../actions'
import * as MenuActions from '../../actions/menu'
import {checkout} from './utils'

const {connect} = require('react-redux')
const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    menu?: MenuState
    nomenclature?: ProductCategory
    actions?: any
    canDrop?: boolean
    isOver?: boolean
    itemType?: string
    connectDropTarget?: (Element: any) => any
}



const boxTarget = {
    drop(props, monitor) {

       checkout(props, monitor)
        
        const {cell, menuItem} = props
        return {cell, menuItem}
    }
}
@connect(
    state => ({
        menu: state.menu,
        nomenclature: state.nomenclature        
    }), dispatch => ({
        actions: bindActionCreators(MenuActions as any, dispatch) 
    })
)
@DropTarget(['PRODUCT','CATEGORY'], boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
export default class Tile extends React.Component<Props, null>{

    render(){

        const { menuItem, canDrop, isOver, connectDropTarget } = this.props
        const isBusy = !!menuItem.id

        const tileStyle = [
            style.container, 'well',
            canDrop && isOver ? style.active : null
        ].join(' ')

        const text = isBusy ? menuItem.name : '+'

        const textStyle = [
            isBusy ? style.category : style.plus
        ].join(' ')

        return connectDropTarget(
            <div className={tileStyle} onClick={()=>console.log('show modal')}>
                <div className={textStyle}>{text}</div>
            </div>
        )
    }
}