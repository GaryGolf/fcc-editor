import * as React from 'react'
import NewMenuModal from './NewMenuModal'
import Tile from './Tile'

import * as CONST from '../../constants'



const style = require('./menu.css')


interface Props {
    menu: MenuState
    actions: any
}
interface State {
    showModal: boolean
}

export default class Menu extends React.Component<Props, State> {
    
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
        this.state={ showModal: false}
        this.menu  = Array(CONST.MENU_LENGTH).fill(this.menuPrototype)
    }

    showModal(){
        this.setState({showModal:true})
    }
    closeModal(){
        this.setState({showModal:false})
    }

    render(){
        
        const {menu, actions} = this.props

        const items = this.menu.map((item, idx) =>{
            const menuItem = menu.find(item => item.cell == idx) || item
            return <Tile key={idx} cell={idx} menuItem={menuItem} actions={actions} onClick={this.showModal.bind(this)}/>
        })

        return (

            <section className={style.container}>
                {items}
                <NewMenuModal show={this.state.showModal} close={this.closeModal.bind(this)}/>
            </section>
        )
    }
}