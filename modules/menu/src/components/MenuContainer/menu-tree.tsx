import * as React from 'react'
import * as styles from './menu-tree.css'
import * as CONST from '../../constants'
import * as Actions from '../../actions'
import CategoryForm from './category-form'
import ProductForm from './product-form'
import MenuList from './menu-list'

interface Props {
    visible: boolean
    menu: Menu
    actions: Actions.Interface
}
interface State {
    menuItemID: string
    productID: string
}

export default class MenuTree extends React.Component <Props, State> {

    state={
        menuItemID: null,
        productID: null
    }

    

    selectMenuItem(menuItemID: string, productID:string) {
        this.setState({menuItemID, productID})
    }

    drawForm(){
        const {menu, actions} = this.props
        const {menuItemID, productID} = this.state
        if(!menuItemID && !productID) return null
        if(!productID) return <CategoryForm
                actions={actions}
                menu={menu}
                menuItemID={this.state.menuItemID}
                onClose={()=>this.setState({menuItemID:null})}
            />
        return <ProductForm
                actions={actions}
                menu={menu}
                menuItemID={this.state.menuItemID}
                productID={this.state.productID}
                onClose={()=>this.setState({productID:null})}
            />
    }


    render(){
         const {menu, actions, visible} = this.props

        if(!visible) return null

        return (
            <div className={styles.container}>
                <section className={styles.left}>
                    <MenuList
                        menu={menu}
                        onSelect={this.selectMenuItem.bind(this)}
                    />
                </section>
                <section className={styles.right}>
                    {this.drawForm()}
                </section>
            </div>
        )
    }
}