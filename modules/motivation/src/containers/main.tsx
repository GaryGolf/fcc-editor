import * as React from 'react'
import * as styles from './main.css'

// import * as Actions from '../../actions'
// import * as CONST from '../../constants'
// import { bindActionCreators } from 'redux'
// import DragDropContext from 'react-dnd/lib/DragDropContext'
// import {default as HTML5Backend} from 'react-dnd-html5-backend'
// import Categories from '../Categories'
// import Products from '../Products'
// import MenuContainer from '../MenuContainer'

// const {connect} = require('react-redux')

interface Props {

    // nomenclature?: ProductCategory
    // category?: ProductCategory
    // menu?: Menu
    // menuItem?: MenuItem
    // actions?: Actions.Interface

}

// @connect(
//     state => ({
//         nomenclature: state.nomenclature as ProductCategory,
//         category: state.category.current as ProductCategory,
//         menu: state.menu as Menu
//     }),
//     dispatch => ({
//         actions: {
//             nomenclature: bindActionCreators(Actions.Nomenclature as any, dispatch),
//             category: bindActionCreators(Actions.Category as any, dispatch),
//             menu: bindActionCreators(Actions.Menu as any, dispatch)
//         } 
//     })
// )
// @DragDropContext(HTML5Backend)
export default class MainScreen extends React.Component<Props, null> {

    constructor(props: Props){
        super(props)
    }

    render(){


    
        return (
            <div className={styles.container}>
              Hello world
            </div>
        )
    }
}