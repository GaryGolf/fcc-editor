import * as React from 'react'
import DropTarget from 'react-dnd/lib/DropTarget'
import { bindActionCreators } from 'redux'
import { RootState } from '../../reducers'
import ActionCreator from '../../actions'

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

function createNewItemFromCategory(category: ProductCategory, cell: number):MenuItem {
    
    const {id, color, icon, name, products} = category
    const product_categories = [{id, color, icon, name, products}]
    return { id, color, icon, name, cell, products: [], product_categories }
}
function addCategoryToMenuItem(category: ProductCategory, cell: number): MenuItem {
    const {id, color, icon, name, products} = category
}

const boxTarget = {
    drop(props, monitor) {

        if(!props.menuItem.id){ //create new menuItem from  dropped category
            const category = monitor.getItem().category
            const newMenuItem = createNewItemFromCategory(category, props.cell)
            props.actions.dropCategory(newMenuItem)
        } else {

        }
        
        const {cell, menuItem} = props
        return {cell, menuItem}
    }
}
@connect(
    state => ({
        menu: state.menu,
        nomenclature: state.nomenclature        
    }), dispatch => ({
        actions: bindActionCreators(ActionCreator as any, dispatch) 
    })
)
@DropTarget('PRODUCT', boxTarget, (connect, monitor) => ({
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