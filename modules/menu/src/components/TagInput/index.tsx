import * as React from 'react'

const styles = require('./tag-input.css')

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
    private hidden: HTMLSpanElement
    private inputValue: string
    private blurTimer: number
    private inputWidth: number

    constructor(props){
        super(props)
        this.state = {
            selected: props.selected,
            input: '',
            active: false
        }
        this.handleInput = this.handleInput.bind(this)
        this.inputValue = ''
        this.inputWidth = 30
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

    handleInput(event: React.KeyboardEvent<HTMLInputElement>) {

        const val = event.target['value']
        const input = val.length > 30 ? this.state.input : val
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
        this.input.value = input
        this.inputValue = input
        this.inputWidth = this.hidden.offsetWidth + 30
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

        const tagStyle = ['label', 'label-info',  styles.tag].join(' ')
        const inputStyle = [styles.input].join(' ')
        const formStyle = [styles.form].join(' ')
        const containerStyle = [
            'form-control',
            styles.container,
            this.state.active ? styles.active : null
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
        
        const width = this.inputWidth+'px'

        return (
            <div 
                className={containerStyle}
                onDoubleClick={()=>this.removeTag('')}
                onClick={this.handleFocus.bind(this)}>
                <div className={styles.form}>
                    {tags}
                    <input 
                        type="text" 
                        style={{width}}
                        className={inputStyle}
                        ref={element=>this.input=element}
                        onBlur={this.handleBlur.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        onKeyUp={this.handleInput}/>
                </div>
                <span className={styles.hidden}
                    ref={span=>this.hidden = span}>
                    {this.state.input}
                </span>
                {menus}
            </div>
        )
    }
}