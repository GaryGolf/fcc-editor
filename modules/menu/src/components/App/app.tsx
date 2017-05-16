import * as React from 'react'
import { bindActionCreators } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import MenuEditModal from '../Modals/MenuEditModal'
import Categories from '../Categories'
import Products from '../Products'
import Menu from '../Menu'
import * as Actions from '../../actions'
import * as CONST from '../../constants'

const {connect} = require('react-redux')
const style = require('./app.css')

interface Props {
    nomenclature?: ProductCategory
    category?: ProductCategory
    menu?: MenuState
    menuItem?: MenuItem
    actions?: Actions.Interface
}

@connect(
    state => ({
        nomenclature: state.nomenclature as ProductCategory,
        category: state.category.current as ProductCategory,
        menu: state.menu as MenuState,
        menuItem: state.view.menuItem as MenuItem
    }),
    dispatch => ({
        actions: {
            nomenclature: bindActionCreators(Actions.Nomenclature as any, dispatch),
            category: bindActionCreators(Actions.Category as any, dispatch),
            menu: bindActionCreators(Actions.Menu as any, dispatch),
            view: bindActionCreators(Actions.View as any, dispatch)  
        } 
    })
)
@DragDropContext(HTML5Backend)
export default class App extends React.Component<Props, null> {

    render(){

        const {nomenclature, category, menu, menuItem, actions} = this.props

        if(!nomenclature) return null
        const products = category ? category.products : null
    
        return (
            <section className={style.container}>
                <Categories actions={actions}
                    nomenclature={nomenclature}/>
                <Products products={products}/>
                <Menu menu={menu} actions={actions}/>
                <MenuEditModal 
                    menuItem={menuItem} 
                    nomenclature={nomenclature}
                    actions={actions.menu} 
                    close={()=>actions.view.hideMenuEditModal()} />
            </section>
        )
    }
}