import * as React from 'react'

const style = require('./menu.css')
interface Props {
    menuItems: Array<MenuItem>
    onSelect(value:string):void
}
interface State {}
export interface MenuItem {
    name: string
    value: string
}

export default class Menu extends React.Component <Props, State> {
    constructor(props: Props){
        super(props)
    }

    render(){
        
        if(!this.props.menuItems.length) return null

        const items = this.props.menuItems.map(item => ( 
            <li key={item.value}>
                <a onClick={()=>this.props.onSelect(item.value)}>
                    {item.name}
                </a>
            </li>
        ))

        return (
            
            <div className={style.container}>
                <ul 
                    className="dropdown-menu"
                    style={{display:'block'}}>
                    {!items.length ? null : items}
                </ul>
            </div>
        )
    }
}