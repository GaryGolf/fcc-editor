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

import TagInput from '../TagInput'

import * as API from '../../api'

const {connect} = require('react-redux')
const style = require('./app.css')

interface Props {
    nomenclature: ProductCategory
    category: ProductCategory
    menu: MenuState
    menuItem: MenuItem
    actions: Actions.Interface
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

        return (
        <div style={{margin: '40px 100px'}}>
            <TagInput selected={console.log}>
                <option value={'Cabbage'}>Cabbage</option>
                <option value={'Carrot'}>Carrot</option>
                <option value={'Cpusca'}>Capusca</option>
                <option value={'Cartophell'}>Cartophell</option>
                <option value={'Caprice'}>Caprice</option>
                <option value={'Canfette'}>Canfette</option>
                <option value={'Carlotte'}>Carlotte</option>
                <option value={'Carradouret'}>Carradouret</option>
                <option value={'Limone'}>Limone</option>
                <option value={'Banana'}>Banana</option>
                <option value={'Apple'}>Apple</option>
                <option value={'Melon'}>Melon</option>
            </TagInput>
        </div>
        )
        /*const {nomenclature, category, menu, menuItem, actions} = this.props

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
        )*/
    }
}