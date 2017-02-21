import * as React from 'react'
import DropTarget from 'react-dnd/lib/DropTarget'
import { bindActionCreators } from 'redux'
import { RootState } from '../../reducers'
// import ActionCreator from '../../actions'
import * as MenuActions from '../../actions/menu'
import * as ViewActions from '../../actions/view'
import {checkout} from './utils'

const {connect} = require('react-redux')
const style = require('./tile.css')

interface Props { 
    cell: number
    menuItem: MenuItem
    menu?: MenuState
    nomenclature?: ProductCategory
    actions?: MenuActions.Interface
    navigate?: ViewActions.Interface
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
        actions: bindActionCreators(MenuActions as any, dispatch),
        navigate: bindActionCreators(ViewActions as any, dispatch)
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

        const { menuItem, canDrop, isOver, connectDropTarget, actions, navigate } = this.props
        const isBusy = !!menuItem.id

        const tileStyle = [
            style.container, 'well',
            canDrop && isOver ? style.active : null
        ].join(' ')

        const text = isBusy ? menuItem.name : '+'

        const textStyle = [
            isBusy ? style.category : style.plus
        ].join(' ')

        const btnGrpStyle = [
            isBusy ? style['button-group'] : style.none
        ].join(' ')
        console.log(btnGrpStyle)
        return connectDropTarget(
            <div className={tileStyle}>
                <div className={textStyle}>{text}</div>
                <div className={btnGrpStyle}>
                     <button className="btn btn-info btn-sm"
                            onClick={()=>navigate.showMenuEditModal(menuItem)}>
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                    <button className="btn btn-danger btn-sm" 
                            onClick={()=>actions.removeMenuItem(menuItem)}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button>
                </div>
            </div>
        )
    }
}