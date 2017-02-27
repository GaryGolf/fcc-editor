import * as React from 'react'
import * as CONST from '../../constants'
import * as MenuActions from '../../actions/menu'

const style = require('./menu-modal.css')

interface Props {
    menuItem: MenuItem
    close: ()=>void
    actions: MenuActions.Interface
        
}

interface State {
    menuItem: MenuItem
}

export default class MenuEditModal extends React.Component<Props, State>{
    


    constructor(props: Props){
        super(props)
        this.state = { menuItem: null }
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

    removeProductHandler(event: any, id: string) {
        const category = this.state.menuItem.product_categories
        const products = this.state.menuItem.products
            .filter(item => item.id != id)
        if(!category.length && !products.length) {
            const checkbox = event.target
            setTimeout(() => checkbox.checked = false, 300)
            return
        }
        const menuItem = {...this.state.menuItem, products}
        setTimeout(()=>this.setState({menuItem}),300)
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
                 <input 
                    type="checkbox"  
                    onChange={(event)=>this.removeProductHandler(event, item.id)}/>
                {item.name}
            </div>
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
                        <p>выделенные позиции будут удалены</p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
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