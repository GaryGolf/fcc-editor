import * as React from 'react'
import Tile from './Tile'

import * as CONST from '../../constants'
import * as Actions from '../../actions'


const style = require('./menu.css')


interface Props {
    menu: MenuState
    actions: Actions.Interface
}

export default class Menu extends React.Component<Props, null> {
    
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
        props.actions.menu.fetch()
    }

    render(){
        
        const {menu, actions} = this.props

        const items = this.menu.map((item, idx) =>{
            const menuItem = menu.find(item => item.cell == idx) || item
            return <Tile key={idx} cell={idx} menuItem={menuItem} actions={actions} />
        })

        return (
            <section className={style.container}>
                {items}
            </section>
        )
    }
}