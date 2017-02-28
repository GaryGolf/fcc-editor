import * as React from 'react'
import * as CONST from '../../constants'
import * as MenuActions from '../../actions/menu'

const style = require('./menu-modal.css')

interface Props {
    nomenclature: ProductCategory
    menuItem: MenuItem
    actions: MenuActions.Interface
    close: ()=>void
}

interface State {
    menuItem: MenuItem
}

interface Icon {
    name: string
    value: string
    file: any
}

export default class MenuEditModal extends React.Component<Props, State>{
    
    private icons: Icon[]

    constructor(props: Props){
        super(props)
        this.state = { menuItem: null }
        this.icons = CONST.icons
    }

    componentWillReceiveProps(props: Props){
        this.setState({menuItem: props.menuItem})
    }
   

    changeTitleHandler(name: string) {
        if(!name) return
        const menuItem = {...this.state.menuItem, name}
        this.setState({menuItem})
    }

    removeCategoryHandler(event: any, id: string) {
        
        const product_categories = this.state.menuItem.product_categories
            .filter(item => item.id != id)
        if(!product_categories.length) {
            const checkbox = event.target
            setTimeout(() => checkbox.checked = false, 300)
            return
        }
        const menuItem = {...this.state.menuItem, product_categories}
        setTimeout(()=>this.setState({menuItem}),300)
    }

    removeProductHandler(id: string) {
        const category = this.state.menuItem.product_categories
        const products = this.state.menuItem.products.filter(item => item.id != id)
        const menuItem = {...this.state.menuItem, products}
        this.setState({menuItem})
    }

    selectIconHandler(icon: string) {
        if(!icon) return
        const icon_name = icon
        const menuItem = {...this.state.menuItem, icon, icon_name}
        this.setState({menuItem})
    }

    deleteMenuItem() {
        this.props.actions.removeMenuItem(this.state.menuItem)
        this.props.close()
    }

    updateMenuItem() {
        this.props.actions.updateMenuItem(this.state.menuItem)
        this.props.close()
    }

    render(){
        const {menuItem} = this.state

        if(!menuItem) return null

        const categories = menuItem.product_categories.map((item, i) => (
            <div key={item.id}>
                <input 
                    type="checkbox" 
                    onChange={(event)=>this.removeCategoryHandler(event, item.id)}/>
                {item.name}
            </div>
        ))

        const goods = menuItem.products.map(item => (
            <div key={item.id}>
                {item.name}&nbsp;
                <button type="button" 
                    onClick={()=>this.removeProductHandler(item.id)} 
                    className={"close " + style.remove }
                    data-dismiss="modal" 
                    aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        ))

        const icons = this.icons.map(icon => (
            <img
                key={icon.value}
                alt={icon.name}
                data-selected={menuItem.icon_name && menuItem.icon_name === icon.value} 
                className={style.icon}
                onClick={()=> this.selectIconHandler(icon.value)}
                src={icon.file} />
        ))

        return (
            <div className={style.container}>
                <div className={style.overlay} onClick={this.props.close.bind(this)}/>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                                onClick={this.props.close.bind(this)}
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Элемент меню</h4>
                    </div>
                    <div className="modal-body">
                        <div className={style['input-group']}>
                            <label>{CONST.MENU_ITEM_NAME}</label>&nbsp;
                            <input 
                                type="text" 
                                onChange={(event)=>this.changeTitleHandler(event.target.value)}
                                defaultValue={menuItem.name} />
                        </div>
                        <br/>
                        <div className={style.list}>
                            <label>{CONST.INCLUDES_CATEGORIES}</label>
                            {categories}
                        </div>
                        <br/>
                        <div className={style.list}>
                            <label>{CONST.ALSO_CONTAINS}</label>
                            {goods}
                        </div>
                        <br/>
                        <label>{CONST.ICON}</label>
                        <div className={''}>
                            {icons}
                        </div>  
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            style={{float: 'left'}}
                            className="btn btn-default" 
                            data-dismiss="modal"
                            onClick={this.props.close.bind(this)}>
                            {CONST.CLOSE}
                        </button>
                         <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={()=>this.deleteMenuItem()}>
                            {CONST.DELETE}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={()=>this.updateMenuItem()}>
                            {CONST.SAVE}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}