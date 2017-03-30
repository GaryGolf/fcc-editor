import * as React from 'react'
import * as CONST from '../../constants'
import * as MenuActions from '../../actions/menu'
import TagInput from '../TagInput'

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

export default class MenuEditModal extends React.Component<Props, State>{
    
    private icons: Array<string>
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

    selectCategoryHandler(ids: Array<string>){
        const product_categories = this.props.nomenclature.child_categories
            .filter(item => ids.includes(item.id))
        const menuItem = {...this.state.menuItem, product_categories}
        this.setState({menuItem})
    }

    selectProductHandler(ids: Array<string>){
        const products = this.props.nomenclature.child_categories
            .reduce((acc,item) => [...acc,...item.products],[])
            .filter(item => ids.includes(item.id))
        const menuItem = {...this.state.menuItem, products}
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

        // console.log(menuItem)
        const categories = this.props.nomenclature.child_categories
            // .filter(category => !menuItem.product_categories.some(mItemCat => mItemCat.id == category.id))
            .map(item => (
            <option 
                key={item.id}
                value={item.id}>
                {item.name}
            </option>
        ))

        const selectedCategories = menuItem.product_categories.map(item => item.id)

        let products = []
        this.props.nomenclature.child_categories.forEach(item => {
            products = [...products, ...item.products]
        })

        const goods = products.map(item => (
            <option 
                key={item.id}
                value={item.id}>
                {item.name}
            </option>
        ))

        const selectedGoods = menuItem.products.map(item => item.id)
        

        const icons = this.icons.map(icon => (
            <img
                key={icon}
                alt={icon}
                data-selected={menuItem.icon_name && menuItem.icon_name === icon} 
                className={style.icon}
                onClick={()=> this.selectIconHandler(icon)}
                src={CONST.DOMAIN + 'img/' + icon + '.svg'} />
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
                        <h3 className="modal-title">{CONST.MENU_ITEM}</h3>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>{CONST.MENU_ITEM_NAME}</label><br/>
                            <input 
                                className="form-control"
                                type="text" 
                                onChange={(event)=>this.changeTitleHandler(event.target.value)}
                                defaultValue={menuItem.name} />
                        </div>
                        <div className="form-group">
                            <label>{CONST.INCLUDES_CATEGORIES}</label>
                            <TagInput 
                                selected={selectedCategories}
                                onSelect={this.selectCategoryHandler.bind(this)}>
                                {categories}
                            </TagInput>
                        </div>
                        <div className="form-group">
                            <label>{CONST.ALSO_CONTAINS}</label>
                            <TagInput 
                                selected={selectedGoods}
                                onSelect={this.selectProductHandler.bind(this)}>
                                {goods}
                            </TagInput>
                        </div>
                        <div className="form-group">
                            <label>{CONST.ICON}</label>
                            <div className={''}>
                                {icons}
                            </div>  
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