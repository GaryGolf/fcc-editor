import * as React from 'react'
import Menu, {MenuItem} from './Menu'

const style = require('./tag-input.css')

interface Props {}
interface State {
    selected: string[]
    input: ''
}
interface Child {
    props: {
        children: string
        value: string
    }
}

export default class TagInput extends React.Component <Props, State> {
    private menu: MenuItem[]
    constructor(props){
        super(props)
        this.state = {
            selected: [],
            input: ''

        }
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({name:v.props.children, value: v.props.value}) )
    }

    componentWillReceiveProps(props){
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({name:v.props.children, value: v.props.value}) )
    }

    handleMenuSelect(item: string){
        const items = this.state.selected
        if(items.includes(item)) return
        const selected = [...items, item]
        this.setState({selected})
    }

    handleInput(event: React.KeyboardEvent<HTMLInputElement>){
        
        switch(event.key){
            case 'Enter' :
            default :
        }

        this.setState({input: event.target['value']})
    }

    render(){
        
        if(!this.menu) return null

        const tags = this.state.selected.map(tag =>( 
            <div className="well">
                {tag}
            </div>
        ))
        
        return (
            <div className={style.container}>
                {tags}
                <input type="text" 
                    className={style.input}
                    onKeyUp={this.handleInput.bind(this)}/>        
                <div className={style.menu}>
                    <Menu
                        menuItems={this.menu.filter(item => (
                            item.name.includes(this.state.input)
                            && !!this.state.input.length))} 
                        onSelect={(item)=>this.handleMenuSelect(item)} />
                </div>
            </div>
        )
    }
}