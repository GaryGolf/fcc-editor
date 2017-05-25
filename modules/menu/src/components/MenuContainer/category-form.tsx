import * as React from 'react'
import * as styles from './category-form.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'

import ColorPicker from '../Common/color-picker'
import IconPicker from '../Common/icon-picker'
import Selectize from '../Common/selectize'
import ConfirmDelete from '../Modals/confirm-delete'

interface Props {
    menu: Menu
    menuItemID: string
    actions: Actions.Interface
    onClose():void
}
interface State {
    menuItem: MenuItem
    showIconMenu: boolean
    showColorMenu: boolean
    showDeleteConfirm: boolean
    showSpinner: boolean
}

export default class CategoryForm extends React.Component<Props, State> {

    private nameInput: HTMLInputElement
    private parentSelect: HTMLSelectElement

     constructor(props: Props){
        super(props)

        this.state = {
            menuItem: this.findMenuItem(props.menuItemID, props.menu),
            showIconMenu: false,
            showColorMenu: false,
            showDeleteConfirm: false,
            showSpinner: false
        }

        this.saveMenuItem = this.saveMenuItem.bind(this)
        this.deleteMenuItem = this.deleteMenuItem.bind(this)
        this.cancelEditMenuItem = this.cancelEditMenuItem.bind(this)
        this.selectIcon = this.selectIcon.bind(this)
        this.selectColor = this.selectColor.bind(this)
        this.selectCategories = this.selectCategories.bind(this)
        this.selectProducts = this.selectProducts.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const menuItem = this.findMenuItem(nextProps.menuItemID, nextProps.menu)
        const showSpinner = false
        this.setState({menuItem, showSpinner})
    }

    findMenuItem(id:string, menu:Menu ): MenuItem {
        return menu.child_menus.find(item=> item.id == id)
    }

    saveMenuItem() {
        const menuItem = {
            ...this.state.menuItem,
            name: this.nameInput.value
        }
        this.setState({showSpinner: true}, () => 
           this.props.actions.menu.updateMenuItem(menuItem)
        )
        
    }

    deleteMenuItem() {
        this.props.actions.menu.removeMenuItem(this.state.menuItem)
        this.setState({showDeleteConfirm: false})
        this.props.onClose()
    }

    cancelEditMenuItem(){
        this.props.onClose()
    }

    selectIcon(icon: string){
        if(!icon) return  this.setState({showIconMenu: false})
        const icon_name = icon
        const menuItem = {...this.state.menuItem, icon, icon_name}
        this.setState({menuItem, showIconMenu: false})
    }
    selectColor(color: string){
        if(!color) return this.setState({showColorMenu: false})
        const menuItem = {...this.state.menuItem, color}
        this.setState({menuItem, showColorMenu: false})
    }

    selectCategories(menuItem: MenuItem) {
       this.setState({menuItem})
    }

    selectProducts(menuItem: MenuItem) {
       this.setState({menuItem})
    }

    render(){

        const {menu} = this.props
        const {menuItem, showSpinner} = this.state
        if(!menuItem || !menu) return null

        const options = this.props.menu.child_menus.map(item=>(
            <option key={item.id} 
                value={item.id}>
                {item.name}
            </option>
        ))
        const parentOptions = [<option key={menu.id} value={menu.id}>{menu.name}</option>, ...options]
        const color = <div className={styles.color} style={{backgroundColor:menuItem.color}}/>
        const icon = !!menuItem.icon_name ? <img key={menuItem.icon_name} className={styles.icon} 
                        src={`${CONST.DOMAIN}img/${menuItem.icon_name}.svg`} /> : null
        const spinner = showSpinner ? 
            <span className={"glyphicon glyphicon-refresh "+styles.spinner}/> : 
            <span className="glyphicon glyphicon-ok"/>

        return (
            <div className={styles.form}>
                <ConfirmDelete
                    visible={this.state.showDeleteConfirm}
                    name={menuItem.name}
                    onClose={()=>this.setState({showDeleteConfirm: false})}
                    onDelete={this.deleteMenuItem}
                />
                <div className="form-group">
                    <label className="control-label">
                        {CONST.NAME}
                    </label>
                    <input  key={menuItem.name}
                        type="text"
                        ref={element=>this.nameInput=element}
                        className="form-control"
                        placeholder = {CONST.ENTER_CATEGORY_NAME}
                        defaultValue={menuItem.name}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        {CONST.PRODUCTS}
                    </label>
                    <Selectize key={"product"+menuItem.id}
                        type="product"
                        menuItem={menuItem}
                        onSelect={this.selectProducts}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        {CONST.PRODUCTS_OF_CATEGORY}
                    </label>
                     <Selectize key={"category"+menuItem.id}
                        type="category"
                        menuItem={menuItem}
                        onSelect={this.selectCategories}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">
                        {CONST.EXCLUDED_GOODS}
                    </label>
                    <Selectize key={"excluded"+menuItem.id}
                        type="excluded"
                        menuItem={menuItem}
                        onSelect={this.selectCategories}
                    />
                </div>
                <div className="button-group">
                    <button className="btn btn-default dropdown-toggle"
                        onClick={()=>this.setState({showIconMenu: true})}>
                        {CONST.ICON} &nbsp; {icon} &nbsp;<span className="caret"/>
                    </button>
                    <IconPicker
                        visible={this.state.showIconMenu}
                        icons={CONST.icons}
                        onSelect={this.selectIcon}
                    />
                    <button className="btn btn-default dropdown-toggle" 
                        onClick={()=>this.setState({showColorMenu: true})}
                        style={{float: 'right'}}>
                        {CONST.COLOR} &nbsp;{color}&nbsp;<span className="caret"/>
                    </button>
                    <ColorPicker
                        visible={this.state.showColorMenu}
                        colors={CONST.colors}
                        onSelect={this.selectColor}
                    />
                </div>
                <br/>
                <div className="button-group">
                    <button className="btn btn-danger" 
                        onClick={()=>this.setState({showDeleteConfirm:true})}
                        style={{float: 'left'}}>
                        <span className="glyphicon glyphicon-trash"/>
                    </button> 
                    <button className="btn btn-primary start"
                        onClick={this.saveMenuItem}
                        style={{float: 'right'}}>
                        {spinner}&nbsp;{CONST.SAVE}
                    </button> 
                    <button className="btn btn-default" 
                        onClick={this.cancelEditMenuItem}
                        style={{float: 'right'}}>
                        {CONST.CANCEL}
                    </button> 

                </div>
            </div>
        )
    }
}