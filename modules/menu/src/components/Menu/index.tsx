import * as React from 'react'
import Tile from './Tile'

import * as CONST from '../../constants'



const style = require('./menu.css')


interface Props {
    menu: MenuState
    actions: any
}

export default class Menu extends React.Component<Props, null> {
    
    private menu: MenuState
    private menuPrototype:MenuItem = {
        id: '',
        icon: '',
        name: '',
        color: '', 
        cell: null,
        products: [],
        product_categories: []
    }

    constructor(props: Props){
        super(props)
        this.menu  = Array(CONST.MENU_LENGTH).fill(this.menuPrototype)
    }

    render(){
        
        const {menu, actions} = this.props

        const items = this.menu.map((item, idx) =>{
            const menuItem = menu.find(item => item.cell == idx) || item
            return <Tile key={idx} cell={idx} menuItem={menuItem} />
        })

        return (
            <section className={style.container}>
                {items}
            </section>
        )
    }
}