import * as React from 'react'
import Categories from '../Categories'
import Products from '../Products'
import * as CONST from '../../constants'
// import Menu from '../Menu'
const style = require('./app.css')

interface State {
    nomenclature: ProductCategory
    category: ProductCategory  // current (selected) category
}

export default class App extends React.Component<{}, State> {
    constructor(props: {}){
        super(props) 
        this.state = {
            nomenclature: null,
            category: null
        }
    }

    componentDidMount(){

        const root =    'c03cb760-1575-4858-ab41-52da066b9cd5'
        const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
        const url = CONST.menu_view_url + menu_id
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
            .then((nomenclature: ProductCategory) => this.setState({nomenclature}))
            .catch(console.error)
    }

    showProducts(category: ProductCategory){
        this.setState({category})
    }

    render(){
        const {category, nomenclature} = this.state
        if(!nomenclature) return null
        const products = category ? category.products : null
        return (
            <section className={style.container}>
                <Categories 
                    nomenclature={nomenclature}
                    showProducts={this.showProducts.bind(this)}/>
                <Products products={products}/>
            </section>
        )
    }
}