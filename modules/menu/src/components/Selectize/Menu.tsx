import * as React from 'react'

const style = require('./menu.css')
interface Props {
    onSelect(value:string):void
}
interface State {}
interface Option {
    props: {
        children: string
        value: string
    }
}

export default class Menu extends React.Component <Props, State> {
    constructor(props: Props){
        super(props)
    }

    render(){
        
        const children = React.Children.toArray(this.props.children)

        const items = children.map(item => {
            const option =  item as Option
            return ( 
                <li key={option.props.value}>
                    <a onClick={()=>this.props.onSelect(option.props.value)}>
                        {option.props.children}
                    </a>
                </li>
            )
        })

        if(!items.length) return null

        return (
            <div className={style.container}>
                <ul className="dropdown-menu" style={{display:'block', top:0}}>
                    {items}
                </ul>
            </div>
        )
    }
}