import * as React from 'react'
import ProductItem from './ProductItem'
// import Box from '../SingleTarget/Box'
const style = require('./products.css')

interface Props {
    products: Array<Product>
}
export default class Products extends React.Component<Props, null>{
    constructor(props: Props){
        super(props)
    }

    render(){
        const {products} = this.props
        if(!products) return null
        const items = products.map((item, idx) => (
            <ProductItem key={item.id}
                         product={item}>
            </ProductItem>
        ))

        return (
            <section className={style.container}>
                <div className={style.scrollable}>
                     {items}
                </div>
            </section>
        )
    }
}