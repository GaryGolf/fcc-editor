import * as React from 'react'
import NewMenuModal from './NewMenuModal'
import Tile from './Tile'



const style = require('./menu.css')


interface Props {}
interface State {
    showModal: boolean
}

export default class Menu extends React.Component<Props, State> {
    

    constructor(props: Props){
        super(props)
        this.state={ showModal: true}
    }

    showModal(){
        this.setState({showModal:true})
    }
    closeModal(){
        this.setState({showModal:false})
    }

    render(){
        
        const menu = Array(24).fill('').map((item, idx) => <Tile key={idx} onClick={this.showModal.bind(this)}/>)

        return (
            <section className={style.container}>
                {menu}
                <NewMenuModal show={this.state.showModal} close={this.closeModal.bind(this)}/>
            </section>
        )
    }
}