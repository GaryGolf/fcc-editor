import * as React from 'react'
import * as CONST from '../../constants'
import * as styles from './menu-list.css'
import * as DnD from 'react-dnd'
import * as Actions from '../../actions'
import DropTarget from 'react-dnd/lib/DropTarget'
import { bindActionCreators } from 'redux'
import {checkCategory, checkProduct} from '../MenuContainer/utils'
import Icon from '../Common/icon'

const {connect} = require('react-redux')

interface Props {
    menuItem: MenuItem
    onSelect(menuItemID:string, productID:string): void
    actions?: Actions.Interface
    canDrop?: boolean
    isOver?: boolean
    connectDropTarget?: DnD.ConnectDropTarget
}
interface State {
    opened: boolean
}
const boxTarget:DnD.DropTargetSpec<any> = {

    drop(props: Props, monitor:DnD.DropTargetMonitor): void {

        const {menuItem, actions } = props
        const cell = menuItem.cell
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
@connect(
    state => ({}),
    dispatch => ({
        actions: {
            menu: bindActionCreators(Actions.Menu as any, dispatch)
        } 
    })
)
@DropTarget([CONST.PRODUCT, CONST.CATEGORY], boxTarget, collect)
export default class MenuListItem extends React.Component <Props, State> {

    state = {opened:false}

    shouldComponentUpdate(nextProps, nextState){
        return (
            nextProps.menuItem != this.props.menuItem ||
            nextProps.isOver != this.props.isOver ||
            nextProps.canDrop != this.props.canDrop ||
            nextState.opened != this.state.opened 
        )
    }
    
    render(){
        const {opened} = this.state
        const {menuItem, isOver, canDrop} = this.props
        
        const listStyle = [
            "row list-group-item",
            isOver && canDrop ? styles.active : null,
            styles['list-item']
        ].join(' ')

        const productStyle = [
            'list-group-item',
            styles.pointer
        ].join(' ')

        const folderStyle =[
            opened ? "col-xs-1 glyphicon glyphicon-folder-open" : "col-xs-1 glyphicon glyphicon-folder-close",
            styles.pointer
        ].join(' ')


        const style = !menuItem.color ? null : {borderLeft: `5px solid ${menuItem.color}`}

            // ToDo waiting backend 
            // products total should reduce while added excluded_products
        const products = opened ? menuItem.products_total.map(product => (
                <li key={product.id} 
                    //onClick={()=>this.props.onSelect(menuItem.id, product.id)}
                    className={productStyle}>
                    <span className="glyphicon glyphicon-menu-down"/> &nbsp;
                    {product.name}
                </li>
            )) : null

        return this.props.connectDropTarget(
            <div className={styles.container}>
                <li style={style}
                    className={listStyle}>
                    {!menuItem.color ? <span>&nbsp;</span> : null}
                    <span onClick={()=>{this.setState({opened:!opened})}}
                        className={folderStyle}/> &nbsp;
                    <span className={"col-xs-6 " + styles.pointer} 
                        onClick={()=>this.props.onSelect(menuItem.id, null)}>
                        {menuItem.name}
                    </span>
                    <span className="col-xs-2"/>
                    <span className="col-xs-1">
                        <Icon menuItem={menuItem}/>
                    </span>
                </li>
                {products}
            </div>
        )
    }
}