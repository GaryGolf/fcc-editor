import * as React from 'react'
import * as CONST from '../../constants'

const style = require('./menu-modal.css')

interface Props {
    menuItem: MenuItem
    close: ()=>void
}

export default class MenuEditModal extends React.Component<Props, null>{
    
    constructor(props: Props){
        super(props)
    }
   
    render(){
        const {menuItem} = this.props

        if(!menuItem) return null

        const categories = menuItem.product_categories.map(item => (
            <div key={item.id}>
                <input type="checkbox" />
                {item.name}
            </div>
        ))

        const goods = menuItem.products.map(item => (
            <div key={item.id}>
                 <input type="checkbox" />
                {item.description}
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
                            <input defaultValue={menuItem.name} />
                        </div>
                        <div className={style.list}>
                            <label>{CONST.INCLUDES_CATEGORIES}</label>
                            {categories}
                        </div>
                        <br />
                        <div className={style.list}>
                            <label>{CONST.ALSO_CONTAINS}</label>
                            {goods}
                        </div>
                        <br/>
                        <p>выделенные позиции будут удалены</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                                className="btn btn-default" 
                                data-dismiss="modal"
                                onClick={this.props.close.bind(this)}>
                                Close
                        </button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}