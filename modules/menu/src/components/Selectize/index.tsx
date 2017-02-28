import * as React from 'react'
import Menu from './Menu'

interface Props {}
interface State {
    selected: string[]
}

export default class Selectize extends React.Component <Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            selected: []
        }
    }

    onSelectHandler(item: string){
        const items = this.state.selected
        if(items.includes(item)) return
        const selected = [...items, item]
        this.setState({selected})
    }

    render(){
        console.log(this.state.selected)
        return (
            <div>
                <Menu onSelect={(item)=>this.onSelectHandler(item)}>
                    {this.props.children}
                </Menu>
            </div>
        )
    }
}