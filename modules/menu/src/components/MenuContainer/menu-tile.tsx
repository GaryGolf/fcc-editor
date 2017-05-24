import * as React from 'react'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import * as styles from './menu-tile.css'

import Tile from './tile'
import EditMenu from '../Modals/edit-menu'

interface State {
    showEditMenuDialog: boolean
    menuItem: MenuItem
}

interface Props {
    menu: Menu
    actions: Actions.Interface
    visible: boolean
}

export default class MenuTile extends React.Component<Props, State> {
    
    private menu: MenuState
    private menuItemPrototype:MenuItem 

    constructor(props: Props){
        super(props)

        this.menuItemPrototype = {
            id: '',
            icon: '',
            name: '',
            color: '', 
            cell: null,
            products: [],
            product_categories: []
        }
        this.menu  = Array(CONST.MENU_LENGTH)
            .fill(this.menuItemPrototype)
            .map((item, index) => {
                item.cell = index
                return item
            })
        
        this.state = { 
            menuItem: null,
            showEditMenuDialog: false
        }
    }

    showEditModal(menuItem:MenuItem) {
        this.setState({menuItem})
    }

    closeEditModal(){
        this.setState({menuItem: null})
    }

    deleteMenuItem(menuItem:MenuItem) {
        this.props.actions.menu.removeMenuItem(menuItem)
        this.setState({menuItem: null})
    }

    submitEditModal(menuItem:MenuItem){
        this.props.actions.menu.updateMenuItem(menuItem)
        this.setState({menuItem: null})
    }

    render(){
        
        const {menu, actions, visible} = this.props

        if(!visible || !menu) return null

        const items = this.menu.map((item, idx) =>{
            
            const menuItem = menu.child_menus.find(item => item.cell == idx) || item
            return (
                <Tile key={idx} 
                    cell={idx} 
                    menuItem={menuItem} 
                    onClick={this.showEditModal.bind(this)}
                    actions={actions} 
                />
            )
        })

        return (
            // <section className={style.container}>
            <div className={styles.container}>
                {items}
                <EditMenu
                    menu={menu}
                    menuItem={this.state.menuItem}
                    onClose={this.closeEditModal.bind(this)}
                    onDelete={this.deleteMenuItem.bind(this)}
                    onSubmit={this.submitEditModal.bind(this)}
                />
            </div>
            // </section>
        )
    }
}