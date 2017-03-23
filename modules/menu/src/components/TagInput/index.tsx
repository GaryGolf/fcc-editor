import * as React from 'react'

const style = require('./tag-input.css')

interface MenuItem {
    key: string
    value: string
}

interface Props {
    onSelect(selected:string[]):void
    selected: Array<string>
}
interface State {
    selected: string[]
    input: string
    active: boolean
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
    private blurTimer: number

    constructor(props){
        super(props)
        this.state = {
            selected: props.selected,
            input: '',
            active: false
        }
        this.inputValue = ''
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({key: v.props.value, value: v.props.children}))
    }

    componentWillReceiveProps(props){
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({key: v.props.value, value: v.props.children}))
    }

    componentWillUnmount(){
        if(this.blurTimer) clearTimeout(this.blurTimer)
    }

    handleFocus(){
        this.setState({active:true})
        if(this.blurTimer) clearTimeout(this.blurTimer)
        if(this.input) this.input.focus()
    }

    handleBlur(){
       this.blurTimer = window.setTimeout(()=>this.setState({active: false}),300)
    }

    handleInput(event: React.KeyboardEvent<HTMLInputElement>){
        
        
        const input = event.target['value']
        const menu = this.getMenu()

        switch(event.key){
            case 'Escape' :
                this.handleBlur()
                break
            case 'Backspace' :
                if(!this.inputValue) this.removeLastTag()
                break
            case 'Enter' :
                if (!!this.input.value && !!menu.length) 
                    this.addTag(menu.find(v => v.value.toUpperCase().includes(input.toUpperCase())).key)
                break
            default :        
        }
        this.inputValue = input
        this.setState({input})
    }

    addTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        selected.push(tag)
        this.setState({selected}, this.onSelect)
    }

    removeLastTag(): void {
        const selected = this.state.selected.filter(v => true)
        if(!selected.length) return
        selected.pop()
        this.setState({selected}, this.onSelect)
    }

    removeTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        this.setState({selected}, this.onSelect)
    }

    onSelect(){
        if(this.props.onSelect) this.props.onSelect(this.state.selected)
    }

    getMenu(): MenuItem[] {
        return this.menu
            .filter(item => !this.state.selected.some(key => item.key==key))
            .filter(item => item.value.toUpperCase().includes(this.inputValue.toUpperCase()))
    }

    render(){
        
        if(!this.menu) return null

        const menu = this.state.active ? this.getMenu() : []

        const tagStyle = ['label', 'label-info',  style.tag].join(' ')
        const inputStyle = [style.input].join(' ')
        const formStyle = [style.form].join(' ')
        const containerStyle = [
            style.container,
            this.state.active ? style.active : null
        ].join(' ')

        const tags = this.state.selected.map(tag => ( 
            <span 
                key={tag}
                className={tagStyle}
                onClick={()=>this.removeTag(tag)}>
                {this.menu.find(item => item.key == tag).value}
                <span data-role="remove"></span>
            </span>
        ))

        const menus = !menu.length ? null 
        :  <ul className="dropdown-menu"
                style={{display:'block'}}>
                {menu.map(item => ( 
                    <li key={item.key}>
                        <a onClick={()=>this.addTag(item.key)}>
                            {item.value}
                        </a>
                    </li>
                ))}
            </ul>

        return (
            <div 
                className={containerStyle}
                onDoubleClick={()=>this.removeTag('')}
                onClick={this.handleFocus.bind(this)}>
                    {tags}
                    <input 
                        type="text" 
                        className={inputStyle}
                        ref={element=>this.input=element}
                        onBlur={this.handleBlur.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        onKeyUp={this.handleInput.bind(this)}/>        
                <div className={style.menu}>
                    {menus}
                </div>
            </div>
        )
    }
}