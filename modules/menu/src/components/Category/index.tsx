import * as React from 'react'
import * as constants from '../../constants'
const style = require('./category.css')

interface Product {
    id: string
    product_category_id: string
    description: string
    price: number
    measure: string
}

interface ProductCategory {
    id: string
    icon: string
    color: string
    name: string
    lft: number
    rgt: number
    depth: number
    child_menus?: ProductCategory[]
    products?: Product[]
}
interface Props {}
interface State {category : ProductCategory}

export default class Category extends React.Component<Props, State> {
    

    constructor(props: Props){
        super(props)
        this.state = {category: null}
    }

    componentDidMount(){

        const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
        const url = constants.menu_view_url + menu_id
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Tenant-Domain': 'google',
                'Access-Token': 'infinity_access_token_google'
            }
        }
        window['fetch'](url,options)
            .then(response => response.json())
            .then((category: ProductCategory) => this.setState({category}))
            .catch(console.error)
    }

    render(){
        
      
        return (
            <section className={style.container}>
                menu
            </section>
        )
    }
}