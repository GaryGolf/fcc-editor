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
    menu: Array<MenuItem>
}
interface Child {
    props: {
        children: string
        value: string
    }
}

export default class TagInput extends React.Component <Props, State> {
    private menu: MenuItem[]
    private map: Map<string,string>
    private input: HTMLInputElement
    private inputValue: string
    private blurTimer: number
    private active: boolean

    constructor(props){
        super(props)
        this.state = {
            selected: props.selected,
            menu: []
        }
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({key: v.props.value, value: v.props.children}))
        this.map = new Map()
        this.menu.forEach(v => {
            this.map.set(v.key, v.value)
        })
        this.active = false
    }

    componentWillReceiveProps(props){
        const children =  React.Children.toArray(props.children) as Child[]
        this.menu = children.map(v=>({key: v.props.value, value: v.props.children}))
        this.map = new Map()
        this.menu.forEach(v => {
            this.map.set(v.key, v.value)
        })
    }

    handleFocus(){
        this.active = true
        if(this.blurTimer) clearTimeout(this.blurTimer)
        if(this.input) this.input.focus()
    }

    handleBlur(){
       this.active = false 
       this.blurTimer = window.setTimeout(()=>this.setState({menu:[]}),300)
    }

    handleInput(event: React.KeyboardEvent<HTMLInputElement>){
        
        const {selected} = this.state
        switch(event.key){
            case 'Escape' :
                return this.handleBlur()
            case 'Backspace' :
                if(!this.inputValue && !!selected.length) selected.pop()
                break
            case 'Enter' :
                
                if (!!this.input.value) {
                    
                    const item = this.menu
                        .filter(v => !selected.some(key => v.key == key))
                        .find(v => v.value.toUpperCase().includes(this.input.value.toUpperCase()))
                    
                    if(!!item) return this.addTag(item.key)
                }
                break
            default :
                 
        }
        const menu = this.menu
            .filter(item => !selected.some(key => item.key==key))
            .filter(item => item.value.toUpperCase().includes(this.input.value.toUpperCase()))

        this.setState({menu},this.onSelect)
        this.inputValue = this.input.value 
    }

    addTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        selected.push(tag)
        const menu = this.menu
            .filter(item => !selected.some(key => item.key==key))
            .filter(item => item.value.toUpperCase().includes(this.input.value.toUpperCase()))
        this.setState({menu, selected}, this.onSelect)
    }

    removeTag(tag: string): void {
        const selected = this.state.selected.filter(item=>item != tag)
        const menu = this.menu
            .filter(item => !selected.some(key => item.key==key))
            .filter(item => item.value.toUpperCase().includes(this.input.value.toUpperCase()))
        this.setState({menu, selected}, this.onSelect)
    }

    onSelect(){
        if(this.props.onSelect) this.props.onSelect(this.state.selected)
    }

    render(){
        
        if(!this.menu) return null

        const tagStyle = ['label', 'label-info',  style.tag].join(' ')
        const inputStyle = [style.input].join(' ')
        const formStyle = [style.form].join(' ')
        const containerStyle = [
            style.container,
            this.active ? style.active : null
        ].join(' ')

        const tags = this.state.selected.map(tag => ( 
            <span 
                key={tag}
                className={tagStyle}
                onClick={()=>this.removeTag(tag)}>
                {this.map.get(tag)}
                <span data-role="remove"></span>
            </span>
        ))

        const menu = !this.state.menu.length ? null 
        :  <ul className="dropdown-menu"
                style={{display:'block'}}>
                {this.state.menu.map(item => ( 
                    <li key={item.key}>
                        <a onClick={()=>this.addTag(item.key)}>
                            {item.value}
                        </a>
                    </li>
                ))}
            </ul>

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
                        onBlur={this.handleBlur.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        onKeyUp={this.handleInput.bind(this)}/>        
                </div>
                <div className={style.menu}>
                    {menu}
                </div>
            </div>
        )
    }
}