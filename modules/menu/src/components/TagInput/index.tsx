import * as React from 'react'
import Menu, {MenuItem} from './Menu'

const style = require('./tag-input.css')

interface Props {
    selected(selected:string[]):void
}
interface State {
    selected: string[]
    menu: Array<{name:string, value:string}>
}
interface Child {
    props: {
        children: string
        value: string
    }
}

export default class TagInput extends React.Component <Props, State> {
    private menu: MenuItem[]
    private input: HTMLInputElement
    private inputValue: string
    private blurTimer: NodeJS.Timer
    // private blurTimer: number
    constructor(props){
        super(props)
        this.state = {
            selected: [],
            menu: []
        }
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({name:v.props.children, value: v.props.value}) )
    }

    componentWillReceiveProps(props){
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({name:v.props.children, value: v.props.value}) )
    }

    handleFocus(){
        // if(this.blurTimer) clearTimeout(this.blurTimer)
        if(this.input) this.input.focus()
    }

    handleBlur(){
        this.setState({menu:[]})
    //    this.blurTimer = setTimeout(()=>this.setState({menu:[]}),300)
    //    console.log(this.blurTimer)
    }

    handleInput(event: React.KeyboardEvent<HTMLInputElement>){
        
        const {selected} = this.state
        switch(event.key){
            case 'Escape' :
                this.handleBlur()
                break
            case 'Backspace' :
                if(!this.inputValue && !!selected.length)
                    // this.removeTag(selected[selected.length-1])
                    selected.pop()
            case 'Enter' :
            default :
                 const menu = this.menu
                    .filter(item => !selected.some(value => item.value==value))
                    .filter(item => item.name.toUpperCase().includes(this.input.value.toUpperCase()))
                this.setState({menu},this.selected) 
        }
        this.inputValue = this.input.value 
    }

    addTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        selected.push(tag)
        const menu = this.menu
            .filter(item => !selected.some(value => item.value==value))
            .filter(item => item.name.toUpperCase().includes(this.input.value.toUpperCase()))
        this.setState({menu, selected}, this.selected)
    }

    removeTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        const menu = this.menu
            .filter(item => !selected.some(value => item.value==value))
            .filter(item => item.name.toUpperCase().includes(this.input.value.toUpperCase()))
        this.setState({menu, selected}, this.selected)
    }

    selected(){
        if(this.props.selected) this.props.selected(this.state.selected)
    }

    render(){
        
        if(!this.menu) return null

        const tagStyle = ['label', 'label-info',  style.tag].join(' ')
        const inputStyle = [style.input].join(' ')
        const formStyle = [style.form].join(' ')

        const tags = this.state.selected.map(tag => ( 
            <span 
                key={tag}
                className={tagStyle}
                onClick={()=>this.removeTag(tag)}>
                {tag}
                <span data-role="remove"></span>
            </span>
        ))
        
        return (
            <div 
                className={style.container}
                onDoubleClick={()=>this.removeTag('')}
                onClick={this.handleFocus.bind(this)}>
                <div className={formStyle}>
                    {tags}
                    <input 
                        type="text" 
                        autoFocus={true} 
                        className={inputStyle}
                        ref={element=>this.input=element}
                        onFocus={this.handleFocus.bind(this)}
                        onKeyUp={this.handleInput.bind(this)}/>        
                </div>
                <div className={style.menu}>
                    <Menu
                        menuItems={this.state.menu}
                        onSelect={(item)=>this.addTag(item)} />
                </div>
            </div>
        )
    }
}