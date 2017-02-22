import * as React from 'react'
import NewMenuModal from './NewMenuModal'
import Tile from './Tile'



const style = require('./menu.css')


interface Props {
    menu: MenuState
}
interface State {
    showModal: boolean
}

export default class Menu extends React.Component<Props, State> {
    

    constructor(props: Props){
        super(props)
        this.state={ showModal: false}
    }

    showModal(){
        this.setState({showModal:true})
    }
    closeModal(){
        this.setState({showModal:false})
    }

    render(){
        
        const menu = this.props.menu || Array(24).fill({
            id: '',
            description: '',
            price: 0
        })

        const items = menu.map((item, idx) => <Tile key={idx} cell={idx} menuItem={item} onClick={this.showModal.bind(this)}/>)

        return (
            <section className={style.container}>
                {items}
                <NewMenuModal show={this.state.showModal} close={this.closeModal.bind(this)}/>
            </section>
        )
    }
}