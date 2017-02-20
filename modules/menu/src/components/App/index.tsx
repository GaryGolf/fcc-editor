import * as React from 'react'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import Categories from '../Categories'
import Products from '../Products'
import Menu from '../Menu'
import * as CONST from '../../constants'
import { bindActionCreators } from 'redux'
import { RootState } from '../../reducers'
import ActionCreator from '../../actions'

const {connect} = require('react-redux')
const style = require('./app.css')


interface Props {
    nomenclature: ProductCategory
    category: ProductCategory
    menu: MenuState
    actions: {
        fetch:( )=> void,
        select:(category: ProductCategory) => void
    }
}

@connect(
    state => ({
        nomenclature: state.nomenclature as ProductCategory,
        category: state.category.current as ProductCategory,
        menu: state.menu as MenuState
    }),
    dispatch => ({ 
        actions: bindActionCreators(ActionCreator as any, dispatch) 
    })
)
@DragDropContext(HTML5Backend)
export default class App extends React.Component<Props, null> {
    
    componentWillMount(){
        this.props.actions.fetch()
    }

    render(){

        const {nomenclature, category, menu, actions} = this.props
        if(!nomenclature) return null
        const products = category ? category.products : null
        return (
            <section className={style.container}>
                <Categories actions={actions}
                    nomenclature={nomenclature}/>
                <Products products={products}/>
                <Menu menu={menu} actions={actions}/>
            </section>
        )
    }
}