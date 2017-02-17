import * as React from 'react'
import Tile from './Tile'

const style = require('./menu.css')


interface Props {}
interface State {}

export default class Menu extends React.Component<Props, State> {
    

    constructor(props: Props){
        super(props)
       
    }

    render(){
        
        const menu = Array(24).fill('').map((item, idx) => <Tile key={idx}/>)

        return (
            <section className={style.container}>
                {menu}
            </section>
        )
    }
}